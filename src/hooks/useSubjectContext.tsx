"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ExamSubjectContextType {
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
}

interface ExamGradeContextType {
  grade: number | null;
  setGrade: React.Dispatch<React.SetStateAction<number | null>>;
}

const ExamSubject = createContext<ExamSubjectContextType | undefined>(undefined);
const ExamGrade = createContext<ExamGradeContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<number | null>(null);

  return (
    <ExamSubject.Provider value={{ subject, setSubject }}>
      <ExamGrade.Provider value={{ grade, setGrade }}>
        {children}
      </ExamGrade.Provider>
    </ExamSubject.Provider>
  );
};

export const useRecommendExamData = () => {
  const subjectContext = useContext<ExamSubjectContextType | undefined>(ExamSubject);
  const gradeContext = useContext<ExamGradeContextType | undefined>(ExamGrade);

  if (!subjectContext || !gradeContext) {
    throw new Error("useExamData must be used within an ExamProvider");
  }

  return { subject: subjectContext.subject, setSubject: subjectContext.setSubject, grade: gradeContext.grade, setGrade: gradeContext.setGrade };
};