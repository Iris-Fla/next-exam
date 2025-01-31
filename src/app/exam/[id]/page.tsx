import Link from "next/link";
import { Examdetail } from "@/features/exam/components/Examdetail";

export default function ExamDetailPage() {
  return (
    <div>
      <Examdetail />
      <Link href="/exam" className="text-blue-500 hover:underline">
        ← Back to Exam List
      </Link>
    </div>
  );
}
