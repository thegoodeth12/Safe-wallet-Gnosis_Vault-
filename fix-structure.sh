#!/bin/bash

# Move to backend root
cd "$(dirname "$0")"/../..

# Create backup directory just in case
mkdir -p ./_backup_workflows

echo "📦 Moving misplaced backend files to root..."

# Move known misplaced files
mv .github/workflows/.env ./_backup_workflows/.env 2>/dev/null
mv .github/workflows/Package.json ./_backup_workflows/Package.json 2>/dev/null
mv .github/workflows/README.md ./_backup_workflows/README.md 2>/dev/null
mv .github/workflows/api-environment-runtimes.md ./_backup_workflows/api-environment-runtimes.md 2>/dev/null
mv .github/workflows/AUTHORS ./_backup_workflows/AUTHORS 2>/dev/null

# Copy files back to proper place (backend root)
mv ./_backup_workflows/.env . 2>/dev/null
mv ./_backup_workflows/Package.json . 2>/dev/null
mv ./_backup_workflows/README.md . 2>/dev/null
mv ./_backup_workflows/api-environment-runtimes.md . 2>/dev/null
mv ./_backup_workflows/AUTHORS . 2>/dev/null

echo "✅ Files moved. Structure now looks clean."

# Optional cleanup
rmdir ./_backup_workflows 2>/dev/null
