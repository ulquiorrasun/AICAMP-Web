import ToolGrid from "@/components/tool/ToolGrid";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tool } from "@/types/tool";

// mock data; replace with fetch from CMS/API in future
const tools: Tool[] = [
  {
    id: "mcq",
    name: "设计选择题",
    tagline: "创建一个 AP 学科的选择题测验，基于任何主题、标准或描述！",
    category: "智慧课堂",
    badge: "our-pick",
    link: "/mcq",
  },
  {
    id: "plan",
    name: "课程计划生成器",
    tagline: "快速生成结构化的课程计划，包含教学目标、活动和评估方法",
    category: "智慧课堂",
    badge: "trending",
    link: "#",
  },
  {
    id: "email",
    name: "撰写专业邮件",
    tagline: "根据需求生成专业、得体的商务和学术邮件",
    category: "创意工坊",
    link: "#",
  },
  {
    id: "concept",
    name: "概念背景",
    tagline: "为抽象或复杂概念提供简短但全面的背景介绍",
    category: "百科大全",
    link: "#",
  },
  {
    id: "slides",
    name: "教学课件",
    tagline: "根据知识点生成结构清晰、逐步阐述的教学课件",
    category: "智慧课堂",
    link: "#",
  },
  {
    id: "sentence-expand",
    name: "句子扩写",
    tagline: "根据指定字符数扩展原始句子，保持原意并增加修饰细节",
    category: "百科大全",
    link: "#",
  },
  {
    id: "mindmap",
    name: "思维导图生成",
    tagline: "输入主题即可生成结构清晰的思维导图文本",
    category: "创意工坊",
    link: "/mindmap",
  },
  {
    id: "brainstorm",
    name: "主题头脑风暴",
    tagline: "快速生成与给定主题相关的创意点子列表",
    category: "创意工坊",
    link: "#",
  },
  {
    id: "fitness",
    name: "锻炼计划定制",
    tagline: "根据个人目标与时间表生成可执行的锻炼计划",
    category: "心灵成长",
    link: "#",
  },
];

const categories = ["全部", "智慧课堂", "百科大全", "创意工坊", "心灵成长"];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Featured section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">推荐给你</h2>
        <ToolGrid tools={tools.filter((t) => t.badge === "our-pick")} />
      </section>

      <h1 className="text-2xl font-bold">所有工具</h1>
      <Tabs defaultValue="全部" className="space-y-4">
        <TabsList className="w-full overflow-x-auto">
          {categories.map((c) => (
            <TabsTrigger key={c} value={c} className="whitespace-nowrap">
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((c) => (
          <TabsContent key={c} value={c} className="space-y-6">
            <ToolGrid
              tools={
                c === "全部" ? tools : tools.filter((t) => t.category === c)
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
