import { useState } from "react";

export function useSorting(initialField = "", initialOrder = "") {
  const [sorting, setSorting] = useState([
    { id: initialField, desc: initialOrder === "asc" },
  ]);

  return {
    // 🔽 Table sorting state
    sorting,
    onSortingChange: setSorting,
    // 🔽 API sorting parameters
    order: !sorting.length ? initialOrder : sorting[0].desc ? "desc" : "asc",
    field: sorting.length ? sorting[0].id : initialField,
  };
}
