import { JsonValue } from 'type-fest';

// ExamDataインターフェースを定義。
export interface ExamData {
    DetailExam: {
        id: number;
        exam_year: number;
        grade: number;
        subject: string;
        problem_statement: string;
        problem_img: string;
        choices: JsonValue;
        choices_img_path: JsonValue;
        correct: number;
        explanation: string;
    },
}

export interface RecommendData {
    RecommendedExams: {
        id: number;
        exam_year: number;
        grade: number;
        subject: string;
        problem_statement: string;
    }
}