import { supabase } from "@/lib/client";

export const getExamDetail = async (id: number) => {
    const { data, error } = await supabase
        .from("examdata")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        console.error("Error fetching exam detail:", error);
        return null;
    }

    // subject または grade が null の場合は早期リターン
    if (data.subject == null || data.grade == null) {
        return { detailExam: data, recommendedExams: [] };
    }

    // 類似問題を取得
    const { data: similarExams, error: similarError } = await supabase
        .from("examdata")
        .select("id, exam_year, subject, grade, problem_statement")
        .eq("subject", data.subject)
        .eq("grade", data.grade)
        .neq("id", id)
        .limit(5);

    if (similarError) {
        console.error("Error fetching similar exams:", similarError);
    }

    return {
        detailExam: data,
        recommendedExams: similarExams ?? [],
    };
};