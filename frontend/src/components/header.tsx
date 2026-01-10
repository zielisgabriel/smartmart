"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Receipt, Store } from "lucide-react";
import { Button } from "./ui/button";
import { HeaderNavigation } from "./header-navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Produtos", icon: Package },
  { href: "/sales", label: "Vendas", icon: Receipt },
];

export function Header() {
  const pathname = usePathname();

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <header className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
        <div className="flex items-center gap-6">
          <Button
            className="text-xl font-bold px-2 gap-2"
            asChild
            variant={"ghost"}
          >
            <Link href={"/"}>
              SmartMart
            </Link>
          </Button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive && "bg-muted font-medium"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>

        <HeaderNavigation />
      </header>
    </div>
  );
}