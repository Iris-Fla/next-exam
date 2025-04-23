"use client";
import { useState, useEffect } from "react";
import { getExamDetail } from "@/features/exam/api/getExamDetail";

interface ExamdetailProps {
    id: number;
  }

/** 動的ルーティングでidを受け取り、試験の詳細データとオススメの類似問題のページを返す */
export function Examdetail({ id }: ExamdetailProps) {
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [animate, setAnimate] = useState(false);
    const [examdata, setExamdata] = useState<any>(null);

    useEffect(() => {
        if (id !== undefined && !isNaN(id)) {
            getExamDetail(id).then((data) => setExamdata(data));
        }
    }, [id]);

    if (!examdata) {
        return <div>Loading...</div>;
    }

    const choicesArray = Array.isArray(examdata.detailExam.choices)
        ? (examdata.detailExam.choices as string[])
        : [];

    const handleChoiceClick = (index: number) => {
        if (index === examdata.detailExam.correct) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-4">
                            年度: {examdata.detailExam.exam_year}
                        </h1>
                        <p className="text-lg mb-2">科目: {examdata.detailExam.subject}</p>
                        <p className="text-lg mb-4">本文: {examdata.detailExam.problem_statement}</p>
                    </div>
                    <div className="mb-4">
                        {choicesArray.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {choicesArray.map((choice, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleChoiceClick(index)}
                                        className="bg-slate-500 text-white py-6 rounded transition duration-150 ease-in-out hover:scale-105 active:bg-slate-700 text-xl"
                                    >
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-red-500">選択肢が見つかりませんでした</p>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    {isCorrect !== null && (
                        <div>
                            <div
                                className={`m-4 p-4 border rounded transition-transform duration-300 ${animate ? "scale-105" : ""
                                    }`}
                            >
                                {isCorrect ? (
                                    <div>
                                        <p className="text-green-500 text-2xl text-bold">正解</p>
                                        <p className="text-lg">解説: {examdata.detailExam.explanation}</p>
                                    </div>
                                ) : (
                                    <p className="text-red-500 text-2xl text-bold">不正解</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <hr className="my-4 border-4 border-slate-700 rounded-lg transition-all duration-300" />
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-4">オススメの類似問題</h2>
                {examdata.recommendedExams.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {examdata.recommendedExams.map((exam: any) => (
                            <a
                                href={`/exam/${exam.id}`}
                                key={exam.id}
                                className={`drop-shadow-md rounded-lg p-4 transition duration-150 ease-in-out hover:scale-105`}
                            >
                                <div className="text-xl line-clamp-1 font-medium font-mplus">
                                    第{exam.exam_year}回 : {exam.subject}
                                    <span className="text-sm font-normal m-2">
                                        ({exam.grade}年)
                                    </span>
                                </div>
                                <div className="text-lg line-clamp-1">
                                    {exam.problem_statement}
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-red-500">オススメの類似問題が見つかりませんでした</p>
                )}
            </div>
        </div>
    );
}
