"use client";
import { useExamData } from "@/hooks/useExamData";
import { useState } from "react";

export function Examdetail() {
  const { examData, loading } = useExamData();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (loading) {
    return <div>loading</div>;
  }

  if (!examData) {
    return <div>試験データが見つかりませんでした</div>;
  }

  // choices が配列であることを確認し、文字列配列に変換
  const choicesArray = Array.isArray(examData.choices)
    ? (examData.choices as string[])
    : [];

  const handleChoiceClick = (index: number) => {
    console.log(`選択されたインデックス: ${index}`);
    if (index === examData.correct) {
      console.log("正解です");
      setIsCorrect(true);
    } else {
      console.log("不正解です");
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">年度: {examData.exam_year}</h1>
      <p className="text-lg mb-2">科目: {examData.subject}</p>
      <p className="text-base mb-4">本文: {examData.problem_statement}</p>
      <div className="mb-4">
        {choicesArray.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {choicesArray.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceClick(index)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-red-500">選択肢が見つかりませんでした</p>
        )}
      </div>
      {isCorrect !== null && (
        <div className="mt-4 p-4 border rounded">
          {isCorrect ? (
            <div>
              <p className="text-green-500 font-bold">正解</p>
              <p className="text-base">解説: {examData.explanation}</p>
            </div>
          ) : (
            <div>
              <p className="text-red-500 font-bold">不正解</p>
              <p className="text-base">解説: {examData.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
