import { test, expect } from '@playwright/test';

test('full on test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'New Note' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('test');
  await page.getByRole('textbox', { name: 'Content' }).click();
  await page.getByRole('textbox', { name: 'Content' }).fill('test');
  await page.getByRole('button', { name: 'Create Note' }).click();
  await expect(page.getByText('Note created successfully!')).toBeVisible();
  await page.getByRole('button', { name: 'test test' }).click();
  await page.getByRole('textbox', { name: 'Content' }).click();
  await page.getByRole('textbox', { name: 'Content' }).fill('tested');
  await page.getByRole('button', { name: 'Edit Note' }).click();
  await expect(page.getByText('Note edited successfully!')).toBeVisible();
  await page.getByRole('button', { name: 'test tested' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Note deleted successfully!')).toBeVisible();
});