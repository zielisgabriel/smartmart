"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchProduct() {
  return (
    <form className="w-full flex gap-1">
      <Input
        placeholder="Buscar pelo nome"
      />
      <Button>
        Buscar
        <SearchIcon />
      </Button>
    </form>
  );
}