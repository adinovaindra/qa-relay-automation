import { test, expect } from '@playwright/test';

test('Login API rejects an unregistered email', async ({
  request,
}) => {
  const email = `qa-db-probe-${Date.now()}@example.com`;

  const response = await request.post('/api/auth/login', {
    data: {
      email,
      password: 'ValidProbePassword123',
    },
  });

  expect(response.status()).toBe(401);

  const body = await response.json();

  expect(body).toMatchObject({
    success: false,
    error: {
      code: 'UNAUTHORIZED',
      message: 'Invalid email or password',
    },
  });
});