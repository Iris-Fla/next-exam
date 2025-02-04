import Link from "next/link";
import { Examdetail } from "@/features/exam/components/Examdetail";
import { Examrecommend } from "@/features/exam/components/ExamRecommend";

export default function ExamDetailPage() {
  return (
    <div className="container mx-auto p-4">
      <Examdetail />
      <hr className="my-4 border-4 border-slate-700 rounded-lg transition-all duration-300" />
      <Examrecommend />
      <Link href="/exam" className="text-blue-500 hover:underline">
        ← Back to Exam List
      </Link>
    </div>
  );
}
