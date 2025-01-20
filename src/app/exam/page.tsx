import Prisma from "@/lib/prisma";
const ExamListPage = async () => {
  const examList = Prisma.examdata.findMany();
  return (
    <div>
      <h1>Exam List</h1>
        <ul>
            {(await examList).map((exam) => (
            <li key={exam.id}>
                <a href={`/exam/${exam.id}`}>{exam.problem_statement}</a>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default ExamListPage;