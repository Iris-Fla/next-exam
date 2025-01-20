import Prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface Params {
  id: string;
}

const ExamDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  try {
    // Convert id to the correct type (assuming numeric ID)
    const examId = Number(id);
    if (isNaN(examId)) {
      redirect('/error');
    }

    // Fetch the specific exam data
    const examData = await Prisma.examdata.findUnique({
      where: { id: examId }
    });

    // If no exam found, show 404
    if (!examData) {
      redirect('/error');
    }

    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Exam Problem</h1>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
            <p className="text-gray-700">{examData.problem_statement}</p>
          </div>

          {/* Optional: Display additional exam details */}
          {examData.subject && (
            <div className="mb-2">
              <strong>Subject:</strong> {examData.subject}
            </div>
          )}

          {examData.problem_statement && (
            <div className="mb-2">
              <strong>Difficulty:</strong> {examData.problem_statement}
            </div>
          )}

          {/* Navigation back to exam list */}
          <div className="mt-6">
            <Link 
              href="/exam" 
              className="text-blue-500 hover:underline"
            >
              ← Back to Exam List
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    redirect('/error');
  }
};



export default ExamDetailPage;