# Copilot instructions

Instructions for GitHub Copilot working in this repository.

## Working rules for AI assistants (Claude, GitHub Copilot and others)

These rules apply to every AI assistant and agent in this repository. Where this repository has stricter rules of its own, the stricter rule applies.

### How to work

1. Follow the Ryddhu delivery process: `docs/delivery-process.md` if this repository has a copy. If it has none yet, say so before feature work.
2. One task per branch and pull request. Never push to `main`, never force-push, and never delete branches, files or data without the owner's OK.
3. Run the work end to end with agents. Ask the owner only for product decisions (what the product does, scope changes). Still stop for things only a person can do: keys, payments, repository settings, deleting, going live.
4. Pick the model by the job: Opus for review, security, architecture and requirements; Sonnet for building, fixing and testing; Haiku for tiny checks. Run one heavy job at a time.
5. Keep where things stand in `docs/progress-checklist.md` (if this repository uses one), so any new session can resume.

### How to write to the owner

6. Short, simple, plain words and short checklists. Skip technical detail unless asked.
7. After each task, show a progress bar per checklist, for example `Slices ██████░░░░ 6/10`.

### Safety

8. No real passwords, keys, tokens, bank data or patient data in chats, code, tests or commits.
9. No real personal details either: phone numbers, home addresses, Aadhaar, PAN or other ID numbers.
10. Never open, print or copy `.env` files or other secret files. Use `.env.example` with fake values.
11. Use only fake or sample data in the app, tests and screenshots.
12. If a task needs a real secret, real personal data or a `.env` file, stop and ask the owner first. Do not work around a blocked file.
13. If a secret shows up by mistake, say so at once so it can be changed.

### Test and log output (saves AI usage)

14. When running tests, builds, analyzers or emulators, show only the failures, errors and the final summary, not the full output. Read the full log only when the short version is not enough to find the cause.
