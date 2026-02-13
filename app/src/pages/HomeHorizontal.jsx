import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// ✅ Always build legacy URLs using Vite BASE_URL (works in dev + GitHub Pages)
const legacyUrl = (file) => `${import.meta.env.BASE_URL}legacy/${file}`;


// ---------- IFRAME PANEL (wheel-capture overlay + click passthrough) ----------
function IframePanel({ title, file, onWheelIntent }) {
  const iframeRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const onWheel = (e) => {
      const dx = e.deltaX || 0;
      const dy = e.deltaY || 0;
      const intent = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (!intent) return;

      e.preventDefault();
      e.stopPropagation();

      onWheelIntent?.(intent);
    };

    overlay.addEventListener("wheel", onWheel, { passive: false });
    return () => overlay.removeEventListener("wheel", onWheel);
  }, [onWheelIntent]);

  const forwardClickToIframe = (e) => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc) return;

    const rect = iframe.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const target = doc.elementFromPoint(x, y);
    if (!target) return;

    iframe.focus?.();

    const evt = new win.MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    });
    target.dispatchEvent(evt);
  };

  return (
    <section
      aria-label={title}
      style={{
        flex: "0 0 100vw",
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        background: "transparent",
      }}
    >
      <iframe
        ref={iframeRef}
        title={title}
        src={legacyUrl(file)}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={overlayRef}
        onClick={forwardClickToIframe}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "transparent",
        }}
      />
    </section>
  );
}

// ---------- HOME PANEL ----------
function HomePanel({ goTo }) {
  return (
    <section
      aria-label="Home"
      style={{
        flex: "0 0 100vw",
        height: "100vh",
        scrollSnapAlign: "start",
        display: "grid",
        placeItems: "center",
        position: "relative",
      }}
    >
      {/* background image (NOTE: mp4 can't be backgroundImage, but leaving your structure intact) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.20), rgba(0,0,0,0.75))",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "min(980px, calc(100vw - 48px))",
          padding: "22px 26px",
          borderRadius: 18,
          background: "rgba(10, 18, 24, 0.55)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          color: "#fff",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 40 }}>I Computer Anything</h1>
        <p style={{ margin: "8px 0 18px", opacity: 0.9 }}>
          Diagnostics • Repair • Web • Servers
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            paddingBottom: 6,
          }}
        >
          {[
            { title: "Merch", idx: 1 },
            { title: "Servers", idx: 2 },
            { title: "Licensing", idx: 3 },
            { title: "Service Form", idx: 4 },
          ].map((c) => (
            <button
              key={c.title}
              onClick={() => goTo(c.idx)}
              style={{
                minWidth: 220,
                height: 64,
                borderRadius: 16,
                background: "rgba(10, 18, 24, 0.55)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#7dd3fc",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeHorizontal() {
  const scrollerRef = useRef(null);
  const loc = useLocation();

  const panels = useMemo(
    () => [
      { key: "home", title: "Home", kind: "home" },
      { key: "merch", title: "Merch", kind: "iframe", file: "merch.html" },
      { key: "servers", title: "Servers", kind: "iframe", file: "servers.html" },
      { key: "licensing", title: "Licensing", kind: "iframe", file: "licensing.html" },
      { key: "services", title: "Services", kind: "iframe", file: "services-form.html" },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, panels.length - 1));
    setActiveIndex(clamped);
    el.scrollTo({ left: clamped * window.innerWidth, behavior: "smooth" });
  };

  const wheelLockRef = useRef(false);

  const handleWheelIntent = (intent) => {
    if (wheelLockRef.current) return;
    wheelLockRef.current = true;

    if (intent > 10) goTo(activeIndex + 1);
    else if (intent < -10) goTo(activeIndex - 1);
    else wheelLockRef.current = false;

    window.setTimeout(() => (wheelLockRef.current = false), 420);
  };

  // ✅ Keep activeIndex in sync when user drags scrollbar / trackpad
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / window.innerWidth);
      if (idx !== activeIndex) setActiveIndex(idx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [activeIndex]);

  useEffect(() => {
    const onWheel = (e) => {
      const dx = e.deltaX || 0;
      const dy = e.deltaY || 0;
      const intent = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (!intent) return;

      e.preventDefault();
      handleWheelIntent(intent);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, [activeIndex]);

  // ✅ deep-link: /#/?panel=servers (or merch/licensing/services/home)
  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const key = (params.get("panel") || "home").toLowerCase();
    const idx = panels.findIndex((p) => p.key === key);
    if (idx >= 0) goTo(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.search]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        backgroundImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,0.20), rgba(0,0,0,0.75))",
      }}
    >
      {/* Top nav */}
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
          color: "#fff",
        }}
      >
        <strong>I Computer Anything</strong>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {panels.map((p, i) => (
            <button
              key={p.key}
              onClick={() => goTo(i)}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: i === activeIndex ? "rgba(125,211,252,0.18)" : "rgba(255,255,255,0.08)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroller */}
      <main
        ref={scrollerRef}
        className="hscroll"
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
        {panels.map((p) =>
          p.kind === "home" ? (
            <HomePanel key={p.key} goTo={goTo} />
          ) : (
            <IframePanel
              key={p.key}
              title={p.title}
              file={p.file}
              onWheelIntent={handleWheelIntent}
            />
          )
        )}
      </main>
    </div>
  );
}
