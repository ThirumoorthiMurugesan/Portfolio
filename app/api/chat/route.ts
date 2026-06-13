import { NextResponse } from "next/server";
import { resumeData } from "@/app/data/resume";

// In-memory cache for stringified resume context to satisfy caching requirement
let cachedResumeContext = "";

function getResumeContext(): string {
  if (!cachedResumeContext) {
    cachedResumeContext = JSON.stringify(resumeData, null, 2);
  }
  return cachedResumeContext;
}

async function callGeminiAPI(apiKey: string, model: string, chatHistory: any[], userMessage: string) {
  const resumeContext = getResumeContext();
  
  const systemInstruction = `You are the AI Assistant for Thirumoorthi Murugesan. 
Your role is to answer questions about Thiru's professional experience, skills, education, tools, achievements, and background using his official resume data.

Thiru's official resume data is cached and provided below in JSON format:
${resumeContext}

CRITICAL RULES:
1. Always be polite, professional, and helpful.
2. Answer queries based strictly on Thiru's experience and details. If asked about something not present in his resume, politely state that Thiru doesn't have that documented or invite them to ask something else.
3. IF THE USER ASKS ABOUT SALARY, EXPECTED SALARY, CTC, COMPENSATION, OR PACKAGE, YOU MUST ANSWER EXACTLY WITH: "Not Mentioned". DO NOT output any numeric figures or ranges.
4. Keep your responses concise and well-structured, suitable for a chat bubble. Use bullet points where appropriate.`;

  // Format history for Gemini API contents structure
  const contents = [];
  
  // Clean history (only send user and bot messages, mapping bot to model)
  for (const msg of chatHistory) {
    const role = msg.sender === "user" ? "user" : "model";
    // Strip bold markers from historical messages to prevent syntax formatting issues in raw API
    const cleanText = msg.text.replace(/\*\*/g, "");
    contents.push({
      role: role,
      parts: [{ text: cleanText }]
    });
  }

  // Add the current user query
  contents.push({
    role: "user",
    parts: [{ text: userMessage }]
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 800
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (HTTP ${response.status}): ${errorText}`);
  }

  const result = await response.json();
  const botText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!botText) {
    throw new Error("Empty response from Gemini API");
  }

  return botText;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    // Try configured API keys sequentially
    const apiKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_SECRET
    ].filter(Boolean) as string[];
    console.log("Using Gemini API keys:", apiKeys.length);
    console.log(process.env.GEMINI_API_KEY ? "GEMINI_API_KEY is configured" : "GEMINI_API_KEY is not configured");
    console.log(process.env.GEMINI_API_KEY_SECRET ? "GEMINI_API_KEY_SECRET is configured" : "GEMINI_API_KEY_SECRET is not configured");

    if (apiKeys.length === 0) {
      return NextResponse.json(
        { success: false, error: "No GEMINI_API_KEY or GEMINI_API_KEY_SECRET configured in environment variables." },
        { status: 500 }
      );
    }

    // Models to try (gemini-2.5-flash or gemini-2.5-pro)
    const models = ["gemini-2.5-flash-lite", "gemini-2.5-pro"];

    let lastError: any = null;
    let botReply = "";
    let success = false;

    // Retry loop using keys and models
    for (const key of apiKeys) {
      for (const model of models) {
        try {
          botReply = await callGeminiAPI(key, model, history || [], message);
          success = true;
          break; // Model success, break model loop
        } catch (err: any) {
          console.warn(`Failed call using ${model} with key:`, err.message);
          lastError = err;
        }
      }
      if (success) {
        break; // Key success, break key loop
      }
    }

    if (!success) {
      console.error("All Gemini API attempts failed:", lastError);
      return NextResponse.json(
        { success: false, error: `Failed to connect to AI assistant: ${lastError?.message || "Unknown error"}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, text: botReply });
  } catch (error: any) {
    console.error("Error in AI Chat route:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
