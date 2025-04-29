import { supabase } from "@/lib/client";

/** 試験データを一括で取得する */
export async function fetchExamList() {
  const { data, error } = await supabase.from("examdata").select("id, exam_year, subject, grade, problem_statement").order("exam_year", { ascending: false });

  if (error) {
    console.error("Error fetching exam list:", error);
    return { success: false, error };
  }
  //console.log("Fetched exam list:", data);
  return { success: true, data };
}