import Prisma from "@/lib/prisma";

export const ExamList = async () => {
  const examList = Prisma.examdata.findMany();

  const getBackgroundClass = (subject: string) => {
    switch (subject) {
      case '物理':
        return 'bg-physics-gradient';
      case '化学':
        return 'bg-chemistry-gradient';
      // 他の科目のクラスを追加
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(await examList).map((exam) => (
          <a
            href={`/exam/${exam.id}`}
            key={exam.id}
            className={`shadow-md rounded-lg p-4 ${getBackgroundClass(exam.subject)}`}
          >
            <div className="text-xl line-clamp-1 font-medium font-mplus">
              第{exam.exam_year}回 : {exam.subject}
              <span className="text-sm font-normal m-2">
                ({exam.grade}年)</span>
            </div>
            <div className="text-lg line-clamp-1">
              {exam.problem_statement}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
