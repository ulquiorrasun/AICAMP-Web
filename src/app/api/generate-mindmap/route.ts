import { respData, respErr } from "@/lib/resp";
import { z } from "zod";
import { deepseek } from "@ai-sdk/deepseek";
import { generateText } from "ai";

const schema = z.object({
  topic: z.string().min(1),
  depth: z.number().min(2).max(5).default(3),
});

const MODEL_NAME = "deepseek-chat";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, depth } = schema.parse(body);

    if (!process.env.DEEPSEEK_API_KEY) {
      return respErr("Missing DEEPSEEK_API_KEY");
    }

    const prompt = `You are a helpful assistant that creates hierarchical mind maps.\nGenerate a mind map for the topic: ${topic}.\nThe mind map should be ${depth} levels deep at most.\nReturn the result as Markdown bullet list, where each level is indented by two spaces. Do NOT wrap in markdown fences.`;

    const { text } = await generateText({ model: deepseek(MODEL_NAME), prompt });

    // Strip possible code fences
    const mindmap = text.replace(/^```[\s\S]*?\n|```$/g, "").trim();

    return respData({ mindmap });
  } catch (err: any) {
    console.error("generate-mindmap error", err);
    return respErr(err.message || "Unexpected error");
  }
}
