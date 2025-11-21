import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    // Format messages for OpenAI API
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    // Add system message for context
    const systemMessage = {
      role: 'system',
      content: `You are an AI homeownership advisor assistant focused on helping Black communities achieve homeownership and build generational wealth through property ownership. 

Your primary focus is on:
- Homeownership readiness and preparation
- Down payment strategies and assistance programs
- Credit building for mortgage approval
- Understanding housing policies, zoning laws, and fair housing rights
- First-time homebuyer programs and resources
- Mortgage types, loan options, and refinancing
- Housing equity and closing the racial homeownership gap

You understand that Black Americans face a significant homeownership gap (only ~45% own homes vs ~70% of White Americans) due to systemic barriers including redlining, biased appraisals, and unequal access to credit.

You provide:
- Clear, practical advice tailored for Black communities
- Break down complex housing policies and legislation
- Explain down payment assistance programs (FHA, USDA, state/local grants)
- Guide users through first-time buyer programs
- Help users understand their rights under fair housing laws
- Offer personalized recommendations for homeownership readiness

Be supportive, empathetic, and provide actionable, specific advice. Always emphasize available resources, programs, and assistance specifically designed to help Black homebuyers overcome barriers. When discussing financial topics, always tie them back to homeownership goals when relevant.`,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // You can use 'gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', etc.
        messages: [systemMessage, ...formattedMessages],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from OpenAI', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

