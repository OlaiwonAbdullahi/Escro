"use client"

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DataTableProps {
    rows:any
    columns:any
    pageSize?:number
    apiRef:any
}



export default function DataTable({ rows, columns, pageSize = 10, apiRef }: DataTableProps) {
  return (
    <div className="overflow-y-auto w-full min-h-[fit-content]">
      <DataGrid
      apiRef={apiRef}
      className="table"
      density="comfortable"
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize } },
        }}
        disableRowSelectionOnClick
        sx={{
          minHeight: "700px",
          border: "none",
          fontSize: "14px",
          paddingX: "10px",
          fontWeight: "500",
          minWidth:"1225px",
          fontFamily: "var(--data-table-mont)"
        }}
      />
    </div>
  );
}
