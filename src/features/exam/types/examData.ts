import { JsonValue } from "type-fest";

/** 試験データ */
export interface ExamData {
  id: number;
  exam_year: number;
  grade: number;
  subject: string;
  problem_statement: string;
  problem_img: string | null;
  choices: JsonValue;
  choices_img_path: JsonValue | null;
  correct: number;
  explanation: string;
}

/** 試験データ(全件取得) */
export interface fetchExamListResponse {
  id: number;
  exam_year: number;
  subject: string;
  grade: number;
  problem_statement: string;
}

