import Prisma from '@/lib/prisma';
import { ExamData } from '@/interfaces/examData';
import { useParams } from 'next/navigation';

export default async function getExamData() {
    const params = useParams()
    const id = params.id
    const examdata: ExamData[] = await Prisma.examdata.findMany({
      where: {
        id: Number(id),
      },
    });
    return (
        examdata
    );
  }