"use client";
import { FormEvent, useState } from "react";

export function CreateExam() {
  const [examYear, setExamYear] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [choices, setChoices] = useState("");
  const [correct, setCorrect] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exam_year: Number(examYear),
          grade: Number(grade),
          subject,
          problem_statement: problemStatement,
          choices: JSON.parse(choices), // 文字列を JSON に変換
          correct: Number(correct),
          explanation,
        }),
      });
      if (!response.ok) {
        throw new Error("データの作成に失敗しました");
      }
      alert("データの作成が完了しました");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-bold mb-4">Create Exam Page</h1>
      <form onSubmit={handleSubmit} className="grid gap-2 max-w-md mx-auto">
        <input
          type="number"
          placeholder="exam_year"
          value={examYear}
          onChange={(e) => setExamYear(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="problem_statement"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder='choices (例: ["選択肢1","選択肢2"])'
          value={choices}
          onChange={(e) => setChoices(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="correct (正解のインデックス)"
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
