# Slide layout catalog

Use this as a menu when designing or redesigning a slide. Part 1 is what this deck has already tried. Part 2 is a reference set of 26 layout archetypes from a consulting-style "Killer slides" deck (`Fancy_slides.pptx`, shared by the team; slide numbers refer to that file).

House rules for every slide:
- **Two-tone headline:** black names the topic ("Context and our problem to solve"), gray is a short action title that says the takeaway. Keep the gray line to one line where possible (64px).
- **Readable from the back of the room:** labels 20px+, body 22–24px+, key numbers 40px+.
- **Few words, one idea per slide.** Prefer a visual over a paragraph.
- **Colors only from the C1 Apricot tokens** in `src/deck/theme.ts` / `src/index.css`.

## Part 1: Layouts used or tried in this deck

| Layout | Where | Status |
| --- | --- | --- |
| One-third text / two-thirds visual | 02 Context (Ansel + problem left, cohort cards right) | Used |
| Cohort cards with one highlighted ("Our user") | 02 Context | Used |
| Two stacked 100% bars (all seats vs. idle seats) | 02 Context, earlier version | Replaced by cohort cards |
| Profile card + quote cards + options row | 03 Persona | Used |
| Pull vs. push diagram (person → Ansel vs. Ansel → person) | 05 Behavior change | Used |
| Week strips of day tiles | 05 Behavior change, earlier | Rejected (hard to read) |
| Before/after silhouettes with thought bubbles | 05, concept | Not chosen |
| Role tiles ("Notetaker" vs. "Companion") | 05, concept | Not chosen |
| Situation summary + 2×2 assumption cards (mockup on top, number + one line below) | 06 Demo | Used |
| Build-journey timeline in two shaded bands (technical above, qualitative below), color-coded cards | 07 Learnings | Used |
| Swimlanes with a left label column and dashed guides | 07, variant | Not chosen |
| 2×2 lesson cards; "What we found → So we" rows | 07, concepts | Not chosen |
| Three typographic columns: Now / Next / Later (big words, no cards) | 08 Next steps | Used |
| Three stops on a line; one big question; Test / Measure / Build columns | 08, concepts | Not chosen |
| Team grid with orange-ringed headshots | 01, 09, 10 Team | Used |
| Live-edit animation (strike-throughs, word swap, handwritten correction, no transition) | 10 Team (updated) | Used |
| Card morph transition between slides (light-user card → persona card) | 02 → 03 | Used |
| Waterfall bridge + numbered math steps | 16 Addressable market | Used |
| Comparison table with yes / partly / no marks, highlighted column | 17 Alternatives | Used |
| Column chart + data rows under the axis | 14 Why light users | Used |

## Part 2: Reference archetypes (`Fancy_slides.pptx`)

| Archetype | What it looks like | Best for | Example slides |
| --- | --- | --- | --- |
| Section / cover | Full-bleed photo or solid field, one large title | Cover, section dividers | 1, 19, 20 |
| Agenda on split panel | Colored left panel with title, numbered list right | Agenda, next steps | 11–14, 28 |
| Team grid / bio card | Circular headshots with name and role; bio variant adds bullets | Team, credibility | 15, 16, 18, 21, 23 |
| Callout and annotation toolkit | Banners, arrows, labeled boxes, bottom takeaway bars | Highlighting one takeaway | 2–5 |
| Numbered pointer list | 3–5 numbered rows: icon, bold lead-in, 1–2 lines | Key points, "why us" | 7–9, 50, 53 |
| Icon-headed pillar columns | 3–6 equal columns, circle icon and header, bullets below | Pillars, value props, options | 34–36, 43, 44 |
| Statement panel + icon rows | Big statement on a colored/photo panel left, 4–5 icon rows right | Problem framing, "why now" | 73, 74, 78, 79, 81 |
| Big-number stat callouts | Large numbers in pills/circles with short labels | Impact metrics, traction | 59, 72, 77, 82 |
| Hub and spoke | Central circle with 4–8 labeled nodes around it | Ecosystem, capabilities | 29, 56, 64, 69 |
| Cycle / flywheel | Segmented ring or petal wheel with labels | Continuous loops, flywheels | 57, 60, 65, 68, 97 |
| Concentric layers | Nested rings or bullseye keyed to rows of text | Layered models, focus | 58, 62 |
| Two-way comparison | Two options side by side, or myth vs. fact | Choices, before/after | 31–33, 70, 71 |
| Phased chevrons / stage-gate | 3–6 chevrons with activities under each, "Today" marker | Approach, rollout plan | 37, 98, 105, 106, 109 |
| Timeline with milestones | Line with dots or pins, short text above and below | History, steps | 101, 102, 112, 116, 117 |
| Gantt / workplan | Week or month grid with bars, milestones, deadlines | Detailed roadmap | 107, 110, 111 |
| Journey / snake path | Winding numbered path with icons, beside a persona panel | Persona or user journey | 99, 100 |
| Labeled-row table | Icon labels left, findings in rows right | Exec summary, issue lists | 26, 27, 54, 84, 86 |
| Card grid | 2×3 to 4×3 outlined boxes with icon/header and short text | Levers, options, glossary | 88, 91, 93–95 |
| Dense executive summary | Title plus hierarchical bullets filling the slide | Appendix detail | 25 |
| Maturity staircase | Ascending steps with a "you are here" marker | Ambition, maturity | 42, 118, 119 |
| Funnel | Tapering 4-layer funnel with numbered text right | Market sizing (TAM/SAM/SOM), targeting | 96 |
| Product screenshot showcase | Row or quadrant of captioned UI screens | Demo, features | 85, 104, 108 |
| Linked circles / hexagons | Overlapping rings or a honeycomb with labels | Enablers, sequential themes | 67, 113–115 |
| Bar chart with highlight bracket | Column chart with an annotated bracket ("first 7 = 80%") | Pareto, data evidence | 10 |
| Org chart / flow diagram | Connected boxes: hierarchy or technical flow | Governance, architecture | 103, 120, 121 |
| Issue tree / bracket breakdown | Root splitting into drivers and sub-questions | Diagnostics, problem decomposition | 51, 63, 66 |

Strongest for this pitch: statement panel + icon rows (problem), journey / snake path (persona and behavior change), two-way comparison (behavior change), screenshot showcase (demo fallback), big-number callouts (learnings, traction), funnel (market sizing) and phased chevrons with a "Today" marker (next steps).
