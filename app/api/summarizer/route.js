import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateWithRetry(prompt, retries = 5) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
      });

      return response;
    } catch (error) {
      const isTemporaryError =
        error?.status === 503 ||
        error?.code === 503 ||
        error?.message?.includes("503") ||
        error?.message?.includes("high demand");

      if (!isTemporaryError || attempt === retries) {
        throw error;
      }

      const delay = Math.min(
        2000 * Math.pow(2, attempt),
        30000
      );

      console.log(
        `Gemini temporarily unavailable. Retrying in ${
          delay / 1000
        } seconds...`
      );

      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
  }
}

export async function POST(request) {
  try {
    const { text, mode, length = 50 } = await request.json();

    if (!text || !text.trim()) {
      return Response.json(
        {
          error: "Please enter some text.",
        },
        {
          status: 400,
        }
      );
    }

    // Make sure length stays between 10 and 90
    const safeLength = Math.min(
      90,
      Math.max(10, Number(length) || 50)
    );

    let instruction = "";

    // -------------------------
    // SUMMARIZER
    // -------------------------

    if (mode === "summarize") {
      instruction = `
Summarize the following text.

Keep the important information.
Do not add new information.
Do not change the facts.
Return only the summary.
`;
    }

    // -------------------------
    // HUMANIZER
    // -------------------------

    if (mode === "humanize") {
      instruction = `
Rewrite the following text so it sounds natural and human-written.

Keep the original meaning and important information.
Use natural sentence structure.
Avoid robotic, repetitive, or overly formal wording.
Do not add new information.
Do not invent facts.
Return only the rewritten text.
`;
    }

    // -------------------------
    // PARAPHRASER
    // -------------------------

    if (mode === "paraphrase") {
      instruction = `
Paraphrase the following text.

Keep the original meaning and important information.
Use different words and sentence structures.
Make the result clear, natural, and easy to read.
Do not add new information.
Do not change the facts.
Return only the paraphrased text.
`;
    }

    // -------------------------
    // BULLET POINTS
    // -------------------------

    if (mode === "bullets") {
      instruction = `
Convert the following text into clear and concise bullet points.

Keep the important information.
Remove unnecessary details.
Do not add new information.
Start each point with "-".
Return only the bullet points.
`;
    }

    if (!instruction) {
      return Response.json(
        {
          error: "Invalid mode.",
        },
        {
          status: 400,
        }
      );
    }

    // -------------------------
    // LENGTH CONTROL
    // -------------------------

    let lengthInstruction = "";

    if (safeLength <= 33) {
      lengthInstruction = `
OUTPUT LENGTH: SHORT

Keep the output concise.

For summarization:
- Include only the most important ideas.
- Remove secondary details.
- Aim for a compact summary.

For humanizing:
- Keep the main information.
- You may make the wording more concise.
- Do not remove important meaning.

For paraphrasing:
- Keep the main information.
- Use concise wording.
- Do not remove important meaning.
`;
    } else if (safeLength <= 66) {
      lengthInstruction = `
OUTPUT LENGTH: MEDIUM

Keep the output balanced.

For summarization:
- Include the main ideas.
- Include important supporting details.
- Avoid unnecessary information.

For humanizing:
- Preserve approximately the original level of detail.
- Improve naturalness without unnecessarily expanding the text.

For paraphrasing:
- Preserve the important information.
- Use natural alternative wording and sentence structures.
- Keep approximately the original level of detail.
`;
    } else {
      lengthInstruction = `
OUTPUT LENGTH: LONG

Provide a detailed result.

For summarization:
- Include the main ideas.
- Include important supporting details and context.
- Do not include irrelevant information.

For humanizing:
- Preserve most of the original information and detail.
- Improve naturalness throughout the text.
- Do not unnecessarily shorten the text.

For paraphrasing:
- Preserve the important information and detail.
- Rewrite sentences thoroughly using varied wording and structures.
- Do not unnecessarily shorten the text.
`;
    }

    const prompt = `
${instruction}

${lengthInstruction}

TEXT:

${text}
`;

    const response = await generateWithRetry(prompt);

    return Response.json({
      result: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    const is503 =
      error?.status === 503 ||
      error?.code === 503 ||
      error?.message?.includes("503") ||
      error?.message?.includes("high demand");

    return Response.json(
      {
        error: is503
          ? "Gemini is temporarily busy. Please wait a few seconds and try again."
          : error.message || "Gemini API error",
      },
      {
        status: is503 ? 503 : 500,
      }
    );
  }
}