import TeachingLayout from "@/components/layouts/teaching-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Library, User } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";

export default function TeachingHomePage() {
  // Redirect to dashboard for better UX
  redirect("/teaching/dashboard");
  
  return (
    <TeachingLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            K-12 AI教学工具
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            为K-12教师提供智能化的教案和测验生成工具，让教学准备更高效
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                创建教案
              </CardTitle>
              <CardDescription>
                生成个性化的教案内容
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/create/lesson-plan">
                  开始创建
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                创建测验
              </CardTitle>
              <CardDescription>
                生成多样化的测验题目
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/create/quiz">
                  开始创建
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Library className="w-5 h-5" />
                内容库
              </CardTitle>
              <CardDescription>
                管理您的教学资源
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/library">
                  查看内容
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                个人中心
              </CardTitle>
              <CardDescription>
                管理您的账户设置
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile">
                  个人设置
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">主要功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">智能生成</h3>
              <p className="text-sm text-muted-foreground">
                基于AI技术，根据学科、年级和主题自动生成教案和测验
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">内容编辑</h3>
              <p className="text-sm text-muted-foreground">
                支持对生成的内容进行个性化编辑和调整
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">资源管理</h3>
              <p className="text-sm text-muted-foreground">
                保存、组织和分享您的教学资源
              </p>
            </div>
          </div>
        </div>
      </div>
    </TeachingLayout>
  );
} 