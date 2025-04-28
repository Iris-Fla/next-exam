import { BackToListButton } from "@/features/exam/components/backtolist";
import { Examdetail } from "@/features/exam/components/examdetail";

interface ExamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExamDetailPage({ params }: ExamDetailPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto p-4">
      <BackToListButton />
      <Examdetail id={Number(id)} />
    </div>
  );
}