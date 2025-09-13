import { test, expect } from '@playwright/test';

test('test title length validation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'New Note' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('testlengtestlengtestlengtestleng');
  await page.getByRole('textbox', { name: 'Content' }).click();
  await page.getByRole('textbox', { name: 'Content' }).fill('test');
  await page.getByRole('button', { name: 'Create Note' }).click();
  await expect(page.getByText('Title cannot be longer than')).toBeVisible();
});