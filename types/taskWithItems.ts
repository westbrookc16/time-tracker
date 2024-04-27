import { Tables } from "@/utils/supabase/supabase";
export type TaskWithItems = Tables<"tasks"> & {
  task_items: Tables<"task_items">[];
};
