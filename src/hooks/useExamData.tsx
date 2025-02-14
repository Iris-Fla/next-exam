"use client";
import { useState, useEffect } from "react";
import { ExamData } from "@/interfaces/examData";
import { useParams } from "next/navigation";

export function useExamData() {
  const params = useParams();
  const id = params?.id;
  const [ExamData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/exam/${id}`);
        if (!response.ok) {
          console.log(Error);
          throw new Error("Failed to fetch exam data");
        }

        const data: ExamData = await response.json();
        setExamData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { ExamData, loading };
}
