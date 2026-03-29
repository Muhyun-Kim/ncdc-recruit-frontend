import { contentSchema } from "./schema";

describe("contentSchema", () => {
  describe("title", () => {
    test("空文字はエラー", () => {
      const result = contentSchema.shape.title.safeParse("");
      expect(result.success).toBe(false);
    });

    test("1文字は成功", () => {
      const result = contentSchema.shape.title.safeParse("あ");
      expect(result.success).toBe(true);
    });

    test("50文字は成功", () => {
      const result = contentSchema.shape.title.safeParse("あ".repeat(50));
      expect(result.success).toBe(true);
    });

    test("51文字はエラー", () => {
      const result = contentSchema.shape.title.safeParse("あ".repeat(51));
      expect(result.success).toBe(false);
    });
  });

  describe("body", () => {
    test("9文字はエラー", () => {
      const result = contentSchema.shape.body.safeParse("あ".repeat(9));
      expect(result.success).toBe(false);
    });

    test("10文字は成功", () => {
      const result = contentSchema.shape.body.safeParse("あ".repeat(10));
      expect(result.success).toBe(true);
    });

    test("2000文字は成功", () => {
      const result = contentSchema.shape.body.safeParse("あ".repeat(2000));
      expect(result.success).toBe(true);
    });

    test("2001文字はエラー", () => {
      const result = contentSchema.shape.body.safeParse("あ".repeat(2001));
      expect(result.success).toBe(false);
    });
  });
});
