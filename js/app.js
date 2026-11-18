import gsap from 'gsap';
import { LAB_DAYS, AI_MODELS, AI_OCTOBER_SHOWCASE } from './lab-data.js';
/* ============================================================
   hAIve Chi — Application Controller & UI Logic
   Implements exact specifications from:
   "hAIve Chi Website Audit & UI Redesign Proposal"
   
   Features:
   1. Theme Management (Light / Warm Obsidian Dark, localStorage)
   2. Seamless View Navigation (Today, The Hive, About, Demo)
   3. Single-Word Prompt Form & Realtime Countdown
   4. Grouped The Hive Archive (Active Today / Revealed / Coming Soon)
   5. Sample Month 31-Day Balanced Demo Grid with Staggered Entrance
   6. Comprehensive Day Reveal Modal with "Find My Input" & Prev/Next Nav
   7. Reusable Global Footer & Integrated Feedback Widget
   ============================================================ */

// ------------------------------------------------------------
// Core Dataset: The Hive Archive (Live Active + Historical + Scheduled)
// ------------------------------------------------------------
const HIVE_DATA = [
  {
    dayNum: 48,
    dayCode: 'DAY 48',
    date: 'Wednesday, Oct 7',
    question: 'One word for home.',
    status: 'today',
    badgeText: 'Active Today',
    badgeClass: 'badge-today',
    submissions: 'In Progress (8.4k)',
    clusterLead: 'Pending midnight reveal',
    isMine: true,
    userWord: 'Sanctuary',
    desc: 'Unfiltered instincts submitted globally throughout today. Synthesis compiles at midnight UTC.',
    clusters: [
      { word: 'Sanctuary (Your Word)', count: 'Your Instinct', isMine: true },
      { word: 'Hearth', count: '1,840' },
      { word: 'Safety', count: '1,420' },
      { word: 'Belonging', count: '980' },
      { word: 'Quiet', count: '760' }
    ],
    stats: { total: '8,410', dominant: 'Sanctuary (24%)', unique: '1,420' },
    svgArt: `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="artGlow_48" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--art-glow-start, #E8C9A3)" stop-opacity="var(--art-glow-op1, 0.44)"/>
          <stop offset="50%" stop-color="var(--art-glow-mid, #E2B78E)" stop-opacity="var(--art-glow-op2, 0.20)"/>
          <stop offset="80%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="var(--art-glow-op3, 0.05)"/>
          <stop offset="100%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="250" class="art-bg" fill="#F8F4EC"/>
      <ellipse cx="200" cy="125" rx="105" ry="42" fill="url(#artGlow_48)" class="art-glow-aura"/>
      <g stroke="#2E4A3F" stroke-width="1.1" opacity="0.13" fill="none" class="art-hex-mesh">
        <!-- Top-Left Corner Frame -->
        <polygon points="20,-5 48,11 48,43 20,59 -8,43 -8,11"/>
        <polygon points="48,43 76,59 76,91 48,107 20,91 20,59"/>
        <!-- Top-Right Corner Frame -->
        <polygon points="380,-5 408,11 408,43 380,59 352,43 352,11"/>
        <polygon points="352,43 380,59 380,91 352,107 324,91 324,59"/>
        <!-- Bottom-Left Corner Frame -->
        <polygon points="20,191 48,207 48,239 20,255 -8,239 -8,207"/>
        <polygon points="48,143 76,159 76,191 48,207 20,191 20,159"/>
        <!-- Bottom-Right Corner Frame -->
        <polygon points="380,191 408,207 408,239 380,255 352,239 352,207"/>
        <polygon points="352,143 380,159 380,191 352,207 324,191 324,159"/>
      </g>
      <text x="200" y="125" text-anchor="middle" dominant-baseline="central" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-style="italic" font-weight="600" fill="#11231C" letter-spacing="0.5" class="art-text-title">Sanctuary</text>
    </svg>`
  },
  {
    dayNum: 47,
    dayCode: 'DAY 47',
    date: 'Tuesday, Oct 6',
    question: 'What lingers after the storm?',
    status: 'revealed',
    badgeText: 'Revealed',
    badgeClass: 'badge-revealed',
    submissions: '18,492 words',
    clusterLead: 'Petrichor (28.4%)',
    isMine: true,
    userWord: 'Stillness',
    desc: 'The overwhelming instinct was tactile scent and atmosphere, with 28.4% invoking damp soil and 19% turning to emotional calm.',
    clusters: [
      { word: 'Stillness (Your Word)', count: 'Your Instinct', isMine: true },
      { word: 'Petrichor', count: '4,120' },
      { word: 'Silence', count: '2,890' },
      { word: 'Renewal', count: '1,940' },
      { word: 'Driftwood', count: '1,210' },
      { word: 'Clarity', count: '980' }
    ],
    stats: { total: '18,492', dominant: 'Petrichor (28.4%)', unique: '3,140' },
    svgArt: `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="artGlow_47" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--art-glow-start, #E8C9A3)" stop-opacity="var(--art-glow-op1, 0.44)"/>
          <stop offset="50%" stop-color="var(--art-glow-mid, #E2B78E)" stop-opacity="var(--art-glow-op2, 0.20)"/>
          <stop offset="80%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="var(--art-glow-op3, 0.05)"/>
          <stop offset="100%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="250" class="art-bg" fill="#F8F4EC"/>
      <ellipse cx="200" cy="125" rx="105" ry="42" fill="url(#artGlow_47)" class="art-glow-aura"/>
      <g stroke="#2E4A3F" stroke-width="1.1" opacity="0.13" fill="none" class="art-hex-mesh">
        <!-- Top-Left Corner Frame -->
        <polygon points="20,-5 48,11 48,43 20,59 -8,43 -8,11"/>
        <polygon points="48,43 76,59 76,91 48,107 20,91 20,59"/>
        <!-- Top-Right Corner Frame -->
        <polygon points="380,-5 408,11 408,43 380,59 352,43 352,11"/>
        <polygon points="352,43 380,59 380,91 352,107 324,91 324,59"/>
        <!-- Bottom-Left Corner Frame -->
        <polygon points="20,191 48,207 48,239 20,255 -8,239 -8,207"/>
        <polygon points="48,143 76,159 76,191 48,207 20,191 20,159"/>
        <!-- Bottom-Right Corner Frame -->
        <polygon points="380,191 408,207 408,239 380,255 352,239 352,207"/>
        <polygon points="352,143 380,159 380,191 352,207 324,191 324,159"/>
      </g>
      <text x="200" y="125" text-anchor="middle" dominant-baseline="central" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-style="italic" font-weight="600" fill="#11231C" letter-spacing="0.5" class="art-text-title">Petrichor</text>
    </svg>`
  },
  {
    dayNum: 46,
    dayCode: 'DAY 46',
    date: 'Monday, Oct 5',
    question: 'The earliest smell you remember.',
    status: 'revealed',
    badgeText: 'Revealed',
    badgeClass: 'badge-revealed',
    submissions: '21,105 words',
    clusterLead: 'Bread (33%)',
    isMine: false,
    userWord: null,
    desc: 'Baking and hearth smoke represented over a third of submissions globally, evoking childhood security and morning routines.',
    clusters: [
      { word: 'Woodsmoke', count: '6,960' },
      { word: 'Warm Bread', count: '4,420' },
      { word: 'Pine needles', count: '2,200' },
      { word: 'Old Paper', count: '1,840' },
      { word: 'Rain on Asphalt', count: '1,120' }
    ],
    stats: { total: '21,105', dominant: 'Bread (33%)', unique: '2,890' },
    svgArt: `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="artGlow_46" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--art-glow-start, #E8C9A3)" stop-opacity="var(--art-glow-op1, 0.44)"/>
          <stop offset="50%" stop-color="var(--art-glow-mid, #E2B78E)" stop-opacity="var(--art-glow-op2, 0.20)"/>
          <stop offset="80%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="var(--art-glow-op3, 0.05)"/>
          <stop offset="100%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="250" class="art-bg" fill="#F8F4EC"/>
      <ellipse cx="200" cy="125" rx="105" ry="42" fill="url(#artGlow_46)" class="art-glow-aura"/>
      <g stroke="#2E4A3F" stroke-width="1.1" opacity="0.13" fill="none" class="art-hex-mesh">
        <!-- Top-Left Corner Frame -->
        <polygon points="20,-5 48,11 48,43 20,59 -8,43 -8,11"/>
        <polygon points="48,43 76,59 76,91 48,107 20,91 20,59"/>
        <!-- Top-Right Corner Frame -->
        <polygon points="380,-5 408,11 408,43 380,59 352,43 352,11"/>
        <polygon points="352,43 380,59 380,91 352,107 324,91 324,59"/>
        <!-- Bottom-Left Corner Frame -->
        <polygon points="20,191 48,207 48,239 20,255 -8,239 -8,207"/>
        <polygon points="48,143 76,159 76,191 48,207 20,191 20,159"/>
        <!-- Bottom-Right Corner Frame -->
        <polygon points="380,191 408,207 408,239 380,255 352,239 352,207"/>
        <polygon points="352,143 380,159 380,191 352,207 324,191 324,159"/>
      </g>
      <text x="200" y="125" text-anchor="middle" dominant-baseline="central" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-style="italic" font-weight="600" fill="#11231C" letter-spacing="0.5" class="art-text-title">Woodsmoke</text>
    </svg>`
  },
  {
    dayNum: 45,
    dayCode: 'DAY 45',
    date: 'Sunday, Oct 4',
    question: 'One word you cannot say aloud.',
    status: 'revealed',
    badgeText: 'Revealed',
    badgeClass: 'badge-revealed',
    submissions: '24,880 words',
    clusterLead: 'Goodbye (19.8%)',
    isMine: true,
    userWord: 'Unspoken',
    desc: 'Unspoken farewells and unconfessed emotions formed the emotional core of Day 45, with vulnerability highest in early morning hours.',
    clusters: [
      { word: 'Unspoken (Your Word)', count: 'Your Instinct', isMine: true },
      { word: 'Goodbye', count: '4,920' },
      { word: 'Forgive', count: '3,840' },
      { word: 'Stay', count: '2,910' },
      { word: 'Never', count: '1,450' }
    ],
    stats: { total: '24,880', dominant: 'Goodbye (19.8%)', unique: '4,105' },
    svgArt: `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="artGlow_45" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--art-glow-start, #E8C9A3)" stop-opacity="var(--art-glow-op1, 0.44)"/>
          <stop offset="50%" stop-color="var(--art-glow-mid, #E2B78E)" stop-opacity="var(--art-glow-op2, 0.20)"/>
          <stop offset="80%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="var(--art-glow-op3, 0.05)"/>
          <stop offset="100%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="250" class="art-bg" fill="#F8F4EC"/>
      <ellipse cx="200" cy="125" rx="105" ry="42" fill="url(#artGlow_45)" class="art-glow-aura"/>
      <g stroke="#2E4A3F" stroke-width="1.1" opacity="0.13" fill="none" class="art-hex-mesh">
        <!-- Top-Left Corner Frame -->
        <polygon points="20,-5 48,11 48,43 20,59 -8,43 -8,11"/>
        <polygon points="48,43 76,59 76,91 48,107 20,91 20,59"/>
        <!-- Top-Right Corner Frame -->
        <polygon points="380,-5 408,11 408,43 380,59 352,43 352,11"/>
        <polygon points="352,43 380,59 380,91 352,107 324,91 324,59"/>
        <!-- Bottom-Left Corner Frame -->
        <polygon points="20,191 48,207 48,239 20,255 -8,239 -8,207"/>
        <polygon points="48,143 76,159 76,191 48,207 20,191 20,159"/>
        <!-- Bottom-Right Corner Frame -->
        <polygon points="380,191 408,207 408,239 380,255 352,239 352,207"/>
        <polygon points="352,143 380,159 380,191 352,207 324,191 324,159"/>
      </g>
      <text x="200" y="125" text-anchor="middle" dominant-baseline="central" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-style="italic" font-weight="600" fill="#11231C" letter-spacing="0.5" class="art-text-title">Goodbye</text>
    </svg>`
  },
  {
    dayNum: 49,
    dayCode: 'DAY 49',
    date: 'Thursday, Oct 8',
    question: 'A sound that awakens you.',
    status: 'upcoming',
    badgeText: 'Locked · Tomorrow',
    badgeClass: 'badge-locked',
    submissions: 'Opens in 16h',
    clusterLead: 'Awaiting opening',
    isMine: false,
    userWord: null,
    desc: 'Scheduled prompt. Universal opening occurs tomorrow at 00:00 UTC.',
    clusters: [],
    stats: { total: '0', dominant: 'Pending', unique: '0' },
    svgArt: `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="artGlow_49" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--art-glow-start, #E8C9A3)" stop-opacity="var(--art-glow-op1, 0.44)"/>
          <stop offset="50%" stop-color="var(--art-glow-mid, #E2B78E)" stop-opacity="var(--art-glow-op2, 0.20)"/>
          <stop offset="80%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="var(--art-glow-op3, 0.05)"/>
          <stop offset="100%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="250" class="art-bg" fill="#F8F4EC"/>
      <ellipse cx="200" cy="118" rx="120" ry="52" fill="url(#artGlow_49)" class="art-glow-aura"/>
      <g stroke="#2E4A3F" stroke-width="1.1" opacity="0.13" fill="none" class="art-hex-mesh">
        <!-- Top-Left Corner Frame -->
        <polygon points="20,-5 48,11 48,43 20,59 -8,43 -8,11"/>
        <polygon points="48,43 76,59 76,91 48,107 20,91 20,59"/>
        <!-- Top-Right Corner Frame -->
        <polygon points="380,-5 408,11 408,43 380,59 352,43 352,11"/>
        <polygon points="352,43 380,59 380,91 352,107 324,91 324,59"/>
        <!-- Bottom-Left Corner Frame -->
        <polygon points="20,191 48,207 48,239 20,255 -8,239 -8,207"/>
        <polygon points="48,143 76,159 76,191 48,207 20,191 20,159"/>
        <!-- Bottom-Right Corner Frame -->
        <polygon points="380,191 408,207 408,239 380,255 352,239 352,207"/>
        <polygon points="352,143 380,159 380,191 352,207 324,191 324,159"/>
      </g>
      <g transform="translate(191, 70)" stroke="#B0603A" stroke-width="1.6" fill="none">
        <rect x="0" y="8" width="18" height="13" rx="3"/>
        <path d="M4 8 V4.5 a5 5 0 0 1 10 0 V8"/>
        <circle cx="9" cy="14.5" r="1.4" fill="#B0603A"/>
      </g>
      <text x="200" y="136" text-anchor="middle" dominant-baseline="central" font-family="'Cormorant Garamond', Georgia, serif" font-size="36" font-style="italic" font-weight="600" fill="#11231C" letter-spacing="0.5" class="art-text-title">Opens Tomorrow</text>
    </svg>`
  },
  {
    dayNum: 50,
    dayCode: 'DAY 50',
    date: 'Friday, Oct 9',
    question: 'The texture of forgiveness.',
    status: 'upcoming',
    badgeText: 'Locked',
    badgeClass: 'badge-locked',
    submissions: 'Opens in 40h',
    clusterLead: 'Theme scheduled',
    isMine: false,
    userWord: null,
    desc: 'Scheduled prompt. Universal opening occurs Friday at 00:00 UTC.',
    clusters: [],
    stats: { total: '0', dominant: 'Pending', unique: '0' },
    svgArt: `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="artGlow_50" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--art-glow-start, #E8C9A3)" stop-opacity="var(--art-glow-op1, 0.44)"/>
          <stop offset="50%" stop-color="var(--art-glow-mid, #E2B78E)" stop-opacity="var(--art-glow-op2, 0.20)"/>
          <stop offset="80%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="var(--art-glow-op3, 0.05)"/>
          <stop offset="100%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="250" class="art-bg" fill="#F8F4EC"/>
      <ellipse cx="200" cy="118" rx="120" ry="52" fill="url(#artGlow_50)" class="art-glow-aura"/>
      <g stroke="#2E4A3F" stroke-width="1.1" opacity="0.13" fill="none" class="art-hex-mesh">
        <!-- Top-Left Corner Frame -->
        <polygon points="20,-5 48,11 48,43 20,59 -8,43 -8,11"/>
        <polygon points="48,43 76,59 76,91 48,107 20,91 20,59"/>
        <!-- Top-Right Corner Frame -->
        <polygon points="380,-5 408,11 408,43 380,59 352,43 352,11"/>
        <polygon points="352,43 380,59 380,91 352,107 324,91 324,59"/>
        <!-- Bottom-Left Corner Frame -->
        <polygon points="20,191 48,207 48,239 20,255 -8,239 -8,207"/>
        <polygon points="48,143 76,159 76,191 48,207 20,191 20,159"/>
        <!-- Bottom-Right Corner Frame -->
        <polygon points="380,191 408,207 408,239 380,255 352,239 352,207"/>
        <polygon points="352,143 380,159 380,191 352,207 324,191 324,159"/>
      </g>
      <g transform="translate(191, 70)" stroke="#2E4A3F" stroke-width="1.6" fill="none">
        <rect x="0" y="8" width="18" height="13" rx="3"/>
        <path d="M4 8 V4.5 a5 5 0 0 1 10 0 V8"/>
        <circle cx="9" cy="14.5" r="1.4" fill="#2E4A3F"/>
      </g>
      <text x="200" y="136" text-anchor="middle" dominant-baseline="central" font-family="'Cormorant Garamond', Georgia, serif" font-size="36" font-style="italic" font-weight="600" fill="#11231C" letter-spacing="0.5" class="art-text-title">Scheduled</text>
    </svg>`
  }
];

// ------------------------------------------------------------
// Sample Month Dataset: 31 Days (August in the Hive)
// ------------------------------------------------------------
const SAMPLE_MONTH_DAYS = Array.from({ length: 31 }, (_, i) => {
  const dayNum = i + 1;
  const questions = [
    'What lingers after the storm?', 'One word for morning.', 'The earliest memory of warmth.',
    'What cannot be bought?', 'The taste of home.', 'One word for silence.',
    'A sound that reassures you.', 'The color of waiting.', 'What does courage feel like?',
    'A word for an unkept promise.', 'The texture of water.', 'What remains in an empty room?',
    'The sound of walking in snow.', 'One word for the sea.', 'What breaks quietly?',
    'The scent of autumn.', 'A word for leaving behind.', 'What heals without a mark?',
    'One word for wilderness.', 'The feeling of returning.', 'What is never forgotten?',
    'A word for dusk.', 'The weight of a secret.', 'What opens your eyes?',
    'A word for sudden joy.', 'The first frost.', 'What echoes longest?',
    'A word for dawn.', 'The shape of longing.', 'What anchors you?',
    'One word for peace.'
  ];
  const dominants = [
    'Petrichor (28%)', 'Light (32%)', 'Fireplace (25%)', 'Time (41%)', 'Bread (36%)',
    'Stillness (39%)', 'Rain (29%)', 'Amber (24%)', 'Breathe (33%)', 'Ghost (27%)',
    'Silk (31%)', 'Dust (28%)', 'Crunch (44%)', 'Abyss (35%)', 'Trust (38%)',
    'Smoke (30%)', 'Relief (26%)', 'Sleep (32%)', 'Pine (29%)', 'Shelter (42%)',
    'Mother (37%)', 'Shadow (29%)', 'Lead (34%)', 'Alarm (27%)', 'Gasp (38%)',
    'Crisp (31%)', 'Chime (28%)', 'Gold (33%)', 'Hollow (30%)', 'Root (40%)',
    'Silence (36%)'
  ];
  const userWords = [
    'Sanctuary', 'Dew', 'Wool', 'Patience', 'Salt', 'Echo', 'Heartbeat', 'Grey',
    'Spine', 'Vapour', 'River', 'Scent', 'Breath', 'Horizon', 'Glass', 'Cedar',
    'Free', 'Grace', 'Moss', 'Porch', 'Touch', 'Violet', 'Stone', 'Sunrise',
    'Spark', 'Rime', 'Voice', 'Ember', 'Tide', 'Iron', 'Rest'
  ];
  const submissionCounts = 14000 + Math.floor(((i * 739 + 311) % 11000));

  return {
    dayNum,
    dayCode: `DAY ${String(dayNum).padStart(2, '0')}`,
    date: `August ${dayNum}`,
    week: Math.floor(i / 7) + 1,
    question: questions[i % questions.length],
    dominant: dominants[i % dominants.length],
    submissions: `${submissionCounts.toLocaleString()} words`,
    userWord: userWords[i % userWords.length],
    desc: `On August ${dayNum}, participants converged from around the globe without priming. The dominant theme "${dominants[i % dominants.length]}" formed the semantic nucleus of the reveal.`,
    stats: {
      total: submissionCounts.toLocaleString(),
      dominant: dominants[i % dominants.length],
      unique: `${Math.floor(submissionCounts * 0.16).toLocaleString()}`
    },
    clusters: [
      { word: `${userWords[i % userWords.length]} (Your Word)`, count: 'Your Instinct', isMine: true },
      { word: dominants[i % dominants.length].split(' ')[0], count: '3,840' },
      { word: 'Remembrance', count: '2,190' },
      { word: 'Grounded', count: '1,420' },
      { word: 'Loom', count: '910' }
    ]
  };
});

let currentActiveDayIndex = 0;

// ------------------------------------------------------------
// Lifecycle Initialization
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initPromptForm();
  initGroupedHiveArchive();
  initDemoMonthGrid();
  initDayDetailModal();
  initCountdown();
  initIdeasBugsModal();
  initQuickLinks();
  initLabView();
  updateDynamicQuestionTypography();
  window.addEventListener('resize', () => updateDynamicQuestionTypography());
  animateHeroGSAP();
  initHeroInteractiveGSAP();

  // Support direct hash navigation (e.g., #waiting, #hive, #lab, #demo)
  const initialHash = window.location.hash.toLowerCase();
  if (initialHash === '#waiting') {
    switchView('view-waiting');
  } else if (initialHash === '#hive') {
    switchView('view-hive');
  } else if (initialHash === '#lab') {
    switchView('view-lab');
  } else if (initialHash === '#demo' || initialHash === '#month') {
    switchView('view-demo');
  }
});

// ------------------------------------------------------------
// 1. Theme Management (Light / Warm Obsidian Dark)
// ------------------------------------------------------------
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');
  
  const savedTheme = localStorage.getItem('haive_theme') || 'light';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('haive_theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }
}

// ------------------------------------------------------------
// 2. View Navigation & Routing
// ------------------------------------------------------------

// ============================================================
// GSAP Hero Section Animations (Home Page Exclusive)
// ============================================================
let watermarkTween = null;

function animateHeroGSAP() {
  const todayView = document.getElementById("view-today");
  if (!todayView || todayView.classList.contains("hidden")) return;

  // Kill existing tweens on these elements to allow clean replays
  gsap.killTweensOf([
    ".site-header",
    ".ritual-eyebrow-line",
    ".ritual-hero-title",
    ".ritual-hero-subtitle",
    ".ritual-flourish-divider",
    ".ritual-hex-card",
    "#todayEyebrow",
    "#todayPromptQuestion",
    ".ritual-prompt-form",
    ".field-wrapper",
    "#submitWordBtn",
    ".reminders-panel"
  ]);

  if (watermarkTween) {
    watermarkTween.kill();
    watermarkTween = null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 1. Site Header subtle reveal
  tl.fromTo(
    ".site-header",
    { y: -18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" },
    0
  );

  // 2. Top Eyebrow
  tl.fromTo(
    ".ritual-eyebrow-line:not(.lower-eyebrow)",
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.65 },
    0.1
  );

  // 4. Hero Headline
  tl.fromTo(
    ".ritual-hero-title",
    { y: 26, opacity: 0, filter: "blur(4px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, ease: "power4.out" },
    0.25
  );

  // 5. Subtitle & Flourish
  tl.fromTo(
    [".ritual-hero-subtitle", ".ritual-flourish-divider"],
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 },
    0.15
  );

  // 6. 3 Hexagonal Process Cards (Staggered entrance)
  tl.fromTo(
    ".ritual-hex-card",
    { y: 15, opacity: 0, scale: 0.98 },
    { y: 0, opacity: 1, scale: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" },
    0.2
  );

  // 7. Lower Eyebrow & Question Title
  tl.fromTo(
    [".lower-eyebrow", "#todayPromptQuestion"],
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 },
    0.25
  );

  // 8. Input & Submit Form
  tl.fromTo(
    ".ritual-prompt-form",
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
    0.25
  );

  // 9. Reminders Panel
  tl.fromTo(
    ".reminders-panel",
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35 },
    0.3
  );
}

function initHeroInteractiveGSAP() {
  const btn = document.getElementById("submitWordBtn");
  const input = document.getElementById("wordInputField");
  const arrow = btn ? btn.querySelector(".btn-arrow-icon") : null;

  if (btn) {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.018,
        duration: 0.32,
        ease: "power2.out",
        boxShadow: "0 14px 38px rgba(176, 96, 58, 0.40)"
      });
      if (arrow) {
        gsap.to(arrow, { x: 6, duration: 0.3, ease: "power2.out" });
      }
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.38,
        ease: "power2.out",
        boxShadow: "0 8px 28px rgba(176, 96, 58, 0.28)"
      });
      if (arrow) {
        gsap.to(arrow, { x: 0, duration: 0.35, ease: "power2.out" });
      }
    });

    btn.addEventListener("mousedown", () => {
      gsap.to(btn, { scale: 0.98, duration: 0.1 });
    });

    btn.addEventListener("mouseup", () => {
      gsap.to(btn, { scale: 1.018, duration: 0.2 });
    });
  }

  if (input) {
    input.addEventListener("focus", () => {
      gsap.to(input, {
        scale: 1.008,
        duration: 0.32,
        ease: "power2.out"
      });
    });

    input.addEventListener("blur", () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.35,
        ease: "power2.out"
      });
    });
  }
}

function switchView(targetViewId) {
  const views = ['view-today', 'view-waiting', 'view-hive', 'view-lab', 'view-about', 'view-demo'];
  
  views.forEach((vid) => {
    const el = document.getElementById(vid);
    if (el) {
      if (vid === targetViewId) {
        el.classList.remove('hidden');
        el.classList.add('fade-in');
      } else {
        el.classList.add('hidden');
        el.classList.remove('fade-in');
      }
    }
  });

  // Update nav buttons active state
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const viewMatch = btn.getAttribute('data-view') === targetViewId;
    btn.classList.toggle('active', viewMatch);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (targetViewId === 'view-today') { animateHeroGSAP(); updateDynamicQuestionTypography(); }
}
window.switchView = switchView;

function initNavigation() {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      switchView(targetView);
    });
  });

  document.getElementById('brandHomeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const existingWord = localStorage.getItem('haive_today_word');
    if (existingWord) {
      switchView('view-waiting');
    } else {
      switchView('view-today');
    }
  });
}

// ------------------------------------------------------------
// 3. Prompt Submission & Waiting State
// ------------------------------------------------------------

// ------------------------------------------------------------
// Dynamic Responsive Question Typography
// Automatically calculates optimal font size & line height based on length
// ------------------------------------------------------------
function updateDynamicQuestionTypography(customText) {
  const headline = document.getElementById("todayPromptQuestion");
  if (!headline) return;

  const text = customText !== undefined ? customText : headline.textContent;
  const clean = text.trim();
  const wordCount = clean ? clean.split(/\s+/).length : 0;
  const charCount = clean.length;

  if (wordCount >= 10 || charCount >= 50) {
    headline.style.fontSize = "clamp(28px, 4.2vw, 44px)";
    headline.style.lineHeight = "1.22";
    headline.style.maxWidth = "min(980px, 92vw)";
  } else if (wordCount >= 6 || charCount >= 28) {
    headline.style.fontSize = "clamp(36px, 5.5vw, 60px)";
    headline.style.lineHeight = "1.14";
    headline.style.maxWidth = "min(940px, 90vw)";
  } else {
    headline.style.fontSize = "clamp(46px, 7vw, 84px)";
    headline.style.lineHeight = "1.08";
    headline.style.maxWidth = "min(900px, 88vw)";
  }
}

window.setTodayQuestion = function(newQuestion) {
  const headline = document.getElementById("todayPromptQuestion");
  if (headline && newQuestion) {
    headline.textContent = newQuestion;
    updateDynamicQuestionTypography(newQuestion);
  }
};

function initPromptForm() {
  const form = document.getElementById('wordPromptForm');
  const input = document.getElementById('wordInputField');
  const errorMsg = document.getElementById('formErrorMsg');
  const submitBtn = document.getElementById('submitWordBtn');
  const submittedWordEcho = document.getElementById('submittedWordEcho');
  const resetBtn = document.getElementById('resetWordBtn');

  function setEchoWord(val) {
    if (!submittedWordEcho) return;
    const clean = (val || 'home').trim().toLowerCase();
    submittedWordEcho.textContent = clean;
    if (clean.length > 10) {
      submittedWordEcho.setAttribute('font-size', '24');
    } else if (clean.length > 6) {
      submittedWordEcho.setAttribute('font-size', '30');
    } else {
      submittedWordEcho.setAttribute('font-size', '38');
    }
  }

  // Check if already submitted today
  const savedWord = localStorage.getItem('haive_today_word');
  if (savedWord) {
    setEchoWord(savedWord);
    switchView('view-waiting');
  }

  const inputWrapper = form.querySelector('.ritual-hex-input-box');

  const triggerEmptyShake = () => {
    // Re-trigger CSS animation cleanly
    submitBtn.classList.remove('btn-shake-active');
    if (inputWrapper) inputWrapper.classList.remove('input-shake-active');
    void submitBtn.offsetWidth; // trigger DOM reflow
    submitBtn.classList.add('btn-shake-active');
    if (inputWrapper) {
      void inputWrapper.offsetWidth;
      inputWrapper.classList.add('input-shake-active');
    }
    input.focus();
  };

  // Real-time single-word validation
  input.addEventListener('input', () => {
    errorMsg.textContent = '';
    const val = input.value.trim();
    if (val) {
      form.classList.add('has-input');
      submitBtn.classList.remove('btn-shake-active');
      if (inputWrapper) inputWrapper.classList.remove('input-shake-active');
    } else {
      form.classList.remove('has-input');
    }
    if (val.includes(' ')) {
      errorMsg.textContent = 'One word only. Keep to your purest first instinct.';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawVal = input.value.trim();

    if (!rawVal) {
      errorMsg.textContent = 'Please enter your one word above.';
      triggerEmptyShake();
      return;
    }

    if (rawVal.split(/\s+/).length > 1) {
      errorMsg.textContent = 'Only a single word is accepted. No phrases.';
      triggerEmptyShake();
      return;
    }

    // Process submission
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('.ritual-btn-label') || submitBtn.querySelector('.hex-btn-text');
    if (btnText) {
      btnText.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="animation: spin 1s linear infinite; margin-right: 8px; vertical-align: middle;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Joining the hive...
      `;
    } else {
      submitBtn.textContent = `Joining the hive...`;
    }

    setTimeout(() => {
      localStorage.setItem('haive_today_word', rawVal);
      setEchoWord(rawVal);
      submitBtn.disabled = false;
      if (btnText) {
        btnText.textContent = `Give it one thing`;
      } else {
        submitBtn.textContent = `Give it one thing`;
      }
      input.value = '';
      switchView('view-waiting');
    }, 600);
  });

  resetBtn?.addEventListener('click', () => {
    localStorage.removeItem('haive_today_word');
    input.value = '';
    switchView('view-today');
    setTimeout(() => input.focus(), 100);
  });
}

// ------------------------------------------------------------
// 4. Grouped The Hive Archive (Direct Fix for Section 3 of Audit PDF)
// ------------------------------------------------------------
function initGroupedHiveArchive() {
  const container = document.getElementById('hiveGroupsWrapper');
  const filterBtns = document.querySelectorAll('.filter-chip[data-filter]');

  renderGroupedArchive('all');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderGroupedArchive(filter);
    });
  });

  function renderGroupedArchive(filterType) {
    container.innerHTML = '';

    const todayItems = HIVE_DATA.filter(d => d.status === 'today');
    const revealedItems = HIVE_DATA.filter(d => d.status === 'revealed');
    const upcomingItems = HIVE_DATA.filter(d => d.status === 'upcoming');

    // 1. GROUP: ACTIVE TODAY
    if (filterType === 'all' || filterType === 'today') {
      const activeGroup = document.createElement('section');
      activeGroup.className = 'hive-section-block';
      activeGroup.innerHTML = `
        <div class="hive-section-header">
          <div class="hive-section-title-lockup">
            <svg class="hive-header-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polygon points="12,2 17,5 17,11 12,14 7,11 7,5" fill="#FCEEE5" stroke="#B84D24" stroke-width="1.4" stroke-linejoin="round" />
              <polygon points="17,11 22,14 22,20 17,23 12,20 12,14" fill="#FCEEE5" stroke="#B84D24" stroke-width="1.4" stroke-linejoin="round" />
              <polygon points="7,11 12,14 12,20 7,23 2,20 2,14" fill="#FCEEE5" stroke="#B84D24" stroke-width="1.4" stroke-linejoin="round" />
            </svg>
            <h2 class="hive-section-heading">Active Today</h2>
          </div>
          <div class="hive-status-pill-peach">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Closes Midnight UTC</span>
          </div>
        </div>
      `;

      todayItems.forEach(item => {
        const activeCard = document.createElement('div');
        activeCard.className = 'featured-hex-card';
        activeCard.innerHTML = `
          <!-- Distinctive Elongated Hexagonal Card Silhouette Matching Reference -->
          <svg class="featured-card-svg-bg" viewBox="0 0 1140 154" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 60.0 3.0 L 1080.0 3.0 Q 1096.0 3.0 1108.0 19.0 L 1125.0 59.0 Q 1137.0 77.0 1125.0 95.0 L 1108.0 135.0 Q 1096.0 151.0 1080.0 151.0 L 60.0 151.0 Q 44.0 151.0 32.0 135.0 L 15.0 95.0 Q 3.0 77.0 15.0 59.0 L 32.0 19.0 Q 44.0 3.0 60.0 3.0 Z" class="featured-card-path" fill="#FFFDF9" stroke="#EBC9B5" stroke-width="1.8"/>
          </svg>

          <div class="featured-card-inner">
            <!-- Left Column: Details -->
            <div class="featured-card-left">
              <div class="featured-date-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span class="pill-date">${item.date}</span>
                <span class="pill-sep">&middot;</span>
                <span class="pill-day-code">${item.dayCode.replace('DAY ', 'Day ')}</span>
              </div>

              <h3 class="featured-card-question">One word for <span class="featured-q-italic">home.</span></h3>

              <div class="featured-card-subline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>${item.submissions} submitted globally.</span>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div class="featured-card-vsep" aria-hidden="true"></div>

            <!-- Right Column: Hex Button -->
            <div class="featured-card-right">
              <button class="featured-hex-cta-btn" id="hiveGoSubmitBtn" type="button">
                <svg class="featured-hex-btn-svg" viewBox="0 0 260 52" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 26.0 3.0 L 234.0 3.0 Q 244.0 3.0 249.0 10.0 L 255.0 20.0 Q 257.0 26.0 255.0 32.0 L 249.0 42.0 Q 244.0 49.0 234.0 49.0 L 26.0 49.0 Q 16.0 49.0 11.0 42.0 L 5.0 32.0 Q 3.0 26.0 5.0 20.0 L 11.0 10.0 Q 16.0 3.0 26.0 3.0 Z" class="featured-hex-btn-path" fill="#B84D24" stroke="#FFFFFF" stroke-width="2.2"/>
                </svg>
                <span class="featured-hex-btn-text">Contribute Your Word &rarr;</span>
              </button>
            </div>
          </div>
        `;

        activeCard.querySelector('#hiveGoSubmitBtn').addEventListener('click', () => {
          switchView('view-today');
        });
        activeGroup.appendChild(activeCard);
      });

      container.appendChild(activeGroup);
    }

    // 2. GROUP: REVEALED ARCHIVES (AVAILABLE TO EXPLORE)
    if (filterType === 'all' || filterType === 'revealed' || filterType === 'mine') {
      const itemsToShow = filterType === 'mine' 
        ? revealedItems.filter(d => d.isMine)
        : revealedItems;

      if (itemsToShow.length > 0) {
        const revGroup = document.createElement('section');
        revGroup.className = 'hive-section-block';
        revGroup.innerHTML = `
          <div class="hive-section-header">
            <div class="hive-section-title-lockup">
              <svg class="hive-header-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <h2 class="hive-section-heading">Revealed Archives</h2>
              <span class="hive-badge-subtle">${itemsToShow.length} Available to Explore</span>
            </div>
            <span class="hive-reveal-guide-text">Click any card to open reveal &rarr;</span>
          </div>
          <div class="hive-section-divider" aria-hidden="true"></div>
          <div class="group-grid" id="revealedGrid"></div>
        `;

        const revGrid = revGroup.querySelector('#revealedGrid');
        itemsToShow.forEach(card => {
          const cardEl = createStandardCard(card);
          cardEl.addEventListener('click', () => {
            openDayDetailModal(card);
          });
          revGrid.appendChild(cardEl);
        });

        container.appendChild(revGroup);
      }
    }

    // 3. GROUP: SCHEDULED RITUALS (COMING SOON)
    if (filterType === 'all' || filterType === 'upcoming') {
      const upGroup = document.createElement('section');
      upGroup.className = 'hive-section-block';
      upGroup.innerHTML = `
        <div class="hive-section-header">
          <div class="hive-section-title-lockup">
            <svg class="hive-header-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <h2 class="hive-section-heading">Scheduled Rituals</h2>
            <span class="hive-badge-subtle coming-soon">Locked &middot; Coming Soon</span>
          </div>
          <span class="hive-reveal-guide-text">Scheduled Drops</span>
        </div>
        <div class="hive-section-divider" aria-hidden="true"></div>
        <div class="group-grid" id="upcomingGrid"></div>
      `;

      const upGrid = upGroup.querySelector('#upcomingGrid');
      upcomingItems.forEach(card => {
        const cardEl = createStandardCard(card);
        upGrid.appendChild(cardEl);
      });

      container.appendChild(upGroup);
    }
  }

  function createStandardCard(card) {
    const cardEl = document.createElement('article');
    cardEl.className = `hive-card ${card.status === 'upcoming' ? 'locked' : ''} ${card.status === 'active' ? 'is-today' : ''}`;
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('tabindex', '0');

    cardEl.innerHTML = `
      <div class="card-thumb-wrap">
        ${card.svgArt}
      </div>

      <div class="card-body">
        <div class="card-meta-top">
          <span class="card-day-tag">${card.dayCode}</span>
          <span class="card-date-label">${card.date}</span>
        </div>

        <h3 class="card-question">${card.question}</h3>

        <div class="card-footer-bar">
          <span class="card-stat-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            ${card.submissions}
          </span>
          <span class="card-explore-action">
            ${card.status === 'upcoming' ? 'Locked' : 'Explore'}
            <svg class="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </div>
    `;

    return cardEl;
  }
}

// ------------------------------------------------------------
// 5. Sample Month Demo Page Controller (Section 4 of Audit PDF)
// ------------------------------------------------------------
function initDemoMonthGrid() {
  const grid = document.getElementById('demoCalendarGrid');
  const weekFilters = document.querySelectorAll('.week-filter-group .filter-chip');

  if (grid) {
    renderDemoGrid('all');

    weekFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        weekFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const week = btn.getAttribute('data-week');
        renderDemoGrid(week);
      });
    });

    function renderDemoGrid(weekFilter) {
      grid.innerHTML = '';

      const filtered = SAMPLE_MONTH_DAYS.filter(d => {
        if (weekFilter === 'all') return true;
        return String(d.week) === weekFilter;
      });

      filtered.forEach((day, idx) => {
        const card = document.createElement('div');
        card.className = 'demo-day-card';
        card.style.animationDelay = `${Math.min(idx * 30, 400)}ms`;

        card.innerHTML = `
          <div>
            <div class="demo-day-header">
              <span class="demo-day-tag">${day.dayCode}</span>
              <span class="demo-day-date">${day.date}</span>
            </div>
            <h3 class="demo-day-question">“${day.question}”</h3>
          </div>
          <div class="demo-day-footer">
            <span class="demo-dominant-pill" title="Dominant theme">${day.dominant}</span>
            <span class="demo-count-tag">${day.submissions}</span>
          </div>
        `;

        card.addEventListener('click', () => {
          openDayDetailModal(day);
        });

        grid.appendChild(card);
      });
    }
  }

  // Bind 4 Daily Reveals cards from the Exact Reference View
  document.querySelectorAll('.summary-hex-card').forEach((card) => {
    card.addEventListener('click', () => {
      const dayNum = parseInt(card.getAttribute('data-day') || '1', 10);
      const dayData = SAMPLE_MONTH_DAYS.find(d => d.day === dayNum) || SAMPLE_MONTH_DAYS[0];
      if (typeof openDayDetailModal === 'function') {
        openDayDetailModal(dayData);
      }
    });
  });

  const exploreLink = document.getElementById('exploreMonthLink');
  if (exploreLink) {
    exploreLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof openDayDetailModal === 'function' && SAMPLE_MONTH_DAYS.length > 0) {
        openDayDetailModal(SAMPLE_MONTH_DAYS[0]);
      }
    });
  }
}

// ------------------------------------------------------------
// 6. Comprehensive Day Detail Modal & "Find My Input"
// ------------------------------------------------------------
function initDayDetailModal() {
  const modal = document.getElementById('dayDetailModal');
  const closeBtn = document.getElementById('dayModalCloseBtn');
  const prevBtn = document.getElementById('dayModalPrevBtn');
  const nextBtn = document.getElementById('dayModalNextBtn');

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentActiveDayIndex > 0) {
      currentActiveDayIndex--;
      openDayDetailModal(SAMPLE_MONTH_DAYS[currentActiveDayIndex]);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentActiveDayIndex < SAMPLE_MONTH_DAYS.length - 1) {
      currentActiveDayIndex++;
      openDayDetailModal(SAMPLE_MONTH_DAYS[currentActiveDayIndex]);
    }
  });
}

function openDayDetailModal(day) {
  const modal = document.getElementById('dayDetailModal');
  currentActiveDayIndex = SAMPLE_MONTH_DAYS.findIndex(d => d.dayNum === day.dayNum);
  if (currentActiveDayIndex === -1) currentActiveDayIndex = 0;

  // Header info
  document.getElementById('dayModalBadge').textContent = day.dayCode;
  document.getElementById('dayModalDate').textContent = day.date;
  document.getElementById('dayModalPrompt').textContent = day.question;

  // Artwork
  const artContainer = document.getElementById('dayModalArtContainer');
  const artDesc = document.getElementById('dayModalArtDesc');
  artDesc.textContent = day.desc;

  if (day.svgArt) {
    artContainer.innerHTML = day.svgArt;
  } else {
    // Generate expressive dynamic artwork
    artContainer.innerHTML = `
      <svg viewBox="0 0 500 300" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dmGlow_${day.dayNum}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--art-glow-start, #E8C9A3)" stop-opacity="var(--art-glow-op1, 0.44)"/>
            <stop offset="50%" stop-color="var(--art-glow-mid, #E2B78E)" stop-opacity="var(--art-glow-op2, 0.20)"/>
            <stop offset="80%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="var(--art-glow-op3, 0.05)"/>
            <stop offset="100%" stop-color="var(--art-glow-end, #DDA67A)" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="500" height="300" class="art-bg" fill="#F8F4EC"/>
        <ellipse cx="250" cy="150" rx="125" ry="48" fill="url(#dmGlow_${day.dayNum})" class="art-glow-aura"/>
        <g stroke="#2E4A3F" stroke-width="1.2" opacity="0.13" fill="none" class="art-hex-mesh">
          <!-- Top-Left Corner Frame -->
          <polygon points="26,-6 60,14 60,54 26,74 -8,54 -8,14"/>
          <polygon points="60,54 94,74 94,114 60,134 26,114 26,74"/>
          <!-- Top-Right Corner Frame -->
          <polygon points="474,-6 508,14 508,54 474,74 440,54 440,14"/>
          <polygon points="440,54 474,74 474,114 440,134 406,114 406,74"/>
          <!-- Bottom-Left Corner Frame -->
          <polygon points="26,226 60,246 60,286 26,306 -8,286 -8,246"/>
          <polygon points="60,166 94,186 94,226 60,246 26,226 26,186"/>
          <!-- Bottom-Right Corner Frame -->
          <polygon points="474,226 508,246 508,286 474,306 440,286 440,246"/>
          <polygon points="440,166 474,186 474,226 440,246 406,226 406,186"/>
        </g>
        <text x="250" y="150" text-anchor="middle" dominant-baseline="central" font-family="'Cormorant Garamond', Georgia, serif" font-size="42" font-style="italic" font-weight="600" fill="#11231C" letter-spacing="0.5" class="art-text-title">${day.dominant.split(' ')[0]}</text>
      </svg>
    `;
  }

  // Find My Input Box
  const findBox = document.getElementById('dayModalFindInputBox');
  const userWordEl = document.getElementById('dayModalUserWord');
  if (day.userWord) {
    findBox.style.display = 'block';
    userWordEl.textContent = `“${day.userWord}”`;
  } else {
    findBox.style.display = 'none';
  }

  // Clusters
  const clusterWrap = document.getElementById('dayModalClusterPills');
  clusterWrap.innerHTML = '';
  const clusters = day.clusters && day.clusters.length ? day.clusters : [
    { word: `${day.userWord || 'Stillness'} (Your Instinct)`, count: 'Found', isMine: true },
    { word: day.dominant.split(' ')[0], count: '4,120' },
    { word: 'Rebirth', count: '2,900' },
    { word: 'Hearth', count: '1,450' },
    { word: 'Quiet', count: '890' }
  ];

  clusters.forEach(c => {
    const pill = document.createElement('span');
    pill.className = `cluster-pill ${c.isMine ? 'mine' : ''}`;
    pill.textContent = `${c.word} (${c.count})`;
    clusterWrap.appendChild(pill);
  });

  // Stats
  document.getElementById('dayModalSubmissions').textContent = day.stats.total;
  document.getElementById('dayModalDominant').textContent = day.stats.dominant;
  document.getElementById('dayModalUnique').textContent = day.stats.unique;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  const card = modal.querySelector('.day-detail-card');
  if (card) card.scrollTop = 0;
}

// ------------------------------------------------------------
// 7. Countdown Clock Calculation
// ------------------------------------------------------------
function initCountdown() {
  const clockEl = document.getElementById('countdownClock');
  const hoursEl = document.getElementById('countdownHours');
  const minsEl = document.getElementById('countdownMinutes');
  const secsEl = document.getElementById('countdownSeconds');

  function update() {
    const now = new Date();
    const midnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
    const diff = midnightUTC - now;

    if (diff <= 0) {
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      if (clockEl && !hoursEl) clockEl.textContent = '00:00:00 — Reveal Live';
      return;
    }

    const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    if (hoursEl) hoursEl.textContent = hrs;
    if (minsEl) minsEl.textContent = mins;
    if (secsEl) secsEl.textContent = secs;
    if (clockEl && !hoursEl) clockEl.textContent = `${hrs}:${mins}:${secs}`;
  }

  update();
  setInterval(update, 1000);
}

// ------------------------------------------------------------
// 8. Reworked Native Ideas & Bugs Feedback System
// ------------------------------------------------------------
function initIdeasBugsModal() {
  const launcher = document.getElementById('feedbackLauncherBtn');
  const modal = document.getElementById('feedbackModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  const closeFeedback = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  launcher.addEventListener('click', () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('feedbackText').focus();
  });

  closeBtn.addEventListener('click', closeFeedback);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeFeedback();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeFeedback();
    }
  });

  window.submitFeedbackForm = function() {
    const status = document.getElementById('feedbackStatus');
    status.style.color = 'var(--clay)';
    status.textContent = 'Sending feedback to the makers...';

    setTimeout(() => {
      status.style.color = 'var(--green)';
      status.textContent = 'Thank you! Your suggestion has been received.';
      setTimeout(() => {
        modal.classList.add('hidden');
        document.getElementById('feedbackForm').reset();
        status.textContent = '';
      }, 1600);
    }, 700);
  };
}

// ------------------------------------------------------------
// 9. Reminders & Quick Links
// ------------------------------------------------------------
window.handleReminderSubmit = function() {
  const email = document.getElementById('remEmail').value;
  const msg = document.getElementById('remFeedbackMsg');
  if (!email && !document.getElementById('remPhone').value) {
    msg.style.color = 'var(--clay)';
    msg.textContent = 'Please enter an email or phone number.';
    return;
  }
  msg.style.color = 'var(--green)';
  msg.textContent = 'Reminder set! We will send a quiet nudge when the prompt opens.';
};

function initQuickLinks() {
  // Quick Portal buttons on hero
  document.getElementById('quickPortalHive')?.addEventListener('click', () => {
    switchView('view-hive');
  });

  document.getElementById('quickPortalMonthly')?.addEventListener('click', () => {
    switchView('view-demo');
  });

  // Waiting screen buttons
  document.getElementById('waitExploreYesterdayBtn')?.addEventListener('click', () => {
    switchView('view-hive');
    const yesterday = archiveDays.find((d) => d.dayNum === 47) || archiveDays[0];
    if (yesterday) {
      setTimeout(() => openDayDetailModal(yesterday), 200);
    }
  });

  document.getElementById('waitCheckLabsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-lab');
  });

  document.getElementById('waitSeeHiveBtn')?.addEventListener('click', () => {
    switchView('view-hive');
  });

  document.getElementById('waitSeeMonthlyBtn')?.addEventListener('click', () => {
    switchView('view-demo');
  });

  document.getElementById('waitSeeRevealBtn')?.addEventListener('click', () => {
    switchView('view-demo');
  });

  // Cross-view shortcuts between Your Haive and Monthly Summary
  document.getElementById('hiveToMonthlyBtn')?.addEventListener('click', () => {
    switchView('view-demo');
  });

  document.getElementById('quickPeekBtn')?.addEventListener('click', () => {
    switchView('view-demo');
  });

  document.getElementById('quickWhyBtn')?.addEventListener('click', () => {
    switchView('view-about');
  });

  document.getElementById('aboutBackToPromptBtn')?.addEventListener('click', () => {
    switchView('view-today');
  });

  // Reusable footer navigation hooks
  document.getElementById('footerWhatIsThis')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-about');
  });

  document.getElementById('footerYourHaive')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-hive');
  });

  document.getElementById('footerMonthlySummary')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-demo');
  });

  document.getElementById('footerSampleMonth')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-demo');
  });

  document.getElementById('footerPrivacy')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('hAIve Chi Privacy: We store zero personal data. Submissions are anonymous and processed client-side.');
  });

  document.getElementById('footerTerms')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('hAIve Chi Terms: A shared collective ritual. No accounts, no advertising, free universal access.');
  });

  document.getElementById('footerTheLab')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-lab');
  });
}

// ============================================================
// 10. THE LAB — Machine Consensus & 11 Labs Multi-Lingual Engine
// ============================================================
let currentAiMonth = 'October 2026';
let currentShowcaseModelId = null;

function initLabView() {
  renderAiModels(currentAiMonth);
  renderLabDaysFeed();
  initLabJumpBar();

  // 1. AI Model Month Pills
  document.querySelectorAll('.lab-month-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lab-month-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAiMonth = btn.getAttribute('data-ai-month');
      currentShowcaseModelId = null;
      const showcase = document.getElementById('aiMonthShowcase');
      if (showcase) showcase.classList.add('hidden');
      renderAiModels(currentAiMonth);
    });
  });

  // 2. AI Model Modal Close Handlers
  document.getElementById('aiModalCloseBtn')?.addEventListener('click', closeAiModelModal);
  document.getElementById('aiModelModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('aiModelModal')) closeAiModelModal();
  });

  // 3. Lab Day Detail Modal Close Handlers
  document.getElementById('labDayModalCloseBtn')?.addEventListener('click', closeLabDayDetailModal);
  document.getElementById('labDayDetailModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('labDayDetailModal')) closeLabDayDetailModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAiModelModal();
      closeLabDayDetailModal();
    }
  });

  // 4. Lab Process Ribbon Chevron Arrow Hover Handling
  initLabHeroHover();
}

function initLabHeroHover() {
  const items = document.querySelectorAll('.lab-step-item');
  items.forEach(item => {
    const step = item.getAttribute('data-step');
    const seg = document.getElementById(`labSegment${step}`);
    if (!seg) return;

    item.addEventListener('mouseenter', () => {
      seg.classList.add('is-hovered');
      if (step === '1') document.getElementById('labDivider1')?.style.setProperty('opacity', '0');
      if (step === '2') {
        document.getElementById('labDivider1')?.style.setProperty('opacity', '0');
        document.getElementById('labDivider2')?.style.setProperty('opacity', '0');
      }
      if (step === '3') {
        document.getElementById('labDivider2')?.style.setProperty('opacity', '0');
        document.getElementById('labDivider3')?.style.setProperty('opacity', '0');
      }
      if (step === '4') document.getElementById('labDivider3')?.style.setProperty('opacity', '0');
    });

    item.addEventListener('mouseleave', () => {
      seg.classList.remove('is-hovered');
      ['labDivider1', 'labDivider2', 'labDivider3'].forEach(id => {
        document.getElementById(id)?.style.removeProperty('opacity');
      });
    });
  });
}

function initLabJumpBar() {
  const jumpPills = document.querySelectorAll('.lab-jump-pill');
  if (jumpPills.length === 0) return;

  jumpPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-jump-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        jumpPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scrollspy observer for months
  const monthHeaders = document.querySelectorAll('.lab-month-header');
  if (window.IntersectionObserver && monthHeaders.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          jumpPills.forEach((pill) => {
            if (pill.getAttribute('data-jump-target') === id) {
              pill.classList.add('active');
            } else {
              pill.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

    monthHeaders.forEach(header => observer.observe(header));
  }
}

function renderAiModels(selectedMonth) {
  const grid = document.getElementById('aiModelsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  AI_MODELS.forEach((model, idx) => {
    const card = document.createElement('div');
    card.className = 'ai-model-card';
    card.setAttribute('data-model-id', model.id);
    card.style.animationDelay = `${idx * 25}ms`;

    const activeDaysText = selectedMonth === 'November 2026' ? '11 days active' : `${model.days} days active`;

    card.innerHTML = `
      <div class="ai-model-thumb">
        <img src="${model.image}" alt="${model.name} Monthly Synthesis" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'ai-model-thumb-fallback\\'>${model.name.charAt(0)}</div>';">
      </div>
      <div class="ai-model-info">
        <div class="ai-model-header-row">
          <h3 class="ai-model-name">${model.name}</h3>
          <span class="ai-origin-tag">${model.origin || ''}</span>
        </div>
        <div class="ai-model-stats-row">
          <span class="ai-days-tag">${activeDaysText}</span>
          <span class="ai-step-badge">${model.step}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (currentShowcaseModelId === model.id) {
        currentShowcaseModelId = null;
        const showcaseEl = document.getElementById('aiMonthShowcase');
        if (showcaseEl) showcaseEl.classList.add('hidden');
        card.classList.remove('active-model');
      } else {
        renderAiMonthShowcase(model.id);
        const showcaseEl = document.getElementById('aiMonthShowcase');
        if (showcaseEl) {
          showcaseEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });

    grid.appendChild(card);
  });

  // Only render showcase if user explicitly selected a model
  if (currentShowcaseModelId) {
    renderAiMonthShowcase(currentShowcaseModelId);
  } else {
    const showcase = document.getElementById('aiMonthShowcase');
    if (showcase) showcase.classList.add('hidden');
  }
}

function renderAiMonthShowcase(modelId) {
  const showcaseEl = document.getElementById('aiMonthShowcase');
  if (!showcaseEl) return;

  const data = AI_OCTOBER_SHOWCASE[modelId] || AI_OCTOBER_SHOWCASE['sealion'];
  const modelMeta = AI_MODELS.find(m => m.id === modelId) || AI_MODELS.find(m => m.id === 'sealion');
  currentShowcaseModelId = modelId;

  // Highlight selected card in grid with authentic terracotta outline
  document.querySelectorAll('.ai-model-card').forEach((card) => {
    if (card.getAttribute('data-model-id') === modelId) {
      card.classList.add('active-model');
    } else {
      card.classList.remove('active-model');
    }
  });

  // Flat-Topped Hexagon SVG Grid Geometry
  // R = 27, dx = 1.5 * R = 40.5, dy = sqrt(3) * R ~ 46.765, half_dy = dy / 2 ~ 23.383
  const R = 27;
  const dx = 1.5 * R;
  const dy = Math.sqrt(3) * R;
  const half_dy = dy / 2;
  const originX = 260;
  const originY = 175;

  function getHexPoints(cx, cy, r) {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const rad = (Math.PI / 180) * (60 * i);
      pts.push(`${(cx + r * Math.cos(rad)).toFixed(2)},${(cy + r * Math.sin(rad)).toFixed(2)}`);
    }
    return pts.join(' ');
  }

  // Generate SVG Hexagons
  const hexSvgs = data.days.map((d) => {
    const colStagger = (Math.abs(d.col) % 2 === 1) ? half_dy : 0;
    const cx = originX + d.col * dx;
    const cy = originY + d.row * dy + colStagger;
    const points = getHexPoints(cx, cy, R);
    const isFilled = d.sameAsPeople || d.day === 24;
    const fillClass = isFilled ? 'hex-filled' : '';

    return `
      <g class="ai-hex-group" data-day="${d.day}" tabindex="0" role="button" aria-label="Day ${d.day}: ${d.word}">
        <polygon points="${points}" class="ai-hex-polygon ${fillClass}" />
        <text x="${cx.toFixed(1)}" y="${(cy + 0.5).toFixed(1)}" class="ai-hex-text">${d.word}</text>
      </g>
    `;
  }).join('');

  // Generate 31-Day Ledger Rows (Day 31 down to Day 1)
  const ledgerRowsHtml = data.days.map((d) => {
    return `
      <div class="ai-ledger-row" id="ledger-day-${d.day}" data-day="${d.day}">
        <div class="ai-ledger-date">
          <span class="ai-ledger-day-num">${d.day}</span>
          <span class="ai-ledger-day-name">${d.dayOfWeek}</span>
        </div>
        <div class="ai-ledger-question">
          <span class="ai-ledger-q-text">${d.question}</span>
          ${d.sameAsPeople ? '<span class="ai-ledger-same-tag">&middot; same as the people</span>' : ''}
        </div>
        <div class="ai-ledger-word">${d.word}</div>
      </div>
    `;
  }).join('');

  showcaseEl.innerHTML = `
    <!-- 1. The Honeycomb Month Poster -->
    <div class="ai-showcase-poster">
      <div class="ai-showcase-top-bar">
        <div class="ai-showcase-eyebrow">MY MONTH IN THE HIVE &middot; ${data.name.toUpperCase()}</div>
        <button class="ai-showcase-close-btn" id="aiShowcaseCloseBtn" type="button" aria-label="Close Showcase">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span>Close</span>
        </button>
      </div>
      <h2 class="ai-showcase-title">${data.name}&rsquo;s ${data.month}</h2>
      <p class="ai-showcase-quote">&ldquo;${data.quote}&rdquo;</p>
      
      <div class="ai-showcase-honeycomb-wrap">
        <svg viewBox="0 0 520 440" class="ai-honeycomb-svg" preserveAspectRatio="xMidYMid meet" aria-label="${data.name} 31-Day Honeycomb Map">
          ${hexSvgs}
        </svg>
      </div>

      <div class="ai-showcase-legend">
        ${data.streak} DAYS &middot; ${data.streak} DAY STREAK &middot; FILLED = SAID WITH OTHERS &middot; OUTLINED = SAID ALONE
      </div>
    </div>

    <!-- 2. The 31-Day Ledger List -->
    <div class="ai-showcase-ledger">
      <div class="ai-ledger-header">
        <h3 class="ai-ledger-title">${data.name}&rsquo;s ${data.month} in the hive</h3>
        <p class="ai-ledger-subtitle">one cell for every day it answered</p>
      </div>

      <div class="ai-ledger-meta">
        ${data.streak} days &middot; in step with the people ${data.stepWithPeople}&times; &middot; its rarest word: &ldquo;${data.rarestWord}&rdquo;
      </div>

      <div class="ai-ledger-table">
        ${ledgerRowsHtml}
      </div>
    </div>

    <!-- 3. The Final Image Plaque -->
    <div class="ai-showcase-art-section">
      <div class="ai-showcase-art-card">
        <div class="ai-art-image-frame">
          <img src="${modelMeta.image}" alt="${data.name}&rsquo;s ${data.month} Monthly Image" class="ai-art-image" loading="lazy" />
        </div>
        <div class="ai-art-details">
          <h4 class="ai-art-title">${data.name}&rsquo;s ${data.month} as an Image</h4>
          <p class="ai-art-desc">made from its word for every day</p>
        </div>
      </div>
    </div>
  `;

  showcaseEl.classList.remove('hidden');

  showcaseEl.querySelector('#aiShowcaseCloseBtn')?.addEventListener('click', () => {
    currentShowcaseModelId = null;
    showcaseEl.classList.add('hidden');
    document.querySelectorAll('.ai-model-card').forEach(c => c.classList.remove('active-model'));
  });

  // Interactive hexagon click handler to jump & highlight corresponding ledger row
  showcaseEl.querySelectorAll('.ai-hex-group').forEach((g) => {
    g.addEventListener('click', () => {
      const day = g.getAttribute('data-day');
      const row = document.getElementById(`ledger-day-${day}`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        row.classList.add('row-highlight');
        setTimeout(() => row.classList.remove('row-highlight'), 1800);
      }
    });
  });
}

function formatQuestionWithItalic(question, topWord) {
  if (!question) return '';
  if (!topWord) return `“${question}”`;
  const cleanWord = topWord.replace(/[^a-zA-Z0-9]/g, '');
  if (!cleanWord) return `“${question}”`;

  // Look for the word in the question (case-insensitive)
  const regex = new RegExp(`\\b(${cleanWord}[a-z]*)\\b`, 'i');
  if (regex.test(question)) {
    return `“${question.replace(regex, `<span class="lab-q-italic">$1</span>`)}”`;
  }
  return `“${question}”`;
}

function renderLabDaysFeed() {
  const feed = document.getElementById('labDaysFeed');
  if (!feed) return;
  feed.innerHTML = '';

  const months = ['November 2026', 'October 2026', 'September 2026'];

  months.forEach((monthName) => {
    const monthDays = LAB_DAYS.filter(d => d.month === monthName);
    if (monthDays.length === 0) return;

    const monthSlug = `month-${monthName.toLowerCase().replace(/\s+/g, '-')}`;

    // Month Heading matching reference: hexagon icon + title on left, pill badge on right
    const headerEl = document.createElement('div');
    headerEl.className = 'lab-month-header';
    headerEl.id = monthSlug;
    headerEl.innerHTML = `
      <div class="lab-month-title-wrap">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="2.2" class="lab-month-hex-icon">
          <polygon points="12 2 21 7.2 21 16.8 12 22 3 16.8 3 7.2 12 2"></polygon>
        </svg>
        <h3 class="lab-month-title">${monthName}</h3>
      </div>
      <div class="lab-month-pill-badge">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>${monthDays.length} Days Recorded</span>
      </div>
    `;
    feed.appendChild(headerEl);

    // Days in this month
    monthDays.forEach((day) => {
      const card = document.createElement('article');
      card.className = 'lab-day-card';
      card.setAttribute('data-day-num', day.dayNum);

      const topWord = day.bins[0]?.word || "";
      const questionHtml = formatQuestionWithItalic(day.question, topWord);
      const dateFormatted = `${day.date.toUpperCase()} &middot; ${day.dayCode}`;

      // Pills row (up to 6 pills)
      const freqPillsHtml = day.bins.slice(0, 6).map((b) => `
        <span class="lab-day-freq-pill">
          <span class="pill-word">${b.word}</span>
          <span class="pill-count">${b.count}</span>
        </span>
      `).join('');

      // Artwork SVG content
      const num = day.dayNum;
      const hexClipPath = "M 110 11 L 296 11 Q 312 11 312 27 L 312 243 Q 312 259 296 259 L 110 259 Q 100 259 95 252 L 31 142 Q 25 135 31 128 L 95 18 Q 100 11 110 11 Z";
      let artSvgInner = '';
      if (day.artImage) {
        artSvgInner = `
          <image href="${day.artImage}" x="0" y="0" width="312" height="270" preserveAspectRatio="xMidYMid slice" clip-path="url(#hex-clip-${num})" />
        `;
      } else {
        artSvgInner = `
          <g clip-path="url(#hex-clip-${num})">
            <rect width="312" height="270" fill="#203028" />
            <circle cx="${125 + (num % 60)}" cy="135" r="${42 + (num % 25)}" fill="none" stroke="#D98A62" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
            <circle cx="${195 - (num % 40)}" cy="135" r="${32 + (num % 18)}" fill="none" stroke="#8CB89F" stroke-width="1.5" opacity="0.5"/>
            <text x="160" y="130" text-anchor="middle" font-family="serif" font-style="italic" font-size="24" fill="#FCEEE5">&ldquo;${topWord || 'Machine'}&rdquo;</text>
            <text x="160" y="156" text-anchor="middle" font-family="monospace" font-size="12" letter-spacing="1" fill="#D98A62">${day.dayCode}</text>
          </g>
        `;
      }

      card.innerHTML = `
        <!-- Distinctive Elongated Hexagonal Card Silhouette Matching Reference Exactly -->
        <svg class="lab-day-card-svg-bg" viewBox="0 0 1024 270" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 97.0 3.0 L 929.0 3.0 Q 938.0 3.0 946.0 12.0 L 1005.0 127.0 Q 1010.0 135.0 1005.0 143.0 L 946.0 258.0 Q 938.0 267.0 929.0 267.0 L 97.0 267.0 Q 88.0 267.0 80.0 258.0 L 21.0 143.0 Q 16.0 135.0 21.0 127.0 L 80.0 12.0 Q 88.0 3.0 97.0 3.0 Z" class="lab-day-card-path" fill="#FFFDF9" stroke="#EBC9B5" stroke-width="1.8"/>
        </svg>

        <div class="lab-day-inner">
          <!-- Left Column: Hexagonal Artwork (Shifted closer to left apex) -->
          <div class="lab-day-art-hex">
            <svg viewBox="0 0 312 270" class="lab-art-hex-svg" aria-label="${day.question} Artwork">
              <defs>
                <clipPath id="hex-clip-${num}">
                  <path d="${hexClipPath}" />
                </clipPath>
              </defs>
              ${artSvgInner}
              <path d="${hexClipPath}" fill="none" stroke="#FFFFFF" stroke-width="2.5" class="lab-art-hex-outline" />
            </svg>
          </div>

          <!-- Right Column: Content with Narrative Description -->
          <div class="lab-day-content">
            <div class="lab-day-date-eyebrow">
              <span>${dateFormatted}</span>
            </div>

            <h3 class="lab-day-question">${questionHtml}</h3>

            <p class="lab-day-narrative">${day.narrative}</p>

            <div class="lab-day-freq-row">
              ${freqPillsHtml}
            </div>

            <div class="lab-day-meta-row">
              <div class="lab-day-meta-left">
                <span class="lab-meta-item">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>${day.totalAnswers} people</span>
                </span>
                <span class="lab-meta-dot">&middot;</span>
                <span class="lab-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 2v7.31L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9.31V2"></path>
                  </svg>
                  <span>${day.totalLabs} labs</span>
                </span>
                <span class="lab-meta-dot">&middot;</span>
                <span class="lab-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B84D24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  <span>${day.totalRounds} rounds</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;

      // Compare button triggers reveal comparison
      card.querySelector('.lab-day-compare-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerHumanRevealForDay(day);
      });

      // Card click opens day detail modal
      card.addEventListener('click', () => {
        openLabDayDetailModal(day.dayNum);
      });

      feed.appendChild(card);
    });
  });
}

function triggerHumanRevealForDay(day) {
  // Map or construct a day object compatible with openDayDetailModal
  const existingDay = HIVE_DATA.find(d => d.dayNum === day.dayNum) || SAMPLE_MONTH_DAYS.find(d => d.dayNum === day.dayNum);
  if (existingDay) {
    openDayDetailModal(existingDay);
  } else {
    // Construct representative reveal from the day's metadata
    const userWord = localStorage.getItem('haive_today_word') || 'Sanctuary';
    const syntheticDay = {
      dayNum: day.dayNum,
      dayCode: day.dayCode,
      date: day.date,
      question: day.question,
      desc: day.narrative,
      userWord: userWord,
      stats: {
        total: `${day.totalAnswers * 34}`,
        dominant: `${day.bins[0]?.word || 'Consensus'} (${day.bins[0]?.pct || 32}%)`,
        unique: '2,840'
      },
      clusters: day.bins.map((b, i) => ({
        word: i === 0 ? `${b.word} (Cluster Lead)` : b.word,
        count: `${b.count * 28}`,
        isMine: i === 0
      })),
      svgArt: `<svg viewBox="0 0 400 250" class="hive-card-art" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="250" fill="var(--paper)"/>
        <circle cx="200" cy="125" r="70" fill="var(--clay-subtle)"/>
        <text x="200" y="125" text-anchor="middle" dominant-baseline="central" font-family="var(--font-serif)" font-size="34" font-style="italic" fill="var(--green)">
          ${day.bins[0]?.word || day.question}
        </text>
      </svg>`
    };
    openDayDetailModal(syntheticDay);
  }
}

// ------------------------------------------------------------
// AI Model Profile Modal
// ------------------------------------------------------------
function openAiModelModal(modelId) {
  const model = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
  const modal = document.getElementById('aiModelModal');
  if (!modal) return;

  document.getElementById('aiModalName').textContent = model.name;
  document.getElementById('aiModalStepBadge').textContent = model.step;
  const originBadge = document.getElementById('aiModalOriginBadge');
  if (originBadge) originBadge.textContent = model.origin || 'Foundation Lab';
  document.getElementById('aiModalDaysCount').textContent = `${model.days} Days Active`;
  document.getElementById('aiModalArch').textContent = model.modelName;
  document.getElementById('aiModalRounds').textContent = model.rounds;
  document.getElementById('aiModalLangs').textContent = model.languages;
  document.getElementById('aiModalQuirk').textContent = model.quirk;
  document.getElementById('aiModalConsensus').textContent = model.consensusAlignment;
  document.getElementById('aiModalDominant').textContent = model.dominantWord;

  const img = document.getElementById('aiModalImg');
  if (img) {
    img.src = model.image;
    img.alt = `${model.name} Monthly Synthesis Artwork`;
  }

  // Populate 31-day honeycomb trajectory strip
  const strip = document.getElementById('aiModalHoneycombStrip');
  if (strip) {
    strip.innerHTML = '';
    // Pull words from actual dataset
    const sampleWords = LAB_DAYS.slice(0, 31).map((d) => d.bins[0]?.word || 'word');
    for (let day = 1; day <= 31; day++) {
      const word = sampleWords[day - 1] || 'echo';
      const cell = document.createElement('div');
      cell.className = 'ai-honeycomb-cell';
      cell.innerHTML = `
        <span class="ai-cell-day">D${day}</span>
        <span class="ai-cell-word">${word}</span>
      `;
      strip.appendChild(cell);
    }
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAiModelModal() {
  const modal = document.getElementById('aiModelModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// ------------------------------------------------------------
// Lab Day Deep-Dive Comparison Modal
// ------------------------------------------------------------
function openLabDayDetailModal(dayNum) {
  const day = LAB_DAYS.find(d => d.dayNum === dayNum) || LAB_DAYS[0];
  const modal = document.getElementById('labDayDetailModal');
  if (!modal) return;

  document.getElementById('labDayModalBadge').textContent = day.dayCode;
  document.getElementById('labDayModalDate').textContent = day.date;
  document.getElementById('labDayModalSignalTag').textContent = day.consensusLabel;
  document.getElementById('labDayModalPrompt').textContent = `“${day.question}”`;
  document.getElementById('labDayModalHeadline').textContent = day.headline;
  document.getElementById('labDayModalNarrative').textContent = day.narrative;
  document.getElementById('labDayModalMetaFooter').textContent = `${day.totalAnswers} AI answers · ${day.totalLabs} labs · ${day.totalRounds} rounds`;

  // Frequency proportional bar distribution
  const barsContainer = document.getElementById('labDayModalFreqBars');
  if (barsContainer) {
    barsContainer.innerHTML = day.bins.map((b) => {
      return `
        <div class="modal-freq-row">
          <span class="modal-freq-word">${b.word}</span>
          <div class="modal-freq-bar-bg">
            <div class="modal-freq-bar-fill" style="width: ${b.pct}%;"></div>
          </div>
          <span class="modal-freq-stats">${b.count} (${b.pct}%)</span>
        </div>
      `;
    }).join('');
  }

  // People's Reveal Info
  document.getElementById('labDayModalPeopleSubtitle').textContent = day.peopleSub;
  document.getElementById('labDayModalPeopleTitle').textContent = day.peopleTitle;
  
  const divergenceNote = document.getElementById('labDayModalDivergenceNote');
  if (divergenceNote) {
    divergenceNote.textContent = day.consensusType === 'high'
      ? `High cognitive convergence: Machine colony heavily consolidated on "${day.bins[0]?.word}" (${day.bins[0]?.pct}%). Human participants exhibited broader linguistic divergence.`
      : `Broad semantic dispersal: AIs split across ${day.bins.length} distinct bins without an overwhelming absolute majority.`;
  }

  // Connect "Open Full Human Reveal" button
  const openPeopleBtn = document.getElementById('labDayModalOpenPeopleBtn');
  if (openPeopleBtn) {
    openPeopleBtn.onclick = () => {
      closeLabDayDetailModal();
      triggerHumanRevealForDay(day);
    };
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLabDayDetailModal() {
  const modal = document.getElementById('labDayDetailModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

