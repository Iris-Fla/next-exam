import { EditExamForm } from "@/features/exam/components/editexamform";

interface ExamEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExamEditPage({ params }: ExamEditPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">試験の編集</h1>
      <EditExamForm id={id}/>
    </div>
  );
}