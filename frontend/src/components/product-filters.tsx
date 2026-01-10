"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/types/category";

type SortField = "name" | "brand" | "price" | "";
type SortOrder = "asc" | "desc";

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados locais para os filtros (antes de aplicar)
  const [sortField, setSortField] = useState<SortField>(
    (searchParams.get("sortBy") as SortField) || ""
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (searchParams.get("sortOrder") as SortOrder) || "asc"
  );
  const [selectedCategories, setSelectedCategories] = useState<number[]>(() => {
    const cats = searchParams.get("categories");
    return cats ? cats.split(",").map(Number) : [];
  });

  // Estados aplicados (para mostrar badges)
  const [appliedFilters, setAppliedFilters] = useState<{
    sortField: SortField;
    sortOrder: SortOrder;
    categories: number[];
  }>({
    sortField: (searchParams.get("sortBy") as SortField) || "",
    sortOrder: (searchParams.get("sortOrder") as SortOrder) || "asc",
    categories: searchParams.get("categories")
      ? searchParams.get("categories")!.split(",").map(Number)
      : [],
  });

  const hasActiveFilters =
    appliedFilters.sortField !== "" || appliedFilters.categories.length > 0;

  const activeFilterCount =
    (appliedFilters.sortField ? 1 : 0) +
    (appliedFilters.categories.length > 0 ? 1 : 0);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Resetar para página 0 ao aplicar filtros
    params.delete("page");

    // Aplicar ordenação
    if (sortField) {
      params.set("sortBy", sortField);
      params.set("sortOrder", sortOrder);
    } else {
      params.delete("sortBy");
      params.delete("sortOrder");
    }

    // Aplicar categorias
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    // Atualizar estados aplicados
    setAppliedFilters({
      sortField,
      sortOrder,
      categories: selectedCategories,
    });

    router.push(`?${params.toString()}`);
  }, [sortField, sortOrder, selectedCategories, searchParams, router]);

  const clearFilters = useCallback(() => {
    setSortField("");
    setSortOrder("asc");
    setSelectedCategories([]);
    setAppliedFilters({
      sortField: "",
      sortOrder: "asc",
      categories: [],
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");
    params.delete("sortOrder");
    params.delete("categories");
    params.delete("page");

    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  const removeFilter = useCallback(
    (filterType: "sort" | "categories") => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      if (filterType === "sort") {
        setSortField("");
        setSortOrder("asc");
        params.delete("sortBy");
        params.delete("sortOrder");
        setAppliedFilters((prev) => ({
          ...prev,
          sortField: "",
          sortOrder: "asc",
        }));
      } else if (filterType === "categories") {
        setSelectedCategories([]);
        params.delete("categories");
        setAppliedFilters((prev) => ({ ...prev, categories: [] }));
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const getSortLabel = (field: SortField): string => {
    const labels: Record<SortField, string> = {
      name: "Nome",
      brand: "Marca",
      price: "Preço",
      "": "",
    };
    return labels[field];
  };

  const getSortIcon = () => {
    if (!appliedFilters.sortField) return <ArrowUpDown className="h-4 w-4" />;
    return appliedFilters.sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Botão de Ordenação */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            {getSortIcon()}
            Ordenar
            {appliedFilters.sortField && (
              <Badge variant="secondary" className="ml-1">
                {getSortLabel(appliedFilters.sortField)}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Ordenar por</Label>
              <Select
                value={sortField}
                onValueChange={(value) => setSortField(value as SortField)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="brand">Marca</SelectItem>
                  <SelectItem value="price">Preço</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {sortField && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Direção</Label>
                <div className="flex gap-2">
                  <Button
                    variant={sortOrder === "asc" ? "default" : "outline"}
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => setSortOrder("asc")}
                  >
                    <ArrowUp className="h-3 w-3" />
                    Crescente
                  </Button>
                  <Button
                    variant={sortOrder === "desc" ? "default" : "outline"}
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => setSortOrder("desc")}
                  >
                    <ArrowDown className="h-3 w-3" />
                    Decrescente
                  </Button>
                </div>
              </div>
            )}

            <Separator />

            <Button onClick={applyFilters} className="w-full">
              Aplicar Ordenação
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Botão de Filtro por Categorias */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Categorias
            {appliedFilters.categories.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {appliedFilters.categories.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Filtrar por categorias
              </Label>
              <p className="text-xs text-muted-foreground">
                Selecione uma ou mais categorias
              </p>
            </div>

            <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-2 rounded-md p-2 hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="flex-1 cursor-pointer text-sm font-normal"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setSelectedCategories([])}
              >
                Limpar
              </Button>
              <Button size="sm" className="flex-1" onClick={applyFilters}>
                Aplicar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Badges de filtros ativos */}
      {hasActiveFilters && (
        <>
          <Separator orientation="vertical" className="h-6" />

          <div className="flex flex-wrap items-center gap-2">
            {appliedFilters.sortField && (
              <Badge
                variant="secondary"
                className="gap-1 pl-2 pr-1 py-1 cursor-pointer hover:bg-secondary/80"
              >
                Ordenado por {getSortLabel(appliedFilters.sortField)} (
                {appliedFilters.sortOrder === "asc" ? "A-Z" : "Z-A"})
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeFilter("sort")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {appliedFilters.categories.length > 0 && (
              <Badge
                variant="secondary"
                className="gap-1 pl-2 pr-1 py-1 cursor-pointer hover:bg-secondary/80"
              >
                {appliedFilters.categories.length} categoria
                {appliedFilters.categories.length > 1 ? "s" : ""}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeFilter("categories")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground hover:text-foreground"
              onClick={clearFilters}
            >
              <RotateCcw className="h-3 w-3" />
              Limpar tudo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
