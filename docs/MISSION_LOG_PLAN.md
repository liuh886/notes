# Mission Log homepage rollout

Hao's Notes is moving from a conventional personal homepage toward a long-form mission log: a continuous primary narrative page that absorbs selected projects, repositories, research records, field observations, career trajectory, and contact paths while preserving the full archive pages in the background.

The goal is not to replace the site's visual identity. The goal is to preserve the existing restrained purple/white Hao's Notes brand and gradually make the homepage feel more like a precise, technology-forward field dossier.

## Navigation principle

Projects, Repositories, and CV remain live archive pages, but they should no longer dominate the top-level navigation. The homepage becomes the primary narrative surface; archive pages become supporting records.

## Subagent ownership

### UI / Design Systems subagent

Owns the Mission Log visual grammar:

- section labels such as `COVER / 00` and `CURRENT OPERATIONS / 01`
- purple accent language, thin dividers, quiet dossier-like surfaces
- homepage spacing, section rhythm, and mobile behavior
- visual restraint so the page does not become a SaaS dashboard or institutional portal

### Content / IA subagent

Owns the narrative structure:

- long-form reading order
- manual prioritization of selected deployments
- transformation of News into task log entries
- transformation of Publications into Research Record
- transformation of CV into stage-based Career Trajectory

### Frontend Architecture subagent

Owns safe implementation:

- keep al-folio as runtime only
- avoid copying theme layouts unless needed in a later dedicated PR
- prefer local data files and page-scoped CSS
- preserve archive URLs and redirects

### QA / Performance subagent

Owns regression prevention:

- update contract tests when adding new homepage structures
- keep keyboard focus, reduced motion, and mobile layout working
- preserve CI build and Pages deployment stability

## Rollout stages

### Step 1 — Mission Log UI shell

Introduce the homepage as a mission log without moving all content yet.

Scope:

- add `COVER / 00`
- add mission statement:
  - `Small systems, field notes, and decision tools.`
  - `Recorded from the edge of climate, geospatial intelligence, and AI productivity.`
- add a Mission Index
- hide Projects / Repositories / CV from top navigation while keeping their pages live
- add Mission Log CSS primitives to `hao-design.css`
- protect the new shell with style contract checks

PR target: `Introduce Mission Log homepage shell`

### Step 2 — Current Operations

Reframe the legacy News area as a task log.

Target section:

`CURRENT OPERATIONS / 01`

Scope:

- create `_data/current_operations.yml`
- replace dated news rhythm with operation entries
- each entry should include operation id, title, status, summary, and link
- keep tone concise and active

Example:

```text
OP-01
CCUS Policy Hub
LIVE / MAINTAINING
Expanding the public-facing policy and project intelligence layer for CCUS.
```

PR target: `Reframe News as Current Operations`

### Step 3 — Selected Deployments

Move selected Projects and Repositories into the homepage as manually prioritized deployed systems.

Target sections:

- `SELECTED DEPLOYMENTS / 02`
- `SELECTED DEPLOYMENTS / 03`
- `SELECTED DEPLOYMENTS / 04`

Scope:

- create or extend local data for selected deployments
- manually order by strategic importance, not by date or GitHub metadata
- include project/repo archive links, but do not list everything on the homepage
- keep `/projects/` and `/repositories/` as full archives

Primary candidates:

- CCUS Policy Hub
- Ownly
- FlappyK
- RhythmCoach
- iCal Pro
- AlphaEngine
- 4D Seismic Hub
- http-to-obsidian-cli-gateway

PR target: `Add Selected Deployments to Mission Log`

### Step 4 — Research Record

Reframe selected publications and deep research outputs as a research record.

Target section:

`RESEARCH RECORD / 05`

Scope:

- keep formal publications available
- present selected outputs as research records, not a citation list
- include CCUS / dMRV, geospatial systems, 4D seismic, climate and energy intelligence
- link to full publications archive where needed

PR target: `Transform Publications into Research Record`

### Step 5 — Field Observations

Reframe selected notes and essays as field observations.

Target section:

`FIELD OBSERVATIONS / 06`

Scope:

- show selected notes, essays, build logs, market/system observations
- organize by judgment and relevance rather than chronological completeness
- link to full Notes / Blog archive

PR target: `Add Field Observations section`

### Step 6 — Career Trajectory

Extract the CV into stage-based narrative.

Target section:

`CAREER TRAJECTORY / 07`

Scope:

- do not copy full CV into homepage
- create a stage narrative:
  - Foundations
  - Field Work
  - Research
  - Builder Phase
- link to full CV archive and CV PDF

PR target: `Reframe CV as Career Trajectory`

### Step 7 — Contact / Back Cover

Turn the ending of the page into a designed back cover.

Target section:

`CONTACT / BACK COVER`

Scope:

- create a closing paragraph and contact link set
- include Email, GitHub, Zenodo, CV, Ko-fi, and selected archive links
- make the ending feel like the back cover of a field dossier, not a generic footer

PR target: `Add Mission Log Back Cover`

## Acceptance criteria for the whole redesign

The final homepage should:

- feel like a continuous primary narrative page
- preserve the existing Hao's Notes brand tone
- avoid institutional or SaaS-dashboard aesthetics
- make Projects / Repositories / CV accessible but no longer dominant in nav
- explain what is active now, what has been deployed, what has been researched, what is being observed, and how the path formed
- remain readable, mobile-friendly, and CI-safe
