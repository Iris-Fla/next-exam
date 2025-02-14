"use client";
import { useGetReccomendData } from "@/hooks/useGetReccomendData";

export function Examrecommend() {
  const { ExamData, loading } = useGetReccomendData();

  if (loading) {
    return <div>loading</div>;
  }

  if (!ExamData) {
    return <div>オススメデータが見つかりませんでした</div>;
  }

  const getBackgroundClass = (subject: string) => {
    switch (subject) {
      case "物理":
        return "bg-physics-gradient";
      case "化学":
        return "bg-chemistry-gradient";
      // 他の科目のクラスを追加
      default:
        return "bg-white";
    }
  };
  return (
    <div>
      <div className="text-2xl font-bold my-4">オススメの問題</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.isArray(ExamData.RecommendedExams) &&
          ExamData.RecommendedExams.map((exam) => (
            <a
              href={`/exam/${exam.id}`}
              key={exam.id}
              className={`drop-shadow-md rounded-lg p-4 transition duration-150 ease-in-out hover:scale-105 ${getBackgroundClass(
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
