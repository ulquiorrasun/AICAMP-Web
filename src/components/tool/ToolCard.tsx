"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Tool } from "@/types/tool";

interface Props {
  tool: Tool;
}

export default function ToolCard({ tool }: Props) {
  return (
    <Link href={tool.link} className="block focus:outline-none group">
      <Card className="transition-shadow group-hover:shadow-md h-full flex flex-col justify-between p-4 border bg-background">
        <div className="space-y-2">
          {tool.badge && (
            <Badge variant="secondary" className="text-xs">
              {tool.badge === "our-pick" ? "Our Pick" : "Trending"}
            </Badge>
          )}
          <h3 className="font-semibold text-base md:text-lg line-clamp-2">
            {tool.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {tool.tagline}
          </p>
        </div>
        <span className="mt-3 text-xs text-primary font-medium">
          {tool.category}
        </span>
      </Card>
    </Link>
  );
}
