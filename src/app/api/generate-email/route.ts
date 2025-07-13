import { respData, respErr } from "@/lib/resp";
import { z } from "zod";
import { deepseek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import { EmailFormValues, EmailResult } from "@/types/email";

const schema = z.object({
  emailType: z.string().min(1),
  recipient: z.string().min(1),
  subject: z.string().min(1),
  context: z.string().min(1),
  tone: z.string().default("professional"),
  length: z.string().default("standard"),
  additionalRequirements: z.string().optional(),
});

const MODEL_NAME = "deepseek-chat";

// 邮件类型到中文的映射
const EMAIL_TYPE_MAP = {
  business: "商务邮件",
  academic: "学术邮件", 
  job: "求职邮件",
  customer_service: "客服邮件",
  networking: "社交邮件"
};

// 语气风格映射
const TONE_MAP = {
  formal: "正式",
  professional: "专业",
  friendly: "友好",
  casual: "轻松"
};

// 长度映射
const LENGTH_MAP = {
  brief: "简短（100-200字）",
  standard: "标准（200-400字）", 
  detailed: "详细（400-600字）"
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      emailType,
      recipient,
      subject,
      context,
      tone,
      length,
      additionalRequirements
    } = schema.parse(body);

    if (!process.env.DEEPSEEK_API_KEY) {
      return respErr("Missing DEEPSEEK_API_KEY env variable");
    }

    // 构建提示词
    const prompt = `你是一个专业的邮件写作助手。请根据以下信息生成一封${EMAIL_TYPE_MAP[emailType as keyof typeof EMAIL_TYPE_MAP] || "专业"}邮件。

邮件要求：
- 收件人：${recipient}
- 主题：${subject}
- 背景和内容：${context}
- 语气风格：${TONE_MAP[tone as keyof typeof TONE_MAP] || "专业"}
- 邮件长度：${LENGTH_MAP[length as keyof typeof LENGTH_MAP] || "标准"}
${additionalRequirements ? `- 额外要求：${additionalRequirements}` : ""}

请生成以下格式的邮件：

主题：[生成的邮件主题]

正文：
[生成的邮件正文，包含适当的称呼、正文内容、结尾和签名]

要求：
1. 邮件主题要简洁明了，符合邮件类型特点
2. 正文要结构清晰，包含适当的称呼和结尾
3. 语言要符合${TONE_MAP[tone as keyof typeof TONE_MAP] || "专业"}的语气要求
4. 内容要具体、实用，避免空洞的套话
5. 根据邮件类型调整格式和用语
6. 确保邮件长度符合要求

请直接返回邮件内容，不要包含其他说明文字。`;

    const { text: rawText } = await generateText({
      model: deepseek(MODEL_NAME),
      prompt,
    });

    console.log("[generate-email] model raw output:", rawText);

    // 解析生成的邮件内容
    const parsedResult = parseEmailContent(rawText);
    
    if (!parsedResult) {
      return respErr("Failed to parse email content");
    }

    return respData(parsedResult);
  } catch (err: any) {
    console.error("generate-email error:", err);
    return respErr(err.message || "Unexpected error");
  }
}

function parseEmailContent(rawText: string): EmailResult | null {
  try {
    // 清理文本，移除可能的markdown格式
    let cleanedText = rawText.replace(/```[\s\S]*?\n|```$/g, "").trim();
    
    // 尝试提取主题和正文
    const subjectMatch = cleanedText.match(/主题[：:]\s*(.+?)(?:\n|$)/);
    const subject = subjectMatch ? subjectMatch[1].trim() : "";
    
    // 移除主题行，获取正文
    let content = cleanedText.replace(/主题[：:]\s*.+?(?:\n|$)/, "").trim();
    
    // 如果内容以"正文："开头，移除这个标签
    content = content.replace(/^正文[：:]\s*/, "");
    
    // 如果内容为空，使用整个文本作为正文
    if (!content.trim()) {
      content = cleanedText;
    }
    
    // 生成一些建议
    const suggestions = generateSuggestions(content, subject);
    
    return {
      subject: subject || "邮件主题",
      content: content,
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };
  } catch (error) {
    console.error("Failed to parse email content:", error);
    return null;
  }
}

function generateSuggestions(content: string, subject: string): string[] {
  const suggestions: string[] = [];
  
  // 检查邮件长度
  if (content.length < 100) {
    suggestions.push("建议增加更多具体细节和背景信息");
  } else if (content.length > 800) {
    suggestions.push("建议精简内容，突出重点信息");
  }
  
  // 检查是否包含称呼
  if (!content.includes("您好") && !content.includes("Dear") && !content.includes("尊敬的")) {
    suggestions.push("建议添加适当的称呼语");
  }
  
  // 检查是否包含结尾
  if (!content.includes("谢谢") && !content.includes("Thank you") && !content.includes("此致敬礼")) {
    suggestions.push("建议添加礼貌的结尾语");
  }
  
  // 检查主题长度
  if (subject.length > 50) {
    suggestions.push("邮件主题过长，建议精简");
  }
  
  return suggestions;
} 