"use client";
import { FormEvent, useState } from "react";

export function CreateExam() {
  const [examYear, setExamYear] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [problemStatement, setProblemStatement] = useState("");

  const [choicesArray, setChoicesArray] = useState<string[]>([]);
  const [correct, setCorrect] = useState("");
  const [explanation, setExplanation] = useState("");

  const addChoice = () => {
    setChoicesArray([...choicesArray, ""]);
  };

  const removeChoice = (index: number) => {
    const updatedChoices = [...choicesArray];
    updatedChoices.splice(index, 1);
    setChoicesArray(updatedChoices);
  };

  const updateChoice = (index: number, value: string) => {
    const updatedChoices = [...choicesArray];
    updatedChoices[index] = value;
    setChoicesArray(updatedChoices);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam_year: Number(examYear),
          grade: Number(grade),
          subject,
          problem_statement: problemStatement,
          choices: choicesArray,
          correct: Number(correct) - 1,
          explanation,
        }),
      });
      if (!response.ok) throw new Error("データの作成に失敗しました");
      alert("データの作成が完了しました");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-bold mb-4">Create Exam</h1>
      <form onSubmit={handleSubmit} className="grid gap-2 max-w-xl mx-auto">
        <input
          type="number"
          placeholder="年度"
          value={examYear}
          onChange={(e) => setExamYear(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="何年生向けの問題?"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border p-2"
        />

        {/* 教科セレクトボックス */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2"
        >
          <option value="">教科を選択</option>
          <option value="物理">物理</option>
          <option value="化学">化学</option>
          <option value="生物">生物</option>
          <option value="衛生">衛生</option>
          <option value="薬理">薬理</option>
          <option value="薬剤">薬剤</option>
          <option value="病態,薬物">病態,薬物</option>
          <option value="法規,制度">法規,制度</option>
          <option value="倫理">倫理</option>
          <option value="実習">実習</option>
        </select>

        <textarea
          placeholder="問題文"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          className="border p-2"
        />

        <div className="border p-2">
          <div className="mb-2 font-bold">選択肢</div>
          {choicesArray.map((choice, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={choice}
                onChange={(e) => updateChoice(index, e.target.value)}
                className="border p-2 flex-1"
                placeholder={`選択肢 ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeChoice(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                削除
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addChoice}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            選択肢を追加
          </button>
        </div>

        <input
          type="number"
          placeholder="正解の選択肢の番号"
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="解説"
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
