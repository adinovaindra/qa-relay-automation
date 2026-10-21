const EXPECTED_DATABASE = 'relay_qa_automation';

const ALLOWED_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '::1',
  '[::1]',
]);

function fail(message) {
  console.error(`Database safety guard FAILED: ${message}`);
  process.exit(1);
}

if (process.env.RELAY_QA_AUTOMATION !== '1') {
  fail('RELAY_QA_AUTOMATION must be explicitly set to 1.');
}

const rawUrl = process.env.DATABASE_URL;

if (!rawUrl) {
  fail('DATABASE_URL is missing.');
}

let url;

try {
  url = new URL(rawUrl);
} catch {
  fail('DATABASE_URL is not a valid URL.');
}

if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
  fail('Only PostgreSQL URLs are allowed.');
}

const hostname = url.hostname.toLowerCase();
const databaseName = decodeURIComponent(url.pathname.replace(/^\/+/, ''));

if (!ALLOWED_HOSTS.has(hostname)) {
  fail(`Database host is not an approved local host: ${hostname || '(empty)'}.`);
}

if (databaseName !== EXPECTED_DATABASE) {
  fail(`Expected database "${EXPECTED_DATABASE}", received "${databaseName || '(empty)'}".`);
}

console.log(
  `Database safety guard PASSED: host=${hostname}, database=${databaseName}.`,
);
