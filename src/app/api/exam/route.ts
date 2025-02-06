import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newExam = await Prisma.examdata.create({
      data: {
        exam_year: body.exam_year,
        grade: body.grade,
        subject: body.subject,
        problem_statement: body.problem_statement,
        problem_img: "",
        choices: body.choices,
        choices_img_path: "",
        correct: body.correct,
        explanation: body.explanation,
      },
    });
    return NextResponse.json(newExam, { status: 201 });
  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
  }
}