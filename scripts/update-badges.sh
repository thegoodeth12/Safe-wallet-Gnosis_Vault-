#!/bin/bash
set -e

BADGES=$(cat <<'EOF'
# 🔐 Gnosis Vault — Safe Wallet CI/CD

[![0-start-exercise](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/0-start-exercise.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/0-start-exercise.yml)
[![1-step](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/1-step.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/1-step.yml)
[![2-step](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/2-step.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/2-step.yml)
[![3-step](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/3-step.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/3-step.yml)
[![4-step](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/4-step.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/4-step.yml)
[![5-step](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/5-step.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/5-step.yml)
[![CodeQL](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/codeql.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/codeql.yml)
[![Release](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/release.yml/badge.svg)](https://github.com/thegoodeth12/Safe-wallet-Gnosis_Vault-/actions/workflows/release.yml)

> _Auto-generated on $(date -u)_
EOF
)

# Inject badges into the README
echo "$BADGES" > README.md
