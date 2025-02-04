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
      return NextResponse.json({ error: "不正な問題IDの可能性があります" }, { status: 400 });
    }

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
  } catch (error) {
    console.error("Error fetching exam data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
