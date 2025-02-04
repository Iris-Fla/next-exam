import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const examId = Number(id);
    if (isNaN(examId)) {
      return NextResponse.json({ error: "不正な問題IDの可能性があります" }, { status: 400 });
    }

    const url = new URL(req.url);
    const subject = url.searchParams.get('subject');
    const grade = url.searchParams.get('grade');

    if (subject && grade) {
      const gradeNumber = Number(grade);
      if (isNaN(gradeNumber)) {
        return NextResponse.json({ error: "不正な学年の値です" }, { status: 400 });
      }

      // 同じ教科と学年の問題を4つ取得する
      const RecommendedExams = await Prisma.examdata.findMany({
        where: {
          subject: subject,
          grade: gradeNumber,
          id: {
            not: examId,
          },
        },
        take: 4,
        select: {
          id: true,
          exam_year: true,
          subject: true,
          grade: true,
          problem_statement: true,
        },
      });

      return NextResponse.json({ RecommendedExams }, { status: 200 });
    } else {
      const DetailExam = await Prisma.examdata.findUnique({
        where: { id: examId },
        select: {
          id: true,
          exam_year: true,
          subject: true,
          grade: true,
          problem_statement: true,
          choices: true,
          correct: true,
          explanation: true,
        },
      });

      if (!DetailExam) {
        return NextResponse.json({ error: "試験データが見つかりませんでした" }, { status: 404 });
      }

      return NextResponse.json({ DetailExam }, { status: 200 });
    }
  } catch (error) {
    console.error("不明なエラー", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}