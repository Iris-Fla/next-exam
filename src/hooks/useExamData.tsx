"use client";
import { useState, useEffect } from "react";
import { ExamData } from "@/interfaces/examData";
import { useParams } from "next/navigation";

export function useExamData() {
  const params = useParams();
  const id = params?.id;
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        console.log("Hi");
        console.log(process.env.NODE_ENV);
        console.log(process.env.production);
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

  return { examData, loading };
}
