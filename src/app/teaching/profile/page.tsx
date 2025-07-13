"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, Bell, Shield, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeachingProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">个人中心</h1>
        <p className="text-muted-foreground">
          管理您的账户设置和偏好
        </p>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            账户信息
          </CardTitle>
          <CardDescription>
            查看和管理您的个人信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user?.name || "教师账户"}</h3>
              <p className="text-sm text-muted-foreground">
                {user?.email || "欢迎使用K-12 AI教学工具"}
              </p>
              {user?.email && (
                <p className="text-xs text-muted-foreground mt-1">
                  登录邮箱：{user.email}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              偏好设置
            </CardTitle>
            <CardDescription>
              自定义您的使用偏好
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              管理设置
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              通知设置
            </CardTitle>
            <CardDescription>
              管理您的通知偏好
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              通知设置
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              隐私安全
            </CardTitle>
            <CardDescription>
              管理您的隐私和安全设置
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              安全设置
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              帮助支持
            </CardTitle>
            <CardDescription>
              获取帮助和使用指南
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              帮助中心
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>使用统计</CardTitle>
          <CardDescription>
            查看您的使用情况
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">创建的内容</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">分享次数</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">使用天数</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 