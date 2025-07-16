"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getEditExamDetail } from "../api/geteditexamdetail"; // 必要に応じてAPIパスを調整
import { uploadImageAction } from "@/features/exam/api/uploadimage";
import type { SubjectType } from "../types/examData";
import { editExamAction } from "../api/editexam";

// shadcn/ui
import { toast } from "sonner";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const examSchema = z.object({
    exam_year: z.number({ invalid_type_error: "年度を入力してください" }),
    grade: z.number().min(1),
    subject: z.enum([
        "physics",
        "chemistry",
        "biology",
        "hygiene",
        "pharmacology",
        "pharmacy",
        "pathology",
        "legal",
        "ethics",
        "practice",
    ]),
    problem_statement: z.string().min(1, "問題文を入力してください"),
    problem_img: z
        .union([
            z.instanceof(File).refine(
                (file) => file.type.startsWith("image/"),
                { message: "画像ファイルを選択してください" }
            ),
            z.string().url(),
            z.undefined(),
        ]).optional(),
    choices: z
        .array(z.object({ value: z.string().min(1, "選択肢を入力してください") }))
        .min(2, "2つ以上の選択肢が必要です"),
    choices_img: z
        .array(
            z.string().url()
                .or(z.instanceof(File))
                .or(z.literal("").optional())
        )
        .optional(),
    correct: z.array(z.number()).min(1, "正解番号を1つ以上選択してください"),
    explanation: z.string().min(1, "解説を入力してください"),
    explanation_img: z
        .union([
            z.instanceof(File).refine(
                (file) => file.type.startsWith("image/"),
                { message: "画像ファイルを選択してください" }
            ),
            z.string().url(),
            z.undefined(),
        ]).optional(),
    status: z.enum(["public", "private", "nonpublic"]),
});

type ExamFormInput = z.infer<typeof examSchema>;

type EditExamFormProps = {
    id: string;
};

export function EditExamForm({ id }: EditExamFormProps) {
    const [loading, setLoading] = useState(true);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const form = useForm<ExamFormInput>({
        resolver: zodResolver(examSchema),
        defaultValues: {
            exam_year: undefined,
            grade: undefined,
            subject: "physics",
            problem_statement: "",
            problem_img: undefined,
            choices: [{ value: "" }, { value: "" }],
            choices_img: ["", ""],
            correct: [],
            explanation: "",
            explanation_img: undefined,
            status: "public",
        },
    });

    const {
        control,
        reset,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "choices",
    });

    // 型ガード関数
    function isFile(obj: unknown): obj is File {
        return typeof obj === "object" && obj !== null && obj instanceof File;
    }

    // データ取得
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getEditExamDetail(id);
            if (!data) {
                setLoading(false);
                setSubmitMessage("データ取得に失敗しました");
                return;
            }
            // choices, choices_img, correct などを整形
            reset({
                exam_year: data.exam_year,
                grade: data.grade,
                subject: data.subject,
                problem_statement: data.problem_statement,
                problem_img: data.problem_img ?? undefined,
                choices: Array.isArray(data.choices)
                    ? data.choices.map((v) => ({
                        value: typeof v === "string" && v !== null ? v : v == null ? "" : String(v)
                    }))
                    : [{ value: "" }, { value: "" }],
                choices_img: Array.isArray(data.choices_img)
                    ? data.choices_img.map((img) =>
                        typeof img === "string" || img instanceof File ? img : undefined
                    )
                    : [],
                correct: Array.isArray(data.correct)
                    ? data.correct.filter((v): v is number => typeof v === "number")
                    : typeof data.correct === "number"
                        ? [data.correct]
                        : [],
                explanation: data.explanation,
                explanation_img: data.explanation_img ?? undefined,
                status: data.status ?? "public",
            });
            setLoading(false);
        }
        fetchData();
    }, [id, reset]);

    const onSubmit = async (data: ExamFormInput) => {
        setUploading(true);
        setSubmitMessage(null);

        // 問題画像
        let problemImgUrl: string | null = null;
        if (typeof data.problem_img === "string") {
            problemImgUrl = data.problem_img;
        } else if (isFile(data.problem_img)) {
            const result = await uploadImageAction(data.problem_img);
            problemImgUrl = result?.url ?? null;
        }

        // 選択肢画像
        let choicesImgUrls: string[] = [];
        if (Array.isArray(data.choices_img)) {
            for (const img of data.choices_img) {
                if (typeof img === "string") {
                    choicesImgUrls.push(img);
                } else if (isFile(img)) {
                    const result = await uploadImageAction(img);
                    choicesImgUrls.push(result?.url ?? "");
                } else {
                    // null, undefined, "" などは空文字列に
                    choicesImgUrls.push("");
                }
            }
        } else {
            choicesImgUrls = [];
        }

        // 解説画像
        let explanationImgUrl: string | null = null;
        if (typeof data.explanation_img === "string") {
            explanationImgUrl = data.explanation_img;
        } else if (isFile(data.explanation_img)) {
            const result = await uploadImageAction(data.explanation_img);
            explanationImgUrl = result?.url ?? null;
        }

        const result = await editExamAction(id, {
            ...data,
            choices: data.choices.map((c) => c.value),
            subject: data.subject as SubjectType,
            problem_img: problemImgUrl,
            choices_img: choicesImgUrls,
            explanation_img: explanationImgUrl,
            status: data.status,
        });

        if (result.success) {
            toast.success("更新に成功しました！");
            router.push(`/exam/${id}`);
        } else {
            setSubmitMessage("更新に失敗しました。");
        }
        setUploading(false);
    };

    const subjectOptions: { value: SubjectType; label: string }[] = [
        { value: "physics", label: "物理" },
        { value: "chemistry", label: "化学" },
        { value: "biology", label: "生物" },
        { value: "hygiene", label: "衛生" },
        { value: "pharmacology", label: "薬理" },
        { value: "pharmacy", label: "薬剤" },
        { value: "pathology", label: "病態,薬物" },
        { value: "legal", label: "法規,制度" },
        { value: "ethics", label: "倫理" },
        { value: "practice", label: "実習" },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4"
            >
                <h2 className="text-xl font-bold mb-2">試験データの編集</h2>

                <FormField
                    control={control}
                    name="exam_year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>年度</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    value={field.value ?? ""}
                                    onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="grade"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>学年</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    value={field.value ?? ""}
                                    onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>教科</FormLabel>
                            <FormControl>
                                <select {...field} className="border p-2 w-full rounded">
                                    {subjectOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="problem_statement"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>問題文</FormLabel>
                            <FormControl>
                                <Textarea rows={3} {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="problem_img"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>問題画像</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    {typeof field.value === "string" && field.value !== "" && (
                                        <Image
                                            src={field.value}
                                            alt="問題画像"
                                            width={80}
                                            height={80}
                                            className="object-cover rounded"
                                        />
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                field.onChange(file);
                                            }
                                        }}
                                    />
                                    {typeof field.value === "string" && field.value !== "" && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => field.onChange(undefined)}
                                        >
                                            削除
                                        </Button>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <FormLabel>選択肢</FormLabel>
                    {fields.map((field, idx) => (
                        <div key={field.id} className="flex items-center gap-2 mb-1">
                            <FormField
                                control={control}
                                name={`choices.${idx}.value`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder={`選択肢${idx + 1}`}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`choices_img.${idx}`}
                                render={() => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                {(() => {
                                                    const value = form.getValues("choices_img")?.[idx];
                                                    let src: string | undefined = undefined;
                                                    if (typeof value === "string" && value !== "") {
                                                        src = value;
                                                    } else if (value instanceof File) {
                                                        src = URL.createObjectURL(value);
                                                    }
                                                    return (
                                                        src && (
                                                            <Image
                                                                src={src}
                                                                alt={`選択肢${idx + 1}画像`}
                                                                width={40}
                                                                height={40}
                                                                className="object-cover rounded"
                                                            />
                                                        )
                                                    );
                                                })()}
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const arr = [...(form.getValues("choices_img") || [])];
                                                            arr[idx] = file;
                                                            form.setValue("choices_img", arr);
                                                        }
                                                    }}
                                                />
                                                {typeof form.getValues("choices_img")?.[idx] === "string" &&
                                                    form.getValues("choices_img")?.[idx] !== "" && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                const arr = [...(form.getValues("choices_img") || [])];
                                                                arr[idx] = "";
                                                                form.setValue("choices_img", arr);
                                                            }}
                                                        >
                                                            削除
                                                        </Button>
                                                    )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="correct"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(idx)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...(field.value || []), idx]);
                                                    } else {
                                                        field.onChange((field.value || []).filter((v: number) => v !== idx));
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <span>正解</span>
                            {fields.length > 2 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        remove(idx);
                                        // choices_imgも同期して削除
                                        const arr = [...(form.getValues("choices_img") || [])];
                                        arr.splice(idx, 1);
                                        form.setValue("choices_img", arr);
                                    }}
                                    className="text-red-500"
                                >
                                    削除
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => {
                            append({ value: "" });
                            // choices_imgも同期して追加
                            const arr = [...(form.getValues("choices_img") || [])];
                            arr.push("");
                            form.setValue("choices_img", arr);
                        }}
                        variant="outline"
                        className="mt-1"
                    >
                        選択肢を追加
                    </Button>
                    {errors.choices && (
                        <FormMessage>{errors.choices.message as string}</FormMessage>
                    )}
                    {errors.correct && (
                        <FormMessage>{errors.correct.message}</FormMessage>
                    )}
                </div>

                <FormField
                    control={control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>解説</FormLabel>
                            <FormControl>
                                <Textarea rows={2} {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="explanation_img"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>解説用画像</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    {typeof field.value === "string" && field.value !== "" && (
                                        <Image
                                            src={field.value}
                                            alt="解説画像"
                                            width={80}
                                            height={80}
                                            className="object-cover rounded"
                                        />
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                field.onChange(file);
                                            }
                                        }}
                                    />
                                    {typeof field.value === "string" && field.value !== "" && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => field.onChange(undefined)}
                                        >
                                            削除
                                        </Button>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>公開状態</FormLabel>
                            <FormControl>
                                <select {...field} className="border p-2 w-full rounded">
                                    <option value="public">公開</option>
                                    <option value="private">非公開</option>
                                    <option value="nonpublic">限定公開</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>
                    更新
                </Button>
                {uploading && (
                    <div className="flex items-center gap-2 mt-2 text-blue-500">
                        <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        アップロード中...
                    </div>
                )}
                {submitMessage && <div className="mt-2">{submitMessage}</div>}
            </form>
        </Form>
    );
}