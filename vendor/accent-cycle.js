/* Accent cycle (brand.accentCycle): a visitor steps the page accent through a short list of
 * colours. A click on a [data-accent-cycle] button, or an "accent:next" event, moves to the next
 * colour and blends every accent token over 280ms, the way the Cozy Studio logo does. The choice
 * is kept per page; the head script in ProjectLayout.astro applies it before the first paint.
 * Each change dispatches "accent:change" with { hex, index } for other surfaces to answer. */

const root = document.documentElement;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const KEY = `gvaste-accent:${location.pathname}`;

function readList() {
  try {
    const list = JSON.parse(root.getAttribute("data-accent-cycle") || "[]");
    return Array.isArray(list) ? list.filter((hex) => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(hex)) : [];
  } catch {
    return [];
  }
}

const rgb = (hex) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((ch) => ch + ch).join("");
  return [0, 2, 4].map((at) => parseInt(h.slice(at, at + 2), 16));
};
const toHex = (channels) => `#${channels.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

// Text on the accent: near-black or white, whichever contrasts more (same rule as the build).
function textOn(channels) {
  const [r, g, b] = channels.map((value) => {
    const c = value / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? "#0b0a10" : "#ffffff";
}

// kit/tokens.css derives --accent-1..9 and the translucent tints from --accent.
function applyAccent(hex) {
  root.style.setProperty("--accent", hex);
  if (root.dataset.actionAccent != null) root.style.setProperty("--action-fg", textOn(rgb(hex)));
}

const list = readList();
if (list.length > 1) {
  let stored = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch {}
  let index = Math.max(0, list.indexOf(stored));
  let frame = 0;

  const blend = (from, to) => {
    cancelAnimationFrame(frame);
    if (reduced) {
      applyAccent(to);
      return;
    }
    const a = rgb(from);
    const b = rgb(to);
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 280);
      const eased = 1 - (1 - progress) ** 3;
      applyAccent(progress < 1 ? toHex(a.map((value, i) => value + (b[i] - value) * eased)) : to);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };

  const next = () => {
    const from = list[index];
    index = (index + 1) % list.length;
    const to = list[index];
    try {
      if (index === 0) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, to);
    } catch {}
    blend(from, to);
    document.dispatchEvent(new CustomEvent("accent:change", { detail: { hex: to, index } }));
  };

  // The trigger's mark twists and swells while a ring spreads from it.
  const pulse = (trigger) => {
    if (reduced) return;
    const mark = trigger.firstElementChild ?? trigger;
    mark.animate(
      [
        { transform: "none" },
        { transform: "rotate(-12deg) scale(0.88)", offset: 0.2 },
        { transform: "rotate(9deg) scale(1.12)", offset: 0.55 },
        { transform: "rotate(0deg) scale(1)" },
      ],
      { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    const ring = document.createElement("span");
    ring.className = "accent-ring";
    ring.setAttribute("aria-hidden", "true");
    trigger.append(ring);
    const done = () => ring.remove();
    ring
      .animate([{ transform: "scale(0.85)", opacity: 0.6 }, { transform: "scale(1.45)", opacity: 0 }], {
        duration: 420,
        easing: "ease-out",
      })
      .finished.then(done, done);
  };

  for (const trigger of document.querySelectorAll("button[data-accent-cycle]")) {
    trigger.addEventListener("click", () => {
      next();
      pulse(trigger);
    });
  }
  document.addEventListener("accent:next", next);
}
