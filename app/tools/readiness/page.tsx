'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import Link from 'next/link';

export default function ReadinessCalculator() {
  const [inputs, setInputs] = useState({
    creditScore: '',
    monthlyIncome: '',
    monthlyDebt: '',
    downPaymentSavings: '',
    monthlySavings: '',
    employmentYears: '',
    hasPriorBankruptcy: false,
    hasForeclosure: false,
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateReadiness = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/calculate-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creditScore: parseInt(inputs.creditScore),
          monthlyIncome: parseFloat(inputs.monthlyIncome),
          monthlyDebt: parseFloat(inputs.monthlyDebt),
          downPaymentSavings: parseFloat(inputs.downPaymentSavings),
          monthlySavings: parseFloat(inputs.monthlySavings),
          employmentYears: parseFloat(inputs.employmentYears),
          hasPriorBankruptcy: inputs.hasPriorBankruptcy,
          hasForeclosure: inputs.hasForeclosure,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate');
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 65) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getLevelColor = (level: string) => {
    if (level === 'Ready') return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    if (level === 'Almost Ready') return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    if (level === 'Getting There') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
    return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
            <Calculator className="h-10 w-10 text-purple-600" />
            Homeownership Readiness Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Use our AI-powered algorithm to assess your readiness for homeownership. We analyze credit score, debt-to-income ratio, down payment savings, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Your Financial Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Credit Score *
                </label>
                <input
                  type="number"
                  value={inputs.creditScore}
                  onChange={(e) => handleInputChange('creditScore', e.target.value)}
                  placeholder="e.g., 680"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  min="300"
                  max="850"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Income (Gross) *
                </label>
                <input
                  type="number"
                  value={inputs.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder="e.g., 5000"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Debt Payments
                </label>
                <input
                  type="number"
                  value={inputs.monthlyDebt}
                  onChange={(e) => handleInputChange('monthlyDebt', e.target.value)}
                  placeholder="e.g., 800"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Down Payment Savings
                </label>
                <input
                  type="number"
                  value={inputs.downPaymentSavings}
                  onChange={(e) => handleInputChange('downPaymentSavings', e.target.value)}
                  placeholder="e.g., 15000"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Savings Amount
                </label>
                <input
                  type="number"
                  value={inputs.monthlySavings}
                  onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
                  placeholder="e.g., 500"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years at Current Job
                </label>
                <input
                  type="number"
                  value={inputs.employmentYears}
                  onChange={(e) => handleInputChange('employmentYears', e.target.value)}
                  placeholder="e.g., 2"
                  step="0.5"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={inputs.hasPriorBankruptcy}
                    onChange={(e) => handleInputChange('hasPriorBankruptcy', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  Prior Bankruptcy (within last 7 years)
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={inputs.hasForeclosure}
                    onChange={(e) => handleInputChange('hasForeclosure', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  Prior Foreclosure (within last 7 years)
                </label>
              </div>

              <button
                onClick={calculateReadiness}
                disabled={loading || !inputs.creditScore || !inputs.monthlyIncome}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5" />
                    Calculate Readiness
                  </>
                )}
              </button>

              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Your Results</h2>

            {!result ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Enter your financial information and click "Calculate Readiness" to see your results.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg">
                  <div className="text-5xl font-bold mb-2">
                    <span className={getScoreColor(result.overallScore)}>
                      {result.overallScore}
                    </span>
                    <span className="text-2xl text-gray-600 dark:text-gray-400">/100</span>
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getLevelColor(result.readinessLevel)}`}>
                    {result.readinessLevel}
                  </div>
                </div>

                {/* Breakdown */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Score Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(result.breakdown).map(([key, value]: [string, any]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-semibold">{value}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligible Loan Types */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Eligible Loan Types</h3>
                  <ul className="space-y-2">
                    {result.loanTypes.map((loan: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>{loan}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/courses"
                  className="block w-full text-center py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                >
                  Explore Homeownership Courses →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

