"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchExamListDataTable } from "@/features/exam/api/fetchexamlisttable";
import { ExamListTableData } from "@/features/exam/types/examData";
import { useEffect, useState } from "react";

export default function ExamListTable() {
      const [examData, setExamData] = useState<ExamListTableData[]>([])
    
      async function reload() {
        const response = await fetchExamListDataTable()
        if (response.success && response.data) {
          setExamData(response.data)
        }
      }
    
      // 初回ロード
      useEffect(() => {
        reload()
      }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center">Exam List</h1>
            <DataTable columns={columns} data={examData} />
        </div>
    );
}