import Prisma from "@/lib/prisma";

export const ExamList = async () => {
  const examList = Prisma.examdata.findMany();
  return (
    <div>
        <ul>
            {(await examList).map((exam) => (
            <li key={exam.id}>
                <a href={`/exam/${exam.id}`}>{exam.problem_statement}</a>
            </li>
            ))}
        </ul>
    </div>
  );
}