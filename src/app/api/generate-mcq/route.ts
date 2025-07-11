import { respData, respErr } from "@/lib/resp";
import { z } from "zod";
import { deepseek } from "@ai-sdk/deepseek";
import { generateText } from "ai";

const schema = z.object({
  gradeLevel: z.string().min(1),
  subjectTopic: z.string().min(1),
});

const MODEL_NAME = "deepseek-chat"; // default model id, adjust if needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gradeLevel, subjectTopic } = schema.parse(body);

    if (!process.env.DEEPSEEK_API_KEY) {
      return respErr("Missing DEEPSEEK_API_KEY env variable");
    }

    const prompt = `You are an educational content generator.\nGenerate ONE multiple-choice question for the following:\nGrade level: ${gradeLevel}\nSubject/Topic: ${subjectTopic}\nRequirements:\n- Provide 4 answer choices.\n- Mark the correct answer with "*".\n- Include a brief explanation (1-3 sentences).\nReturn ONLY JSON in this format: {\n  \"question\": string,\n  \"choices\": string[4],\n  \"correctIndex\": number,\n  \"explanation\": string\n}`;

    const { text: rawText } = await generateText({
      model: deepseek(MODEL_NAME),
      prompt,
    });

    // Attempt to parse JSON first; if that fails, try plain-text parsing
    console.log("[generate-mcq] model raw:\n", rawText);
    const stripped = stripMarkdownCode(rawText);
    let parsed: any;
    try {
      parsed = JSON.parse(stripped);
    } catch {
      parsed = parsePlainText(rawText);
    }

    if (!parsed) {
      return respErr("Failed to parse model output");
    }

    // helper to strip ``` and language tag
    function stripMarkdownCode(raw: string) {
      const fence = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      return fence ? fence[1] : raw;
    }

    // helper converts plain text to structured object
    function parsePlainText(raw: string) {
      const lines = raw.split(/\n|\r/).map((l) => l.trim());
      const qLine = lines.find((l) => l.toLowerCase().startsWith("question"));
      if (!qLine) return null;
      const question = qLine.replace(/^[Qq]uestion[:：]?\s*/, "").trim();

      const letters = ["A", "B", "C", "D"] as const;
      const choices: string[] = [];
      for (const letter of letters) {
        const m = raw.match(new RegExp(`${letter}[\\.)]\\s*(.+)`, "i"));
        if (!m) return null;
        choices.push(m[1].trim());
      }

      const ansMatch = raw.match(/Answer[:：]?\s*([A-D])/i);
      if (!ansMatch) return null;
      const correctIndex = letters.indexOf(ansMatch[1].toUpperCase() as any);
      if (correctIndex === -1) return null;

      const expMatch = raw.match(/Explanation[:：]?\s*(.*)/i);
      const explanation = expMatch ? expMatch[1].trim() : "";

      return { question, choices, correctIndex, explanation };
    }

    // Basic validation of parsed
    if (
      !parsed.question ||
      !Array.isArray(parsed.choices) ||
      parsed.choices.length !== 4 ||
      typeof parsed.correctIndex !== "number" ||
      parsed.correctIndex < 0 ||
      parsed.correctIndex > 3 ||
      !parsed.explanation
    ) {
      return respErr("Model output invalid");
    }

    // sanitize choices and correctIndex if star included
    if (Array.isArray(parsed.choices)) {
      let correctFromStar = -1;
      parsed.choices = parsed.choices.map((c: string, idx: number) => {
        const cleaned = c.replace(/\*/g, "").trim();
        if (c.includes("*")) correctFromStar = idx;
        return cleaned;
      });
      if (parsed.correctIndex === undefined && correctFromStar !== -1) {
        parsed.correctIndex = correctFromStar;
      }
    }

    return respData(parsed);
  } catch (err: any) {
    console.error("generate-mcq error", err);
    return respErr(err?.message || "Unexpected error");
  }
}
