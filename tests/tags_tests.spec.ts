import { expect, test } from "@playwright/test";

test.describe(
  "Using tags",
  {
    tag: "@describe_tag",
  },
  () => {
    test("Tags Test 1", { tag: "@test1" }, async ({ page }) => {
      await page.goto("https://tredgate.com/pmtool");
    });

    test("Tags Test 2 @test2", async ({ page }) => {
      await page.goto("https://tredgate.com/webtrain/");
    });
  }
);
