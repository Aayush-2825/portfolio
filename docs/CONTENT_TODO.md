# Content TODOs

These are every `TODO(aayush)` marker currently present in the data source files. No values were added or changed.

## Profile

| File | Field | TODO |
| --- | --- | --- |
| `data/profile.ts` | `links.resume` | Add the resume file at the referenced path. |
| `data/profile.ts` | `links.email` | Add an email address. The contact email button stays hidden while this is empty. |
| `data/profile.ts` | `siteUrl` | Add the production domain for canonical, Open Graph, and sitemap metadata. |

## Projects

| File | Field | TODO |
| --- | --- | --- |
| `data/projects.ts` | `dozo.links.live` | Confirm the exact live URL and whether it is public. |
| `data/projects.ts` | `dozo.links.repo` | Add a repository only if it is public. |
| `data/projects.ts` | `dozo.images` | Add real screenshots in `public/projects/dozo/`. |
| `data/projects.ts` | `dozo.caseStudy.features[0]` | Confirm whether Instant booking is built. |
| `data/projects.ts` | `dozo.caseStudy.architecture.note` | Correct the intended relationships against the real v2 design. |
| `data/projects.ts` | `dozo.caseStudy.decisions[0].body` | Add why the move to PostgreSQL with Drizzle was chosen. |
| `data/projects.ts` | `dozo.caseStudy.decisions[1].body` | Add which realtime features need Redis and WebSockets, and why. |
| `data/projects.ts` | `dozo.caseStudy.decisions[2].body` | Add the monorepo layout and deployment reasoning for Turborepo and Docker. |
| `data/projects.ts` | `dozo.caseStudy.challenges` | Add the real challenges. |
| `data/projects.ts` | `dozo.caseStudy.tradeoffs` | Add the real tradeoffs. |
| `data/projects.ts` | `dozo.caseStudy.future` | Add what is next after pre-incubation. |
| `data/projects.ts` | `viewproof.role` | Confirm the role wording, including whether this was solo building. |
| `data/projects.ts` | `viewproof.links.repo` | Add the repository if it is public. |
| `data/projects.ts` | `viewproof.images` | Add real screenshots of the live app. |
| `data/projects.ts` | `viewproof.caseStudy.problem` | Confirm that the problem framing is accurate. |
| `data/projects.ts` | `viewproof.caseStudy.architecture.note` | Confirm the collections and how client access is granted. |
| `data/projects.ts` | `viewproof.caseStudy.decisions[0].body` | Add the reasoning for Firestore. |
| `data/projects.ts` | `viewproof.caseStudy.decisions[1].body` | Add the reasoning for Cloudinary. |
| `data/projects.ts` | `viewproof.caseStudy.decisions[2].body` | Explain how photographer and client access differ. |
| `data/projects.ts` | `viewproof.caseStudy.challenges` | Add the real challenges. |
| `data/projects.ts` | `auth-backend.status` | Confirm whether the status is LIVE, IN_PROGRESS, or EXPERIMENTAL. |
| `data/projects.ts` | `auth-backend.images` | Add real API screenshots, Postman or Bruno output, or a real diagram. |
| `data/projects.ts` | `auth-backend.caseStudy.architecture.note` | Verify where 2FA sits and where refresh tokens are stored. |
| `data/projects.ts` | `auth-backend.caseStudy.decisions[0].body` | Add refresh-token rotation and reuse-detection behavior. |
| `data/projects.ts` | `auth-backend.caseStudy.decisions[1].body` | Explain which responsibilities use sessions and which use JWT. |
| `data/projects.ts` | `auth-backend.caseStudy.decisions[2].body` | Add the Zod schema and rate-limit policy reasoning. |
| `data/projects.ts` | `auth-backend.caseStudy.challenges` | Add the real challenges. |
| `data/projects.ts` | `swabhimaan.status` | Confirm whether the status is LIVE or IN_PROGRESS. |
| `data/projects.ts` | `swabhimaan.role` | Confirm the role wording. |
| `data/projects.ts` | `swabhimaan.links.live` | Add the live URL if one exists. |
| `data/projects.ts` | `swabhimaan.images` | Add real screenshots. |
| `data/projects.ts` | `swabhimaan.caseStudy.architecture.note` | Confirm the revalidation approach and deployment location. |
| `data/projects.ts` | `swabhimaan.caseStudy.decisions[0].body` | Add the reasoning for Payload CMS with MongoDB. |
| `data/projects.ts` | `swabhimaan.caseStudy.decisions[1].body` | Add the reasoning for ISR on content pages. |
| `data/projects.ts` | `swabhimaan.caseStudy.decisions[2].body` | Add the reasoning for Cloudflare R2. |
| `data/projects.ts` | `multi-agent-debugging.stack` | Confirm the intended stack. |

## Skills

| File | Field | TODO |
| --- | --- | --- |
| `data/skills.ts` | `aiML.completed[0]` | Add the certificate URL and completion date if they should be shown. |
