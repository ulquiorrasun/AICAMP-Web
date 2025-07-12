"use client";
import { Tool } from "@/types/tool";
import ToolCard from "./ToolCard";
import { cn } from "@/lib/utils";

interface Props {
  tools: Tool[];
}

export default function ToolGrid({ tools }: Props) {
  return (
    <div
      className={cn(
        "grid gap-4",
        "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      )}>
      {tools.map((t) => (
        <ToolCard key={t.id} tool={t} />
      ))}
    </div>
  );
}
