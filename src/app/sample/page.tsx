import  Prisma  from '@/lib/prisma';
import Link from 'next/link';

const Page = async () => {
    const examdata = await Prisma.examdata.findMany();
    return (
        <div>
            <h1>Examdata</h1>
            <ul>
                {examdata.map((examdata:any) => (
                    <li key={examdata.id}>
                        <Link href={`/examdata/${examdata.id}`}>
                            <p>{examdata.problem_statement}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Page;