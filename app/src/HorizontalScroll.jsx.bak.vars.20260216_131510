import { useEffect, useMemo, useRef } from "react";
import Home from "./Home"; // your real homepage section component

export default function HomeHorizontal() {
  const scrollerRef = useRef(null);

  const sections = useMemo(
    () => [
      { key: "home", title: "Home", node: <Home /> },
      { key: "merch", title: "Merch", node: <div style={panelCenter}>MERCH SECTION</div> },
      { key: "servers", title: "Servers", node: <div style={panelCenter}>SERVERS SECTION</div> },
      { key: "licensing", title: "Licensing", node: <div style={panelCenter}>LICENSING SECTION</div> },
      { key: "services", title: "Services", node: <div style={panelCenter}>SERVICES SECTION</div> },
    ],
    []
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      el.scrollLeft += dx;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const goTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* top nav */}
      <div style={topbar}>
        <strong style={{ color: "#fff" }}>I Computer Anything</strong>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {sections.map((s, i) => (
            <button key={s.key} onClick={() => goTo(i)} style={btn}>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* scroller */}
      <main
        ref={scrollerRef}
        className="hscroll"
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {sections.map((s) => (
          <section
            key={s.key}
            style={{
              flex: "0 0 100vw",
              height: "100vh",
              scrollSnapAlign: "start",
            }}
          >
            {s.node}
          </section>
        ))}
      </main>
    </div>
  );
}

const topbar = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  padding: "10px 12px",
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255,255,255,0.14)",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const btn = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
};

const panelCenter = {
  height: "100vh",
  display: "grid",
  placeItems: "center",
  color: "#fff",
  fontSize: 40,
  paddingTop: 70, // keeps it from hiding under topbar
};
