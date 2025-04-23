import { supabase } from "@/lib/client";

export const fetchExamList = async () => {
  const { data, error } = await supabase.from("examdata").select("*");

  if (error) {
    console.error("Error fetching exam list:", error);
    return [];
  }

  return data;
}
