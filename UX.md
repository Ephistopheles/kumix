# UX.md

# Kumix User Experience Guidelines

This document defines the user experience standards of Kumix.

Unlike AGENTS.md, which defines engineering and architecture, this document defines how Kumix behaves.

Every interaction should feel like it belongs to the same application.

Users should never need to learn how to use a new tool.

Learning one tool means understanding every tool.

---

# UX Philosophy

Kumix exists to eliminate friction.

The interface should disappear behind the user's task.

Every interaction should feel:

- obvious
- calm
- fast
- predictable

The goal is not to impress users.

The goal is to let users finish their task as quickly as possible.

---

# Core Principles

## Speed

Every action should feel immediate.

Feedback should happen instantly.

The application should always acknowledge user actions.

---

## Simplicity

Never present unnecessary controls.

Only expose advanced options when needed.

The default experience should satisfy most users.

---

## Consistency

Every page follows the same interaction model.

Buttons behave the same.

Dialogs behave the same.

Dropzones behave the same.

Errors behave the same.

Loading behaves the same.

---

## Progressive Disclosure

Advanced functionality should never overwhelm beginners.

Simple by default.

Powerful when needed.

---

# Standard Tool Layout

Every tool must follow this structure.

```
────────────────────────────────────

Breadcrumb

Tool Title

Short Description

────────────────────────────────────

Main Workspace

────────────────────────────────────

Primary Actions

────────────────────────────────────

Results

────────────────────────────────────

Related Tools

────────────────────────────────────
```

Users should immediately recognize where they are.

Never reinvent layouts.

---

# Header

Contains:

- Tool name
- Short description
- Optional badge (New, Beta)

Never place actions inside the header.

---

# Main Workspace

The workspace is where users interact.

Examples

- Dropzone
- Text editor
- Input fields
- Preview
- Canvas

This area should receive the most visual attention.

---

# Primary Actions

Primary actions always appear below the workspace.

Examples

- Convert
- Generate
- Merge
- Validate
- Format

There should only be one primary action.

Avoid multiple competing buttons.

---

# Secondary Actions

Examples

- Copy
- Download
- Reset
- Clear
- Upload another file

Secondary actions should never compete visually with the primary action.

---

# Results

Results should appear directly below the actions.

Never redirect users to another page.

Results should replace placeholders naturally.

---

# Related Tools

Every tool page reserves space for related tools.

Initially this section can contain placeholders.

Future examples

JSON Formatter

↓

Related

- XML Formatter
- YAML Formatter
- Base64 Decoder

This improves discoverability.

---

# Command Palette

Shortcut

```
Ctrl + K
```

Purpose

Search the entire platform instantly.

Users should be able to type

```
json
```

or

```
password
```

or

```
pdf
```

and navigate immediately.

The command palette should eventually become the fastest way to use Kumix.

---

# Intelligent Suggestions

Kumix may recognize user input.

Suggestions must never interrupt the workflow.

Example

User pastes Base64.

Suggestion

"We detected Base64."

Actions

- Decode
- Encode

Users remain in control.

Suggestions are optional.

They never execute automatically.

---

# Drag & Drop

Every upload tool should support drag & drop.

The dropzone should visually react.

States

- Idle
- Hover
- Dragging
- Processing
- Completed
- Error

All upload tools must behave identically.

---

# Input Validation

Validation should happen as early as possible.

Errors should be friendly.

Never blame the user.

Bad

"Invalid input."

Good

"This doesn't appear to be valid JSON."

---

# Empty States

Every empty state should explain:

- What this tool does.
- How to begin.
- What input is expected.

Never show blank screens.

---

# Loading

Loading should preserve layout.

Prefer skeletons.

Avoid full-page loading indicators.

Only show progress bars when progress can actually be measured.

---

# Success Feedback

Every successful action should provide feedback.

Examples

- File converted.
- Password copied.
- JSON validated.

Feedback should be subtle.

Never interrupt the user.

---

# Error Feedback

Errors should explain

- What happened.
- Why.
- How to fix it.

Users should always have a recovery path.

---

# Copy Actions

Whenever content can be copied:

- Show Copy button.
- Confirm after copying.
- Never open dialogs.

Preferred feedback

"Copied"

Duration

About two seconds.

---

# Download Actions

Downloads should begin immediately.

Never require confirmation unless destructive.

Downloaded filenames should be meaningful.

Examples

formatted.json

merged.pdf

colors.png

password.txt

---

# Forms

Forms should remain minimal.

Prefer:

One column

Over

Multiple columns

Only group fields when relationships are obvious.

---

# Inputs

Labels always visible.

Never rely solely on placeholders.

Provide helper text only when necessary.

---

# Buttons

One Primary

Optional Secondary

Optional Ghost

Avoid excessive button variations.

Primary actions should always be easy to identify.

---

# Dialogs

Dialogs should only appear when necessary.

Examples

Delete

Overwrite

Reset

Never interrupt successful workflows.

---

# Notifications

Use lightweight toast notifications.

Duration

Approximately three seconds.

Do not stack excessive notifications.

---

# Keyboard Navigation

Every interactive element must be reachable.

Keyboard users should enjoy the same experience.

Support

Tab

Shift + Tab

Enter

Escape

Space

---

# Focus States

Focus indicators must always remain visible.

Never remove outlines without replacing them.

Accessibility is mandatory.

---

# Mobile Experience

Mobile should feel native.

Avoid horizontal scrolling.

Stack panels vertically.

Primary actions remain easily reachable.

---

# Desktop Experience

Desktop should prioritize workspace.

Avoid oversized margins.

Use available space efficiently.

---

# Page Transitions

Transitions should feel smooth.

Avoid dramatic animations.

Navigation should feel instant.

---

# Scroll Behavior

Users should rarely need long scrolling.

Keep important actions above the fold whenever possible.

---

# Performance Perception

Even when processing takes time, users should feel progress.

Show:

- skeletons
- progress
- previews

Never freeze the interface.

---

# Trust

Kumix should communicate trust.

Never surprise users.

Never hide actions.

Never perform destructive operations automatically.

Privacy should always be respected.

---

# Favorites (Future)

Users will eventually favorite tools.

Favorites should always remain one click away.

---

# Recent Tools (Future)

Recently used tools should appear on the homepage.

Users should continue where they left off.

---

# Search

Search should tolerate mistakes.

Examples

User types

```
jsn
```

Should still find

JSON Formatter.

Search should prioritize relevance over exact matches.

---

# Homepage Philosophy

The homepage is not a dashboard.

It is an entry point.

Users should immediately answer one question:

"What do you need to do today?"

Search should be the primary focus.

Categories come second.

Featured tools come third.

---

# Design Consistency

Every tool should feel like another room inside the same house.

Not another website.

---

# Final Principle

Users should never think about Kumix.

They should only think about solving their task.

The interface exists to remove friction, not create it.