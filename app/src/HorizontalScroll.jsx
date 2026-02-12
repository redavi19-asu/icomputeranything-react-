import { useEffect, useMemo, useRef } from "react";

// ✅ Always build legacy URLs using Vite BASE_URL (works in dev + GitHub Pages)
const legacyUrl = (file) => `${import.meta.env.BASE_URL}legacy/${file}`;

function Panel({ file, title }) {
  return (
    <section
      aria-label={title}
      style={{
        flex: "0 0 100vw",
        height: "100vh",
        scrollSnapAlign: "start",
      }}
    >
      <iframe
        title={title}
        src={legacyUrl(file)}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          display: "block",
          background: "#000",
        }}
      />
    </section>
  );
}

export default function HorizontalScroll() {
  const scrollerRef = useRef(null);

  const panels = useMemo(
    () => [
      { title: "Home", file: "index.html" }, // your ticker page
      { title: "Merch", file: "merch.html" },
      { title: "Servers", file: "servers.html" },
      { title: "Licensing", file: "licensing.html" },
      { title: "Services", file: "services-form.html" },
    ],
    []
  );

  // ✅ Wheel scroll = horizontal movement
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Prevent the browser from vertical scrolling the outer page
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const goTo = (index) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * window.innerWidth, behavior: "smooth" });
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* ✅ React top nav */}
      <div
        style={{
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
        }}
      >
        <strong style={{ color: "#fff" }}>I Computer Anything</strong>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {panels.map((p, i) => (
            <button
              key={p.title}
              onClick={() => goTo(i)}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Horizontal scroller */}
      <main
        ref={scrollerRef}
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* spacer so fixed nav doesn't feel like it covers the top */}
        <div style={{ position: "absolute", top: 0, left: 0, height: 56 }} />
        {panels.map((p) => (
          <Panel key={p.title} file={p.file} title={p.title} />
        ))}
      </main>
    </div>
  );
}
