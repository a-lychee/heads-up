# Heads-Up

Pitch deck and demo app for **Heads-Up**, our entry in the Kilts Product Competition (Chicago Booth, Phase 2, November 13, 2026).

Heads-Up is a Slack card sent about 30 minutes before a light user's recurring meeting. It shows what they own, what's still open, and what was decided last time, with links back to the moment in Ansel's record.

This repo is a [Lovable](https://lovable.dev/projects/50cc6c1c-017f-43d7-a779-4dade178f394) project (React, Vite, TypeScript, Tailwind, shadcn/ui). Lovable syncs both ways with the `main` branch, so anything pushed to `main` shows up in Lovable.

## Run it locally

```sh
npm ci
npm run dev      # http://localhost:8080
npm run build    # production build into dist/
npm test         # vitest
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Redirects to `/deck` |
| `/deck` | Editor view: slide thumbnails, the current slide, progress dots, and speaker notes. The URL hash tracks the slide (`/deck#4`). |
| `/deck/presenter` | Presenter window: current slide, next slide, notes, and an 8:00 countdown. Open it with **P** from `/deck`. |
| `/demo` | Placeholder for the live product demo (slide 7 links here) |

The editor and presenter windows stay in sync through a `BroadcastChannel`, so both need to be open in the same browser. This doesn't work inside Lovable's preview pane: use the published URL, or click **Open in a new tab to present**.

## Presenting from a lectern (two screens)

Set the laptop to *extend* the display to the projector (not mirror it).

1. Open `/deck` in Chrome and press **P**. The presenter window opens. Keep it on the laptop screen.
2. Drag the main `/deck` window to the projector and press **F** there to go fullscreen. You can also click **Start presenting** in the presenter window, then press **F** on the projector window.
3. The presenter window shows the timer, the current and next slides, and large speaker notes. Use **+ / −** (or the buttons) to change the notes size. The size is remembered.
4. Arrow keys in either window move both. **End** in the presenter window, or **Esc** on the projector, stops presenting.

If the presenter window shows **Open audience window**, it has lost contact with the main window. Click it to open a new one.

## Keyboard shortcuts (`/deck`)

| Key | Action |
| --- | --- |
| → / Space / Page Down / ↓ | Next slide |
| ← / Page Up / ↑ | Previous slide |
| Home / End | First / last slide |
| Number, then Enter | Jump to that slide |
| F / F5 | Present (fullscreen) |
| Esc | Exit Present mode |
| P | Open the presenter window |
| B / . | Black screen (while presenting) |
| ? | Show shortcuts |

On touch devices, swipe left or right. When presenting, clicking the slide advances it. The presenter timer starts on its own when the main window enters Present mode. It turns amber under 1:00 and red when over time.

## Where things live

```
src/deck/
  slides/        One file per slide (01-Team.tsx … 14-Opportunity.tsx)
  slides/index.ts  The ordered list of slides
  components/    Building blocks: SlideFrame, Headline, Kicker, GlassCard,
                 StatPill, CountUp, Reveal, SlideStage, ProgressDots
  pages/         DeckPage (/deck), PresenterPage (/deck/presenter), DemoPage (/demo)
  hooks/         useDeckSync (navigation + window sync), useTimerDisplay
  lib/timer.ts   Countdown logic (tested in timer.test.ts)
  theme.ts       Theme tokens in TypeScript
src/index.css    Fonts, CSS variables, and the deck-* classes
```

`src/components/ui` holds the stock shadcn/ui components that Lovable generates.

## Adding or editing a slide

Every slide is authored at a fixed **1920×1080 px** and scaled as a whole by `SlideStage`. Use px values inside slides. Nothing reflows at different window sizes.

1. Create `src/deck/slides/15-MySlide.tsx`:

   ```tsx
   import { Headline } from '../components/Headline';
   import { Reveal } from '../components/Reveal';
   import { SlideFrame } from '../components/SlideFrame';
   import type { SlideMetadata } from '../types';

   export const metadata: SlideMetadata = {
     id: 'my-slide',
     title: 'My slide',          // shown in thumbnails and tooltips
     section: '04 · Something',  // top-right label on the slide
     notes: 'Speaker notes go here.',
   };

   export default function MySlide() {
     return (
       <SlideFrame section={metadata.section} source="Optional source line">
         <div className="absolute inset-x-[104px] top-[200px]">
           <Reveal>
             <Headline secondary="Lighter second sentence.">First sentence in ink.</Headline>
           </Reveal>
           <Reveal delay={120}>
             <p className="mt-[40px] text-[28px] text-[var(--deck-muted)]">Body copy.</p>
           </Reveal>
         </div>
       </SlideFrame>
     );
   }
   ```

2. Import it in `src/deck/slides/index.ts` and add `{ Component: MySlide, ...mySlide }` where it belongs in the `slides` array.

Tips:
- Wrap each element in `<Reveal delay={…}>` to get the staggered fade-up. Thumbnails and the presenter's Next preview always show the final state.
- Use `<CountUp value={34} suffix="%" />` for numbers that count up.
- Don't hard-code `<br />` in headlines. Headlines use `text-wrap: balance`. To keep a number with its unit, use `&nbsp;` (for example `6&nbsp;minutes`).
- Use `font-display` for Bricolage Grotesque. Instrument Sans is the default.

## Theme ("C1 Apricot")

Tokens are defined twice and kept in step:
- `src/deck/theme.ts`: colors, fonts, radii, shadows, gradients, and motion, for use in TypeScript.
- `src/index.css`: the same values as CSS variables (`--deck-ink`, `--deck-muted`, `--deck-secondary`, `--deck-accent`, `--deck-card`, `--deck-slide-gradient`, …), plus the `deck-*` classes for the slide, chrome, headline, cards, and stat pills.

Slide files use the variables (for example `text-[var(--deck-accent)]`) and never hard-code colors. To change a color, update it in both files.

Fonts come from Google Fonts: **Bricolage Grotesque** (600–800) for headlines and big numbers, and **Instrument Sans** (400–700) for everything else.
