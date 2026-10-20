
import { test, expect } from '@playwright/test';

test('Chromium can open a page and run an assertion', async ({ page }) => {
  await page.goto('data:text/html,<title>QA Automation Smoke Test</title><h1>Playwright is running</h1>');

  await expect(page).toHaveTitle('QA Automation Smoke Test');
  await expect(
    page.getByRole('heading', { name: 'Playwright is running' }),
  ).toBeVisible();
});
