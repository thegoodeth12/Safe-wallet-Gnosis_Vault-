// scripts/check-env.ts
const requiredVars = [
  'NEXT_PUBLIC_SAFE_STATUS_PAGE_URL',
  // Add more required env vars here if needed
];

const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  console.error('\n❌ Missing required environment variables:');
  missingVars.forEach((key) => console.error(`  - ${key}`));
  console.error('\nSet them in your .env.local file or via process.env.\n');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set.');
}
