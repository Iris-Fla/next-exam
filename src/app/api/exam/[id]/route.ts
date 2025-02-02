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
      return NextResponse.json({ error: "Invalid exam ID" }, { status: 400 });
    }

    const DetailExam = await Prisma.examdata.findUnique({
      where: { id: examId },
    });

    if (!DetailExam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    // 同じ教科と学年の問題を4つ取得する
    const RecommendedExams = await Prisma.examdata.findMany({
      where: {
        subject: DetailExam.subject,
        grade: DetailExam.grade,
        id: {
          not: examId, // 現在の問題を除外
        },
      },
      take: 4,
    });

    return NextResponse.json({ DetailExam, RecommendedExams }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
