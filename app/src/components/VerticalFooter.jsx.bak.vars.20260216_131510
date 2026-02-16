export default function VerticalFooter() {
  return (
    <div style={wrap}>
      {/* Right-side vertical footer bar */}
      <aside style={bar}>
        <div style={rail}>
          <div style={brand}>I Computer Anything</div>

          <div style={stack}>
            <div style={line}>© 2026 Ryan Davis</div>
            <div style={line}>Built with React + Vite</div>
            <div style={line}>DMV Area • Remote + On-site</div>
          </div>

          <div style={links}>
            <a style={a} href="mailto:ryanedavis@gmail.com">Email</a>
            <a style={a} href="https://github.com/redavi19-asu" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a style={a} href="https://intriguedmutts.com" target="_blank" rel="noreferrer">
              IntriguedMutts.com
            </a>
          </div>
        </div>
      </aside>

      {/* Optional center “end screen” feel (remove if you want ONLY the vertical bar) */}
      <div style={centerHint}>
        <div style={centerTitle}>Thanks for visiting.</div>
        <div style={centerSub}>Use the nav to jump anywhere — or reach out on the right.</div>
      </div>
    </div>
  );
}

const wrap = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const bar = {
  position: "absolute",
  right: 18,
  top: 86,
  bottom: 18,
  width: 62,
  borderRadius: 18,
  background: "rgba(239,68,68,0.16)",       // red glow
  border: "1px solid rgba(239,68,68,0.45)",
  boxShadow: "0 14px 60px rgba(0,0,0,0.55)",
  backdropFilter: "blur(10px)",
  display: "grid",
  placeItems: "center",
};

const rail = {
  height: "100%",
  padding: "14px 10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,

  // ✅ vertical text
  writingMode: "vertical-rl",
  textOrientation: "mixed",
};

const brand = {
  fontWeight: 900,
  letterSpacing: 1.2,
  fontSize: 12,
  opacity: 0.95,
};

const stack = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  opacity: 0.9,
  fontWeight: 800,
  fontSize: 12,
};

const line = {
  whiteSpace: "nowrap",
};

const links = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  fontWeight: 900,
  fontSize: 12,
};

const a = {
  color: "rgba(255,255,255,0.92)",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.25)",
  borderRadius: 14,
  padding: "8px 10px",
};

const centerHint = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  padding: 24,
  textAlign: "center",
};

const centerTitle = {
  fontSize: 44,
  fontWeight: 950,
  marginBottom: 10,
};

const centerSub = {
  opacity: 0.85,
  fontWeight: 800,
};
