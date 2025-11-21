# Technical Implementation Summary

## Overview
This document outlines the technical implementation of Fizzy - an AI-powered homeownership readiness platform designed to address the racial homeownership gap.

---

## 1. AI Tools, Models & Coding Frameworks

### AI Tools & Models

**Primary AI Model:**
- **OpenAI GPT-4o-mini**
  - Large Language Model (LLM) for natural language processing
  - Optimized for conversational AI and text generation
  - Context-aware responses with 4K token window
  - Temperature: 0.7 for balanced creativity and consistency
  - Max tokens: 1000-1500 for comprehensive responses

**AI Applications:**
1. **Chatbot Assistant** (`/api/chat`)
   - Natural language processing for homeownership guidance
   - Policy breakdowns and explanations
   - Personalized recommendations

2. **Policy Analysis** (`/api/analyze-policy`)
   - NLP-based analysis of housing policies
   - Structured extraction of key points, impacts, benefits, barriers
   - JSON-formatted responses for structured data

### Coding Frameworks & Technologies

**Frontend:**
- Next.js 16 (React Framework)
- TypeScript for type safety
- Tailwind CSS 4 for styling
- React 19 for UI components
- Lucide React for icons

**Backend:**
- Next.js API Routes (serverless functions)
- Server-side rendering (SSR)
- RESTful API design
- Environment variables for secure API key storage

**Data & State Management:**
- React Context API for global state
- LocalStorage for client-side persistence
- Client-side state management with React hooks

---

## 2. Solution Architecture & Workflow

### System Architecture

```
┌─────────────────┐
│   Client Side   │
│  (Next.js App)  │
│  - Chatbot UI   │
│  - Calculators  │
│  - Courses      │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼────────┐
│  Next.js API   │
│     Routes     │
│  - /api/chat   │
│  - /api/...    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│OpenAI │ │Algo   │
│ API   │ │Engine │
└───────┘ └───────┘
```

### Workflow: Chatbot Interaction

1. **User Input**: User types question in chatbot interface
2. **Message Formatting**: Client formats message with role (user/assistant) and content
3. **API Request**: POST request to `/api/chat` with message history
4. **System Context**: Server adds system prompt with homeownership focus and Black community context
5. **OpenAI Processing**: GPT-4o-mini processes messages with context-aware understanding
6. **Response Generation**: AI generates personalized response based on housing equity focus
7. **Response Delivery**: JSON response sent back to client, displayed in chat interface

### Workflow: Readiness Assessment

1. **User Input**: User enters financial information (credit score, income, debt, savings)
2. **Data Validation**: Server validates input data (ranges, types)
3. **Algorithm Processing**: Weighted scoring algorithm calculates readiness score
4. **Score Calculation**: Individual components scored and weighted
5. **Recommendations**: Algorithm generates personalized recommendations
6. **Response**: JSON response with score, breakdown, and action items

### Workflow: Policy Analysis

1. **Policy Input**: User provides housing policy text
2. **NLP Processing**: AI analyzes text using natural language understanding
3. **Structured Extraction**: Key information extracted (summary, impact, benefits, barriers)
4. **JSON Response**: Structured analysis returned in JSON format

---

## 3. Key Algorithms & Data Processing

### Algorithm 1: Homeownership Readiness Score

**Weighted Scoring Algorithm** - Calculates overall readiness using multiple factors:

```
Score = (Credit×0.30) + (DTI×0.25) + (DownPayment×0.20) + (Savings×0.15) + (Employment×0.10)
```

**Component Weights:**
- Credit Score: 30% weight
- Debt-to-Income Ratio: 25% weight
- Down Payment Readiness: 20% weight
- Savings Rate: 15% weight
- Employment Stability: 10% weight

**Implementation Details:**
- Credit Score Component (0-100):
  - 740+ = 100 points
  - 700-739 = 90 points
  - 680-699 = 80 points
  - 640-679 = 65 points
  - 620-639 = 50 points
  - 580-619 = 30 points
  - <580 = 10 points
  - Penalties: Bankruptcy (-30%), Foreclosure (-40%)

- Debt-to-Income Ratio Component (0-100):
  - ≤36% = 100 points (Excellent)
  - 37-43% = 80 points (Good)
  - 44-50% = 50 points (Acceptable)
  - >50% = 20 points (High risk)

- Down Payment Readiness Component (0-100):
  - ≥20% of home price = 100 points
  - ≥5% (conventional) = 80 points
  - ≥3.5% (FHA) = 60 points
  - ≥50% of FHA minimum = 40 points
  - <50% of FHA minimum = 20 points

- Savings Rate Component (0-100):
  - ≥20% = 100 points
  - 15-19% = 80 points
  - 10-14% = 60 points
  - 5-9% = 40 points
  - <5% = 20 points

- Employment Stability Component (0-100):
  - ≥2 years = 100 points
  - 1-2 years = 70 points
  - 6-12 months = 50 points
  - <6 months = 30 points

**Readiness Levels:**
- 80-100: Ready
- 65-79: Almost Ready
- 50-64: Getting There
- 35-49: Needs Work
- 0-34: Early Stage

### Algorithm 2: Mortgage Payment Calculation

**Amortization Formula** - Standard mortgage calculation:

```
M = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
```

Where:
- **M** = Monthly payment
- **P** = Principal loan amount (home price - down payment)
- **r** = Monthly interest rate (annual rate ÷ 12)
- **n** = Total number of payments (loan term in years × 12)

**Additional Components:**
- Property Tax: ~1.2% of home price annually (monthly)
- Home Insurance: ~0.35% of home price annually (monthly)
- PMI (Private Mortgage Insurance): 0.5-1% of loan amount annually if down payment < 20%
- HOA Fees: Variable (user-provided)

**Total Monthly Payment = Principal/Interest + Property Tax + Insurance + PMI + HOA**

### Algorithm 3: Natural Language Processing

**Text Analysis Pipeline:**

1. **Tokenization**: Text split into tokens for processing
2. **Semantic Understanding**: Transformer model processes text for meaning
3. **Context Extraction**: Identifies housing policies, homeownership topics
4. **Structured Extraction**: Extracts key points, impacts, benefits, barriers
5. **Personalization**: Tailors response based on Black community context

**Policy Analysis Structure:**
- Summary: Brief overview
- Key Points: Main provisions (3-5 points)
- Impact: Effects on Black homebuyers
- Benefits: Positive aspects
- Barriers: Potential obstacles
- Action Items: What homebuyers should know/do
- Related Programs: Assistance programs mentioned

### Data Processing Techniques

**Input Validation & Sanitization:**
- All user inputs validated for type, range, and format
- Credit scores checked (300-850 range)
- Financial amounts normalized and validated
- Error handling for invalid inputs

**Score Normalization:**
- Individual component scores normalized to 0-100 scale
- Threshold-based mapping for consistent comparison
- Weighted aggregation for overall score

**Response Formatting:**
- AI responses formatted as structured JSON for policy analysis
- Natural language for conversational responses
- Consistent formatting across all endpoints

**State Persistence:**
- User progress, scores, and badges stored in LocalStorage
- Client-side state management with React Context
- Persistent across sessions

---

## 4. API Endpoints

### `/api/chat` (POST)
**Purpose**: AI chatbot assistant for homeownership guidance

**Input:**
```json
{
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Output:**
```json
{
  "message": "AI-generated response..."
}
```

**Processing:**
1. Formats messages for OpenAI API
2. Adds system prompt with homeownership focus
3. Calls OpenAI GPT-4o-mini
4. Returns generated response

---

### `/api/calculate-readiness` (POST)
**Purpose**: Calculate homeownership readiness score

**Input:**
```json
{
  "creditScore": 680,
  "monthlyIncome": 5000,
  "monthlyDebt": 800,
  "downPaymentSavings": 15000,
  "monthlySavings": 500,
  "employmentYears": 2,
  "hasPriorBankruptcy": false,
  "hasForeclosure": false
}
```

**Output:**
```json
{
  "overallScore": 75,
  "readinessLevel": "Almost Ready",
  "breakdown": {
    "creditScore": 80,
    "debtToIncome": 84,
    "downPayment": 60,
    "savingsRate": 60,
    "employment": 100
  },
  "recommendations": [...],
  "loanTypes": [...]
}
```

**Processing:**
1. Validates input data
2. Calculates individual component scores
3. Applies weighted scoring algorithm
4. Generates recommendations based on scores
5. Determines eligible loan types

---

### `/api/calculate-payment` (POST)
**Purpose**: Calculate monthly mortgage payment

**Input:**
```json
{
  "homePrice": 250000,
  "downPayment": 8750,
  "interestRate": 6.5,
  "loanTerm": 30,
  "propertyTax": 250,
  "homeInsurance": 73,
  "pmi": 0,
  "hoa": 0
}
```

**Output:**
```json
{
  "monthlyPrincipalInterest": 1534.05,
  "monthlyPropertyTax": 250,
  "monthlyHomeInsurance": 73,
  "monthlyPMI": 100.52,
  "monthlyHOA": 0,
  "totalMonthlyPayment": 1957.57,
  "totalLoanAmount": 241250,
  "totalInterestPaid": 311007.80,
  "breakdown": {...}
}
```

**Processing:**
1. Calculates loan principal (home price - down payment)
2. Applies amortization formula
3. Adds property tax, insurance, PMI, HOA
4. Calculates total interest over loan term

---

### `/api/analyze-policy` (POST)
**Purpose**: Analyze housing policy text using NLP

**Input:**
```json
{
  "policyText": "Policy text here...",
  "policyType": "Housing Ordinance"
}
```

**Output:**
```json
{
  "analysis": {
    "summary": "...",
    "keyPoints": [...],
    "impact": "...",
    "benefits": [...],
    "barriers": [...],
    "actionItems": [...],
    "relatedPrograms": [...]
  }
}
```

**Processing:**
1. Processes policy text through OpenAI
2. Uses structured prompt for extraction
3. Returns JSON-formatted analysis
4. Includes impact on Black homebuyers

---

## 5. Technical Features

### Real-time Calculations
- Instant readiness score calculation
- Live mortgage payment calculations
- Immediate feedback on user inputs

### Data Persistence
- LocalStorage for user progress
- Persistent scores and badges
- Course completion tracking

### Error Handling
- Input validation on all endpoints
- Graceful error messages
- Fallback responses for API failures

### Security
- API keys stored in environment variables
- Server-side API calls (never expose keys)
- Input sanitization and validation

---

## 6. File Structure

```
equityhub/
├── app/
│   ├── api/
│   │   ├── chat/route.ts              # AI Chatbot endpoint
│   │   ├── calculate-readiness/route.ts  # Readiness calculator
│   │   ├── calculate-payment/route.ts    # Mortgage calculator
│   │   └── analyze-policy/route.ts       # Policy analysis
│   ├── tools/
│   │   ├── readiness/page.tsx         # Readiness calculator UI
│   │   └── technical/page.tsx         # Technical documentation
│   ├── chatbot/page.tsx               # Chatbot interface
│   ├── courses/page.tsx               # Courses page
│   └── ...
├── .env.local                         # Environment variables (API keys)
└── package.json                       # Dependencies
```

---

## 7. Future Enhancements

### Potential Improvements:
1. **Machine Learning Models**: Train custom models for better predictions
2. **Data Integration**: Connect to real-time housing data APIs
3. **Predictive Analytics**: Predict gentrification/displacement risk
4. **Geospatial Analysis**: Map-based visualizations
5. **Database Integration**: Store user progress server-side
6. **Advanced NLP**: Sentiment analysis of policies

---

## 8. Presentation Alignment

✅ **Technical Implementation Requirements Met:**

1. ✅ **AI Tools/Frameworks Described**: OpenAI GPT-4o-mini, NLP techniques
2. ✅ **Coding Frameworks Listed**: Next.js, TypeScript, React, Tailwind CSS
3. ✅ **Structure & Logic Outlined**: Architecture diagrams, workflows documented
4. ✅ **Key Algorithms Highlighted**: Weighted scoring, amortization formula, NLP pipeline
5. ✅ **Data Processing Techniques**: Validation, normalization, formatting explained

**Ready for Hackathon Presentation!**

