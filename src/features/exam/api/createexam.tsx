'use server'

import { createClient } from '@/lib/server'
import { ExamData } from '@/features/exam/types/examData'

/** 試験データを作成する */
export async function createExamAction(examData: Omit<ExamData, "id">) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("examdata").insert([examData])
  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true, data }
}