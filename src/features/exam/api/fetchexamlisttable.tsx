import { supabase } from "@/lib/client";

/** 試験データを一括で取得する(データテーブル用) */
export async function fetchExamListDataTable() {
  const { data, error } = await supabase.from("examdata").select("id,exam_year, subject, grade, problem_statement,choices,correct,explanation,status").order("exam_year", { ascending: false });

  if (error) {
    console.error("Error fetching exam list:", error);
    return { success: false, error };
  }
  //console.log("Fetched exam list:", data);
  return { success: true, data };
}