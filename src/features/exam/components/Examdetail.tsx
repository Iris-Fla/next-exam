"use client";
import { useState, useEffect } from "react";
import { useExamData } from "@/hooks/useExamData";
import { useRecommendExamData } from "@/hooks/useSubjectContext";

export function Examdetail() {
  const { ExamData, loading } = useExamData();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [animate, setAnimate] = useState(false);
  const { setSubject, setGrade } = useRecommendExamData();

  useEffect(() => {
    if (ExamData) {
      setSubject(ExamData.DetailExam.subject);
      setGrade(ExamData.DetailExam.grade);
    }
  }, [ExamData, setSubject, setGrade]);

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
    </div>
  );
}
