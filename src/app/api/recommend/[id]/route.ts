import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const examId = Number(id);
    if (isNaN(examId)) {
      return NextResponse.json({ error: "不正なIDの可能性があります" }, { status: 400 });
    }

    const url = new URL(req.url);
    const subject = url.searchParams.get('subject');
    const grade = url.searchParams.get('grade');

    if (!subject || !grade) {
      return NextResponse.json({ error: "クエリパラメータが不足しています" }, { status: 400 });
    }

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
  } catch (error) {
    console.error("不明なエラー", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
