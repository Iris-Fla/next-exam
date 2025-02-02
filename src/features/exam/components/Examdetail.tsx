"use client";
import { useExamData } from "@/hooks/useExamData";
import { useState } from "react";

export function Examdetail() {
  const { ExamData, loading } = useExamData();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [animate, setAnimate] = useState(false);


  if (loading) {
    return <div>loading</div>;
  }

  if (!ExamData) {
    return <div>試験データが見つかりませんでした</div>;
  }

  const choicesArray = Array.isArray(ExamData.DetailExam.choices)
    ? (ExamData.DetailExam.choices as string[])
    : [];

  const handleChoiceClick = (index: number) => {
    console.log(`選択されたインデックス: ${index}`);
    if (index === ExamData.DetailExam.correct) {
      console.log("正解です");
      setIsCorrect(true);
    } else {
      console.log("不正解です");
      setIsCorrect(false);
    }
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300); // アニメーションの時間を設定
  };

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
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4">
              年度: {ExamData.DetailExam.exam_year}
            </h1>
            <p className="text-lg mb-2">科目: {ExamData.DetailExam.subject}</p>
            <p className="text-lg mb-4">本文: {ExamData.DetailExam.problem_statement}</p>
          </div>
          <div className="mb-4">
            {choicesArray.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {choicesArray.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoiceClick(index)}
                    className="bg-slate-500 text-white py-6 rounded transition duration-150 ease-in-out hover:scale-105 active:bg-slate-700 text-xl"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-red-500">選択肢が見つかりませんでした</p>
            )}
          </div>
        </div>
        <div className="flex-1">
          {isCorrect !== null && (
            <div>
              <div
                className={`m-4 p-4 border rounded transition-transform duration-300 ${
                  animate ? "scale-105" : ""
                }`}
              >
                {isCorrect ? (
                  <div>
                    <p className="text-green-500 text-2xl text-bold">正解</p>
                    <p className="text-lg">解説: {ExamData.DetailExam.explanation}</p>
                  </div>
                ) : (
                  <p className="text-red-500 text-2xl text-bold">不正解</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="my-4 border-4 border-slate-700 rounded-lg transition-all duration-300" />
      <div className="text-2xl font-bold my-4">オススメの問題</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.isArray(ExamData.RecommendedExams) && ExamData.RecommendedExams.map((exam) => (
          <a
            href={`/exam/${exam.id}`}
            key={exam.id}
            className={`drop-shadow-md rounded-lg p-4 transition duration-150 ease-in-out hover:scale-105 ${getBackgroundClass(exam.subject)}`}
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
}
