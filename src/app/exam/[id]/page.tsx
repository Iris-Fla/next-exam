import Link from "next/link";
import { Examdetail } from "@/features/exam/components/Examdetail";

export default function ExamDetailPage() {
  return (
    <div className="container mx-auto p-4">
      <Examdetail />
      <Link href="/exam" className="text-blue-500 hover:underline">
        ← Back to Exam List
      </Link>
    </div>
  );
}
