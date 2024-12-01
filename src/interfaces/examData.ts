import { JsonValue } from 'type-fest';

// ExamDataインターフェースを定義。
export interface ExamData {
    id: number;
    exam_year: number;
    grade: number;
    subject: string;
    problem_statement: string;
    problem_img: string;
    choices: JsonValue;
    choices_img_path: JsonValue;
    explanation: string;
}