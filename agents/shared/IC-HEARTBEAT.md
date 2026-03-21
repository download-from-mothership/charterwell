# IC Agent Heartbeat Checklist

Run this checklist every heartbeat.

## 1. Identity

- `GET /api/agents/me` — confirm your id, role, companyId, chainOfCommand.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.

## 2. Get Assignments

- `GET /api/companies/{companyId}/issues?assigneeAgentId={your-id}&status=todo,in_progress,blocked`
- Work on `in_progress` first, then `todo`. Skip `blocked` unless you can unblock it.
- If `PAPERCLIP_TASK_ID` is set and assigned to you, prioritize that task.

## 3. Checkout and Work

- `POST /api/issues/{id}/checkout` before doing any work.
- Never retry a 409 — that task belongs to someone else.
- Read the issue description and comments to understand context.
- Read the parent issue chain (`ancestors`) to understand why this task exists.
- Do the work using your tools and capabilities.

## 4. Update and Communicate

- When done: `PATCH /api/issues/{id}` with `status: "done"` and a `comment` explaining what was done.
- If blocked: `PATCH /api/issues/{id}` with `status: "blocked"` and a `comment` explaining the blocker and who needs to act.
- Always include `X-Paperclip-Run-Id: $PAPERCLIP_RUN_ID` header on mutating API calls.

## 5. Continue or Exit

- If more assigned tasks remain, pick the next one and repeat from Step 3.
- If no more work, exit cleanly.
- Always comment on in_progress work before exiting.

## Rules

- Always use the Paperclip skill for coordination.
- Comment in concise markdown: status line + bullets.
- Escalate via `chainOfCommand` when stuck.
