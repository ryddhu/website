> **Note (31 Oct 2026):** the faster rules replace "one slice live before the next", "three to six chunks", "one heavy job at a time" and "separate design-document PR". Use the "Faster rules" section in `AGENTS.md` instead. Customer-app guard: public release needs the owner's OK each time, staging first.

# Ryddhu Delivery Process

How Ryddhu builds software with AI, from idea to a tested release. It was worked out while building the AI Product Operating Platform (AIPOP), and it applies to every project: a new repository or an existing one.

**The rule in one line:** people decide and approve; AI drafts, builds and checks; nothing reaches users without a written requirement, tests, a review and a live check.

Last updated: 12 Oct 2026.

## 1. How to use this file

| You are starting | Do this first |
|---|---|
| A new product in a new repository | Section 2, from step 1 |
| Work on an existing repository | Section 3 (entry criteria), then section 2 from step 5 |
| One more feature in a project already set up | Section 2, steps 6 to 12, run as the slice loop in section 2.1 |
| A new AI session on any Ryddhu repository | Section 5.16 (how to resume), then the step the work is at |

Set up each repository so the process is followed without anyone remembering it:

- Copy or link this file into the repository (for example as `docs/delivery-process.md`).
- Add one line to the repository's AI instructions file (`CLAUDE.md` or `AGENTS.md`) telling every session to read this file first.
- Put the repository's own facts in a short rules file next to it: commands, runtime version, ports, test databases, and things never to touch (template 10.2).
- Keep a progress checklist in the repository (section 5.16).

When this file and a repository's own rules differ, the stricter one applies. When something goes wrong that this file did not prevent, add a row to the lessons in section 9.

## 2. The process, end to end

| # | Step | What is produced | Done by | Who approves |
|---|---|---|---|---|
| 1 | **Idea** | A one-page brief: what it is, who it is for, why now | Product Owner, AI may draft | Product Owner |
| 2 | **Requirements** | A master requirements document, and a small "pilot scope" to prove first | AI drafts, Product Owner corrects | Product Owner |
| 3 | **Traceability** | A requirements traceability matrix (RTM): every requirement, its status, its evidence | AI | Product Owner |
| 4 | **Design documents** | Domain model, states and workflows, role and permission matrix, AI permission matrix, architecture, database design, API contract, event list, integration, security, testing, deployment and operations plans, screens and wireframes, and a development plan | AI drafts, one document per pull request | Product Owner; Architect and Designer where there is one |
| 5 | **Scope and plan** | What is in and out of this increment, acceptance criteria that can be tested, and the build order | AI drafts | Product Owner |
| 6 | **Change request** for anything new | A written request with impact, effort and open choices. The documents it changes are updated before any code | AI drafts | Product Owner (merging it is the approval) |
| 7 | **Design of the slice, and its task file** | The data, rules, screens and events for the next slice, added to the design documents. Then a task file that splits the slice into three to six chunks | AI | Product Owner approves the design |
| 8 | **Build, one vertical slice at a time, chunk by chunk** | Working software: database, rules, screen, history and tests together. Each chunk runs in a fresh AI session through chunkflow, commits and pushes. The last chunk opens a draft pull request | AI agents, one fresh session per chunk | Nobody yet: it is a draft |
| 9 | **Verify** | Type check, lint, unit and integration tests, browser tests, an accessibility scan, a production build, a secret scan and a dependency check | Automatic (CI), and the last chunk before it | Automatic |
| 10 | **Review and merge** | A pull request that says what people can now do, what was checked, and what is not done | The main session reviews; a person approves | A person; AI never approves its own work |
| 11 | **Deploy** | A backup first, then the update, then a health check | The person responsible for the server, or the main session on their written go-ahead | The person responsible for the server |
| 12 | **Live retest and record** | A retest on the real server with test accounts, findings fixed, the RTM and progress checklist updated | The main session | Product Owner sees the result |

Steps 1 to 5 happen once per product. Steps 6 to 12 repeat for every slice.

Step 4 is built in the same order every time, because each document depends on the one before: domain model, then states and workflows, then roles and permissions, then AI permissions, then architecture, database, API contract, events, integration, security, testing, deployment and operations, screens, scope, and the development plan.

### 2.1 The slice loop (steps 7 to 12 in detail)

Every feature goes through this loop. The "main session" is the one AI session a person is talking to. It plans, launches, reviews and reports. It does not build the slice itself.

| # | Action | Who |
|---|---|---|
| 1 | Check where things stand: the progress checklist, `git log`, open pull requests, the server's health | Main session |
| 2 | Name the slice: one thing a person will be able to do, with the requirement and design sections it implements | Main session |
| 3 | Write the task file (template 10.1): what exists, what to build, the security checks, the test databases and port, and three to six chunks | Main session |
| 4 | Dry-run the task file and read the prompts it would send | Main session |
| 5 | Run the task with chunkflow in the background. Each chunk is a fresh session in the slice's own worktree and branch | chunkflow |
| 6 | Chunk 1: rules and data, with unit and integration tests. Commit and push | Agent |
| 7 | Chunk 2: services, with integration tests for every refusal. Commit and push | Agent |
| 8 | Chunk 3: screens, with browser tests and an accessibility scan. Commit and push | Agent |
| 9 | Last chunk, "finish": rebase on the main branch, generate the migration, run every check until all pass, update the RTM, open a draft pull request, wait for CI. It does not merge or deploy | Agent |
| 10 | Review the draft: read the diff, check the security list, look at screenshots, read the questions the agent left | Main session, then a person |
| 11 | Fix what the review found, on the same branch, then mark the pull request ready | Main session |
| 12 | Merge when CI is green | A person, or the main session on a standing go-ahead (section 5.5) |
| 13 | Deploy: backup, update, health check | Section 5.13 |
| 14 | Retest live with test accounts in the test product | Section 5.14 |
| 15 | Fix findings as a small follow-up pull request, through the same checks | Main session |
| 16 | Record: RTM, progress checklist, what test data was left, what is still open. Remove the slice's worktree and test databases | Main session |
| 17 | Report in a short step table, then start the next slice | Main session |

## 3. Entry criteria for an existing repository

An existing product has skipped the steps above, so it supplies an input for each one before delivery work starts. Each input is uploaded, linked, or drafted by AI from the code and then corrected and approved by the named person.

| Stage | Input the product must give | Approved by |
|---|---|---|
| Idea | One-page brief | Product Owner |
| Requirements | What the product does today | Product Owner |
| Features | The features already built, marked "existing" | Product Owner |
| Architecture | Parts, data, integrations, hosting | Architect |
| Design | Current screens and flows | Designer |
| Code | The repository, how to run it, how to test it, its branch rules | DevOps |
| Quality | Existing tests, the last test results, known defects | QA |
| Release | The version live today, and the environments | DevOps |
| Backlog | Open work, imported | Product Manager |
| Team | Who is Product Owner, Product Manager, and the release approvers | Company Administrator |

- Missing inputs may be waived by the Product Owner with a written reason. The brief, the feature list, the repository and the team cannot be waived.
- Imported items are labelled as a baseline accepted on a date. They are never shown as if they passed the original approvals.
- Before changing anything, read the code that is there, run its tests, and record what already fails.
- Follow the repository's own instructions and existing style. Extend what is there; do not replace it.

## 4. Conditions: when a step may start and when it is done

A step does not start until its entry condition is true, and is not reported as done until its exit condition is true.

| Step | May start only when | Is done only when |
|---|---|---|
| Requirements | The brief is approved | The Product Owner has approved the document as a whole, with the date recorded in it |
| Design documents | Requirements and the RTM are approved | Each document is approved and merged; open decisions are listed in it with a recommendation |
| Scope and plan | The design documents it relies on are approved | Every acceptance criterion can be tested |
| Change request | Someone has asked for something outside the approved scope | It is merged, and the documents it changes are updated |
| Task file | The requirement and the slice's design are approved and on the main branch | It names the requirement, the design sections, what exists, the security checks, the test databases and port, and the chunks |
| Build (a chunk) | The chunk before it is committed and pushed, and the branch builds | Its tests pass, and its work is committed and pushed to the task branch |
| Draft pull request | Every chunk is done and the branch is rebased on the main branch | Lint, type check, all tests and the build pass locally, and CI is green |
| Merge | CI is green, the review is done, and a person has approved | The main branch has the change and still passes CI |
| Any paid or live AI | A provider is chosen, a spending cap is set, and the key is created by the owner | The cap is in force and spending is tracked |
| Applying a migration to real data | A fresh backup exists, and the migration ran cleanly on a copy | The verification check passes after the real run |
| Deploy | The pull request is merged, the backup target is connected, and a fresh backup succeeded | The health check passes on the new version |
| Live retest | The server runs the new version | Every check passed or is listed as a finding; changed data is restored |
| Slice done | The live retest is finished | Everything in section 6 is ticked |
| Go live for real users | The security check is done and its findings are fixed or accepted in writing | The owner has said go |

Stop conditions. Work stops and a person is told when:

- A backup, migration, build or health check fails.
- A test that passed before now fails and the change was not meant to alter that behaviour.
- The approved documents do not answer a question that changes what is built.
- A step would need a secret, real data, a real provider, or a paid service that was not approved.
- A safety check refuses an action. Say what was refused and what permission would be needed. Do not look for a way round it.

## 5. Rules for every increment

### 5.1 Change control

- New scope is written down before it is built: what, why, impact, effort, open choices.
- A change to an approved rule (permissions, approvals, what AI may do) updates the rule document first.
- Every approved change is recorded in the RTM with its date.
- When advice and a decision differ, the document says so and names the risk.
- No scope creep. If something useful turns up during a slice, write it down as a proposal; do not build it.
- Ideas raised in conversation are listed as "no change request yet" until one is written.

### 5.2 Documents and approvals

- Every document has a status line: draft, or approved, by whom, on what date.
- A document names the versions of the documents it relies on.
- A rule that is new in a document is marked "proposed". A rule that rests on an unapproved draft says so.
- One document per pull request. A scope proposal comes first for a large document; the full document follows once the scope is approved.
- Decisions are asked as a short yes or no list, each with a recommendation and the reason. They are batched, not asked one at a time.
- A "yes" covers only what was asked. Approval of one decision is not approval of the whole document.
- Every decision is recorded where it applies (the document or the pull request) with its date.
- An approved planning document changes only through a change request.

### 5.3 Vertical slices

- Build one feature end to end (database, rules, screen, history, tests) and ship it before starting the next. Never build one layer across all features.
- A slice is small enough to finish, deploy and retest in one sitting.
- Each slice is its own branch and its own pull request, and leaves the main branch working.
- A large slice is split into a short ordered series (5a, 5b), each one shipped by itself.
- Shared foundations (scope, roles, audit, the first schema) are the one exception: they are built once, first, by one owner.

### 5.4 Chunk by chunk, in fresh sessions

- A slice is written as a task file with three to six chunks, and run with chunkflow. Each chunk runs in a new AI session, reads the task and the git history to see what earlier chunks did, does its one chunk, commits and pushes.
- Typical chunks: (1) rules and data with tests, (2) services with tests, (3) screens with browser tests, (4) finish: rebase, all checks, draft pull request.
- Each chunk finishes in one sitting and leaves the branch building.
- A long single session costs more, hits usage limits sooner, and hides the work. Do not use one to build a slice.
- The task file names the requirement, the design sections, what already exists, the security checks, and the test databases and ports it may use.
- Task files are kept beside the project, not inside the repository, unless the team wants them tracked.
- One task, one worktree, one branch. Tasks running in parallel then cannot collide.
- Dry-run a new task file first and read the prompts.
- Usage limits: the task file's handoff setting decides. `wait` sleeps until the limit resets and carries on (use it where there is no cloud credit). `cloud` hands the remaining chunks to a cloud session. `stop` saves and stops. In every case the work so far is saved as a `wip(...)` commit on the task branch, never on the main branch.
- A stopped run is restarted with the same command. It resumes at the right chunk and continues any uncommitted work.
- Check a run that has been quiet for longer than a chunk normally takes: its log, its process, and the chunk's output. Restart it if it has stopped.
- Chunks run with the automatic permission mode, so risky actions are still refused. Never run with permission checks switched off.
- Progress and each chunk's output are kept in a `.chunkflow/` folder beside the task file. Read them before reviewing the pull request.

### 5.5 Agents

What every agent follows, in every repository:

- **Own worktree and branch.** Never work in another task's worktree or in the main checkout. Never switch the branch of a folder a server is running from.
- **Own test databases and port**, named in the task, unique per worktree.
- **Stay in scope.** Edit only what the task covers. A shared list (routes, menu, permissions, labels) takes a one-line addition, nothing more.
- **Never the main branch.** An agent pushes only its task branch. It never merges, approves, marks a pull request ready, or changes repository or CI settings.
- **Never secrets or real data.** Do not read `.env` or key files. Do not print or commit a secret. Do not connect to a development or production database. Create no real accounts.
- **Fakes only.** No real AI provider, no real external service, no real network calls in tests.
- **Stop and ask.** If the approved documents do not answer something, choose the conservative option, and record it under "Questions for the Product Owner" in the pull request (five at most). If it needs a human decision before work can continue, stop and say so.
- **Follow the repository's own instructions and style**, and read the framework's current guide before writing code for it.
- **Label the work.** Commits and pull requests written by AI say so.

Kinds of agent and what each is for:

| Agent | Does | Never |
|---|---|---|
| Main session | Plans, writes task files, launches runs, reviews, reports, keeps the record | Builds a whole slice in one long session |
| Chunk agent | One chunk of one slice, in its worktree | Merges, deploys, touches other slices |
| Document agent | Drafts one planning document as a draft pull request | Marks it approved |
| Live tester | Tests the real server with test accounts in the test product | Changes real data |
| Fixer | Turns the tester's findings into small pull requests | Fixes things nobody reported |
| Advisor (product, design, subject expert) | Reviews and recommends, with reasons | Changes anything |

- Keep the tester, the fixer and the advisor separate. An agent that tests its own fix proves little.
- Use a sub-agent inside a session only when the work really is separate and large. Each one starts with no context and costs more.
- Run slices in parallel only when they touch different areas of the code. Fix the merge order beforehand; each one rebases and regenerates its migration before it merges.
- A pull request stacked on another has no CI of its own until it points at the main branch. Run CI by hand on the stack, or retarget it before review.
- **AI never approves.** A request for an agent to give the Product Owner's approval is declined, whoever asks.
- **Merging and deploying are a person's by default.** The owner may give a standing, written go-ahead for the main session to merge its own pull requests once CI is green and to run the server update. That hands over the action, not the decision: the owner approved the work when they approved the list. Chunk agents never get this.

### 5.6 Git and pull requests

- The main branch is protected: a required CI check, branches up to date before merge, no force push, no deletion. Where there is a second person, require their review.
- Branch names say what the work is: `feat/<slice>`, `fix/<what>`, `docs/<document>`.
- Commit messages follow one pattern: `feat(area): what`, `fix(area): what`, `docs(area): what`, `chore(deps): what`. Unfinished chunk work is `wip(area): what`.
- Every pull request opens as a draft. It is marked ready only after review.
- One pull request per slice or per document. Small and green beats large.
- The pull request says what a person can now do, the security checks, what differs from the design, what is not included, the test counts, and what to do after merge (template 10.3).
- Rebase on the main branch before the final checks.
- Remove the worktree when the slice is merged. Leftover worktrees go stale and mislead later sessions.
- Never commit a secret, a real `.env`, real data, or local tool folders.

### 5.7 Database

- Changes are additive: add tables and columns. Never rewrite history, never change an existing ID.
- Generate the migration last, after the final rebase. If the main branch gained a migration first, delete yours and generate it again.
- Never edit a migration that is merged.
- Each migration has a header comment saying what it adds and why.
- Add constraints only after existing rows are filled in.
- Before applying a migration to data that matters: back up, run it on a copy, then run it for real, then run a verification check that compares counts and relationships. If anything differs, restore and file a fix.
- Rules are enforced in the database as well as in the service where the rule says "can't be skipped".

### 5.8 Security in every slice

Check each on the server, and write a test for each refusal:

| Check | Question |
|---|---|
| Who | Does the server check the person's role and that the record is in their product? Hiding a button is not a check. |
| Others | Is another product's record "not found"? |
| Input | Is every field validated for type, length and allowed values, in the service and in the database? |
| Files | Is an upload checked for type by its content, for size, and for a declared size? Can one kind's limit be used to get round another's? |
| Stale page | Is a change from an out-of-date page refused? |
| Repeat | Does saving twice, or submitting again, leave the right state? |
| AI and system | Are non-person actors refused for every decision? |
| Two people | Where two people are required, is the second really a different person? |
| At the same time | What happens when two people do this at once? Test it. |
| Record | Does each accepted change write one history entry with the old and new value, in the same transaction, and a refused change none? |
| Private text | Are notes, secrets, file contents and personal data kept out of logs and history entries? |
| Skip | If the rule says "can't be skipped", is there truly no way round it, including straight in the database? |

Principles behind the list:

- **Deny by default.** Nothing is allowed unless a role grants it, and every check runs on the server.
- **Fail closed.** If a session, permission, switch, cap, secret or signature cannot be confirmed, the action is refused.
- **Separation of duties.** The person who asks is not the person who approves.
- **Keep it small.** Use what the platform already has. Add a security product only when a measured need appears.

Secure development, set up once per repository:

- CI on every pull request and on the main branch: lint, type check, tests, browser tests, production build.
- A secret scan over the full history, and a dependency check that fails on high or critical issues in what ships.
- CI has read-only access to the repository. Third-party CI actions are pinned to an exact commit.
- The runtime version is pinned and installs use the lock file.
- Security headers are set, and the server does not advertise what it runs on.
- Services listen only on the local machine; people reach the app through a private network or a proper front door, never an open port.

### 5.9 Testing

- Unit tests for rules and maths. Integration tests against a disposable test database for every command, permission and refusal. Browser tests for each screen.
- Test both sides of every rule: what it allows and what it refuses.
- Test the rule at the lowest level that can prove it, and again end to end for the main journeys.
- Run an accessibility scan in the browser test of every new or changed page, in light and dark.
- Never test against real data, real AI providers or real external services. Use fakes. Test data is made up.
- Test databases have names that mark them as disposable, and the test setup refuses any other name. That guard stays.
- Test secrets are throwaway values, plainly marked as test-only.
- When an existing test fails after a change, decide whether the behaviour change was intended. Update the test only if it was, and list it in the pull request with the reason.
- A green CI run shows the code builds and its tests pass. It is not QA evidence and does not replace the live retest.
- For anything visual, look at a screenshot before calling it done.
- Record what already fails before starting, so old faults are not mistaken for new ones.

### 5.10 Screens and design

- New screens use the design system from the start: its colours, spacing, and shared components. Do not add features on old styling and restyle later.
- Follow, in this order: what is already built in the new design, then the design specification and prototype, then the wireframes.
- A status is a word with a colour, never colour alone. Nothing relies on hover.
- Forms have labelled fields, visible focus, buttons that look like buttons, and errors shown beside the field.
- Every page works in light and dark, on a wide screen and on a phone with no sideways scroll, and meets WCAG 2.2 AA.
- A restyle changes appearance only: no change to behaviour, data, permissions, routes or wording. Labels and test hooks stay, so existing tests pass unchanged.
- A restyle pull request shows before and after screenshots, and lists what is still in the old style.
- A label or status must not claim more than the data supports.
- Show money in rupees, and dates and times in one consistent form.

### 5.11 AI

- AI drafts, suggests and builds. The assigned person approves at every stage. AI never approves, never deploys by itself, and never merges without the go-ahead in section 5.5.
- What AI may do is written down per kind of action: read, suggest, recommend and prepare drafts are allowed; acting outside a draft needs a listed permission and a dry run a person approves; approving and deploying are never allowed.
- A person starts every AI action. AI work is labelled, recorded with who asked for it, and costed.
- AI gets the least information the task needs, never secrets.
- There is an off switch for the company and for each product.
- A spending cap comes before any paid AI. The owner sets the number and creates the key. Until then the fake provider stays on.
- Prefer fixed-price seats over pay-per-use. Each person's own AI does their work; a shared, unattended agent uses a metered key with a cap. Never run a shared agent on one person's seat.

### 5.12 Dependencies

- Automatic update pull requests are on, weekly, grouped, with a small limit on how many are open.
- Merge patch and minor updates once CI is green.
- Check a major update first: does it build, lint and pass? If a tool it depends on does not support it yet, close it and tell the updater to skip that major.
- Ask the updater to refresh its own branch. Do not edit its branch by hand.
- The runtime's type package follows the runtime version the app runs on.
- After installing or upgrading a tool on a machine, check the runtime version still works.

### 5.13 Deployment and operations

- Pick a quiet time and tell people the app will be down for a few minutes.
- Check the backup target is connected before starting.
- Back up first. If the backup fails, stop. Do not hide a failing step: run each step so a failure stops the chain.
- The order is fixed: backup, stop the app, get the new version, install, migrate, build, start, health check.
- Use the same runtime version the server runs.
- After the update, check health, then retest live.
- Know how to undo a failed update before starting, and keep the steps written in a runbook.
- Backups run every night, are encrypted, are kept for a set number of days, and go to a drive other than the server's own disk. A missing backup drive is reported the same day.
- Do a restore drill. A backup nobody has restored is not a backup.
- Keep logs free of secrets and personal data.

### 5.14 Live retest

- Use test accounts, one per role, in a test product only. Never real data.
- Never print or store a password in a message, a log or a pull request.
- Check the main journey of the new slice in each role that may use it, and each refusal for a role that may not.
- Run the accessibility scan and the phone-width check on the live pages.
- Check the things only the live server shows: sign-in through the real address, security headers, what is reachable from outside, response times.
- Restore any data the test changed. Label the test data that is left, tidy up what you created, and say what you left behind.
- On real data, look only. Change nothing.
- A finding is fixed in a small follow-up pull request, or listed as open with its reason.

### 5.15 Cost and sessions

- Keep sessions short. Start a fresh one after each milestone; a long session re-reads its whole history at every step.
- Use the cheaper model for routine checks and the stronger one for building and review.
- Prefer the cheapest way that gets the work done, and give costs in rupees.
- Check the vendor's own page before relying on a price, a limit or a term.
- Keep the machine awake during a long run, and run it so it survives the editor closing.

### 5.16 Reporting and keeping the record

Reporting:

- Say what was done, what was verified, and what was not, in that order.
- Use a short step table (step, who, status) and one clear ask. Put the detail in documents, not in the message.
- Once the owner has approved a list of work, carry on down it. Do not ask "shall I?" at each step. Stop only for the things in section 8.
- Report mistakes plainly, with what was affected and what was changed so it does not repeat.
- Mark estimates as estimates. Give the source for any fact about another company's product or price.
- Check that a change is really there before reporting it as done.

The record, kept in the repository so any new session can pick up:

| File | Holds |
|---|---|
| Progress checklist | What is done, what is next, open questions, how to resume |
| Handoff notes | Where things stand, decisions with dates, open pull requests |
| RTM | Every requirement, its status and its evidence |
| Runbooks | Backup and restore, a failed update, an incident |

How to resume in a new session:

1. Read the progress checklist, then the handoff notes.
2. Check the main branch, the last few commits, and the open pull requests. Notes are a snapshot; the repository is the truth.
3. Check the server's health and which version it runs.
4. Check for runs still going or stopped, and worktrees left behind.
5. Pick up at the first item not done.

## 6. Definition of done for a slice

- [ ] The requirement and design sections it implements are named.
- [ ] Only what the slice covers was built; anything extra is written down as a proposal.
- [ ] It was built chunk by chunk in fresh sessions, in its own worktree and branch.
- [ ] Database change is additive, generated after the last rebase, and has a header comment.
- [ ] Every command checks role, product, input and stale page on the server.
- [ ] Every refusal has a test; AI and system actors are refused where a person must decide.
- [ ] One history entry per accepted change; none for a refused one.
- [ ] No secret, real data or real provider was used; nothing secret is committed.
- [ ] Unit, integration and browser tests pass; type check, lint and build are clean.
- [ ] Accessibility scan passes on new and changed pages, in light and dark, wide and phone.
- [ ] New screens use the design system; screenshots were looked at.
- [ ] Pull request says what people can now do, the security checks, what differs from the design, and what is not included.
- [ ] CI is green before merge, and a person approved.
- [ ] Backup taken, server updated, health checked.
- [ ] Live retest done; findings fixed or listed; changed data restored.
- [ ] RTM and progress checklist updated; worktree and test databases removed.

## 7. Who does what

| Role | Owns |
|---|---|
| Product Owner | What is built and in what order; approves requirements, the demo and releases |
| Product Manager | The sprint: planning, the daily stand-up, deferring work with a reason |
| Architect | The parts, the data and how they fit; approves the architecture |
| Designer | Screens and flows; approves the design |
| Developer | Building and estimating; their own tasks and daily update |
| QA | Test evidence; a story is not done without a passing test run |
| DevOps/Release | The release plan, the demo, the environments, the server |
| Company Administrator | People, roles, AI and integration settings |
| AI | Drafts, code, tests and checks, asked for by a named person |

The Product Owner and the Product Manager are different people. A release is approved by someone other than the person who asked. Where one person holds several roles for now, say so in writing and decide how a two-person rule is met before building it.

## 8. What only a person does

AI stops and asks for each of these, even when everything else is on a standing go-ahead:

- Approving a requirement, a design, a change request, a demo or a release.
- Choosing an AI provider, setting the spending cap, and creating the key.
- Creating or holding any password, key or secret; creating real user accounts.
- Paying for anything, or changing a plan or subscription.
- Changing repository settings, branch protection or CI permissions.
- Anything destructive: deleting data, rewriting history, dropping a real database, restoring over live data.
- Going live for real users, and inviting people.
- Waiving an entry criterion or accepting a security finding.

## 9. Lessons from building AIPOP

Each of these happened. The rule beside it is why it is in this file.

| What happened | Rule |
|---|---|
| A server update ran with the wrong runtime version and left the app stopped | Use the server's runtime version; check health after every update |
| A backup failed and the update carried on, because the command hid the failure | A failed step stops the chain; never hide an exit code |
| The backup drive was unplugged, so the nightly backup failed quietly | Check the backup target before deploying; report a missing drive the same day |
| Installing one tool upgraded another and broke the default runtime | Check the runtime version after installing or upgrading anything |
| A new chart page shipped with accessibility faults that only the live retest caught | Scan every new page in its browser test |
| A chart drew a line climbing from a false zero | Look at a screenshot of anything visual |
| Features were added on the old styling, and the pages looked like plain HTML beside the new ones | New screens use the design system from the start |
| Two people moving items at the same time could deadlock | Test what happens when two people act at once |
| A second save could undo a blocked flag | Test saving twice and submitting again |
| An upload with no declared size got past the size limit | Refuse what cannot be checked |
| A forecast said "On track" when nothing was estimated | A status must not claim more than the data supports |
| The live server had no security headers, found only in a live check | Check headers and what is reachable in the live retest |
| An edit to a document did not save, and the work was reported as done | Check that a change is really there before reporting it |
| A "yes" to one decision was recorded as approval of the whole document | A yes covers only what was asked |
| An agent was asked to approve on the owner's behalf | AI never approves, whoever asks |
| Slices were built in one long session instead of fresh sessions per chunk | Run each slice through chunkflow |
| A coordinating session grew so long that it used a large share of the usage limit | Fresh session after each milestone |
| A usage limit stopped an agent with many uncommitted files | Commit and push at the end of every chunk; save work in progress at a limit |
| Pull requests stacked on each other ran no CI | Run CI by hand on a stack, or retarget before review |
| A major version update broke lint because a tool did not support it yet | Check major updates before merging; skip the major until the tool catches up |
| Worktrees left behind held stale copies that later sessions read | Remove the worktree when the slice is merged |
| The owner was asked "shall I?" three times in a row for work already approved | Carry on down an approved list; stop only for what a person must do |
| A status message was too long to track | Short step table, one ask, detail in documents |
| A rule needing two different people was built for a team of one | Decide how a two-person rule is met before building it |
| A plan assumed one company's subscription covered its metered service | Check the vendor's own page before relying on a price or a term |

## 10. Templates

### 10.1 Task file for a slice (chunkflow)

```markdown
---
repo: ~/Projects/<repo>
workdir: ~/Projects/<repo>-<slice>
branch: feat/<slice>
base: main
handoff: wait
model: opus
permission: auto
rules: <path to the repository's rules file>
max_waits: 6
---
# <Slice name>
- Branch and pull request title: <names>.
- Requirement: <document and section>. Design: <documents and sections>.
- What exists: <files and tests to build on>.
- Build: <what a person will be able to do>.
- Not in scope: <what to leave alone>.
- Security, check each on the server and test it: <the list from 5.8 that applies>.
- Test databases and port this task may use: <names>.

## Chunks
1. Rules and data, with unit and integration tests.
2. Services, with integration tests for every refusal.
3. Screens, with browser tests and an accessibility scan.
4. Finish: rebase, generate the migration, run every check until all pass, update the RTM, push, open a draft pull request, wait for CI, drop the test databases. Do not merge or deploy.
```

### 10.2 Rules file for a repository

```markdown
## Rules for every chunk in <repo>
- What this is: <product>, <framework and versions>. Read <the framework's current guide> before writing code for it.
- Runtime version and how to run commands with it: <version, command>.
- Checks that must pass: <lint, type check, test, browser test and build commands>.
- Test databases and ports: use only the ones named in the task, set on every command.
- Never touch: <the development database, real records, scripts that connect to them, secret files>.
- Fakes: <which settings turn on the fake AI and fake services>.
- History: every accepted command writes its event in the same transaction; a refused one writes none.
- Unanswered questions: choose the conservative option and list it in the pull request, five at most.
- Never approve, merge, or mark a pull request ready. Never push to the main branch.
- How AI-written commits and pull requests are labelled: <lines>.
```

### 10.3 Pull request description

```markdown
## What a person can now do
## Security
## Differs from the design
## Not in this slice
## Tests
## Questions for the Product Owner
## After merge
```

### 10.4 Change request

```markdown
# Change request <number>: <name>
- What is asked, and why now.
- What it changes: requirements, design documents, screens, data, permissions, what AI may do.
- Effort, as an estimate, and what it delays.
- Risks, and where this differs from the advice given.
- Open choices, each with a recommendation: yes or no.
- Build order, as slices.
```

### 10.5 Decision list

```markdown
| # | Decision | Recommended | Why | Answer |
|---|---|---|---|---|
| 1 | <a question that can be answered yes or no> | Yes | <one line> | |
```

### 10.6 Status update

A short table of steps with their state, then what was found, then what needs a person. Lead with the result.

```markdown
| # | Step | Who | Status |
|---|---|---|---|
| 1 | <step> | <person or AI> | Done / Running / Waiting |

Found: <one or two lines>.
Needs you: <one ask, or "nothing">.
```
