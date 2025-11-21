'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI homeownership advisor. I'm here to help you achieve your dream of homeownership and build generational wealth through property ownership.\n\nI can help you with:\n🏡 First-time homebuyer preparation\n💵 Down payment strategies and assistance programs\n💳 Credit building for mortgage approval\n📋 Understanding housing policies and your rights\n🏠 Mortgage types and loan options\n📊 Homeownership readiness assessment\n\nWhat would you like to know about becoming a homeowner?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Call OpenAI API via our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      // Fallback to mock response if API fails
      const fallbackResponse = generateAIResponse(currentInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('policy') || lowerInput.includes('law') || lowerInput.includes('legislation') || lowerInput.includes('zoning') || lowerInput.includes('fair housing')) {
      return `Great question about housing policies! Let me break this down:

**Understanding Housing Policies & Your Rights:**

Housing policies can be complex, but I'm here to simplify them. Key policies that impact Black homebuyers:

1. **Fair Housing Act (1968)**: Protects you from discrimination based on race, color, religion, sex, national origin, familial status, or disability.

2. **Homeownership Assistance Programs**:
   - FHA Loans: Lower down payment requirements (3.5%)
   - USDA Loans: 100% financing for rural areas
   - State/Local Grants: Down payment assistance programs
   - HUD Programs: First-time buyer resources

3. **Zoning Laws**: Affect where you can buy and what you can build. Understanding zoning helps you make informed decisions.

4. **Redlining History**: Although illegal, its legacy still impacts neighborhoods today through appraisal bias and lending practices.

**For Black Communities Specifically:**
- Know your rights - you cannot be discriminated against in lending, appraisals, or sales
- Research assistance programs designed to help overcome historical barriers
- Document everything if you experience discrimination

Would you like me to explain a specific housing policy in more detail? Check out our "Understanding Housing Policies & Zoning" course for a comprehensive guide.`;
    }

    if (lowerInput.includes('investment') || lowerInput.includes('invest') || lowerInput.includes('stock')) {
      return `Investing is a powerful tool for building wealth! Here's my recommendation:

**Getting Started with Investing for Black Communities:**

1. **Start Small**: You don't need thousands to begin. Many platforms allow investments starting at $1.
2. **Diversify**: Don't put all eggs in one basket. Consider:
   - Index funds (low risk, steady growth)
   - Stocks of companies you believe in
   - Real estate investment trusts (REITs)
   - Retirement accounts (401k, IRA)

3. **Long-term Focus**: Building wealth takes time. Focus on consistent, long-term strategies rather than quick gains.

4. **Community Resources**: Look for Black-owned investment platforms and financial advisors who understand your unique challenges.

I recommend taking our "Investment Basics" course to learn more. Would you like specific investment strategies?`;
    }

    if (lowerInput.includes('budget') || lowerInput.includes('saving') || lowerInput.includes('money management') || lowerInput.includes('down payment') || lowerInput.includes('save for house')) {
      return `Budgeting for homeownership is the foundation of achieving your homeownership goal! Here's my recommendation:

**Budgeting Strategies for Saving for a Home:**

1. **Home Buying Budget (50/30/20 Modified)**:
   - 50% for needs (rent, food, utilities)
   - 20% for wants (entertainment, dining out)
   - 30% for savings (down payment, closing costs, emergency fund)

2. **Down Payment Goals**:
   - **FHA Loan**: 3.5% down ($7,000 on $200,000 home)
   - **Conventional**: 5-20% down ($10,000-$40,000)
   - **USDA/VA**: 0% down for eligible buyers
   - Also save 2-5% for closing costs

3. **Automate Down Payment Savings**: Set up automatic transfers to a high-yield savings account specifically for your down payment!

4. **Track Everything**: Use apps or spreadsheets to see where every dollar goes. Cut unnecessary expenses to boost savings.

5. **Down Payment Assistance Programs**: 
   - FHA loans (3.5% down)
   - State/local grants (often $5,000-$25,000)
   - Employer assistance programs
   - Down payment assistance loans

6. **Emergency Fund**: Build 3-6 months of expenses separately from your down payment fund.

**Quick Tip**: If you save $500/month, you'll have $6,000 in a year - enough for an FHA down payment on a $170,000 home!

Check out our "Down Payment Strategies & Assistance Programs" and "Budgeting & Savings for Homeownership" courses. What's your current savings goal?`;
    }

    if (lowerInput.includes('credit') || lowerInput.includes('credit score') || lowerInput.includes('loan') || lowerInput.includes('mortgage')) {
      return `Understanding credit for homeownership is crucial! Here's what you need to know:

**Credit Score for Mortgage Approval:**

Lenders typically look for:
- **620+ for FHA loans** (3.5% down payment)
- **640-660+ for conventional loans** (better rates)
- **740+ for best rates** (conventional mortgages)

**Building Credit for Homeownership:**

1. **Payment History** (35% of score): Always pay on time - set up autopay if needed.
2. **Credit Utilization** (30%): Keep balances below 30% of your credit limit.
3. **Length of Credit History** (15%): Keep old accounts open when possible.
4. **Credit Mix** (10%): Having different types of credit helps.
5. **New Credit** (10%): Avoid opening many accounts at once, especially 6-12 months before applying.

**For Black Homebuyers Specifically:**
- Be aware of predatory lending - compare multiple lenders
- Know your rights under the Equal Credit Opportunity Act
- Consider credit-building secured cards if starting out
- Monitor your credit reports regularly (free at annualcreditreport.com)
- Work on credit 12-24 months before buying

**Mortgage Types Available:**
- FHA Loans: Lower credit requirements, 3.5% down
- Conventional Loans: Need better credit but lower fees
- USDA Loans: 0% down for rural areas
- VA Loans: 0% down for veterans

I recommend our "Credit Mastery for Homeownership" and "Mortgage Types & Loan Options" courses. What specific credit situation are you working on?`;
    }

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return `Hello! I'm here to help you achieve homeownership and build generational wealth! 🏡

**Did you know?** Only ~45% of Black Americans own homes compared to ~70% of White Americans. This gap contributes to the racial wealth divide. Let's close it together!

I can help you with:
🏡 **First-time homebuyer preparation** - Get ready for your first home purchase
💵 **Down payment strategies** - Save money and find assistance programs
💳 **Credit building for mortgages** - Improve your credit score
📋 **Housing policies & your rights** - Understand fair housing laws
🏠 **Mortgage types & loans** - Choose the right loan for you
📊 **Homeownership readiness** - Assess if you're ready to buy

What would you like to learn about? Ask me about:
- First-time buyer programs
- Down payment assistance
- Credit requirements
- Mortgage options
- Housing policies
- Or any homeownership question!`;
    }

    // Check if it's a homeownership-related question
    if (lowerInput.includes('house') || lowerInput.includes('home') || lowerInput.includes('buy') || lowerInput.includes('mortgage') || lowerInput.includes('down payment') || lowerInput.includes('first time')) {
      return `Great question about homeownership! Let me help you on your path to becoming a homeowner.

**Your Homeownership Journey:**

1. **Start with Preparation**:
   - Check your credit score (aim for 620+ for FHA, 740+ for best rates)
   - Save for down payment (3.5% for FHA, or explore 0% down programs)
   - Get pre-approved to understand your budget

2. **Take Our Courses**:
   - "First-Time Homebuyer Guide" - Complete preparation course
   - "Credit Mastery for Homeownership" - Build your credit
   - "Down Payment Strategies & Assistance Programs" - Find help with down payments

3. **Explore Assistance Programs**:
   - FHA Loans (3.5% down, lower credit requirements)
   - USDA Loans (0% down for rural areas)
   - State/local down payment assistance grants
   - First-time buyer programs

4. **Get Professional Help**:
   - Connect with our financial advisors specializing in homeownership
   - Talk to experienced homeowners in our community

Would you like me to explain more about first-time buyer programs, down payment assistance, or credit requirements for mortgages?`;
    }

    return `Thank you for your question! I understand you're asking about "${input}".

Here's my recommendation:

Since homeownership is a key path to building generational wealth for Black communities, I'd suggest:

1. **Take Relevant Courses**: Check out our homeownership-focused courses:
   - First-Time Homebuyer Guide
   - Down Payment Strategies & Assistance Programs
   - Credit Mastery for Homeownership
   - Understanding Housing Policies & Zoning

2. **Connect with Advisors**: Our financial advisors specialize in helping Black families achieve homeownership

3. **Community Support**: Connect with experienced homeowners who can share their journey

4. **AI Chatbot**: Ask me specific questions about homeownership, down payments, mortgages, or housing policies

Would you like me to:
- Break down this topic in more detail?
- Recommend specific homeownership courses?
- Explain how this relates to your homeownership goals?
- Connect you with a homeownership advisor?

What would be most helpful for your homeownership journey?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}>
            AI Homeownership Advisor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant answers about homeownership, down payment assistance, mortgage options, housing policies, and personalized guidance to achieve your homeownership goals
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-[calc(100vh-250px)] min-h-[600px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white`}
                  {...(message.role === 'user' 
                    ? { style: { backgroundColor: '#A0CEFD' } }
                    : { style: { background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' } }
                  )}
                >
                  {message.role === 'user' ? (
                    <UserIcon className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                  {...(message.role === 'user' && { style: { backgroundColor: '#A0CEFD' } })}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user'
                        ? 'text-white/80'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' }}>
                  <Bot className="h-5 w-5" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about first-time buyer programs, down payment assistance, credit for mortgages, housing policies, mortgage types, or any homeownership question..."
                className="flex-1 resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white"
                onFocus={(e) => { e.currentTarget.style.borderColor = '#A0CEFD'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                rows={2}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ background: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-powered responses tailored for Black communities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

