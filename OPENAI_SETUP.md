# OpenAI API Key Setup

## Where to Paste Your OpenAI API Key

Follow these steps to connect your chatbot to OpenAI:

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the API key (you'll only see it once!)

### Step 2: Create .env.local File

1. In the root directory of this project (`equityhub/`), create a new file named `.env.local`
2. Add the following line to the file:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Replace `sk-your-actual-api-key-here` with your actual OpenAI API key.

**Example:**
```
OPENAI_API_KEY=sk-1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 3: Restart the Server

After creating the `.env.local` file:
1. Stop your development server (Ctrl+C)
2. Restart it with `npm run dev`

### Step 4: Test It

1. Open the homepage or chatbot page
2. Send a message in the chatbot
3. You should receive AI-generated responses!

## File Location Summary

- **API Route:** `app/api/chat/route.ts` (handles OpenAI API calls)
- **Environment File:** `.env.local` (stores your API key - **DO NOT** commit this to git)
- **Chatbot Pages:** 
  - `app/chatbot/page.tsx` (full chatbot page)
  - `app/components/ChatbotWidget.tsx` (homepage widget)

## Troubleshooting

**If the chatbot doesn't work:**
1. Make sure `.env.local` is in the `equityhub/` root directory (same level as `package.json`)
2. Make sure the file starts with `.env.local` (with the dot at the beginning)
3. Make sure there are no spaces around the `=` sign
4. Restart your development server after creating the file
5. Check the browser console for any error messages

**Note:** If the API key is not set, the chatbot will fall back to mock responses, but they won't be as intelligent as OpenAI's responses.

