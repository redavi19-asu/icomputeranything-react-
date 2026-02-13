export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.wrap} aria-label="Footer">
      <div style={styles.verticalTag}>
        © {year} • Ryan Davis • Built with React + Vite
      </div>
    </footer>
  );
}

const styles = {
  // this is a REAL footer section (it lives at the end)
  wrap: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end", // ✅ push to right edge
    alignItems: "flex-end",     // ✅ sit near bottom like a footer
    padding: 24,
  },

  // ✅ vertical READ text on the right side
  verticalTag: {
    writingMode: "vertical-rl",   // makes the text vertical
    transform: "rotate(180deg)",  // makes it read bottom->top nicely on right edge

    padding: "14px 10px",
    borderRadius: 16,

    background: "rgba(255,0,0,0.12)",     // ✅ red glass
    border: "1px solid rgba(255,0,0,0.35)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",

    color: "rgba(255,255,255,0.92)",
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 0.6,
    whiteSpace: "nowrap",
    userSelect: "none",
  },
};
