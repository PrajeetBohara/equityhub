'use client';

import { Code, Cpu, Database, Network, Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TechnicalDocumentation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
            <Code className="h-10 w-10 text-purple-600" />
            Technical Implementation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comprehensive overview of AI tools, algorithms, frameworks, and technical architecture
          </p>
        </div>

        {/* AI Tools & Models */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            1. AI Tools, Models & Frameworks
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Primary AI Model</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800 dark:text-gray-200 mb-2">
                  <strong>OpenAI GPT-4o-mini</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                  <li>Large Language Model (LLM) for natural language processing</li>
                  <li>Optimized for conversational AI and text generation</li>
                  <li>Context-aware responses with 4K token window</li>
                  <li>Temperature: 0.7 for balanced creativity and consistency</li>
                  <li>Max tokens: 1000-1500 for comprehensive responses</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">AI Applications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Chatbot Assistant</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Natural language processing for homeownership guidance, policy breakdowns, and personalized recommendations
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Policy Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    NLP-based analysis of housing policies, extracting key points, impacts, and actionable insights
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Coding Frameworks & Technologies</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Frontend</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Next.js 16 (React Framework)</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS 4</li>
                    <li>• React 19</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Backend</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Next.js API Routes</li>
                    <li>• Server-side rendering</li>
                    <li>• RESTful API design</li>
                    <li>• Environment variables</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Data & State</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• React Context API</li>
                    <li>• LocalStorage persistence</li>
                    <li>• Client-side state management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture & Structure */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
            <Network className="h-6 w-6 text-indigo-600" />
            2. Solution Architecture & Workflow
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">System Architecture</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 font-mono text-xs">
                <pre className="text-gray-800 dark:text-gray-200">
{`┌─────────────────┐
│   Client Side   │
│  (Next.js App)  │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼────────┐
│  Next.js API   │
│     Routes     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│OpenAI │ │Algo   │
│ API   │ │Engine │
└───────┘ └───────┘`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Workflow: Chatbot Interaction</h3>
              <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
                <li className="pl-2">
                  <strong>User Input:</strong> User types question in chatbot interface
                </li>
                <li className="pl-2">
                  <strong>Message Formatting:</strong> Client formats message with role (user/assistant) and content
                </li>
                <li className="pl-2">
                  <strong>API Request:</strong> POST request to <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/api/chat</code> with message history
                </li>
                <li className="pl-2">
                  <strong>System Context:</strong> Server adds system prompt with homeownership focus and Black community context
                </li>
                <li className="pl-2">
                  <strong>OpenAI Processing:</strong> GPT-4o-mini processes messages with context-aware understanding
                </li>
                <li className="pl-2">
                  <strong>Response Generation:</strong> AI generates personalized response based on housing equity focus
                </li>
                <li className="pl-2">
                  <strong>Response Delivery:</strong> JSON response sent back to client, displayed in chat interface
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Workflow: Policy Analysis</h3>
              <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
                <li className="pl-2">
                  <strong>Policy Input:</strong> User provides housing policy text or URL
                </li>
                <li className="pl-2">
                  <strong>NLP Processing:</strong> AI analyzes text using natural language understanding
                </li>
                <li className="pl-2">
                  <strong>Structured Extraction:</strong> Key information extracted: summary, impact, benefits, barriers
                </li>
                <li className="pl-2">
                  <strong>JSON Response:</strong> Structured analysis returned in JSON format for display
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Algorithms */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
            <Cpu className="h-6 w-6 text-blue-600" />
            3. Key Algorithms & Data Processing
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Homeownership Readiness Score Algorithm</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Weighted Scoring Algorithm</strong> - Calculates overall readiness using multiple factors:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Credit Score</span>
                    <span className="font-mono font-semibold">30% weight</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }} />
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Debt-to-Income Ratio</span>
                    <span className="font-mono font-semibold">25% weight</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Down Payment Readiness</span>
                    <span className="font-mono font-semibold">20% weight</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Savings Rate</span>
                    <span className="font-mono font-semibold">15% weight</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Employment Stability</span>
                    <span className="font-mono font-semibold">10% weight</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                    Score = (Credit×0.30) + (DTI×0.25) + (DownPayment×0.20) + (Savings×0.15) + (Employment×0.10)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Mortgage Payment Calculation Algorithm</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Amortization Formula:</strong> Standard mortgage calculation
                </p>
                <div className="font-mono text-xs bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                  <code className="text-gray-800 dark:text-gray-200">
                    M = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                  </code>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-3 space-y-1 list-disc list-inside">
                  <li><strong>M</strong> = Monthly payment</li>
                  <li><strong>P</strong> = Principal loan amount</li>
                  <li><strong>r</strong> = Monthly interest rate (annual ÷ 12)</li>
                  <li><strong>n</strong> = Total payments (years × 12)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Natural Language Processing</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Text Analysis Pipeline:</strong>
                </p>
                <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
                  <li>Tokenization and text preprocessing</li>
                  <li>Semantic understanding via transformer model</li>
                  <li>Context extraction (housing policies, homeownership topics)</li>
                  <li>Structured information extraction (key points, impacts)</li>
                  <li>Personalization based on Black community context</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Data Processing */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
            <Database className="h-6 w-6 text-green-600" />
            4. Data Processing Techniques
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Input Validation & Sanitization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All user inputs validated for type, range, and format before processing. Credit scores checked (300-850), financial amounts normalized.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Score Normalization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Individual component scores normalized to 0-100 scale using threshold-based mapping for consistent comparison.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Response Formatting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI responses formatted with structured JSON for policy analysis, or natural language for conversational responses.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">State Persistence</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                User progress, scores, and badges persisted in LocalStorage for client-side state management.
              </p>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="h-6 w-6 text-orange-600" />
            5. API Endpoints
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-purple-600 pl-4">
              <code className="text-sm font-mono text-gray-900 dark:text-white">POST /api/chat</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                AI chatbot endpoint. Processes conversational messages with OpenAI GPT-4o-mini.
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <code className="text-sm font-mono text-gray-900 dark:text-white">POST /api/calculate-readiness</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Homeownership readiness calculator. Uses weighted scoring algorithm to assess readiness.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <code className="text-sm font-mono text-gray-900 dark:text-white">POST /api/calculate-payment</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Mortgage payment calculator. Uses amortization formula to calculate monthly payments.
              </p>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <code className="text-sm font-mono text-gray-900 dark:text-white">POST /api/analyze-policy</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Policy analysis endpoint. Uses NLP to extract structured insights from housing policy text.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/tools/readiness"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Try Readiness Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}

