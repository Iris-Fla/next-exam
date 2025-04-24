import { Json } from "@/types/database.types";

export type ExamStatus = "public" | "private" | "nonpublic";
export type SubjectType =
  | "physics"
  | "chemistry"
  | "biology"
  | "hygiene"
  | "pharmacology"
  | "pharmacy"
  | "pathology"
  | "legal"
  | "ethics"
  | "practice";

/** 試験データ */
export interface ExamData {
  exam_year: number;
  grade: number;
  subject: SubjectType;
  problem_statement: string;
  problem_img: string | null;
  choices: Json;
  choices_img: Json | null;
  correct: number;
  explanation: string;
  status: ExamStatus;
}

/** 試験データ(全件取得) */
export interface fetchExamListResponse {
  id: number;
  exam_year: number;
  subject: string;
  grade: number;
  problem_statement: string;
}

/** 試験データ(詳細取得) */
export interface DetailExam {
  exam_year: number;
  subject: string;
  problem_statement: string;
  choices: Json;
  correct: number;
  explanation: string;
}

/** 試験データ(詳細取得)オススメの試験問題 */
export interface RecommendedExam {
  id: number;
  exam_year: number;
  subject: string;
  grade: number;
  problem_statement: string;
}

/** 試験データ(詳細取得)まとめ */
export interface DetailExamPageData {
  detailExam: DetailExam;
  recommendedExams: RecommendedExam[];
}
