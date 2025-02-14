import Link from "next/link";
import { Examdetail } from "@/components/exam/Examdetail";
import { Examrecommend } from "@/components/exam/ExamRecommend";

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
