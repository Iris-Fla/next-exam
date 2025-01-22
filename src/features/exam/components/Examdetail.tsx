"use client";
import { useExamData } from "@/hooks/useExamData";
import { useState } from "react";

export function Examdetail() {
  const { examData, loading } = useExamData();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (loading) {
    return <div>ロードちゅう</div>;
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
      <h1>年度:{examData.exam_year}</h1>
      <p>科目:{examData.subject}</p>
      <p>本文:{examData.problem_statement}</p>
      <div>
        {choicesArray.length > 0 ? (
          <div>
            {choicesArray.map((choice, index) => (
              <button key={index} onClick={() => handleChoiceClick(index)}>
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <p>選択肢が見つかりませんでした</p>
        )}
      </div>
      {isCorrect !== null && (
        <div>
          {isCorrect ? (
            <div>
              <p>正解</p>
              <p>解説: {examData.explanation}</p>
            </div>
          ) : (
            <div>
              <p>不正解</p>
              <p>解説:</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
