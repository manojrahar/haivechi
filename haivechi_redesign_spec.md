# hAIve Chi — UI Redesign & Figma Designer Handoff Specification

This specification and design system implementation transforms **hAIve Chi** from its cluttered first-generation layout into a serene, editorial, and interactive collective experience — while keeping **100% of the authentic brand identity, earthy color palette, and ritual typography**.

---

## 1. Visual Mockups for Figma Designer

Below are the high-fidelity UI visual references generated for your Figma designer.

````carousel
![Redesigned Homepage UI Mockup](/Users/manojrahar/.gemini/antigravity-ide/brain/ecb9a6b0-d20b-42c4-897b-a8eac77b28e1/haivechi_homepage_redesign_1791372042265.jpg)
<!-- slide -->
![Redesigned The Hive Archive Cards UI Mockup](/Users/manojrahar/.gemini/antigravity-ide/brain/ecb9a6b0-d20b-42c4-897b-a8eac77b28e1/haivechi_archive_redesign_1791372126345.jpg)
````

---

## 2. Audit Findings vs Redesign Solutions

| Audit Issue Identified | Original State | Redesign Solution |
| :--- | :--- | :--- |
| **1. Background Density** | Cluttered hex mesh and dense wireframes competing directly with the headline. | S-curve ribbon pushed to flanks; central 48% radial fade; reduced stroke opacity (0.045 to 0.18 max). |
| **2. Header / Logo Scale** | Logo was 112px tall, dominating the viewport clumsily. | Scaled logo mark to 48px height; unified typography lockup; modern pill navigation; global Dark/Light toggle. |
| **3. Input & Text Cursor** | Huge oversized cursor; unbalanced field proportions; looked like an empty card. | Balanced 72px field height; centered serif input; standard cursor ratio; instant single-word validation feedback. |
| **4. Value Proposition** | "Give it one thing. See what we become." was abstract without instant context. | Added a clear "Collective Intelligence Daily Ritual" badge + explanatory subtitle explaining the daily midnight reveal. |
| **5. Reminder Section** | Giant placeholder text (`you@somewhere`), uneven padding, misaligned button. | Standardized unified 46px pill inputs, crisp 13.5px mono placeholders, clean checkbox, and inline confirmation toast. |
| **6. The Hive Cards** | Washed-out transparency; hard to tell active from inactive; uneven thumbnail borders. | Uniform 16:10 aspect ratio cards; explicit status badges (`Revealed`, `Today · Active`, `Locked · Tomorrow`); subtle hover elevation (`-4px`). |
| **7. Ideas & Bugs Widget** | Unrelated purple third-party floating button clashing with warm aesthetic. | Rebuilt as native floating pill in bottom-right corner using brand terracotta (`#B0603A`) & deep forest (`#2E4A3F`) with modal feedback flow. |
| **8. Theme Control** | Light/dark mode only existed on the demo subpage. | Elevated to global header control with seamless localStorage persistence and dark mode canvas adaptation. |

---

## 3. Figma Design System Tokens

Give this exact specification to your Figma designer:

### Color Palette (Warm Earthy Ritual)

```css
/* Core Palette Tokens */
--cream:        #F5F1E8;  /* Primary Canvas Background */
--paper:        #FBF9F4;  /* Input & Surface Alt Background */
--surface:      #FFFFFF;  /* Cards & Modals */
--surface-alt:  #F0EBE1;  /* Navigation Pill Container */

--green:        #2E4A3F;  /* Primary Deep Forest Ink */
--green-d:      #1E322A;  /* Dark Forest Accent */
--green-l:      #5C7266;  /* Muted Sage for Nav & Subtitles */
--green-subtle: rgba(46, 74, 63, 0.08);

--clay:         #B0603A;  /* Primary CTA Terracotta / Copper */
--clay-d:       #96502F;  /* Hover Terracotta */
--clay-l:       #D08A64;  /* Light Terracotta Highlight */
--clay-glow:    rgba(176, 96, 58, 0.22);

--ink:          #22302A;  /* High Contrast Reading Ink */
--dim:          #7E8B84;  /* Metadata & Placeholder Muted Grey */
--line:         #DED6C7;  /* Structural Borders */
--line-strong:  #C9BFA8;  /* Elevated Card Borders */
```

### Dark Mode Tokens (Warm Obsidian Hive)

```css
--cream:        #121815;  /* Deep Moss Obsidian Background */
--paper:        #18221D;  /* Dark Surface Background */
--surface:      #1E2B25;  /* Dark Card Surface */
--green:        #E1EBE5;  /* Mint High-Contrast Typography */
--green-l:      #93AAA0;  /* Muted Slate Green */
--clay:         #C8754D;  /* Glowing Terracotta CTA */
--line:         #2A3B32;  /* Dark Borders */
```

### Typography Scale

- **Display Serif**: `Cormorant Garamond` (Weights: 400, 500, 600, Italic)
  - Hero Prompt: `clamp(42px, 6.5vw, 76px)`, Line Height: `1.06`, Letter-spacing: `-0.02em`
  - Input Text: `clamp(26px, 4.5vw, 38px)`, Weight: `500`
  - Card Titles: `20px - 24px`, Weight: `600`
  - Subtitle Italic: `20px`, Line Height: `1.4`
- **Monospace Metadata**: `JetBrains Mono` (Weights: 400, 500, 600)
  - Ritual Eyebrow: `11px`, Uppercase, Letter-spacing: `0.24em`
  - Input Placeholders / Labels: `13.5px`, Regular
  - Card Day Code (`DAY 48`): `10.5px`, Uppercase, Letter-spacing: `0.14em`
- **Body & UI Controls**: `Plus Jakarta Sans` or System Sans
  - Nav Pills & Buttons: `13.5px`, Medium (500)
  - Principle Cards: `13.5px - 14.5px`, Regular (400), Line Height: `1.6`

---

## 4. Component Layout Specifications for Figma

### 1. Site Header
- **Frame Height**: `88px`
- **Logo Mark**: Width `42px`, Height `48px`
- **Brand Title**: 28px Cormorant Garamond (`hAIve Chi`, "AI" colored `--clay`)
- **Tagline**: 11.5px JetBrains Mono (`Question? · Word. · Reveal!`)
- **Nav Pill Group**: Background `--surface-alt`, 4px padding, 9999px radius, 1px border `--line`
- **Nav Button Active State**: `--paper` background, `--green` text, subtle 1px border and drop shadow

### 2. Main Prompt Hero & Input
- **Container Max-Width**: `1440px` (Expanded for modern widescreen monitors)
- **Container Padding**: `24px 44px 60px`
- **Main Hero Prompt Max-Width**: `980px`
- **Main Input & Form Max-Width**: `660px`
- **Main Input Field**: Height `72px`, Border `2px solid --line`, Radius `12px`, Background `--paper`, Text-align `center`
- **Focus State**: Border `--clay`, Background `--surface`, Box shadow `0 0 0 4px var(--clay-glow)`
- **CTA Button**: Height `56px`, Width `100%`, Radius `9999px`, Linear gradient `(#B0603A -> #96502F)`, Text `Give it one thing` (21px Cormorant)

### 3. Reminders Section
- **Container**: Max-Width `780px`, Background `--surface`, Border `1px solid --line`, Radius `20px`, Padding `24px 28px`
- **Input Fields**: Height `46px`, Radius `9999px`, Border `1px solid --line`, 13.5px JetBrains Mono
- **Remind Button**: Height `46px`, Padding `0 22px`, Radius `9999px`, Background `--clay`, Text `REMIND ME` (12px Mono)

### 4. The Hive Cards (Archive Grid)
- **Grid Container**: Max-Width `1440px`, Responsive Grid: `repeat(auto-fill, minmax(280px, 1fr))`, Gap `20px`
- **Card Thumbnail Aspect Ratio**: `16:10`
- **Status Badges**:
  - `Revealed`: Dark Sage pill (`rgba(46, 74, 63, 0.88)`), White text, 10px Mono
  - `Today · Active`: Terracotta pill (`rgba(176, 96, 58, 0.92)`), White text, 10px Mono
  - `Locked · Tomorrow`: Muted Grey pill (`rgba(126, 139, 132, 0.85)`), White text, 10px Mono
- **Hover State**: `-4px` Y-elevation, `--clay` border highlight, soft elevation shadow

### 5. The Lab (Machine Consensus & 11 Labs Multi-Lingual Ritual)
- **Philosophy**: Every night the day's question goes to 11 AI labs across multiple languages over 6 nightly rounds. AI outputs are strictly isolated from the human hive.
- **11 Foundation Labs**: OpenAI, Gemma 4, Kimi, Llama 4, Llama 3.3, Qwen 3, Mistral, GLM, gpt-oss, DeepSeek, SEA-LION.
- **Each AI's Month**: 4-column responsive model card grid with high-fidelity monthly artworks, step consistency tags, and interactive AI Profile & 31-day honeycomb trajectory modal.
- **What the Machines Said (58 Days)**:
  - Full dataset from Day 80 down to Day 18 across November, October, and September 2026.
  - Proportional frequency distribution pills with live percentage bars.
  - Interactive "The People's Reveal" drawer and side-by-side (AI vs Humans) comparison mode.
  - Dynamic filters: Month, Signal Consensus (>50%, Split Channels, Prompt Echoes, Diffuse), and Real-time Search.
  - Dedicated Deep-Dive Comparison Modal comparing machine consensus against human blind intuition.

---

## 6. Project Directory & Source Code Links

The complete working web application is implemented and running:
- **Project Directory**: `/Users/manojrahar/haivechi/`
- [index.html](file:///Users/manojrahar/haivechi/index.html)
- [css/style.css](file:///Users/manojrahar/haivechi/css/style.css)
- [js/app.js](file:///Users/manojrahar/haivechi/js/app.js)
- [js/lab-data.js](file:///Users/manojrahar/haivechi/js/lab-data.js)
- [js/ground.js](file:///Users/manojrahar/haivechi/js/ground.js)
- [assets/lab/](file:///Users/manojrahar/haivechi/assets/lab/)
- **Live Local Server**: `http://localhost:4000/`
