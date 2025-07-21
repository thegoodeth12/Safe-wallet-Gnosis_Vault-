// scripts/check-env.ts

const requiredVars = [
  'NEXT_PUBLIC_SAFE_STATUS_PAGE_URL',
  // Add more as needed
];

const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  console.error('\n❌ Missing required environment variables:\n');
  missingVars.forEach((key) => console.error(`- ${key}`));
  console.error('\n🔧 Please define them in your .env.local or GitHub Secrets.\n');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are defined.\n');
}
