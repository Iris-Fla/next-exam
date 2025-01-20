import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Hello~</h2>
      <Link href="/exam">ExamList</Link>
    </div>
  );
}