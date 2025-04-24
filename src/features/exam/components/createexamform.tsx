"use client";
import { createExam } from "../api/createexam";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import type { SubjectType } from "../types/examData";

// shadcn/ui
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
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";

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
    choices: z
        .array(z.object({ value: z.string().min(1, "選択肢を入力してください") }))
        .min(2, "2つ以上の選択肢が必要です"),
    correct: z.number().min(0, "正解番号を選択してください"),
    explanation: z.string().min(1, "解説を入力してください"),
    status: z.enum(["public", "private", "nonpublic"]),
});

type ExamFormInput = z.infer<typeof examSchema>;

export function CreateExamForm() {
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    const form = useForm<ExamFormInput>({
        resolver: zodResolver(examSchema),
        defaultValues: {
            exam_year: undefined,
            grade: undefined,
            subject: "physics",
            problem_statement: "",
            choices: [{ value: "" }, { value: "" }],
            correct: 0,
            explanation: "",
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

    const onSubmit = async (data: ExamFormInput) => {
        console.log("Submitted data:", data);
        const result = await createExam({
            ...data,
            choices: data.choices.map((c) => c.value),
            subject: data.subject as SubjectType,
            problem_img: null,
            choices_img: null,
            status: "public",
        });
        if (result.success) {
            setSubmitMessage("作成に成功しました！");
            reset();
        } else {
            setSubmitMessage("作成に失敗しました。");
        }
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

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4"
            >
                <h2 className="text-xl font-bold mb-2">新しい試験問題の作成</h2>

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
                                name="correct"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                value={String(field.value)}
                                                onValueChange={(val) => field.onChange(Number(val))}
                                                className="flex items-center"
                                            >
                                                <RadioGroupItem value={String(idx)} />
                                            </RadioGroup>
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
                                    onClick={() => remove(idx)}
                                    className="text-red-500"
                                >
                                    削除
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => append({ value: "" })}
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
                    作成
                </Button>
                {submitMessage && <div className="mt-2">{submitMessage}</div>}
            </form>
        </Form>
    );
}