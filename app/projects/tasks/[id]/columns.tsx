"use client";
import { DateTime } from "luxon";
import { Tables } from "@/utils/supabase/supabase";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tables<"task_items">>[] = [
  {
    header: "Start Date",
    accessorKey: "start_date",
    cell: ({ row }) => {
      const value = row.getValue("start_date") as string;
      return (
        value && DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
      );
    },
  },
  {
    header: "End Date",
    accessorKey: "end_date",
    cell: ({ row }) => {
      const value = row.getValue("end_date") as string;
      return (
        value && DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];
