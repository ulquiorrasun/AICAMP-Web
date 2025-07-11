"use client"

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";

interface MCQFormValues {
  grade: string;
  topic: string;
}

const GRADES = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export default function MCQPage() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const form = useForm<MCQFormValues>({
    defaultValues: {
      grade: "",
      topic: "",
    },
  });

  const onSubmit: SubmitHandler<MCQFormValues> = async (values) => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const resp = await fetch("/api/generate-mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gradeLevel: values.grade,
          subjectTopic: values.topic,
        }),
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

  return (
    <div
      className={cn(
        "mx-auto space-y-6",
        isMobile ? "px-4 py-4" : "container max-w-2xl p-6"
      )}
    >
      <h1 className={cn("font-bold", isMobile ? "text-xl" : "text-2xl")}>Generate an MCQ</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="grade"
            rules={{ required: "Grade is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GRADES.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
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
            name="topic"
            rules={{ required: "Topic is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject / Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Photosynthesis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className={isMobile ? "w-full" : undefined}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>
      </Form>

      {/* Result */}
      <div>
        {loading && <Skeleton className="h-32 md:h-24 w-full" />}
        {error && <Alert variant="destructive">{error}</Alert>}
        {result && (
          <div className="space-y-2 rounded-md border p-4">
            <p className="font-medium">{result.question}</p>
            <ol className="list-decimal ml-5 space-y-1">
              {result.choices?.map((c: string, idx: number) => (
                <li key={idx} className="pl-1">
                  {c}
                </li>
              ))}
            </ol>
            <p className="font-semibold">Answer: {result.choices?.[result.correctIndex]}</p>
            <p className="text-muted-foreground">Explanation: {result.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
