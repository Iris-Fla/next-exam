'use client'
import { useState,useEffect } from "react"
import { fetchExamList } from "@/features/exam/api/fetchExamList"
import { fetchExamListResponse } from "../types/examData"
import { subjectBackgroundClass } from "@/features/exam/utils/subjectBackgroundClass"
import { renameSubject } from "../utils/renameSubject"

export default function ExamList() {
  const [examdata, setExamdata] = useState<fetchExamListResponse[]>([])
  const [loading, setLoading] = useState(false)

  async function reload() {
    setLoading(true)
    const response = await fetchExamList()
    if (response.success && response.data) {
      setExamdata(response.data)
    }
    setLoading(false)
  }

  // 初回ロード
  useEffect(() => {
    reload()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <button onClick={reload} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? "更新中..." : "最新のデータを取得"}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examdata.map((exam) => (
          <a
            href={`/exam/${exam.id}`}
            key={exam.id}
            className={`drop-shadow-md rounded-lg p-4 transition duration-150 ease-in-out hover:scale-105 border-1 border-zinc-900 ${subjectBackgroundClass(exam.subject)}`}
          >
            <div className="text-xl line-clamp-1 font-medium font-mplus">
              第{exam.exam_year}回 : {renameSubject(exam.subject)}
              <span className="text-sm font-normal m-2">
                ({exam.grade}年)
              </span>
            </div>
            <div className="text-lg line-clamp-1">
              {exam.problem_statement}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}