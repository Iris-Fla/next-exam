import { supabase } from "@/lib/client";

export async function getEditExamDetail(id: string) {
    const { data, error } = await supabase
        .from("examdata")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        console.error("Error fetching exam detail:", error);
        return null;
    }
    return data;
}