"use client";
import Link from "next/link"
import ExamList from "@/features/exam/components/examlist"
import { Button } from "@/components/ui/button"

export default function ExamPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-center text-xl font-bold">Exam List Page</h1>
        <Button asChild>
          <Link href="/exam/list">一覧テーブル,編集</Link>
        </Button>
        <Button asChild>
          <Link href="/exam/create">問題作成</Link>
        </Button>
      </div>
      <ExamList />
    </div>
  )
}