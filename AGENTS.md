# Architecture

- Heads-Up deck code lives in `src/deck/`; each slide has one file and ordered registration in `src/deck/slides/index.ts` so another coding tool can edit slides independently.
- Slides are authored at 1920×1080 and scaled only through `SlideStage`; this prevents responsive reflow and keeps editor, thumbnails, and presenter views identical.
- C1 Apricot visual tokens live in `src/deck/theme.ts` and `src/index.css`; slide files reference tokens rather than defining new colors.
- Editor and presenter windows synchronize through a BroadcastChannel because presenter view is a separate same-browser window.
- When designing or redesigning a slide, start from the layout menu in `docs/slide-layouts.md` (layouts this deck has tried, plus a reference set of archetypes).
