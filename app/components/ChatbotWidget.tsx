'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI homeownership advisor. I'm here to help you achieve homeownership and build generational wealth! 🏡\n\nI can help with:\n🏡 First-time homebuyer preparation\n💵 Down payment strategies & assistance programs\n💳 Credit building for mortgage approval\n📋 Housing policies & your rights\n🏠 Mortgage types & loan options\n\nWhat would you like to know about becoming a homeowner?",
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
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('policy') || lowerInput.includes('law') || lowerInput.includes('legislation')) {
      return `Great question about policies! Let me break this down:

**Understanding the Policy:**
Policies can be complex, but I'm here to simplify them. When looking at financial policies that affect Black communities, we need to consider:

1. **Access to Capital**: Many policies affect how Black-owned businesses and individuals can access loans and funding.
2. **Home Ownership**: Redlining and lending practices have historically impacted wealth building through property.
3. **Retirement Planning**: Understanding Social Security, 401(k)s, and other retirement benefits is crucial.

Would you like me to explain a specific policy in more detail? Or check out our courses on "Understanding Financial Policies" for a comprehensive guide.`;
    }

    if (lowerInput.includes('investment') || lowerInput.includes('invest') || lowerInput.includes('stock')) {
      return `Investing is a powerful tool for building wealth! Here's my recommendation:

**Getting Started with Investing:**
1. **Start Small**: You don't need thousands to begin.
2. **Diversify**: Consider index funds, stocks, REITs, and retirement accounts.
3. **Long-term Focus**: Building wealth takes time.

I recommend taking our "Investment Basics" course to learn more.`;
    }

    if (lowerInput.includes('budget') || lowerInput.includes('saving') || lowerInput.includes('money management')) {
      return `Budgeting is the foundation of financial success! Here's my recommendation:

**Budgeting Strategies:**
1. **50/30/20 Rule**: 50% needs, 30% wants, 20% savings
2. **Automate Savings**: Pay yourself first!
3. **Emergency Fund**: Aim for 3-6 months of expenses

Check out our "Budgeting & Savings" course for step-by-step guidance.`;
    }

    if (lowerInput.includes('credit') || lowerInput.includes('credit score') || lowerInput.includes('loan')) {
      return `Understanding credit is crucial! Here's what you need to know:

**Building Good Credit:**
1. **Payment History** (35%): Always pay on time
2. **Credit Utilization** (30%): Keep balances below 30%
3. **Length of History** (15%): Keep old accounts open

I recommend our "Credit Mastery" course for a deep dive.`;
    }

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return `Hello! I'm here to help you on your financial journey. I can:

- Break down complex financial policies
- Provide personalized recommendations
- Explain financial concepts
- Guide you to relevant courses

What would you like to learn about today?`;
    }

    return `Thank you for your question! I understand you're asking about "${input}".

This is an important topic for building financial literacy. I'd suggest:

1. **Take Relevant Courses**: Check out our courses section
2. **Connect with Advisors**: Our financial advisors can provide personalized guidance
3. **Community Support**: Connect with other learners

Would you like me to explain more or recommend specific courses?`;
  };

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full text-white shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
          style={{ background: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}
          aria-label="Open chat"
        >
          <Bot className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col transition-all ${
            isMinimized ? 'h-16 w-80' : 'h-[600px] w-96'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 text-white rounded-t-xl" style={{ background: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">AI Homeownership Advisor</p>
                <p className="text-xs opacity-90">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm text-white`}
                      {...(message.role === 'user' 
                        ? { style: { backgroundColor: '#A0CEFD' } }
                        : { style: { background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' } }
                      )}
                    >
                      {message.role === 'user' ? (
                        <UserIcon className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                        message.role === 'user'
                          ? 'text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
                      }`}
                      {...(message.role === 'user' && { style: { backgroundColor: '#A0CEFD' } })}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' }}>
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl px-3 py-2">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex gap-2 mb-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about homeownership, down payments, mortgages..."
                    className="flex-1 resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white"
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#A0CEFD'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                    rows={2}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="px-4 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    style={{ background: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI-powered
                  </p>
                  <Link
                    href="/chatbot"
                    className="text-xs hover:underline"
                    style={{ color: '#A0CEFD' }}
                  >
                    Open full chat →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

