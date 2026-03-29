import { z } from "zod";

export const contentSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは1文字以上入力してください")
    .max(50, "タイトルは50文字以下で入力してください"),
  body: z
    .string()
    .min(10, "詳細は10文字以上入力してください")
    .max(2000, "詳細は2000文字以下で入力してください"),
});
