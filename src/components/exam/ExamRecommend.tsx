"use client";
import { useGetReccomendData } from "@/hooks/useGetReccomendData";
import { subjectBackgroundClass } from "@/utils/subjectBackgroundClass";

export function Examrecommend() {
  const { ExamData, loading } = useGetReccomendData();

  if (loading) {
    return <div>loading</div>;
  }

  if (!ExamData) {
    return <div>オススメデータが見つかりませんでした</div>;
  }

  return (
    <div>
      <div className="text-2xl font-bold my-4">オススメの問題</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.isArray(ExamData.RecommendedExams) &&
          ExamData.RecommendedExams.map((exam) => (
            <a
              href={`/exam/${exam.id}`}
              key={exam.id}
              className={`drop-shadow-md rounded-lg p-4 transition duration-150 ease-in-out hover:scale-105 ${subjectBackgroundClass(
                exam.subject
              )}`}
            >
              <div className="text-xl line-clamp-1 font-medium font-mplus">
                第{exam.exam_year}回 : {exam.subject}
                <span className="text-sm font-normal m-2">
                  ({exam.grade}年)
                </span>
              </div>
              <div className="text-lg line-clamp-1">
                {exam.problem_statement}
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
