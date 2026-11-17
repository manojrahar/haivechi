/* ============================================================
 * Dynamic Ambient Ground: Living Aurora Orbs + Cursor Light + Subtle Honeycomb Wireframe
 *
 * 1. Living Aurora Orbs: Soft terracotta, sage & amber drifts.
 * 2. Interactive Cursor Light: Smooth follower illumination.
 * 3. Soft Transparent Honeycomb Lattice:
 *    - Very delicate hairline wireframe (0.85px) in faint dark green rgba(46, 74, 63, 0.12).
 *    - Butter-smooth fade-in / fade-out: random cells gently bloom their inside with
 *      soft transparent amber tone (fill-opacity: 0.15) over 1.6s and dissolve back.
 *    - High transparency so it rests peacefully in the background without distraction.
 * ============================================================ */

function hexPath(cx, cy, r) {
  let d = "";
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    d += (i ? " L " : "M ") + (cx + r * Math.cos(a)).toFixed(1) + " " + (cy + r * Math.sin(a)).toFixed(1);
  }
  return d + " Z";
}

let pointerListenerAttached = false;
let mouseX = typeof window !== "undefined" ? window.innerWidth / 2 : 800;
let mouseY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
let currentX = mouseX;
let currentY = mouseY;
let rafId = null;
let hiveIntervalId = null;

export function drawGround(el) {
  if (!el) return;

  if (hiveIntervalId) {
    clearInterval(hiveIntervalId);
    hiveIntervalId = null;
  }

  const W = 1600, H = 1250;
  const AXIAL = [
    [0, 0], [1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1],
    [2, 0], [2, -1], [1, 1], [0, 2], [-1, 2], [-2, 1], [-2, 0],
    [-1, -1], [0, -2], [1, -2], [2, -2], [3, -1], [2, 1], [1, 2],
    [-2, 2], [-3, 1], [-2, -1], [-1, -2], [0, 3], [-3, 2], [3, -2],
    [3, 0], [0, -3], [-3, 0], [0, -3], [2, -3], [-2, 3]
  ];

  // Cluster anchors on perimeter flanks & corners
  const CLUSTERS = [
    // Top-Left Corner
    { cx: 30,   cy: 30,   r: 26, maxRings: 24 },
    { cx: 180,  cy: 110,  r: 23, maxRings: 18 },

    // Top-Right Corner
    { cx: 1570, cy: 30,   r: 26, maxRings: 24 },
    { cx: 1420, cy: 110,  r: 23, maxRings: 18 },

    // Mid-Left Flank
    { cx: 20,   cy: 500,  r: 25, maxRings: 22 },
    { cx: 120,  cy: 380,  r: 22, maxRings: 14 },
    { cx: 120,  cy: 620,  r: 22, maxRings: 14 },

    // Mid-Right Flank
    { cx: 1580, cy: 500,  r: 25, maxRings: 22 },
    { cx: 1480, cy: 380,  r: 22, maxRings: 14 },
    { cx: 1480, cy: 620,  r: 22, maxRings: 14 },

    // Bottom-Left Corner & Flank
    { cx: 30,   cy: 1180, r: 26, maxRings: 24 },
    { cx: 180,  cy: 1080, r: 23, maxRings: 18 },

    // Bottom-Right Corner & Flank
    { cx: 1570, cy: 1180, r: 26, maxRings: 24 },
    { cx: 1420, cy: 1080, r: 23, maxRings: 18 }
  ];

  let hexPaths = "";
  const renderedSet = new Set();
  let cellIndex = 0;

  CLUSTERS.forEach((cluster) => {
    const { cx, cy, r, maxRings } = cluster;

    for (let i = 0; i < maxRings; i++) {
      const [q, s] = AXIAL[i % AXIAL.length];
      const x = cx + r * 1.732 * (q + s / 2);
      const y = cy + r * 1.50 * s;

      const distFromCenter = Math.sqrt(Math.pow((x - W / 2) / 490, 2) + Math.pow((y - H / 2) / 380, 2));
      if (distFromCenter < 1.0) continue;

      const key = `${Math.round(x / 8)}_${Math.round(y / 8)}`;
      if (renderedSet.has(key)) continue;
      renderedSet.add(key);

      const d = hexPath(x, y, r);
      hexPaths += `<path d="${d}" class="hive-cell" id="hcell-${cellIndex}" fill="var(--clay, #B0603A)" fill-opacity="0" stroke="var(--hive-stroke, rgba(46, 74, 63, 0.11))" stroke-width="0.85"/>\n`;
      cellIndex++;

      // Subtle hairline inner ring
      if (i % 6 === 0) {
        const innerD = hexPath(x, y, r * 0.55);
        hexPaths += `<path d="${innerD}" class="hive-inner" fill="none" stroke="var(--hive-stroke, rgba(46, 74, 63, 0.14))" stroke-width="0.7"/>\n`;
      }
    }
  });

  el.innerHTML = `
  <!-- Layer 1: Living Ambient Aurora Orbs -->
  <div class="ground-aurora-container" aria-hidden="true">
    <div class="ground-orb ground-orb-1"></div>
    <div class="ground-orb ground-orb-2"></div>
    <div class="ground-orb ground-orb-3"></div>
  </div>

  <!-- Layer 2: Subtle Interactive Pointer Glow -->
  <div class="ground-cursor-glow" id="groundCursorGlow" aria-hidden="true"></div>

  <!-- Layer 3: Soft & Transparent Honeycomb Lattice -->
  <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"
       xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <style>
        .hive-cell {
          fill: var(--clay, #B0603A);
          fill-opacity: 0;
          stroke: var(--hive-stroke, rgba(46, 74, 63, 0.11));
          stroke-width: 0.85px;
          transform-box: fill-box;
          transform-origin: center;
          transition: fill-opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 1.6s ease, stroke-opacity 1.6s ease, stroke-width 1.6s ease, transform 1.6s ease;
        }

        /* Delicate soft fade in: fill-opacity 5% more (0.20) + dark border with increased opacity (light theme only) */
        .hive-cell.lit {
          fill-opacity: 0.17;
          stroke: var(--green, #2E4A3F);
          stroke-opacity: 0.62;
          stroke-width: 1.2px;
          transform: scale(1.025);
        }

        [data-theme="dark"] .hive-cell.lit {
          fill-opacity: 0.08;
          stroke: var(--hive-stroke);
          stroke-opacity: 0.35;
          stroke-width: 0.85px;
        }

        /* Inner Rings (Soft hairline) */
        .hive-inner {
          fill: none;
          stroke: var(--hive-stroke, rgba(46, 74, 63, 0.14));
          stroke-width: 0.7px;
          transform-box: fill-box;
          transform-origin: center;
          pointer-events: none;
        }
      </style>
    </defs>

    <g class="subtle-hives-group">
      ${hexPaths}
    </g>
  </svg>`;

  // Rolling continuous fade lifecycle
  const cells = Array.from(el.querySelectorAll(".hive-cell"));
  if (cells.length > 0) {
    const targetCount = Math.max(12, Math.round(cells.length * 0.13));
    const activeMap = new Map();
    const now = Date.now();

    while (activeMap.size < targetCount) {
      const randIdx = Math.floor(Math.random() * cells.length);
      if (!activeMap.has(randIdx)) {
        const fakeAge = Math.random() * 3000;
        activeMap.set(randIdx, now - fakeAge);
        cells[randIdx].classList.add("lit");
      }
    }

    hiveIntervalId = setInterval(() => {
      if (!document.contains(el)) {
        clearInterval(hiveIntervalId);
        hiveIntervalId = null;
        return;
      }

      const currentTime = Date.now();
      const CELL_LIFETIME = 3200;

      const expired = [];
      for (const [idx, startTime] of activeMap.entries()) {
        if (currentTime - startTime >= CELL_LIFETIME) {
          expired.push(idx);
        }
      }

      const toRemove = expired.slice(0, 2);
      toRemove.forEach(idx => {
        activeMap.delete(idx);
        cells[idx].classList.remove("lit");
      });

      const needed = targetCount - activeMap.size;
      for (let k = 0; k < Math.min(needed, 2); k++) {
        let attempts = 0;
        while (attempts < 20) {
          const randIdx = Math.floor(Math.random() * cells.length);
          if (!activeMap.has(randIdx)) {
            activeMap.set(randIdx, currentTime);
            cells[randIdx].classList.add("lit");
            break;
          }
          attempts++;
        }
      }
    }, 450);
  }

  // Attach smooth cursor follower loop
  const cursorEl = el.querySelector("#groundCursorGlow");
  if (cursorEl) {
    if (!pointerListenerAttached) {
      window.addEventListener("pointermove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, { passive: true });
      pointerListenerAttached = true;
    }

    if (rafId) cancelAnimationFrame(rafId);
    function updateCursor() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }
      rafId = requestAnimationFrame(updateCursor);
    }
    updateCursor();
  }
}
