import React, { useEffect, useState } from 'react';
import Prisma from "@/lib/prisma";

interface ExamproblemProps {
  examId: number;
}

export const Examproblem: React.FC<ExamproblemProps> = ({ examId }) => {
  const [examDetail, setExamDetail] = useState<any>(null);

  useEffect(() => {
    const fetchExamDetail = async () => {
      const detail = await Prisma.examdata.findUnique({
        where: {
          id: examId,
        },
      });
      setExamDetail(detail);
    };

    fetchExamDetail();
  }, [examId]);

  if (!examDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Exam Problem</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
        <p className="text-gray-700">{examDetail.problemStatement}</p>
      </div>
    </div>
  );
};