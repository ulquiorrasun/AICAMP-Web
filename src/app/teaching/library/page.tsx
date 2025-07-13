import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

export default function TeachingLibraryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">内容库</h1>
          <p className="text-muted-foreground">
            管理您的教案和测验资源
          </p>
        </div>
        <Button asChild>
          <Link href="/teaching/dashboard">
            <Plus className="w-4 h-4 mr-2" />
            创建新内容
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="搜索教案或测验..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          筛选
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Empty State */}
        <Card className="col-span-full text-center py-12">
          <CardContent>
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">暂无内容</h3>
            <p className="text-muted-foreground mb-4">
              您还没有创建任何教案或测验
            </p>
            <Button asChild>
              <Link href="/teaching/create/lesson-plan">
                <Plus className="w-4 h-4 mr-2" />
                创建第一个教案
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 