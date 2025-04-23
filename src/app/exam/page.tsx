import { ExamList } from "@/features/exam/components/examlist";

export default function ExamPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center">Exam List Page</h1>
      <ExamList />
    </div>
  );
}