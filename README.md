<!-- Safe{Wallet} Logo -->
<p align="center">
  <img src="https://github.com/user-attachments/assets/b8249113-d515-4c91-a12a-f134813614e8" height="80" alt="Safe{Wallet} Logo" />
</p>

<h1 align="center">Safe{Wallet} .domain</h1>

<p align="center">
  <a href="/apps/web/README.md">🌐 Web App</a> &nbsp;•&nbsp;
  <a href="/apps/mobile/README.md">📱 Mobile App</a>
</p>

---

## 📦 Overview

Welcome to the **Safe{Wallet} Monorepo** — your secure, modular hub for managing Safe apps and libraries.  
This monorepo leverages **Yarn Workspaces** to keep all your apps, shared code, and configs under one roof — elegant, efficient, and built for scale.

---

## 🧱 Folder Structure

```
.
├── apps/       # Web and mobile apps
├── packages/   # Shared libraries and utilities
├── config/     # Lint, test, and tooling configs
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

Make sure you have the latest versions of:

- **Node.js** — [Download here](https://nodejs.org/)
- **Yarn v4.5.3+** (enabled via Corepack)

Run this to enable Yarn:

```bash
corepack enable
yarn
```

That installs the correct Yarn version and all dependencies automatically.

---

### 🚀 Setup

Clone the repo and install everything:

```bash
git clone <your-safe-repo-url>
cd monorepo
yarn install
```

Replace `<your-safe-repo-url>` with your actual GitHub repo link.

---

## 🛠️ Common Commands

### 🧩 Workspace Scripts

Run a script inside a specific workspace:

```bash
yarn workspace <workspace-name> <script>
```

**Example:**

```bash
yarn workspace @safe-global/web start
```

Add or remove dependencies:

```bash
yarn workspace <workspace-name> add <package-name>
yarn workspace <workspace-name> remove <package-name>
```

> 💡 Tip: If a command has a colon (`:`), you can often run it globally:
>
> ```bash
> yarn cypress:open
> ```

---

### 🧪 Linting & Testing

Run linting across all workspaces:

```bash
yarn lint
```

Run all tests:

```bash
yarn test
```

---

## 🤝 Contributing

### 🆕 Add a Workspace

1. Create a folder under `apps/` or `packages/`
2. Add a `package.json` with the correct metadata
3. Run:

```bash
yarn install
```

---

### ✅ Best Practices

- Always use `yarn workspace` to manage dependencies
- Ensure linting and tests pass before pushing
- Follow [Conventional Commit](https://www.conventionalcommits.org/) format

---

## 🧰 Tooling Stack

| Tool        | Description                            |
|-------------|----------------------------------------|
| **Yarn**    | Monorepo package manager               |
| **Husky**   | Git hooks for pre-commit checks        |
| **ESLint**  | JavaScript/TypeScript linting          |
| **Prettier**| Code formatting                        |
| **Jest**    | Unit testing                           |
| **Expo**    | Framework for the mobile app           |
| **Next.js** | Framework for the web app              |

---

## 📚 Documentation

- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Next.js](https://nextjs.org/docs)
- [Expo](https://docs.expo.dev/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 💬 Questions?

Need help or found a bug?  
Open a discussion or reach out to the Safe core team.  
We’re here to secure the chain 🔐

---

<p align="center"><i>— Built with care by the Safe{Wallet} team</i></p>

# Hello GitHub Actions

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey thegoodeth12!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/thegoodeth12/Safe-wallet/issues/1)

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

