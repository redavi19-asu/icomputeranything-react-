import { useMemo, useState } from "react";

export default function TechTicker({ top = 56, height = 64, speed = 60 }) {
  const [paused, setPaused] = useState(false);

  const items = useMemo(
    () => [
      // --- Your current ones (keep) ---
      { label: "Google", icon: "G", href: "https://google.com" },
      { label: "Amazon", icon: "a", href: "https://amazon.com" },
      { label: "Meta", icon: "∞", href: "https://about.meta.com" },
      { label: "X", icon: "X", href: "https://x.com" },
      { label: "GitHub", icon: "⌂", href: "https://github.com" },
      { label: "Docker", icon: "🐳", href: "https://www.docker.com" },
      { label: "Spotify", icon: "♫", href: "https://spotify.com" },
      { label: "YouTube", icon: "▶", href: "https://youtube.com" },
      { label: "Instagram", icon: "◎", href: "https://instagram.com" },
      { label: "Uber", icon: "U", href: "https://uber.com" },
      { label: "TikTok", icon: "♪", href: "https://tiktok.com" },
      { label: "Apple", icon: "", href: "https://apple.com" },
      { label: "Linux", icon: "🐧", href: "https://www.kernel.org" },

      // --- Missing ones from your screenshots (add) ---
      { label: "Telegram", icon: "✈", href: "https://telegram.org" },
      { label: "WeChat", icon: "💬", href: "https://www.wechat.com" },
      { label: "WhatsApp", icon: "🟢", href: "https://www.whatsapp.com" },
      { label: "Yahoo", icon: "Y!", href: "https://www.yahoo.com" },
      { label: "Tumblr", icon: "t", href: "https://www.tumblr.com" },
      { label: "Medium", icon: "M", href: "https://medium.com" },
      { label: "Quora", icon: "Q", href: "https://www.quora.com" },
      { label: "WordPress", icon: "W", href: "https://wordpress.com" },
      { label: "Joomla", icon: "J", href: "https://www.joomla.org" },
      { label: "Drupal", icon: "D", href: "https://www.drupal.org" },
      { label: "Magento", icon: "M", href: "https://business.adobe.com/products/magento/magento-commerce.html" },
      { label: "PrestaShop", icon: "P", href: "https://www.prestashop.com" },
      { label: "Android", icon: "🤖", href: "https://www.android.com" },
      { label: "iOS", icon: "", href: "https://www.apple.com/ios" },
      { label: "Waze", icon: "🚗", href: "https://www.waze.com" },
      { label: "Slack", icon: "S", href: "https://slack.com" },
      { label: "Zoom", icon: "🎥", href: "https://zoom.us" },
      { label: "Swank", icon: "🎬", href: "https://www.swank.com" },
      { label: "Signal", icon: "🔒", href: "https://signal.org" },
      { label: "Viber", icon: "📞", href: "https://www.viber.com" },
      { label: "Snapchat", icon: "👻", href: "https://www.snapchat.com" },
      { label: "Twitch", icon: "🎮", href: "https://www.twitch.tv" },
      { label: "Steam", icon: "S", href: "https://store.steampowered.com" },
      { label: "SoundCloud", icon: "☁", href: "https://soundcloud.com" },
      { label: "Mastodon", icon: "M", href: "https://joinmastodon.org" },
      { label: "Apple Pay", icon: "", href: "https://www.apple.com/apple-pay" },
      { label: "Google Pay", icon: "GPay", href: "https://pay.google.com" },
      { label: "Venmo", icon: "V", href: "https://venmo.com" },
      { label: "Creative Commons", icon: "CC", href: "https://creativecommons.org" },
      { label: "OSI", icon: "OSI", href: "https://opensource.org" },
      { label: "freeCodeCamp", icon: "ƒ", href: "https://www.freecodecamp.org" },
      { label: "HackerRank", icon: "H", href: "https://www.hackerrank.com" },
      { label: "CodePen", icon: "⎔", href: "https://codepen.io" },
      { label: "JavaScript", icon: "JS", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { label: "Python", icon: "Py", href: "https://www.python.org" },
      { label: "Java", icon: "☕", href: "https://www.oracle.com/java" },
    ],
    []
  );

  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <div
      style={{
        ...s.wrap,
        top,
        height,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Tech ticker"
    >
      {/* keyframes live here so you don't need a CSS file */}
      <style>{`
        @keyframes techTickerScroll {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
      `}</style>

      <div
        style={{
          ...s.track,
          animation: `techTickerScroll ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loop.map((it, idx) => (
          <a
            key={`${it.label}-${idx}`}
            href={it.href}
            target="_blank"
            rel="noreferrer"
            style={s.pill}
          >
            <span style={s.ico}>{it.icon}</span>
            <span style={s.txt}>{it.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const s = {
  wrap: {
    position: "fixed",
    left: 0,
    right: 0,
    zIndex: 9998,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    background: "rgba(0,0,0,0.55)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
  },
  track: {
    display: "flex",
    gap: 14,
    padding: "10px 18px",
    width: "max-content",
    willChange: "transform",
    // animation is now set inline for dynamic speed
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.92)",
    textDecoration: "none",
    fontWeight: 700,
    boxShadow: "0 1px 8px rgba(0,0,0,0.20)",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  ico: {
    minWidth: 24,
    height: 24,
    padding: "0 8px",     // <-- allows PAY / GPay without spilling
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontSize: 12,
    fontWeight: 900,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  txt: {
    fontSize: 14,
    opacity: 0.95,
  },
};
