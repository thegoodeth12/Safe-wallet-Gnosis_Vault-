const fs = require("fs");
const path = require("path");

const misplacedPath = path.join(__dirname, "..", "..", ".github", "workflows");
const backupPath = path.join(__dirname, "..", "..", "_backup_workflows");
const rootPath = path.join(__dirname, "..", "..");

const misplacedFiles = [
  ".env",
  "Package.json",
  "README.md",
  "api-environment-runtimes.md",
  "AUTHORS"
];

// Ensure backup directory exists
if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath, { recursive: true });
  console.log("📁 Created backup folder:", backupPath);
}

// Move files from misplaced location → backup → root
misplacedFiles.forEach((file) => {
  const source = path.join(misplacedPath, file);
  const backup = path.join(backupPath, file);
  const destination = path.join(rootPath, file);

  if (fs.existsSync(source)) {
    fs.renameSync(source, backup);
    fs.renameSync(backup, destination);
    console.log(`✅ Moved ${file} to root`);
  } else {
    console.log(`⚠️  ${file} not found in workflows/`);
  }
});

// Cleanup backup folder if empty
if (fs.existsSync(backupPath) && fs.readdirSync(backupPath).length === 0) {
  fs.rmdirSync(backupPath);
  console.log("🧹 Cleaned up backup folder");
}
