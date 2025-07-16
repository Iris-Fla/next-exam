"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ExamListTableData } from "@/features/exam/types/examData";
import { renameSubject } from "@/features/exam/utils/renameSubject";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Cog } from "lucide-react";

export const columns: ColumnDef<ExamListTableData>[] = [
    {
        accessorKey: "exam_year",
        header: "試験年度",
    },
    {
        accessorKey: "subject",
        header: "教科",
        cell: ({ row }) => {
            const subject = row.getValue("subject") as string;
            const renamedSubject = renameSubject(subject);
            return renamedSubject;
        }
    },
    {
        accessorKey: "grade",
        header: "学年",
    },
    {
        accessorKey: "problem_statement",
        header: "問題文",
    },
    {
        accessorKey: "choices",
        header: "選択肢",
    },
    {
        accessorKey: "correct",
        header: "正解",
    },
    {
        accessorKey: "explanation",
        header: "解説",
    },
    {
        accessorKey: "status",
        header: "公開状況",
    },
    {
        //編集ボタンを追加する
        accessorKey: "id",
        header: "編集",
        cell: ({ row }) => {
            const id = row.original

            return (
                <Button asChild>
                    <Link href={`/exam/edit/${id.id}`}><Cog/>編集</Link>
                </Button>
            )
        }
    }
];