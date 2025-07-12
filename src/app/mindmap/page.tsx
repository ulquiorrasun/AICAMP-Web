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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MindmapFormValues {
  topic: string;
  depth: string;
}

const DEPTH_OPTIONS = ["2", "3", "4"];

export default function MindmapPage() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<MindmapFormValues>({
    defaultValues: { topic: "", depth: "3" },
  });

  const onSubmit: SubmitHandler<MindmapFormValues> = async (values) => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const resp = await fetch("/api/generate-mindmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: values.topic, depth: Number(values.depth) }),
      });
      if (!resp.ok) throw new Error("Request failed");
      const data = await resp.json();
      if (data.code !== 0) throw new Error(data.message || "Invalid response");
      setResult(data.data.mindmap);
    } catch (e: any) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto space-y-6",
        isMobile ? "px-4 py-4" : "container max-w-2xl p-6"
      )}
    >
      <h1 className={cn("font-bold", isMobile ? "text-xl" : "text-2xl")}>Mind Map Generator</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            rules={{ required: "Topic is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Photosynthesis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depth Level</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DEPTH_OPTIONS.map((d) => (
                      <SelectItem value={d} key={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className={isMobile ? "w-full" : undefined}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>
      </Form>

      <div>
        {loading && <Skeleton className="h-40 w-full" />}
        {error && <Alert variant="destructive">{error}</Alert>}
        {result && (
          <pre className="whitespace-pre-wrap rounded-md border p-4 bg-muted text-sm overflow-auto">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}
