const { test, expect } = require('@playwright/test');
const testCases = require('../data/testCases.json');

for (const testCase of testCases) {
  test(`Test Case ${testCase.id}: "${testCase.task}" is in ${testCase.project} > ${testCase.column}`, async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

    await page.getByRole('button', { name: testCase.project }).click();
    await expect(page.getByRole('heading', { level: 1, name: testCase.project })).toBeVisible();

    // Column headings look like "To Do (2)", and the column is the heading's parent
    const columnHeading = page.getByRole('heading', { level: 2, name: testCase.column });
    const column = columnHeading.locator('..');
    await expect(columnHeading).toBeVisible();

    // Find the task inside the expected column
    const taskHeading = column.getByRole('heading', { level: 3, name: testCase.task, exact: true });
    const taskCard = taskHeading.locator('..');
    await expect(taskHeading).toBeVisible();

    // Check each tag on the task
    for (const tag of testCase.tags) {
      await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
    }
  });
}
