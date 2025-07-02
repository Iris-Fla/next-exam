'use server'

import { createClient } from '@/lib/server'
import { ExamData } from '@/features/exam/types/examData'

export async function editExamAction(id: string, examData: Omit<ExamData, "id">) {
    const supabase = await createClient()

    // 試験データを更新
    const { data, error } = await supabase
        .from("examdata")
        .update(examData)
        .eq("id", id)

    if (error) {
        console.error("Error updating exam:", error)
        return { success: false, error: error.message }
    }

    return { success: true, data }
}