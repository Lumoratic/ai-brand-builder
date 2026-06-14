# Pflio — Engineering Handoff & Onboarding

This document orients a new engineer to the **ai-brand-builder** codebase (product name: **Pflio**). It describes what exists today, how the pieces fit together, what is in scope for the current MVP, and where to go next.

Read this before touching application code. It is the primary onboarding reference (the repo `README.md` is still default Next.js boilerplate).

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Supabase (Postgres + Auth + Storage), Zustand, Groq (AI).

---

## How to Use This Document

1. Read **Project Vision** and **Product Philosophy** to understand the asset model (not a single shared profile).
2. Skim **Current MVP Scope** and **Out of Scope Features** so you know what to build and what to defer.
3. Use **Asset Architecture**, **Database Schema Summary**, and **Current Routes** as reference while navigating the codebase.
4. Follow **Local Development** at the bottom to run the app locally.
5. Check **Existing Technical Debt** and **Known Bugs / Open Issues** before starting a feature.
6. See **Next Recommended Milestone** for the suggested next delivery.

---

## Project Vision

Pflio is a **workspace-first, asset-based platform** for managing a professional online presence.

Users sign into one account and create **multiple independent assets**. Each asset is its own product instance with its own title, editor data, slug, and publish state. Assets are **not** generated from or tied to a single shared profile.

Supported asset types:

| Type | Purpose | Builder status |
|------|---------|----------------|
| **Resume** | Professional resume drafts | Create/delete in workspace; editor not built |
| **Portfolio** | Public-facing portfolio (projects, bio, skills, links) | Full asset-scoped editor + public URL |
| **Website** | Personal website drafts | Create/delete in workspace; editor not built |

Strategic direction:

1. **One account, many assets** — users can own many resumes, portfolios, and websites simultaneously.
2. **Workspace as home** — `/workspace` is the primary entry point for logged-in users; landing CTAs point here.
3. **Independent products** — Resume, Portfolio, and Website share account ownership only; each has its own `data` JSON and lifecycle.
4. **Publish when ready** — portfolio assets can be published to a public URL today; resume and website publishing will follow their editors.
5. **Own your presence** — data lives in Supabase with row-level security; users control create, edit, publish, and delete.

Landing copy: *"Build resumes, portfolios, and websites in one workspace. Manage multiple professional assets from one account."*

---

## Product Philosophy

These principles guide product and engineering decisions:

**Assets over profiles.** The forward-looking model is the `assets` table. A user's account is a container for zero or more assets. There is no concept of "one profile that spawns resume/portfolio/website." Each asset stands alone.

**Example account structure:**

```
Account (auth.users)
├── Resume A          ← independent row in assets (type: resume)
├── Resume B          ← independent row in assets (type: resume)
├── Portfolio A       ← independent row in assets (type: portfolio)
├── Portfolio B       ← independent row in assets (type: portfolio)
├── Website A         ← independent row in assets (type: website)
└── Website B         ← independent row in assets (type: website)
```

**Confirm before persist.** The workspace never writes to the database on page load or on button click alone. Create and delete require explicit user confirmation in a modal.

**Minimal surface area.** Ship one asset type end-to-end before expanding. Portfolio assets prove the pattern (workspace → editor → publish → public URL). Resume and website should follow the same pattern, not introduce new architectural concepts.

**Legacy coexistence, clear direction.** An older single-row `profiles` builder at `/builder` still works for backward compatibility. New work targets the asset model. Do not extend the legacy path unless fixing a regression.

**RLS as authorization.** Middleware checks authentication; Supabase row-level security enforces ownership and public read rules. Do not rely on client-side checks alone.

---

## Asset Architecture

### Concept

An **asset** is a user-owned record in the `assets` table. It represents one builder product instance — e.g. "Portfolio A" or "Resume B" — not a view derived from account-level profile data.

| Field | Role |
|-------|------|
| `id` | UUID primary key |
| `user_id` | Owner (FK → `auth.users`) |
| `type` | `resume`, `portfolio`, or `website` |
| `title` | Display name in workspace (user-chosen at creation) |
| `slug` | Optional URL slug, unique per user when set |
| `data` | JSONB editor payload (schema varies by type) |
| `is_published` | Whether the asset is publicly readable |
| `created_at` / `updated_at` | Timestamps (`updated_at` auto-maintained) |

Each asset row is fully self-contained. Portfolio assets store their editor content inside `data`; they do not read from or sync to a parent profile row.

### Type-specific `data`

**Portfolio** — schema v1 (`lib/assets/portfolio-data.ts`):

```json
{
  "version": 1,
  "publicUsername": "jane-doe",
  "profile": {
    "fullName": "",
    "jobTitle": "",
    "headline": "",
    "bio": "",
    "skills": "",
    "avatarUrl": "",
    "links": [],
    "projects": []
  }
}
```

- `publicUsername` — used in public URL `/u/[username]/portfolio/[slug]`
- `profile` — builder-shaped content stored **inside the asset**; the key name is historical (shared with legacy builder UI). It is not a reference to the `profiles` table.

**Resume** and **website** — currently `{}` on create. No dedicated editor, data schema, or public route yet.

### Client and server layers

| Path | Purpose |
|------|---------|
| `lib/assets/types.ts` | Asset types, labels, default titles |
| `lib/assets/asset-service.ts` | Client-side CRUD (Supabase browser client) |
| `lib/assets/asset-server.ts` | Server-side fetch for published portfolio assets |
| `lib/assets/mappers.ts` | Convert between DB rows and editor state |
| `lib/assets/portfolio-data.ts` | Portfolio `data` schema definition |
| `lib/assets/slug.ts` | Slug validation and sanitization |
| `components/workspace/*` | Workspace UI (list, create, delete) |

### CRUD operations (`asset-service.ts`)

| Function | Description |
|----------|-------------|
| `getUserAssets(userId)` | List assets for workspace, ordered by `updated_at` desc |
| `createAsset(userId, type, title?)` | Insert one asset; portfolio gets empty v1 `data` |
| `getAssetById(id)` | Load single asset (editor) |
| `updateAsset(id, updates)` | Patch title, slug, data, publish state |
| `deleteAsset(id)` | Hard delete (RLS: owner only) |
| `isAssetSlugAvailable(userId, slug, excludeAssetId?)` | Per-user slug uniqueness check |

### Legacy parallel model: `profiles`

Before assets, the app used a single **`profiles`** row per user for the portfolio builder at `/builder`:

- One profile per user (auto-created on signup via `handle_new_user`)
- Published at `/u/[username]` when `profiles.is_published = true`
- Synced via `useProfileSync` on `/builder`

This is **not** the asset model. It is legacy. The asset model is the forward direction. Both coexist intentionally; do not remove the legacy builder without a migration plan.

---

## Database Schema Summary

Migrations live in `supabase/migrations/`.

### `assets` (primary product data)

Multiple builder products per user.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | Default `gen_random_uuid()` |
| `user_id` | `uuid` | FK → `auth.users(id)` ON DELETE CASCADE |
| `type` | `text` | CHECK: `resume`, `portfolio`, `website` |
| `title` | `text` | |
| `slug` | `text` | Nullable; unique per `(user_id, slug)` when set |
| `data` | `jsonb` | Default `{}` |
| `is_published` | `boolean` | Default `false` |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | Auto-updated on write |

**Indexes:** `user_id`, `type`, partial `slug`; unique `(user_id, slug)` where slug is not null.

**Trigger:** `assets_set_updated_at` on UPDATE.

### `profiles` (legacy builder data)

One row per authenticated user. Stores legacy builder form data and public username.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | FK → `auth.users(id)` ON DELETE CASCADE |
| `full_name` | `text` | Default `''` |
| `role` | `text` | Job title |
| `tagline` | `text` | Headline |
| `bio` | `text` | |
| `skills` | `text` | |
| `avatar` | `text` | URL or data URL |
| `links` | `jsonb` | Default `[]` |
| `projects` | `jsonb` | Default `[]` |
| `username` | `text` | Nullable; lowercase URL slug |
| `is_published` | `boolean` | Default `false` |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | Auto-updated on write |

**Constraints:** `profiles_username_format` (lowercase, URL-safe pattern); unique partial index on `username` where not null.

**Triggers:** Auto-create profile on signup (`handle_new_user`); `updated_at` trigger on update.

**Functions:** `is_username_available(p_username, p_user_id)` — username uniqueness check (profiles).

### Storage: `avatars` bucket

Public read. Authenticated users upload/update/delete only under `{userId}/...`. Max 2 MB; JPEG, PNG, WebP.

### Row-level security (RLS)

**`public.assets`**

| Policy | Operation | Roles | Rule |
|--------|-----------|-------|------|
| Users can view own assets | SELECT | authenticated | `auth.uid() = user_id` |
| Users can insert own assets | INSERT | authenticated | `auth.uid() = user_id` |
| Users can update own assets | UPDATE | authenticated | `auth.uid() = user_id` |
| Users can delete own assets | DELETE | authenticated | `auth.uid() = user_id` |
| Anyone can view published assets | SELECT | anon, authenticated | `is_published = true` |

**`public.profiles`**

| Policy | Operation | Roles | Rule |
|--------|-----------|-------|------|
| Users can view own profile | SELECT | authenticated | `auth.uid() = id` |
| Users can insert own profile | INSERT | authenticated | `auth.uid() = id` |
| Users can update own profile | UPDATE | authenticated | `auth.uid() = id` |
| Users can delete own profile | DELETE | authenticated | `auth.uid() = id` |
| Anyone can view published profiles | SELECT | anon, authenticated | `is_published = true` |

**`storage.objects` (avatars bucket)**

| Policy | Operation | Roles | Rule |
|--------|-----------|-------|------|
| Public can view avatars | SELECT | public | `bucket_id = 'avatars'` |
| Users can upload own avatar | INSERT | authenticated | folder = `auth.uid()` |
| Users can update own avatar | UPDATE | authenticated | folder = `auth.uid()` |
| Users can delete own avatar | DELETE | authenticated | folder = `auth.uid()` |

---

## Current Routes

### Public

| Route | Description |
|-------|-------------|
| `/` | Landing page (workspace-first marketing) |
| `/login` | Supabase auth login |
| `/auth/callback` | OAuth callback |
| `/portfolio/demo` | Static demo portfolio |
| `/u/[username]` | Legacy published profile portfolio |
| `/u/[username]/portfolio/[slug]` | Published portfolio **asset** |

### Protected

Middleware redirects unauthenticated users to `/login?redirect=…` for these prefixes:

| Route | Description |
|-------|-------------|
| `/workspace` | Asset list, create, delete |
| `/builder` | Legacy profile-based portfolio builder |
| `/builder/portfolio/[id]` | Asset-scoped portfolio editor |

Protected prefixes are defined in `lib/auth/routes.ts`: `/builder`, `/workspace`.

### API

| Route | Description |
|-------|-------------|
| `/api/ai/improve-project` | AI project description improvement (Groq) |

### Middleware behavior (`middleware.ts`)

- Refreshes Supabase session on non-static routes
- Redirects unauthenticated users away from protected routes
- Redirects logged-in users away from `/login` (default target: `/builder`, or `redirect` query param)

---

## Workspace Flow

**Entry:** `app/workspace/page.tsx` → `WorkspaceView`

The workspace is read-only on load. It never creates assets implicitly.

### On load

1. Wait for auth (`useAuth`).
2. If logged in, call `getUserAssets(userId)` — **read only**, ordered by `updated_at` desc.
3. Render asset grid, empty state, or loading/error.
4. No assets are created on page load or refresh.

### Create flow

1. User clicks **Resume**, **Portfolio**, or **Website** in `CreateAssetButtons`.
2. `CreateAssetModal` opens with a title field (prefilled with default for that type).
3. **Cancel** or backdrop close → no database write.
4. **Create** → `createAsset(userId, type, title)` inserts one row; new asset prepended to local list.
5. Double-submit prevented via `createInFlightRef` and disabled buttons while creating.
6. Portfolio assets get empty v1 `data` via `createEmptyPortfolioAssetData()`; resume/website get `{}`.
7. User stays on workspace after create (must click portfolio card to open editor).

### Delete flow

1. Each `AssetCard` has a subtle trash action.
2. Click opens `DeleteAssetModal` with asset title and type.
3. **Cancel** → no change.
4. **Delete** → `deleteAsset(id)`; asset removed from local list (RLS ensures owner-only delete).
5. Deleting one asset does not affect others.

### Navigation from workspace

- **Portfolio cards** are clickable → navigate to `/builder/portfolio/[id]`.
- **Resume** and **website** cards are display-only (no editor route yet).

### Sync isolation

`useProfileSync` is disabled on `/workspace` (and on `/u/*` and `/builder/portfolio/*`) so visiting the workspace does not trigger profile saves or accidental writes.

---

## Public Routes

### Asset portfolio — `/u/[username]/portfolio/[slug]` (target model)

- **Data source:** `assets` table (`type = 'portfolio'`)
- **Query:** `slug` + `is_published = true`, then validates `data.publicUsername` matches URL username
- **Server:** `fetchPublishedPortfolioAsset()` in `lib/assets/asset-server.ts`
- **UI:** `PortfolioProfileHydrator` + `PortfolioPageContent`
- **Note:** Username comes from asset JSON (`data.publicUsername`), not from the `profiles` table

### Legacy profile portfolio — `/u/[username]`

- **Data source:** `profiles` table
- **Query:** `username` match + `is_published = true`
- **Server:** `fetchPublishedProfileByUsername()` in `lib/profile/profile-server.ts`
- **UI:** Same portfolio components as asset route
- **Note:** Legacy path; new portfolios should use the asset route above

### Demo

- `/portfolio/demo` — static example, not tied to database

### Not yet public

- Resume and website assets have no public routes.
- Unpublished assets are not readable by anonymous users (RLS blocks SELECT unless `is_published = true`).

---

## Current Builders

### 1. Asset portfolio builder — `/builder/portfolio/[id]` (target model)

- **Shell:** `PortfolioAssetShell`
- **Mode:** `variant="asset"` on `BuilderWorkspace`
- **Data:** `assets` row via `useAssetSync` — loads asset by ID from URL, hydrates Zustand store
- **Publish:** `PublishSettings` with `mode="asset"` — username + slug on asset, publish to `/u/[username]/portfolio/[slug]`
- **Features:** Full form (bio, skills, projects, links, avatar upload), live preview, AI project improvement, debounced auto-save (~900 ms)
- **Access:** Protected route; RLS restricts load/update to asset owner
- **Error handling:** Loading and error states with link back to `/workspace`

### 2. Legacy profile builder — `/builder` (backward compatibility)

- **Mode:** `variant="legacy"` on `BuilderWorkspace`
- **Data:** `profiles` table via `useProfileSync`
- **Publish:** `PublishSettings` with `mode="profile"` — username on profile row, publish to `/u/[username]`
- **Features:** Same editor UI as asset builder; saves to `profiles` columns
- **Status:** Fully functional; kept for backward compatibility; not the forward path

### 3. Resume builder — not built

- Workspace can create resume assets (title + empty `data`).
- No editor route, no public route, no data schema.

### 4. Website builder — not built

- Same as resume: create-only in workspace, no editor or public surface.

### Shared infrastructure

- **State:** `lib/stores/builderStore.ts` (Zustand) — profile fields, sync status, editor mode (`legacy` | `asset`), active asset ID, portfolio slug
- **Sync hooks:** `ProfileSync` component (in `AuthShell`) runs `useProfileSync` + `useAssetSync` globally
- **AI:** `/api/ai/improve-project` — used from portfolio project editor only

---

## Current MVP Scope

What is **in scope and working today**:

| Area | Status |
|------|--------|
| Supabase auth (login, callback, session middleware) | Working |
| Workspace: list, confirm-before-create, confirm-before-delete | Working |
| Asset CRUD (client-side, RLS-protected) | Working |
| Portfolio asset editor (`/builder/portfolio/[id]`) | Working |
| Portfolio asset publish + public URL | Working |
| Legacy profile builder (`/builder`) + public URL | Working (legacy) |
| Landing page (workspace-first positioning) | Working |
| AI project description improve (portfolio editor) | Working |
| Avatar upload (Supabase storage) | Working |
| Resume / website asset stubs (create + delete only) | Partial |

What is **explicitly next** (see milestone section): resume builder following the portfolio asset pattern.

---

## Out of Scope Features

Do not build or propose these unless product direction explicitly changes. They are outside the current MVP:

- Template marketplaces or theme stores
- Analytics dashboards or visitor tracking
- AI chatbots or conversational assistants
- Social feeds, comments, or follower systems
- Multi-user collaboration or team workspaces
- Billing, subscriptions, or payment flows
- Custom domains or DNS management
- Email campaigns or notification systems
- Resume/website builders (until their milestone is scheduled)
- Migrating or removing legacy `/builder` without an approved plan

Stay focused on completing independent asset types one at a time within the existing workspace → editor → publish pattern.

---

## Existing Technical Debt

### Architecture

- **Dual data models** — profile and asset portfolios share UI but use different tables, sync hooks, and public URLs. Changes to portfolio UI may need updates in both paths until legacy is deprecated.
- **Portfolio `data` versioning** — only v1 is implemented; unknown versions fall back to empty data in mappers.
- **Historical naming** — portfolio asset JSON uses a `profile` key for editor content; this refers to in-asset data, not the `profiles` table. Confusing for new engineers.
- **Shared builder store** — legacy and asset editors share `builderStore`; editor mode (`legacy` | `asset`) disambiguates but increases coupling.

### Implementation

- **No server actions for assets** — CRUD uses client Supabase; acceptable with RLS but less ideal for SSR mutations.
- **Slug/username validation** — client-side checks plus DB constraints; asset slug uniqueness is per-user, profile username is global.
- **Public asset fetch** — portfolio asset public page does not join `profiles`; username comes from `data.publicUsername` inside the asset JSON.
- **No soft delete** — asset delete is hard delete from Supabase.
- **Minimal UI primitives** — workspace modals are custom overlays, not a shared Dialog component library.
- **Storage** — avatars bucket only; no asset-specific file storage beyond avatar URLs in JSON.
- **README** — still default create-next-app boilerplate; this handoff doc is the primary onboarding reference.

### Security / ops

- RLS is the main authorization layer; middleware only checks authentication, not resource ownership (ownership enforced by Supabase policies).
- Requires `.env.local` with Supabase URL and anon key (`hasSupabaseEnv()` gates sync when missing).

---

## Known Bugs / Open Issues

### Product / UX (open)

| Issue | Impact |
|-------|--------|
| Two portfolio systems coexist (legacy `/builder` vs workspace assets) | Users may not know which path to use; landing favors workspace/assets |
| Post-login redirect defaults to `/builder`, not `/workspace` | Inconsistent with workspace-first positioning |
| Resume and website assets can be created but not edited or published | Expected gap until builders ship; may confuse users who create them |
| No auto-navigation to editor after portfolio create | Intentional; user must click the card (may feel incomplete) |

### Recently fixed (for context)

| Issue | Resolution |
|-------|------------|
| Opening `/workspace` could trigger accidental asset creation | Fixed: profile sync disabled on `/workspace`; confirm-before-create modal |
| Accidental assets could not be deleted | Fixed: delete with confirmation on each card |
| Portfolio card navigation race | Fixed: navigate before state update |

### Technical (open)

| Issue | Impact |
|-------|--------|
| Asset sync and profile sync both run globally via `ProfileSync` | Must keep route guards correct when adding new routes |
| Login `redirect` default is `/builder` in middleware | New users land on legacy builder after auth |

---

## Next Recommended Milestone

**Milestone: Resume builder MVP (asset-scoped, workspace-integrated)**

**Why:** Portfolio assets already prove the full loop (workspace → editor → publish → public URL). Resume is the next marketed asset type with create-only stubs in place. Delivering it validates the independent-asset pattern for a second product type.

**Suggested scope:**

1. Define resume `data` schema v1 in `lib/assets/` (start minimal: contact, summary, experience, education, skills).
2. Add `/builder/resume/[id]` — mirror portfolio shell pattern (`ResumeAssetShell`, dedicated sync hook or generalized asset sync).
3. Wire workspace: resume cards navigate to the new editor route.
4. Add publish or export path for resume (read-only public page or PDF export — pick one minimal option for v1).
5. Document legacy `/builder` status in UI copy or internal docs; do not remove without migration plan.

**After resume MVP:**

- Website builder using the same asset pattern
- Consolidate or sunset legacy `/builder` + `profiles` publish path
- Change post-login default redirect from `/builder` to `/workspace`
- Shared Dialog/AlertDialog components for workspace modals
- Server-side asset mutations where appropriate

---

## Quick Reference: Key Files

| Area | Files |
|------|-------|
| Migrations | `supabase/migrations/*.sql` |
| Asset CRUD | `lib/assets/asset-service.ts` |
| Workspace UI | `components/workspace/WorkspaceView.tsx` |
| Create / delete modals | `components/workspace/CreateAssetModal.tsx`, `DeleteAssetModal.tsx` |
| Portfolio editor | `app/builder/portfolio/[id]/page.tsx`, `components/builder/PortfolioAssetShell.tsx` |
| Sync | `hooks/use-profile-sync.ts`, `hooks/use-asset-sync.ts`, `components/profile/ProfileSync.tsx` |
| Public fetch | `lib/profile/profile-server.ts`, `lib/assets/asset-server.ts` |
| Auth / routes | `middleware.ts`, `lib/auth/routes.ts` |
| Types | `lib/assets/types.ts`, `lib/profile/types.ts`, `lib/database.types.ts` |

---

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + typecheck
```

Apply Supabase migrations to your project, then set in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional: Groq API key for AI improve-project feature (see existing env usage in API route).

---

*Last updated: workspace confirm-before-create/delete UX, asset portfolio public routes, asset-first onboarding structure.*
