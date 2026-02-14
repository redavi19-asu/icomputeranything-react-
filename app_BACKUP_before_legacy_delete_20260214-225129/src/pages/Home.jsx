
import { useEffect, useRef } from "react";
import "./home.css";

// Set your real background image path here
const BG_URL = "/assets/office-bg.png"; // <-- CHANGE THIS to your actual image path

const styles = {
  hero: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "140px 32px 80px", // leaves room for nav + ticker
    backgroundImage: `url(${BG_URL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#0b0f14", // fallback while image loads
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.10)", // very light overlay
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 1,
    width: "min(1100px, 92vw)",
  },
};

export default function Home() {
  const cardsRef = useRef(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // stop the top bar from ever stealing this wheel event
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main className="home" style={{ paddingTop: 80 }}>
      <section style={styles.hero}>
        {/* If you want FULL CLEAR background: remove this overlay line */}
        <div style={styles.overlay} />
        <div style={styles.content}>
          <h1>I Computer Anything</h1>
          <p>Diagnostics • Repair • Web • Servers</p>
        </div>
      </section>

      {/* IMPORTANT: this wrapper MUST be here */}
      <div className="cardsWrap">
        <section ref={cardsRef} className="cards horizontal">
          <a className="card" href="/legacy/merch.html">Merch</a>
          <a className="card" href="/legacy/servers.html">Servers</a>
          <a className="card" href="/legacy/licensing.html">Licensing</a>
          <a className="card" href="/legacy/services-form.html">Service Form</a>

          {/* add 2 temp cards just to prove scroll */}
          <a className="card" href="/legacy/index.html">Home</a>
          <a className="card" href="/legacy/index.html">Extra</a>
        </section>
      </div>
    </main>
  );
}
