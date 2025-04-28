import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BackToListButton() {
  return (
    <Button asChild>
      <Link href="/">一覧に戻る</Link>
    </Button>
  );
}
