import { useEffect, useRef } from "react";
import "./home.css";

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
      <section className="hero">
        <h1>I Computer Anything</h1>
        <p>Diagnostics • Repair • Web • Servers</p>
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
