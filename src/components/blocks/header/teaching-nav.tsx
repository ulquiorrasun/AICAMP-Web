"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, BookOpen, FileText, Home, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TeachingNavigation() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <section className="py-3 border-b">
      <div className="container">
        {/* Desktop Navigation */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/teaching" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-primary">
                K-12 AI教学工具
              </span>
            </Link>
            
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link
                      className={cn(
                        "text-muted-foreground",
                        navigationMenuTriggerStyle,
                        buttonVariants({
                          variant: "ghost",
                        })
                      )}
                      href="/teaching/dashboard"
                    >
                      <Home className="size-4 shrink-0 mr-2" />
                      仪表板
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <FileText className="size-4 shrink-0 mr-2" />
                      创建内容
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-80 p-3">
                        <NavigationMenuLink>
                          <li>
                            <Link
                              className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="/teaching/create/lesson-plan"
                            >
                              <BookOpen className="size-5 shrink-0" />
                              <div>
                                <div className="text-sm font-semibold">
                                  创建教案
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  生成个性化教案
                                </p>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="/teaching/create/quiz"
                            >
                              <FileText className="size-5 shrink-0" />
                              <div>
                                <div className="text-sm font-semibold">
                                  创建测验
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  生成测验题目
                                </p>
                              </div>
                            </Link>
                          </li>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          <div className="shrink-0 flex gap-2 items-center">
            <Button variant="outline" asChild>
              <Link href="/teaching/library">
                内容库
              </Link>
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.image || ""} alt={user.name || ""} />
                    <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-4 bg-background">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="size-4" />
                    <span>{user.name || user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/teaching/profile" className="flex items-center gap-2">
                      <User className="size-4" />
                      个人中心
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="size-4" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" asChild>
                <Link href="/auth/signin">
                  <User className="size-4 mr-2" />
                  登录
                </Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/teaching" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-primary">
                K-12 AI教学工具
              </span>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/teaching" className="flex items-center gap-2">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <span className="text-xl font-bold text-primary">
                        K-12 AI教学工具
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  <Link
                    href="/teaching/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Home className="size-5" />
                    <span>仪表板</span>
                  </Link>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-muted-foreground">
                      创建内容
                    </div>
                    <Link
                      href="/teaching/create/lesson-plan"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <BookOpen className="size-5" />
                      <span>创建教案</span>
                    </Link>
                    <Link
                      href="/teaching/create/quiz"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <FileText className="size-5" />
                      <span>创建测验</span>
                    </Link>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Link
                      href="/teaching/library"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <span>内容库</span>
                    </Link>
                    {user ? (
                      <>
                        <Link
                          href="/teaching/profile"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <User className="size-5" />
                          <span>个人中心</span>
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-red-600 w-full text-left"
                        >
                          <LogOut className="size-5" />
                          <span>退出登录</span>
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/auth/signin"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <User className="size-5" />
                        <span>登录</span>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
} 