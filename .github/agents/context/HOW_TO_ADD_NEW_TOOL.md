# How to Add a New Tool to Kumix

This guide explains step-by-step how to create a new tool following the Kumix standard.

---

## Overview

Adding a tool requires changes in exactly **4 locations**:

| # | Location | Purpose |
|---|----------|---------|
| 1 | `src/shared/types/index.ts` | Add category (only if new category) |
| 2 | `src/shared/constants/tools.ts` | Register the tool in the global registry |
| 3 | `src/features/{domain}/` | Create the feature component (logic + UI) |
| 4 | `src/app/tools/{slug}/page.tsx` | Create the route page |

---

## Step 1 — Choose a Category

Open `src/shared/types/index.ts`. The available categories are:

```ts
export type ToolCategory =
  | 'development'
  | 'documents'
  | 'images'
  | 'excel'
  | 'calculators'
  | 'text'
  | 'web'
  | 'security'
```

**If your tool fits an existing category**, skip to Step 2.

**If you need a new category**, add it to:

1. The `ToolCategory` union type in `src/shared/types/index.ts`
2. The `CATEGORIES` record in `src/shared/constants/tools.ts`

```ts
// src/shared/constants/tools.ts
export const CATEGORIES: Record<ToolCategory, string> = {
  development: "Development",
  documents: "Documents",
  // ... add yours here:
  newcategory: "New Category Label",
};
```

---

## Step 2 — Register the Tool

Open `src/shared/constants/tools.ts` and add a new entry to the `TOOLS` array.

### 2.1 — Choose an Icon

All icons come from **Lucide React**: https://lucide.dev/icons

1. Go to https://lucide.dev/icons
2. Search for an icon that represents your tool
3. Import it at the top of `src/shared/constants/tools.ts`

```ts
import {
  Braces,
  FileStack,
  // Add your icon here:
  YourIcon,
} from "lucide-react";
```

### 2.2 — Add the Tool Object

Add an object to the `TOOLS` array following this exact structure:

```ts
{
  slug: "your-tool-slug",          // URL-friendly, lowercase, kebab-case
  name: "Your Tool Name",          // Display name
  description: "Short description", // One sentence, imperative
  category: "development",         // Must match ToolCategory
  categoryLabel: "Development",    // Human-readable category name
  icon: YourIcon,                  // Imported from lucide-react
  badge: "New",                    // OPTIONAL: "New", "Beta", etc.
  keywords: ["word1", "word2"],    // For search matching
},
```

**Rules:**
- `slug` → lowercase, kebab-case, matches the route folder name
- `description` → max ~50 characters, starts with a verb
- `keywords` → include alternate names, related terms, abbreviations
- `badge` → only use "New" for recently added tools, remove later

---

## Step 3 — Create the Feature Component

Feature components live in `src/features/` organized by **domain** (not by tool name).

### 3.1 — Choose the Domain Folder

Map your category to a domain folder:

| Category | Domain Folder |
|----------|--------------|
| development | `src/features/json/`, `src/features/xml/` |
| documents | `src/features/pdf/` |
| images | `src/features/image/` |
| excel | `src/features/excel/` |
| calculators | `src/features/calculator/` |
| text | `src/features/text/` |
| web | `src/features/color/` |
| security | `src/features/security/` |

If no domain folder fits, create a new one.

### 3.2 — Create the Files

You need exactly **3 files**:

```
src/features/{domain}/
├── components/
│   ├── YourTool.tsx           ← Component logic
│   └── YourTool.module.css    ← Styles
└── index.ts                   ← Barrel export
```

### 3.3 — Write the Barrel Export

`src/features/{domain}/index.ts`:

```ts
export { YourTool } from './components/YourTool'
```

If the domain folder already exists (e.g., you're adding a second tool to `features/text/`), just add another export line.

### 3.4 — Write the Component

`src/features/{domain}/components/YourTool.tsx`:

```tsx
'use client'

import { useState, useCallback } from 'react'
import { Button, CopyButton, Toggle, Dropzone } from '@/shared/ui'
import { useToast } from '@/shared/ui/ToastProvider'
import { downloadText, downloadBlob } from '@/shared/utils/download'
import styles from './YourTool.module.css'

export function YourTool() {
  const { toast } = useToast()

  // Your tool logic here

  return (
    <div className={styles.workspace}>
      {/* Your tool UI here */}
    </div>
  )
}
```

**Critical rules:**

- Always add `'use client'` at the top (tools are interactive)
- Always use named export (not default)
- Component name must match the file name exactly
- Import shared UI from `@/shared/ui`
- Import toast from `@/shared/ui/ToastProvider`
- Import download helpers from `@/shared/utils/download`
- Use CSS Modules for all styles (never inline styles except dynamic values)
- No comments in the code

### 3.5 — Available Shared UI Components

These are already built and ready to use from `@/shared/ui`:

| Component | Use For |
|-----------|---------|
| `Button` | Actions. Props: `variant` (`primary` \| `secondary` \| `ghost` \| `danger`), `size` (`sm` \| `md` \| `lg`), `fullWidth` |
| `Dropzone` | File upload areas. Props: `accept`, `multiple`, `label`, `hint`, `compact`, `onFiles` |
| `CopyButton` | Copy text to clipboard. Props: `text`, `label` |
| `Toggle` | Boolean switches. Props: `checked`, `onChange`, `label` |
| `Slider` | Numeric ranges. Props: `label`, `value`, `min`, `max`, `step`, `onChange`, `formatValue` |
| `ToolLayout` | Page wrapper (used in the page.tsx, not the feature component) |

### 3.6 — Available Hooks

| Hook | Import From | Purpose |
|------|-------------|---------|
| `useCopy` | `@/shared/hooks` | Returns `{ copied, copy }` for clipboard operations |
| `useToast` | `@/shared/ui/ToastProvider` | Returns `{ toast }` function. Call `toast('message')` or `toast('message', 'error')` |

### 3.7 — Available Utilities

| Utility | Import From | Purpose |
|---------|-------------|---------|
| `downloadText(text, filename, mimeType?)` | `@/shared/utils/download` | Download a string as a file |
| `downloadBlob(blob, filename)` | `@/shared/utils/download` | Download a Blob as a file |
| `hexToRgb`, `rgbToHex`, `rgbToHsl`, etc. | `@/shared/utils/color` | Color conversions |

### 3.8 — Write the Styles

`src/features/{domain}/components/YourTool.module.css`:

```css
.workspace {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Use only these CSS variables for consistency: */
/* Colors:      var(--color-primary), var(--color-secondary), var(--color-accent),
                var(--color-success), var(--color-warning), var(--color-error),
                var(--color-background), var(--color-surface), var(--color-border),
                var(--color-text-primary), var(--color-text-secondary) */
/* Radius:      var(--radius-xs), var(--radius-sm), var(--radius-md),
                var(--radius-lg), var(--radius-xl) */
/* Shadows:     var(--shadow-raised), var(--shadow-floating), var(--shadow-overlay) */
/* Transitions: var(--duration-fast), var(--duration-normal), var(--duration-slow),
                var(--duration-slower), var(--easing) */
```

**CSS Rules:**
- Always use design system variables (never hardcode colors, radius, or shadows)
- Root element class is always `.workspace`
- Use 8px grid spacing: `4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128`
- Border radius only: `xs=8px, sm=12px, md=18px, lg=24px, xl=32px`
- Add responsive breakpoint at `768px` for side-by-side layouts

---

## Step 4 — Create the Route Page

Create `src/app/tools/{slug}/page.tsx`:

```tsx
import { ToolLayout } from '@/shared/ui'
import { YourTool } from '@/features/{domain}'

export default function YourToolPage() {
  return (
    <ToolLayout
      title="Your Tool Name"
      description="A longer description for the page header. Explain what the tool does and what the user can expect."
      breadcrumbs={[
        { label: 'Category Name' },
        { label: 'Your Tool Name' },
      ]}
      slug="your-tool-slug"
    >
      <YourTool />
    </ToolLayout>
  )
}
```

**Rules:**
- File must be at `src/app/tools/{slug}/page.tsx` where `{slug}` matches the slug in tools.ts
- This is a **Server Component** (no `'use client'`)
- The `slug` prop connects to the related tools section
- First breadcrumb = category, second = tool name
- `description` here can be longer than in tools.ts (shown only on the tool page)

---

## Complete Example — Adding a "Word Counter" Tool

### File 1: `src/shared/constants/tools.ts`

Add import:
```ts
import { FileText } from "lucide-react";
```

Add to `TOOLS` array:
```ts
{
  slug: "word-counter",
  name: "Word Counter",
  description: "Count words, characters and sentences",
  category: "text",
  categoryLabel: "Text",
  icon: FileText,
  keywords: ["word", "count", "characters", "sentences", "text", "length"],
},
```

### File 2: `src/features/text/components/WordCounter.tsx`

```tsx
'use client'

import { useState, useMemo } from 'react'
import { CopyButton } from '@/shared/ui'
import styles from './WordCounter.module.css'

export function WordCounter() {
  const [input, setInput] = useState('')

  const stats = useMemo(() => {
    const text = input.trim()
    if (!text) return { words: 0, characters: 0, sentences: 0 }
    return {
      words: text.split(/\s+/).length,
      characters: text.length,
      sentences: text.split(/[.!?]+/).filter(Boolean).length,
    }
  }, [input])

  return (
    <div className={styles.workspace}>
      <textarea
        className={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste or type your text here..."
        aria-label="Text input"
      />
      <div className={styles.results}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.words}</span>
          <span className={styles.statLabel}>Words</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.characters}</span>
          <span className={styles.statLabel}>Characters</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.sentences}</span>
          <span className={styles.statLabel}>Sentences</span>
        </div>
      </div>
      {input && (
        <CopyButton
          text={`Words: ${stats.words} | Characters: ${stats.characters} | Sentences: ${stats.sentences}`}
          label="Copy stats"
        />
      )}
    </div>
  )
}
```

### File 3: `src/features/text/components/WordCounter.module.css`

```css
.workspace {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.textarea {
  min-height: 240px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-primary);
  resize: vertical;
  outline: none;
  transition: border-color var(--duration-normal) var(--easing);
}

.textarea:focus {
  border-color: var(--color-accent);
}

.results {
  display: flex;
  gap: 16px;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.statValue {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-accent);
}

.statLabel {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-top: 4px;
}
```

### File 4: `src/features/text/index.ts`

Add export:
```ts
export { WordCounter } from './components/WordCounter'
```

### File 5: `src/app/tools/word-counter/page.tsx`

```tsx
import { ToolLayout } from '@/shared/ui'
import { WordCounter } from '@/features/text'

export default function WordCounterPage() {
  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters and sentences in your text. Paste or type and see results instantly."
      breadcrumbs={[
        { label: 'Text' },
        { label: 'Word Counter' },
      ]}
      slug="word-counter"
    >
      <WordCounter />
    </ToolLayout>
  )
}
```

---

## Checklist Before Submitting

- [ ] Icon imported from `lucide-react` (browse at https://lucide.dev/icons)
- [ ] Tool registered in `src/shared/constants/tools.ts`
- [ ] `slug` in tools.ts matches the route folder name exactly
- [ ] Feature component is `'use client'`
- [ ] Feature component uses named export
- [ ] Barrel export exists in `src/features/{domain}/index.ts`
- [ ] Page is a Server Component (no `'use client'`)
- [ ] CSS uses only design system variables
- [ ] `npm run build` passes without errors
- [ ] Tool appears in the homepage grid
- [ ] Tool appears in Command Palette (Ctrl+K) search
- [ ] Related tools section shows at the bottom of the page
- [ ] Tool is fully responsive (test at 640px breakpoint)
- [ ] All interactive elements are keyboard accessible
- [ ] Toast feedback shown on user actions (copy, download, convert, etc.)
- [ ] Empty state explains what the tool does and how to start

---

## Common Patterns

### File Upload Tool
Use `Dropzone` → process files → show results → offer download.

### Text Transformation Tool
Use textarea input → process in `useMemo` → show output textarea → offer copy/download.

### Calculator Tool
Use inputs → compute in `useMemo` (real-time) → show result card → offer copy.

### Converter Tool
Use `Dropzone` → process client-side → preview → offer download.

---

## Do NOT

- Do not use `default export` in feature components
- Do not add `'use client'` to the page.tsx
- Do not hardcode colors, shadows, or border radius values
- Do not add comments to the code
- Do not use `any` type
- Do not add dependencies without justification
- Do not create components outside `src/features/` or `src/shared/ui/`
- Do not import from internal paths (always use barrel exports)
- Do not use spinners (use skeletons for loading states)
- Do not forget aria labels on interactive elements