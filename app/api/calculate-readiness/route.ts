import { NextRequest, NextResponse } from 'next/server';

interface ReadinessInput {
  creditScore: number;
  monthlyIncome: number;
  monthlyDebt: number;
  downPaymentSavings: number;
  monthlySavings: number;
  employmentYears: number;
  hasPriorBankruptcy?: boolean;
  hasForeclosure?: boolean;
}

/**
 * Algorithm: Homeownership Readiness Score Calculation
 * 
 * Uses weighted scoring algorithm with multiple factors:
 * 1. Credit Score (30% weight) - Most important factor
 * 2. Debt-to-Income Ratio (25% weight) - Affects loan approval
 * 3. Down Payment Readiness (20% weight) - Affects loan type
 * 4. Savings Rate (15% weight) - Financial stability indicator
 * 5. Employment Stability (10% weight) - Loan qualification factor
 */
function calculateReadinessScore(input: ReadinessInput): {
  overallScore: number;
  readinessLevel: string;
  breakdown: {
    creditScore: number;
    debtToIncome: number;
    downPayment: number;
    savingsRate: number;
    employment: number;
  };
  recommendations: string[];
  loanTypes: string[];
} {
  const {
    creditScore,
    monthlyIncome,
    monthlyDebt,
    downPaymentSavings,
    monthlySavings,
    employmentYears,
    hasPriorBankruptcy = false,
    hasForeclosure = false,
  } = input;

  // 1. Credit Score Component (0-100, 30% weight)
  let creditScoreComponent = 0;
  if (creditScore >= 740) creditScoreComponent = 100;
  else if (creditScore >= 700) creditScoreComponent = 90;
  else if (creditScore >= 680) creditScoreComponent = 80;
  else if (creditScore >= 640) creditScoreComponent = 65;
  else if (creditScore >= 620) creditScoreComponent = 50;
  else if (creditScore >= 580) creditScoreComponent = 30;
  else creditScoreComponent = 10;

  // Penalties for prior issues
  if (hasPriorBankruptcy) creditScoreComponent *= 0.7;
  if (hasForeclosure) creditScoreComponent *= 0.6;

  // 2. Debt-to-Income Ratio Component (0-100, 25% weight)
  const dti = monthlyDebt / monthlyIncome;
  let dtiComponent = 0;
  if (dti <= 0.36) dtiComponent = 100; // Excellent (<36%)
  else if (dti <= 0.43) dtiComponent = 80; // Good (<43%)
  else if (dti <= 0.50) dtiComponent = 50; // Acceptable (<50%)
  else dtiComponent = 20; // High risk (>50%)

  // 3. Down Payment Readiness Component (0-100, 20% weight)
  // Assuming target home price of $250,000 (can be adjusted)
  const targetHomePrice = 250000;
  const fhaDownPayment = targetHomePrice * 0.035; // 3.5%
  const conventionalDownPayment = targetHomePrice * 0.05; // 5%
  const idealDownPayment = targetHomePrice * 0.20; // 20%

  let downPaymentComponent = 0;
  if (downPaymentSavings >= idealDownPayment) downPaymentComponent = 100;
  else if (downPaymentSavings >= conventionalDownPayment) downPaymentComponent = 80;
  else if (downPaymentSavings >= fhaDownPayment) downPaymentComponent = 60;
  else if (downPaymentSavings >= fhaDownPayment * 0.5) downPaymentComponent = 40;
  else downPaymentComponent = 20;

  // 4. Savings Rate Component (0-100, 15% weight)
  const savingsRate = monthlySavings / monthlyIncome;
  let savingsRateComponent = 0;
  if (savingsRate >= 0.20) savingsRateComponent = 100; // 20%+ savings rate
  else if (savingsRate >= 0.15) savingsRateComponent = 80; // 15-20%
  else if (savingsRate >= 0.10) savingsRateComponent = 60; // 10-15%
  else if (savingsRate >= 0.05) savingsRateComponent = 40; // 5-10%
  else savingsRateComponent = 20; // <5%

  // 5. Employment Stability Component (0-100, 10% weight)
  let employmentComponent = 0;
  if (employmentYears >= 2) employmentComponent = 100;
  else if (employmentYears >= 1) employmentComponent = 70;
  else if (employmentYears >= 0.5) employmentComponent = 50;
  else employmentComponent = 30;

  // Calculate weighted overall score
  const overallScore = Math.round(
    creditScoreComponent * 0.30 +
    dtiComponent * 0.25 +
    downPaymentComponent * 0.20 +
    savingsRateComponent * 0.15 +
    employmentComponent * 0.10
  );

  // Determine readiness level
  let readinessLevel = '';
  if (overallScore >= 80) readinessLevel = 'Ready';
  else if (overallScore >= 65) readinessLevel = 'Almost Ready';
  else if (overallScore >= 50) readinessLevel = 'Getting There';
  else if (overallScore >= 35) readinessLevel = 'Needs Work';
  else readinessLevel = 'Early Stage';

  // Generate recommendations
  const recommendations: string[] = [];
  if (creditScoreComponent < 70) {
    recommendations.push('Focus on improving your credit score. Pay bills on time and reduce credit utilization.');
  }
  if (dtiComponent < 70) {
    recommendations.push('Reduce your debt-to-income ratio by paying down debt or increasing income.');
  }
  if (downPaymentComponent < 70) {
    const needed = Math.max(0, fhaDownPayment - downPaymentSavings);
    recommendations.push(`Save $${needed.toLocaleString()} more for down payment, or explore down payment assistance programs.`);
  }
  if (savingsRateComponent < 60) {
    recommendations.push('Increase your monthly savings rate to build emergency fund and down payment faster.');
  }
  if (employmentComponent < 70) {
    recommendations.push('Continue building employment history - lenders prefer 2+ years in same field.');
  }
  if (recommendations.length === 0) {
    recommendations.push('You\'re in great shape! Consider getting pre-approved and starting your home search.');
  }

  // Determine eligible loan types
  const loanTypes: string[] = [];
  if (creditScore >= 620) {
    if (creditScore >= 640 && dti <= 0.43) {
      loanTypes.push('Conventional Loan (Best rates with 5%+ down)');
    }
    loanTypes.push('FHA Loan (3.5% down, more flexible)');
  }
  if (creditScore >= 580) {
    loanTypes.push('FHA Loan with higher rates');
  }
  // Add USDA/VA if applicable
  loanTypes.push('Down Payment Assistance Programs (Check local programs)');
  loanTypes.push('State/Local First-Time Buyer Grants');

  return {
    overallScore,
    readinessLevel,
    breakdown: {
      creditScore: Math.round(creditScoreComponent),
      debtToIncome: Math.round(dtiComponent),
      downPayment: Math.round(downPaymentComponent),
      savingsRate: Math.round(savingsRateComponent),
      employment: Math.round(employmentComponent),
    },
    recommendations,
    loanTypes,
  };
}

export async function POST(request: NextRequest) {
  try {
    const input: ReadinessInput = await request.json();

    // Validate input
    if (!input.creditScore || !input.monthlyIncome) {
      return NextResponse.json(
        { error: 'Credit score and monthly income are required.' },
        { status: 400 }
      );
    }

    // Calculate readiness using algorithm
    const result = calculateReadinessScore(input);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error calculating readiness:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

