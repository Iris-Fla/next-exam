import Prisma from '@/lib/prisma';
import Link from 'next/link';
import { ExamData } from '@/interfaces/examData';

const Page = async () => {
  const examdata: ExamData[] = await Prisma.examdata.findMany();
  return (
    <div>
      <h1>Examdata</h1>
      <ul>
        {examdata.map((data) => (
          <li key={data.id}>
            <Link href={`/examdata/${data.id}`}>
              <p>{data.problem_statement}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;