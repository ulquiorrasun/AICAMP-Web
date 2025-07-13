import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // 苹果风格：更大圆角、主色、阴影、字号
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF7A1A] text-white hover:bg-[#ff9a4d] active:bg-[#e05d00]",
        outline:
          "border border-[#FF7A1A] text-[#FF7A1A] bg-white hover:bg-[#FFF5ED] active:bg-[#FFE3CC]",
        ghost:
          "bg-transparent text-[#FF7A1A] hover:bg-[#FFF5ED] active:bg-[#FFE3CC]",
        secondary:
          "bg-gray-100 text-gray-900",
        link: "text-[#FF7A1A] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 text-base font-semibold",
        sm: "h-8 rounded-xl gap-1.5 px-3 py-1.5 text-sm",
        lg: "h-12 rounded-xl px-7 py-3 text-lg font-bold",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  // fallback destructive为default
  const safeVariant = (variant as any) === "destructive" ? "default" : variant;
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant: safeVariant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
