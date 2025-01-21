"use client";
import { useExamData } from "@/hooks/useExamData";

export function Examdetail() {
  const { examData, loading } = useExamData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!examData) {
    console.log(examData);
    return <div>No exam data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Exam Problem</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
          <p className="text-gray-700">{examData.problem_statement}</p>
        </div>
      </div>
    </div>
  );
}
