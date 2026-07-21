# AGENTS.md

# Kumix

## Project Philosophy

Kumix is a unified workspace of professional utilities.

It is not a collection of unrelated tools.

It is not a marketplace.

It is not a developer-only platform.

Kumix is designed to become the browser bookmark users instinctively open whenever they need to solve a small task.

Every design and engineering decision must reinforce four core principles:

- Fast
- Friendly
- Beautiful
- Invisible

The UI should never compete with the user's task.

The application should feel calm, soft and predictable.

---

# Product Identity

Project Name

> Kumix

Meaning

"Kumix" represents a mix of carefully crafted utilities unified under one consistent experience.

The product should always feel like a single application, never a directory of independent pages.

---

# Design Philosophy

The interface should communicate:

- confidence
- softness
- clarity
- simplicity
- speed

Every screen should feel approachable.

Avoid corporate aesthetics.

Avoid aggressive contrasts.

Avoid visual noise.

Every interaction should feel intentional.

---

# Visual Style

The design language is a hybrid between:

- Minimalism
- Soft UI
- Claymorphism
- Modern SaaS

Claymorphism must never dominate the interface.

It should enhance hierarchy, never become decoration.

Rounded surfaces, soft shadows and subtle depth are preferred over excessive blur or heavy effects.

---

# Color System

## Primary

Periwinkle

```
#CCCCFF
```

This is the primary brand color.

It represents creativity, calmness and intelligence.

It should be used consistently across the entire application.

---

## Secondary

```
#E8E6FF
```

---

## Accent

```
#A89BFF
```

---

## Success

```
#69C779
```

---

## Warning

```
#F5B942
```

---

## Error

```
#E96A6A
```

---

## Background

```
#F8F9FC
```

---

## Surface

```
#FFFFFF
```

---

## Border

```
#ECECF3
```

---

## Text Primary

```
#22252F
```

---

## Text Secondary

```
#6C7282
```

---

## Shadows

Never use harsh shadows.

All shadows must be soft.

Low opacity.

Large blur radius.

Minimal spread.

---

# Typography

Font Family

Space Grotesk

Weights

- 400
- 500
- 600
- 700

Do not introduce secondary fonts.

Typography is one of the strongest parts of Kumix's identity.

---

# Border Radius

Only use predefined values.

```
xs = 8px

sm = 12px

md = 18px

lg = 24px

xl = 32px
```

Never invent arbitrary radius values.

---

# Spacing System

Use an 8px grid.

Allowed spacing values

```
4
8
12
16
24
32
40
48
56
64
80
96
128
```

Avoid random spacing.

Consistency is more important than visual perfection.

---

# Elevation

Only four elevation levels exist.

Surface

Raised

Floating

Overlay

Never create additional elevation levels.

---

# Motion

Animations should be subtle.

The user should feel them rather than notice them.

Duration

```
120ms

180ms

250ms

350ms
```

Preferred easing

```
ease-out
```

or

```
cubic-bezier(.2,.8,.2,1)
```

Avoid bounce animations.

Avoid exaggerated transitions.

---

# Skeletons

Every asynchronous view must provide skeleton loading.

Skeletons should preserve layout stability.

No layout shift should occur after loading.

Skeletons should mimic the final content.

Never use spinners when skeletons are appropriate.

---

# Icons

Use one icon library across the project.

Recommended:

Lucide

Icons should always use rounded visual language.

Avoid mixing icon packs.

---

# Components

Every component must belong to the design system.

Never create one-off components.

If a pattern appears twice, extract it.

Every component must be reusable.

---

# Accessibility

Accessibility is mandatory.

Always:

- keyboard navigable
- proper focus states
- semantic HTML
- aria labels where needed
- visible focus ring
- sufficient contrast

Accessibility is never optional.

---

# Responsive Design

Desktop-first experience.

Fully responsive.

Layouts should gracefully adapt.

Avoid mobile-only patterns.

Every screen must work from mobile to ultrawide displays.

---

# Architecture

Architecture follows Screaming Architecture.

The project structure must communicate business domains instead of technologies.

Preferred structure

```
src/

    app/

    core/

    features/

        json/

        pdf/

        image/

        excel/

        calculator/

        settings/

        search/

    shared/

        ui/

        hooks/

        utils/

        services/

        constants/

        types/

        lib/

    styles/
```

A new contributor should understand what Kumix does by reading folder names.

---

# Barrel Exports

Always use barrel exports.

Every directory exposing public modules must contain an index.ts.

Imports should never reach internal implementation files.

Public APIs should remain stable.

---

# Naming

Everything must be written in English.

Variables

Functions

Components

Types

Enums

Constants

Folders

Commits

Everything.

---

# Development Style

Think first.

Code second.

Never generate code immediately.

Always understand the problem.

Always identify reusable abstractions.

Avoid premature optimization.

Avoid unnecessary abstractions.

Every implementation should maximize readability.

The simplest correct solution is preferred.

---

# Code Style

Modern TypeScript only.

Strict typing.

Avoid "any".

Prefer inference when possible.

Use readonly where appropriate.

Prefer const.

Prefer pure functions.

Avoid mutable state whenever possible.

---

# Comments

Do not write comments.

The code must explain itself.

Choose expressive names.

Extract logic when needed.

Readable code is preferred over commented code.

---

# Next.js

Leverage Next.js to its fullest.

Use:

- App Router
- Route Groups
- Server Components by default
- Client Components only when necessary
- Server Actions where appropriate
- Metadata API
- Dynamic routes
- Suspense
- Streaming
- Lazy loading
- Parallel routes when beneficial

Do not use Client Components unless interaction requires them.

Server-first architecture is preferred.

---

# Performance

Performance is a feature.

Minimize JavaScript.

Prefer server rendering.

Lazy load expensive modules.

Optimize images.

Avoid unnecessary rerenders.

Avoid unnecessary dependencies.

Every dependency must justify its existence.

---

# State Management

Prefer local state.

Then URL state.

Then server state.

Global state is the last resort.

Avoid over-engineering.

---

# Error Handling

Errors should be graceful.

Never expose technical errors to users.

Every error should provide a clear recovery path.

---

# Empty States

Every empty state should help the user.

Explain what happened.

Explain what to do next.

Never leave blank screens.

---

# Loading States

Every loading state should feel intentional.

Prefer skeletons.

Avoid flashing.

Maintain layout stability.

---

# Design Consistency

Every page must feel like it belongs to Kumix.

Users should never wonder whether they changed applications.

Consistency is more important than novelty.

---

# AI Development Rules

Before implementing anything:

1. Understand the request.
2. Analyze the existing architecture.
3. Identify reusable components.
4. Verify consistency with the design system.
5. Produce an implementation plan.
6. Only then write code.

The AI should never rush implementation.

Planning is mandatory.

---

# Guiding Principle

Every line of code, every component and every interaction should answer one question:

> Does this make Kumix feel faster, friendlier and more useful?

If the answer is no, it does not belong in the project.