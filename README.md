# Kumix 🧰

![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

**Kumix** is a unified workspace of professional utilities built with **Next.js** and **React**.  
It brings together formatters, converters, calculators and security tools in a single fast, friendly and beautiful interface.

No tracking. No accounts required. Everything runs client-side in your browser.

---

## ✨ Features

- 18 professional tools across 8 categories (Development, Documents, Images, Excel, Calculators, Text, Web and Security)
- Global search and `Ctrl/⌘+K` command palette to jump to any tool instantly
- Consistent tool layout with breadcrumbs, badges and related tools suggestions
- Standardized badge system (`new`, `beta`, `coming-soon`, `updated`) to highlight tool status
- Drag & drop file uploads, copy-to-clipboard and one-click downloads across tools
- Global floating "Report bug" button available on every page
- 100% client-side processing — no files or data are sent to a server
- Fully responsive, accessible design with a custom design system (CSS variables, soft shadows, smooth transitions)

### 🧪 Available tools

| Category | Tool |
|----------|------|
| Development | JSON Formatter, XML Formatter, YAML Formatter |
| Documents | Merge PDF, Split PDF |
| Images | PNG Converter, JPG Converter |
| Excel | Excel to CSV, CSV to Excel |
| Calculators | VAT Calculator, Age Calculator |
| Text | Remove Duplicate Lines, Word Counter |
| Web | Color Picker, Ping |
| Security | Password Generator, Password Strength |

---

## 🧰 Prerequisites

You need:

- **Node.js** 18 or higher
- **npm** (or any compatible Node package manager)

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Ephistopheles/kumix.git
cd kumix
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## 📦 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |

---

## 🏗 Architecture

This project follows a **Screaming Architecture**, where the folder structure highlights what the application does (its tools) rather than the framework it's built with.

```
kumix/
├── next.config.ts        → Next.js configuration
├── package.json          → Project metadata and scripts
├── tsconfig.json         → TypeScript configuration
└── src/
    ├── app/
    │   ├── layout.tsx        → Root layout, fonts, providers and metadata
    │   ├── page.tsx          → Homepage with search and tool categories
    │   └── tools/
    │       └── [tool-slug]/
    │           └── page.tsx  → Individual tool page
    ├── features/
    │   ├── json/             → JSON Formatter
    │   ├── xml/               → XML Formatter
    │   ├── yaml/              → YAML Formatter
    │   ├── pdf/                → Merge PDF, Split PDF
    │   ├── image/              → PNG/JPG Converters
    │   ├── excel/               → Excel ↔ CSV converters
    │   ├── calculator/          → VAT & Age calculators
    │   ├── text/                 → Text utilities
    │   ├── color/                → Color Picker
    │   ├── web/                   → Ping
    │   └── security/              → Password tools
    └── shared/
        ├── constants/           → Tool registry (metadata, icons, badges)
        ├── types/                → Shared TypeScript types
        ├── hooks/                → Reusable React hooks
        ├── utils/                 → Download, color and formatting helpers
        └── ui/                     → Design system components (Button, Dropzone,
                                       ToolLayout, Header, Footer, CommandPalette,
                                       Toast, Badge, GlobalReportBugButton, etc.)
```

Each tool lives inside `src/features/<domain>` and is rendered through a shared `ToolLayout`, which provides breadcrumbs, title, description, badge and related-tools suggestions. All tool logic (parsing, converting, generating) runs entirely in the browser — no files or inputs are uploaded to a server.

This makes the app fast, private, secure and cheap to host.

---

## 🔗 Related Technologies

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Lucide](https://lucide.dev) — icon library
- [pdf-lib](https://pdf-lib.js.org) — client-side PDF processing
- [xlsx (SheetJS)](https://sheetjs.com) — Excel/CSV parsing
- [yaml](https://eemeli.org/yaml/) — YAML parsing and serialization

---

## 👤 Author

**Johan Amed**  
GitHub: https://github.com/Ephistopheles
Email: [rjohanamed@gmail.com](mailto:rjohanamed@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it.
