"use server";
import { subjectBackgroundClass } from "@/features/exam/utils/subjectBackgroundClass";
import { fetchExamList } from "@/features/exam/api/fetchExamList";
import { unstable_cache } from "next/cache";
import { fetchExamListResponse } from "../types/examData";

// キャッシュ関数
const cachedFetchExamList = unstable_cache(fetchExamList, ['exams'], {
    revalidate: 60, tags: ['exams']
});

export const ExamList = async () => {

    const examdata:fetchExamListResponse[] = await cachedFetchExamList();

    if (!examdata || examdata.length === 0) {
        return <div>loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {examdata.map((exam: any) => (
                    <a
                        href={`/exam/${exam.id}`}
                        key={exam.id}
                        className={`drop-shadow-md rounded-lg p-4 transition duration-150 ease-in-out hover:scale-105 ${subjectBackgroundClass(exam.subject)}`}
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
        </div>
    );
};
