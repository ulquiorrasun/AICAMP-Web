"use client";
import { Tool } from "@/types/tool";
import ToolCard from "./ToolCard";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  tools: Tool[];
}

export default function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          href={tool.link}
          className={cn(
            "group block p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer",
            tool.badge === "our-pick" && "border-2 border-[#FF7A1A] shadow-md"
          )}
        >
          {tool.badge === "our-pick" && (
            <span className="inline-block mb-2 text-xs font-semibold text-[#FF7A1A] bg-[#FFF5ED] rounded-full px-3 py-1 border border-[#FF7A1A]">Our Pick</span>
          )}
          <div className="text-lg font-bold text-[#FF7A1A] mb-1 group-hover:underline">{tool.name}</div>
          <div className="text-gray-500 text-sm mb-3 min-h-[40px]">{tool.tagline}</div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-medium text-gray-400 tracking-wide">{tool.category}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
