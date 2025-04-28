import { supabase } from "@/lib/client";
import { ExamData } from "@/features/exam/types/examData";

/** 試験データを新規作成する */
export const createExam = async (examData: Omit<ExamData, "id">) => {
    const { data, error } = await supabase.from("examdata").insert([examData]);
    if (error) {
        console.error("Error creating exam:", error);
        return { success: false, error };
    }
    return { success: true, data };
};
