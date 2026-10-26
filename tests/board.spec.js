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
  });
}
