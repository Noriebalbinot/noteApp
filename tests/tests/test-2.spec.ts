import { test, expect } from '@playwright/test';

test('test content length validation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'New Note' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('test');
  await page.getByRole('textbox', { name: 'Content' }).click();
  await page.getByRole('textbox', { name: 'Content' }).fill('longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext longtext ');
  await page.getByRole('button', { name: 'Create Note' }).click();
  await expect(page.getByText('Content cannot be longer than')).toBeVisible();

});