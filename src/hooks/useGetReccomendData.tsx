"use client";
import { useState, useEffect } from "react";
import { RecommendData } from "@/interfaces/examData";
import { useRecommendExamData } from "@/hooks/useSubjectContext";
import { useParams } from "next/navigation";

export function useGetReccomendData() {
  const params = useParams();
  const id = params?.id;
  const [ExamData, setExamData] = useState<RecommendData | null>(null);
  const [loading, setLoading] = useState(false);
  const { subject, grade } = useRecommendExamData();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const query = new URLSearchParams({ subject, grade: grade?.toString() || '' }).toString();
        console.log(`/api/recommend/${id}?${query}`);
        const response = await fetch(`/api/recommend/${id}?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch exam data");
        }

        const data: RecommendData = await response.json();
        setExamData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (subject && grade !== null) {
      fetchData();
    }
  }, [id, subject, grade]);

  return { ExamData, loading };
}