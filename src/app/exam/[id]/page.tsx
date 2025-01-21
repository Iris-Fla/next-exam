import Link from 'next/link';
import { useRouter } from 'next/router'; // コンポーネントに移す
import { Examproblem } from '@/features/exam/components/Examproblem';

export default function ExamDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const examId = parseInt(id as string, 10);

  return (
    <div className="container mx-auto p-4">
      <Examproblem examId={examId}/>
        <Link href="/exam" className="text-blue-500 hover:underline">
          ← Back to Exam List
        </Link>
    </div>
  );
}