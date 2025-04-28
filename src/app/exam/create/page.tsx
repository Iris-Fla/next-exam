import { CreateExamForm } from "@/features/exam/components/createexamform";
import { BackToListButton } from "@/features/exam/components/backtolist";

export default function CreateExamPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center">Create Exam Page</h1>
            <BackToListButton />
            <CreateExamForm />
        </div>
    );
}