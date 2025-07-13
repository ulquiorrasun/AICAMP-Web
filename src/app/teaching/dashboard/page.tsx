"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Library, User, Plus, Clock, Star } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function TeachingDashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          欢迎回来，{user?.name || "老师"}！
        </h1>
        <p className="text-muted-foreground">
          今天准备为学生们创建什么精彩内容呢？
        </p>
        {user?.email && (
          <p className="text-sm text-muted-foreground">
            登录邮箱：{user.email}
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              创建教案
            </CardTitle>
            <CardDescription>
              生成个性化的教案内容，包含教学目标、活动安排等
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/teaching/create/lesson-plan">
                <Plus className="w-4 h-4 mr-2" />
                开始创建
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              创建测验
            </CardTitle>
            <CardDescription>
              生成多样化的测验题目，支持多种题型
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/teaching/create/quiz">
                <Plus className="w-4 h-4 mr-2" />
                开始创建
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">最近活动</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">今日创建</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                教案和测验
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">总内容</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                已保存的内容
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">分享次数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                内容分享
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">快速访问</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" asChild className="h-auto p-4 flex-col">
            <Link href="/teaching/library">
              <Library className="w-6 h-6 mb-2" />
              <span>内容库</span>
            </Link>
          </Button>

          <Button variant="outline" asChild className="h-auto p-4 flex-col">
            <Link href="/teaching/profile">
              <User className="w-6 h-6 mb-2" />
              <span>个人中心</span>
            </Link>
          </Button>

          <Button variant="outline" asChild className="h-auto p-4 flex-col">
            <Link href="/teaching/templates">
              <Star className="w-6 h-6 mb-2" />
              <span>模板库</span>
            </Link>
          </Button>

          <Button variant="outline" asChild className="h-auto p-4 flex-col">
            <Link href="/teaching/history">
              <Clock className="w-6 h-6 mb-2" />
              <span>历史记录</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 