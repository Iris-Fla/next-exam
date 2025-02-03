import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const examId = Number(id);
    if (isNaN(examId)) {
      return NextResponse.json({ error: "不正なIDの可能性があります" }, { status: 400 });
    }

    const DetailExam = await Prisma.examdata.findUnique({
      where: { id: examId },
      select: {
        subject: true,
        grade: true,
      },
    });

    if (!DetailExam) {
      return NextResponse.json({ error: "Recommend Data Error" }, { status: 404 });
    }

    // 同じ教科と学年の問題を4つ取得する
    const RecommendedExams = await Prisma.examdata.findMany({
      where: {
        subject: DetailExam.subject,
        grade: DetailExam.grade,
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

    return NextResponse.json({ DetailExam, RecommendedExams }, { status: 200 });
  } catch (error) {
    console.error("不明なエラー", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
