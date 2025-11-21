import { NextRequest, NextResponse } from 'next/server';

interface PaymentInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number; // in years
  propertyTax?: number;
  homeInsurance?: number;
  pmi?: number; // Private Mortgage Insurance
  hoa?: number; // Homeowners Association fees
}

/**
 * Algorithm: Mortgage Payment Calculation
 * 
 * Uses standard mortgage amortization formula:
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Where:
 * - M = Monthly payment
 * - P = Principal loan amount
 * - r = Monthly interest rate (annual rate / 12)
 * - n = Total number of payments (loan term * 12)
 */
function calculateMortgagePayment(input: PaymentInput): {
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalLoanAmount: number;
  totalInterestPaid: number;
  breakdown: {
    principal: number;
    interest: number;
    taxesInsurance: number;
    other: number;
  };
} {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax = homePrice * 0.012 / 12, // ~1.2% annual, monthly
    homeInsurance = homePrice * 0.0035 / 12, // ~0.35% annual, monthly
    pmi = 0,
    hoa = 0,
  } = input;

  // Calculate loan amount
  const principal = homePrice - downPayment;
  
  // Calculate monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Calculate number of payments
  const numPayments = loanTerm * 12;

  // Calculate monthly principal and interest using amortization formula
  let monthlyPrincipalInterest = 0;
  if (monthlyRate > 0) {
    monthlyPrincipalInterest = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPrincipalInterest = principal / numPayments;
  }

  // Calculate PMI if down payment < 20%
  let monthlyPMI = 0;
  const downPaymentPercent = (downPayment / homePrice) * 100;
  if (downPaymentPercent < 20 && pmi === 0) {
    // PMI typically 0.5-1% of loan amount annually
    monthlyPMI = (principal * 0.005) / 12; // Using 0.5% as default
  } else if (pmi > 0) {
    monthlyPMI = pmi;
  }

  // Calculate total monthly payment
  const totalMonthlyPayment = 
    monthlyPrincipalInterest +
    propertyTax +
    homeInsurance +
    monthlyPMI +
    hoa;

  // Calculate total interest paid over life of loan
  const totalInterestPaid = (monthlyPrincipalInterest * numPayments) - principal;

  return {
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest * 100) / 100,
    monthlyPropertyTax: Math.round(propertyTax * 100) / 100,
    monthlyHomeInsurance: Math.round(homeInsurance * 100) / 100,
    monthlyPMI: Math.round(monthlyPMI * 100) / 100,
    monthlyHOA: hoa,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    totalLoanAmount: principal,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    breakdown: {
      principal: Math.round(principal),
      interest: Math.round(totalInterestPaid),
      taxesInsurance: Math.round((propertyTax + homeInsurance) * numPayments),
      other: Math.round((monthlyPMI + hoa) * numPayments),
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const input: PaymentInput = await request.json();

    // Validate input
    if (!input.homePrice || !input.downPayment || input.interestRate === undefined) {
      return NextResponse.json(
        { error: 'Home price, down payment, and interest rate are required.' },
        { status: 400 }
      );
    }

    if (input.downPayment >= input.homePrice) {
      return NextResponse.json(
        { error: 'Down payment cannot be greater than or equal to home price.' },
        { status: 400 }
      );
    }

    // Calculate payment using algorithm
    const result = calculateMortgagePayment({
      ...input,
      loanTerm: input.loanTerm || 30, // Default 30 years
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error calculating payment:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

