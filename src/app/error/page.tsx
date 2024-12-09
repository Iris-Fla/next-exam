import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Exam Not Found</h2>
      <p className="mb-4">The exam you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="text-blue-500 hover:underline"
      >
        Return to Exam List
      </Link>
    </div>
  );
}