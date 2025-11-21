import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { policyText, policyType } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured.' },
        { status: 500 }
      );
    }

    if (!policyText) {
      return NextResponse.json(
        { error: 'Policy text is required.' },
        { status: 400 }
      );
    }

    // Use AI for Natural Language Processing to analyze housing policies
    const systemMessage = {
      role: 'system',
      content: `You are an expert housing policy analyst specializing in analyzing policies for their impact on Black homebuyers and housing equity.

Your task is to analyze the provided housing policy text and extract:
1. **Policy Summary**: Brief overview in simple language
2. **Key Points**: Main provisions or requirements (3-5 bullet points)
3. **Impact on Black Homebuyers**: How this affects Black communities specifically
4. **Benefits**: Potential positive impacts
5. **Barriers**: Potential obstacles or limitations
6. **Action Items**: What homebuyers should know or do
7. **Related Programs**: Any assistance programs or resources mentioned

Format your response as a JSON object with these exact keys: summary, keyPoints, impact, benefits, barriers, actionItems, relatedPrograms.
Keep responses concise and actionable.`,
    };

    const userMessage = {
      role: 'user',
      content: `Analyze this ${policyType || 'housing policy'}:

${policyText}

Provide a comprehensive analysis in JSON format with the specified keys.`,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [systemMessage, userMessage],
        temperature: 0.3, // Lower temperature for more consistent analysis
        max_tokens: 1500,
        response_format: { type: 'json_object' }, // Ensure JSON response
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to analyze policy', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    let analysis;
    
    try {
      analysis = JSON.parse(data.choices[0]?.message?.content || '{}');
    } catch {
      // Fallback if JSON parsing fails
      analysis = {
        summary: data.choices[0]?.message?.content || 'Analysis completed',
        keyPoints: [],
        impact: 'Unable to parse detailed analysis',
        benefits: [],
        barriers: [],
        actionItems: [],
        relatedPrograms: [],
      };
    }

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error('Error in policy analysis:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

