#!/bin/bash

echo "🔍 Checking required environment variables..."

REQUIRED_VARS=(
  NEXT_PUBLIC_SAFE_STATUS_PAGE_URL
  # Add more if needed
)

MISSING=0
for VAR in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    echo "❌ ERROR: $VAR is not set"
    MISSING=1
  else
    echo "✅ $VAR is set"
  fi
done

if [ "$MISSING" -ne 0 ]; then
  echo "❗ One or more required environment variables are missing."
  exit 1
else
  echo "✅ All required environment variables are defined."
fi
