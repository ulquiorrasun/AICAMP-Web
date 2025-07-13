"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { EmailFormValues, EmailResult, EmailType, EmailTone, EmailLength } from "@/types/email";
import { toast } from "sonner";

const EMAIL_TYPES: EmailType[] = [
  {
    value: "business",
    label: "商务邮件",
    description: "正式商务沟通，如合作、会议、项目等",
    examples: ["商务合作邀请", "会议安排", "项目汇报", "客户沟通"]
  },
  {
    value: "academic",
    label: "学术邮件",
    description: "学术交流，如论文投稿、学术会议、导师沟通等",
    examples: ["论文投稿", "学术会议申请", "导师沟通", "学术合作"]
  },
  {
    value: "job",
    label: "求职邮件",
    description: "求职相关，如简历投递、面试感谢、离职申请等",
    examples: ["简历投递", "面试感谢", "离职申请", "薪资谈判"]
  },
  {
    value: "customer_service",
    label: "客服邮件",
    description: "客户服务相关，如投诉、咨询、反馈等",
    examples: ["产品咨询", "投诉处理", "服务反馈", "技术支持"]
  },
  {
    value: "networking",
    label: "社交邮件",
    description: "社交网络，如建立联系、感谢、祝贺等",
    examples: ["建立联系", "感谢信", "祝贺邮件", "推荐信"]
  }
];

const EMAIL_TONES: EmailTone[] = [
  {
    value: "formal",
    label: "正式",
    description: "使用正式商务语言，适合重要商务场合"
  },
  {
    value: "professional",
    label: "专业",
    description: "保持专业性但不过于正式，适合日常商务沟通"
  },
  {
    value: "friendly",
    label: "友好",
    description: "友好但保持专业，适合建立关系"
  },
  {
    value: "casual",
    label: "轻松",
    description: "轻松自然的语气，适合熟悉的人"
  }
];

const EMAIL_LENGTHS: EmailLength[] = [
  {
    value: "brief",
    label: "简短",
    description: "100-200字，直接明了"
  },
  {
    value: "standard",
    label: "标准",
    description: "200-400字，详细但不冗长"
  },
  {
    value: "detailed",
    label: "详细",
    description: "400-600字，包含完整信息"
  }
];

export default function EmailPage() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EmailResult | null>(null);

  const form = useForm<EmailFormValues>({
    defaultValues: {
      emailType: "",
      recipient: "",
      subject: "",
      context: "",
      tone: "professional",
      length: "standard",
      additionalRequirements: "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormValues> = async (values) => {
    setError(null);
    setResult(null);
    setLoading(true);
    
    try {
      const resp = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      if (!resp.ok) {
        throw new Error("Request failed");
      }
      
      const data = await resp.json();
      if (data?.code !== 0) {
        throw new Error(data?.message || "Invalid response");
      }
      
      setResult(data.data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("已复制到剪贴板");
    } catch (err) {
      toast.error("复制失败");
    }
  };

  const selectedEmailType = EMAIL_TYPES.find(type => type.value === form.watch("emailType"));

  return (
    <div
      className={cn(
        "mx-auto space-y-6",
        isMobile ? "px-4 py-4" : "container max-w-4xl p-6"
      )}
    >
      <div className="text-center space-y-2">
        <h1 className={cn("font-bold", isMobile ? "text-xl" : "text-2xl")}>
          专业邮件写作助手
        </h1>
        <p className="text-muted-foreground">
          根据您的需求生成专业、得体的商务和学术邮件
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              邮件信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailType"
                  rules={{ required: "请选择邮件类型" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮件类型</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="选择邮件类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMAIL_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex flex-col">
                                <span className="font-medium">{type.label}</span>
                                <span className="text-xs text-muted-foreground">
                                  {type.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedEmailType && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium mb-2">示例场景：</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedEmailType.examples.map((example, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="recipient"
                  rules={{ required: "请输入收件人" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>收件人</FormLabel>
                      <FormControl>
                        <Input placeholder="例如：hr@company.com 或 张经理" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  rules={{ required: "请输入邮件主题" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮件主题</FormLabel>
                      <FormControl>
                        <Input placeholder="例如：关于项目合作的讨论" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="context"
                  rules={{ required: "请描述邮件背景和内容" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮件背景和内容</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="请详细描述您想要传达的信息、背景情况、具体需求等..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>语气风格</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EMAIL_TONES.map((tone) => (
                              <SelectItem key={tone.value} value={tone.value}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{tone.label}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {tone.description}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮件长度</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EMAIL_LENGTHS.map((length) => (
                              <SelectItem key={length.value} value={length.value}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{length.label}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {length.description}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>额外要求（可选）</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="例如：需要包含具体的时间安排、希望强调某些要点、需要包含附件说明等..."
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className={cn("w-full", isMobile ? "" : "md:w-auto")}
                >
                  {loading ? (
                    <>
                      <Skeleton className="h-4 w-4 mr-2" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      生成邮件
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Result Section */}
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <Card>
              <CardHeader>
                <CardTitle>生成结果</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
            </Card>
          )}

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>生成的邮件</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`${result.subject}\n\n${result.content}`)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制全部
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">主题：</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{result.subject}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">正文：</h4>
                  <div className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                    {result.content}
                  </div>
                </div>

                {result.suggestions && result.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">建议：</h4>
                    <ul className="text-sm space-y-1">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 