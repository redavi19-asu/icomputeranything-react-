import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./components/Reveal";

export default function App() {
  const scrollerRef = useRef(null);
  const lockRef = useRef(false);

  const sections = useMemo(
    () => [
      { key: "home", title: "Home" },
      { key: "resume", title: "Resume" },
      { key: "services", title: "Services" },
      { key: "about", title: "About" },
      { key: "skills", title: "Skills" },
      { key: "projects", title: "Projects" },
      { key: "contact", title: "Contact" },
    ],
    []
  );

  const [active, setActive] = useState(0);

  const goTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(i, sections.length - 1));
    setActive(idx);
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  // Helper to go to section by key
  const goKey = (key) => {
    const idx = sections.findIndex((s) => s.key === key);
    if (idx >= 0) goTo(idx);
  };

  // keep active index synced if user drags horizontally
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      if (idx !== active) setActive(idx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [active]);

  // wheel -> horizontal section stepping (global, seamless)
  useEffect(() => {
    const onWheel = (e) => {
      const dx = e.deltaX || 0;
      const dy = e.deltaY || 0;
      const intent = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (!intent) return;

      e.preventDefault();

      if (lockRef.current) return;
      lockRef.current = true;

      // down/forward = next (to the right)
      if (intent > 10) goTo(active + 1);
      else if (intent < -10) goTo(active - 1);
      else lockRef.current = false;

      window.setTimeout(() => (lockRef.current = false), 380);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, [active]);

  return (
    <div style={styles.page}>
      {/* top menu */}
      <div style={styles.nav}>
        <div style={{ fontWeight: 800 }}>I Computer Anything</div>

        <div style={styles.navBtns}>
          {sections.map((s, i) => (
            <button
              key={s.key}
              onClick={() => goTo(i)}
              style={{
                ...styles.navBtn,
                ...(i === active ? styles.navBtnActive : null),
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* seamless horizontal scroller */}
      <main ref={scrollerRef} style={styles.scroller}>
        {sections.map((s) => (
          <section key={s.key} style={styles.section}>
            {s.key === "home" ? (
              <div style={styles.heroWrap}>
                {/* background */}
                <div style={styles.heroBg} />
                <div style={styles.heroOverlay} />
                <Reveal rootRef={scrollerRef} y={18}>
                  <div style={styles.heroInner}>
                    {/* left side */}
                    <div style={styles.heroLeft}>
                      <div style={styles.brandRow}>
                        <div style={styles.logoPill}>I COMPUTER ANYTHING</div>
                      </div>

                      <div style={styles.heroKicker}>I Computer Anything</div>

                      <h1 style={styles.heroTitle}>
                        Bringing Practical IT &<br /> Web to Life
                      </h1>

                      <div style={styles.heroSub}>
                        Systems Admin • Networking • Web Dev • Mobile/Wireless network Connectivity
                      </div>

                      <div style={styles.heroBody}>
                        I build clean, reliable websites and networks — from home-lab servers to live
                        event Wi-Fi across the DMV area.
                      </div>

                      <div style={styles.heroBtns}>
                        <button style={styles.heroBtnPrimary} onClick={() => goKey("projects")}>View Projects</button>
                        <button style={styles.heroBtn} onClick={() => goKey("contact")}>Get in Touch</button>
                        <button style={styles.heroBtn} onClick={() => goKey("services")}>Live Chat</button>
                      </div>
                    </div>

                    {/* right side profile card */}
                    <div style={styles.heroRight}>
                      <div style={styles.profileCard}>
                        <div style={styles.avatar} />
                        <div style={styles.name}>Ryan Davis</div>

                        <div style={styles.skillStack}>
                          {[
                            { ico: "🪟", label: "Windows Server • AD • PowerShell" },
                            { ico: "🐧", label: "Linux (Debian/Fedora/Ubuntu) • SSH • Nginx" },
                            { ico: "🌐", label: "Networking • Wi-Fi • Troubleshooting" },
                            { ico: "⚛️", label: "React • Vite • JavaScript" },
                            { ico: "🎨", label: "HTML • CSS • Responsive UI" },
                            { ico: "☁️", label: "Cloudflare • GitHub • Deployments" },
                          ].map((s) => (
                            <div key={s.label} style={styles.skillRow}>
                              <span style={styles.skillIco}>{s.ico}</span>
                              <span style={styles.skillLbl}>{s.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ) : s.key === "services" ? (
              <div style={styles.servicesWrap}>
                <div style={styles.servicesHead}>
                  <h1 style={styles.servicesTitle}>Services</h1>
                  <p style={styles.servicesSub}>
                    Practical, hands-on services for home users and small businesses.
                  </p>
                  <p style={styles.servicesNote}>
                    Click a service card to request a quote — the chosen service will be pre-filled on the request form.
                  </p>
                  <p style={styles.servicesPay}>
                    A deposit / authorization hold may be required after consultation; an email payment link will be provided.
                    Payments are processed via Square (major credit cards, Apple Pay, Google Pay).
                  </p>
                </div>
                <Reveal rootRef={scrollerRef} delay={0.05}>
                  <div style={styles.servicesGrid} className="servicesGrid">
                    {[
                      {
                        ico: "📶",
                        color: "rgba(34,197,94,0.18)",
                        b: "rgba(34,197,94,0.35)",
                        title: "Home & Small Business Network Setup",
                        body:
                          "Setup Wi-Fi, configure routers and switches, secure networks, and optimize home offices for reliable remote work.",
                      },
                      {
                        ico: "☁️",
                        color: "rgba(59,130,246,0.18)",
                        b: "rgba(59,130,246,0.35)",
                        title: "Server & Cloud Configuration",
                        body:
                          "Install and configure Windows Server, Ubuntu, or Debian systems; set up VMs, storage, and migrations to more robust infrastructure.",
                      },
                      {
                        ico: "🛠️",
                        color: "rgba(168,85,247,0.18)",
                        b: "rgba(168,85,247,0.35)",
                        title: "IT Support & Troubleshooting",
                        body:
                          "On-call and scheduled support for PCs, networks, and software — remote assistance or local visits for hands-on fixes.",
                      },
                      {
                        ico: "💻",
                        color: "rgba(139,92,246,0.18)",
                        b: "rgba(139,92,246,0.35)",
                        title: "Custom Website & App Development",
                        body:
                          "Custom websites and simple apps for small businesses: clean, responsive design and practical functionality to get you online fast.",
                      },
                      {
                        ico: "🛡️",
                        color: "rgba(34,197,94,0.18)",
                        b: "rgba(34,197,94,0.35)",
                        title: "Cybersecurity Consulting",
                        body:
                          "Security audits, firewall setup, and practical advice to protect small business networks and data—reducing risk with affordable changes.",
                      },
                      {
                        ico: "💾",
                        color: "rgba(59,130,246,0.18)",
                        b: "rgba(59,130,246,0.35)",
                        title: "Data Backup & Recovery",
                        body:
                          "Design and deploy automated backup systems (cloud or local) and provide fast recovery services so clients can restore lost data when needed.",
                      },
                      {
                        ico: "🧩",
                        color: "rgba(245,158,11,0.18)",
                        b: "rgba(245,158,11,0.35)",
                        title: "Hardware Installation & Upgrades",
                        body:
                          "PC upgrades, new workstation builds, hardware installs, and troubleshooting — on-site or remote depending on the client and location.",
                      },
                      {
                        ico: "🧰",
                        color: "rgba(245,158,11,0.18)",
                        b: "rgba(245,158,11,0.35)",
                        title: "Managed IT Services for Small Businesses",
                        body:
                          "Ongoing IT maintenance, monitoring, and support packages for small businesses that need reliable, outsourced IT without a full-time staff.",
                      },
                    ].map((c) => (
                      <button key={c.title} style={styles.serviceCard} className="serviceCardHover serviceCardFade">
                        <div style={{ ...styles.serviceIcon, background: c.color, borderColor: c.b }}>
                          {c.ico}
                        </div>
                        <div style={styles.serviceTitle}>{c.title}</div>
                        <div style={styles.serviceBody}>{c.body}</div>
                      </button>
                    ))}
                  </div>
                </Reveal>
              </div>
            ) : s.key === "about" ? (
              <div style={styles.aboutWrap}>
                <div style={styles.aboutInner}>
                  <h1 style={styles.aboutTitle}>About Me</h1>
                  <p style={styles.aboutBody}>
                    I'm Ryan Davis — an IT student and hands-on technologist based in the DMV area (30-mile radius).
                    I turn ideas into working technology quickly and reliably. I run projects like
                    <strong> Triple C Emergency Charging Services</strong> (mobile EV charging and connectivity) and
                    <strong> I Computer Anything</strong>, and I maintain a home-lab data center where I host sites,
                    configure servers, and test new tools. I specialize in network setup, server and cloud configuration,
                    and practical web/app development — I learn by building and enjoy taking projects from concept to deployment.
                  </p>
                  <div className="aboutPills" style={styles.aboutPills}>
                    <div className="aboutPill" style={styles.aboutPill}>
                      <span style={{ ...styles.aboutPillIco, background: "rgba(245,158,11,0.16)", borderColor: "rgba(245,158,11,0.35)" }}>⚡</span>
                      Quick prototypes, solid foundations
                    </div>
                    <div className="aboutPill" style={styles.aboutPill}>
                      <span style={{ ...styles.aboutPillIco, background: "rgba(34,197,94,0.16)", borderColor: "rgba(34,197,94,0.35)" }}>🛡️</span>
                      Practical security & reliability
                    </div>
                    <div className="aboutPill" style={styles.aboutPill}>
                      <span style={{ ...styles.aboutPillIco, background: "rgba(249,115,22,0.16)", borderColor: "rgba(249,115,22,0.35)" }}>🧡</span>
                      Clear communication with clients
                    </div>
                  </div>
                </div>
              </div>
            ) : s.key === "resume" ? (
              <div style={styles.resumeWrap}>
                <div style={styles.resumeInner}>
                  <div style={styles.resumeHead}>
                    <span style={styles.resumeHeadIco}>💼</span>
                    <h1 style={styles.resumeTitle}>EXPERIENCE</h1>
                  </div>

                  <div className="resumeGrid" style={styles.resumeGrid}>
                    {[
                      {
                        ico: "📡",
                        icoBg: "rgba(249,115,22,0.16)",
                        icoBd: "rgba(249,115,22,0.40)",
                        title: "Comcast Cable Tech",
                        body:
                          "Installed and troubleshot broadband cable, modems, and in-home networks. Helped customers get reliable connectivity while learning real-world networking.",
                      },
                      {
                        ico: "🛰️",
                        icoBg: "rgba(59,130,246,0.16)",
                        icoBd: "rgba(59,130,246,0.40)",
                        title: "DirecTV Satellite Tech",
                        body:
                          "Mounted and configured satellite dishes, aligned signals, and ensured stable TV/Internet service. Specialized in difficult installs and resolving interference issues.",
                      },
                      {
                        ico: "🧩",
                        icoBg: "rgba(245,158,11,0.16)",
                        icoBd: "rgba(245,158,11,0.40)",
                        title: "Junior Network Admin (Goodwill)",
                        body:
                          "Volunteered as a Junior Network Admin, managing small-scale networks, Active Directory basics, and hands-on troubleshooting for staff and equipment.",
                      },
                      {
                        ico: "✉️",
                        icoBg: "rgba(248,113,113,0.16)",
                        icoBd: "rgba(248,113,113,0.40)",
                        title: "USPS",
                        body:
                          "Current role at the United States Postal Service. Strong focus on reliability, service, and balancing work with ongoing IT studies.",
                      },
                      {
                        ico: "🖥️",
                        icoBg: "rgba(34,197,94,0.16)",
                        icoBd: "rgba(34,197,94,0.40)",
                        title: "Home Lab / Data Center",
                        body:
                          "Maintain multiple Windows Server and Linux machines for web hosting, file sharing, and network experimentation. Hands-on experience with server admin, Samba shares, and remote access.",
                      },
                      {
                        ico: "🛠️",
                        icoBg: "rgba(125,211,252,0.16)",
                        icoBd: "rgba(125,211,252,0.40)",
                        title: "Goodwill Junior Network / Help Desk",
                        body:
                          "Volunteered as a Junior Network Admin and A+ Tech. Supported staff through a help desk ticketing system, diagnosing and resolving hardware/software issues, configuring user accounts, and maintaining small office networks.",
                      },
                    ].map((c, idx) => (
                      <div
                        key={c.title}
                        className="resumeCardHover resumeCardFade"
                        style={{
                          ...styles.resumeCard,
                          gridColumn: idx < 4 ? "span 1" : "span 2",
                        }}
                      >
                        <div style={styles.resumeCardTop}>
                          <span style={{ ...styles.resumeCardIco, background: c.icoBg, borderColor: c.icoBd }}>
                            {c.ico}
                          </span>
                          <div style={styles.resumeCardTitle}>{c.title}</div>
                        </div>
                        <div style={styles.resumeCardBody}>{c.body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : s.key === "skills" ? (
              <div style={styles.skillsWrap}>
                <h1 style={styles.skillsTitle}>Skills</h1>
                <Reveal rootRef={scrollerRef} delay={0.05}>
                  <div
                    style={{
                      ...styles.skillsGrid,
                      display: "grid",
                      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                      gap: 14,
                    }}
                  >
                    {[
                      {
                        ico: "🧱",
                        title: "Web",
                        body:
                          "HTML, CSS, JavaScript, responsive layouts, accessibility, basic SEO.",
                      },
                      {
                        ico: "🧬",
                        title: "Networking",
                        body:
                          "TCP/IP, DNS/DHCP, routing basics, VPN (WireGuard), remote access.",
                      },
                      {
                        ico: "🖥️",
                        title: "Systems",
                        body:
                          "Windows Server 2025, Debian/Ubuntu, Samba/SMB shares, IIS/Apache basics.",
                      },
                      {
                        ico: "☁️",
                        title: "Deploy",
                        body:
                          "Git/GitHub, GitHub Pages, environment setup, troubleshooting.",
                      },
                      {
                        ico: "🎧",
                        title: "Help Desk",
                        body:
                          "Ticketing, troubleshooting hardware/software, resolving end-user issues.",
                      },
                      {
                        ico: "🛠️",
                        title: "A+ Technician",
                        body:
                          "PC repair, operating systems, customer-facing technical support.",
                      },
                    ].map((c) => (
                      <div key={c.title} style={styles.skillCard}>
                        <div style={styles.skillCardHead}>
                          <span style={styles.skillIco}>{c.ico}</span>
                          <div style={styles.skillTitleText}>{c.title}</div>
                        </div>
                        <div style={styles.skillBody}>{c.body}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            ) : (
              <div style={styles.card}>
                <h1 style={{ margin: 0, fontSize: 42 }}>{s.title}</h1>
                <p style={{ marginTop: 10, opacity: 0.85 }}>Placeholder content for {s.title}.</p>
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

// Duplicate styles and import block removed. Only one definition remains below.

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background:
      "radial-gradient(1000px 600px at 50% 15%, rgba(125,211,252,0.12), rgba(0,0,0,0.85)), #000",
    color: "white",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    background: "rgba(0,0,0,0.55)",
    borderBottom: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
  },
  navBtns: {
    marginLeft: "auto",
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 2,
  },
  navBtn: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  navBtnActive: {
    background: "rgba(125,211,252,0.18)",
    border: "1px solid rgba(125,211,252,0.35)",
  },
  scroller: {
    position: "absolute",
    inset: 0,
    paddingTop: 56, // space for nav
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
  },
  section: {
    flex: "0 0 100vw",
    height: "calc(100vh - 56px)",
    scrollSnapAlign: "start",
    display: "grid",
    placeItems: "center",
    padding: 24,
  },
  card: {
    width: "min(980px, calc(100vw - 48px))",
    borderRadius: 18,
    padding: "22px 26px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
  },
  heroWrap: {
    width: "min(1200px, calc(100vw - 48px))",
    height: "min(640px, calc(100vh - 120px))",
    borderRadius: 22,
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 18px 80px rgba(0,0,0,0.55)",
  },

  heroBg: {
    position: "absolute",
    inset: 0,
    background: "transparent",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(900px 520px at 20% 30%, rgba(0,0,0,0.25), rgba(0,0,0,0.88))",
  },

  heroInner: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 22,
    padding: 28,
    alignItems: "center",
  },

  heroLeft: {
    maxWidth: 640,
  },

  brandRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },

  logoPill: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.14)",
    fontWeight: 900,
    letterSpacing: 1.2,
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
  },

  heroKicker: {
    fontSize: 18,
    fontWeight: 800,
    opacity: 0.95,
    marginBottom: 10,
  },

  heroTitle: {
    margin: 0,
    fontSize: 56,
    lineHeight: 1.02,
    fontWeight: 900,
  },

  heroSub: {
    marginTop: 14,
    fontWeight: 800,
    opacity: 0.9,
  },

  heroBody: {
    marginTop: 12,
    opacity: 0.85,
    maxWidth: 560,
  },

  heroBtns: {
    marginTop: 18,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  heroBtnPrimary: {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(125,211,252,0.55)",
    background: "rgba(125,211,252,0.18)",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },

  heroBtn: {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },

  heroRight: {
    display: "grid",
    placeItems: "center",
  },

  profileCard: {
    width: "min(360px, 100%)",
    borderRadius: 22,
    padding: 18,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    margin: "6px auto 10px",
    background:
      "url('https://i.pravatar.cc/200?img=12') center/cover no-repeat",
    border: "3px solid rgba(125,211,252,0.75)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
  },

  name: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 18,
    marginBottom: 10,
  },

  skillsText: {
    marginTop: 10,
    padding: "12px 14px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    lineHeight: 1.55,
    fontWeight: 800,
    opacity: 0.92,
  },
};

styles.serviceCard = {
  all: "unset",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 8,

  borderRadius: 16,                 // a bit squarer
  padding: 16,
  minHeight: 180,                   // taller cards
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  backdropFilter: "blur(10px)",

  transition: "transform 160ms ease, border-color 160ms ease, background 160ms ease",
};

styles.aboutWrap = {
  width: "min(1200px, calc(100vw - 48px))",
  height: "min(560px, calc(100vh - 120px))",
  borderRadius: 22,
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.20)",
  boxShadow: "0 18px 80px rgba(0,0,0,0.55)",
  padding: 28,
  display: "grid",
  alignItems: "center",
};

styles.aboutInner = {
  maxWidth: 980,
};

styles.aboutTitle = {
  margin: 0,
  fontSize: 44,
  fontWeight: 900,
};

styles.aboutBody = {
  marginTop: 14,
  opacity: 0.9,
  fontWeight: 750,
  lineHeight: 1.55,
  maxWidth: 980,
};

styles.aboutPills = {
  marginTop: 18,
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12,
};

styles.aboutPill = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 14px",
  borderRadius: 16,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  fontWeight: 850,
  opacity: 0.92,
};

styles.aboutPillIco = {
  width: 30,
  height: 30,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
};

styles.skillsWrap = {
  width: "min(1200px, calc(100vw - 48px))",
  height: "min(560px, calc(100vh - 120px))",
  borderRadius: 22,
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.20)",
  boxShadow: "0 18px 80px rgba(0,0,0,0.55)",
  padding: 28,
};

styles.skillsTitle = {
  margin: 0,
  fontSize: 44,
  fontWeight: 900,
  color: "#fff",
};

styles.skillsGrid = {
  marginTop: 18,
};

styles.skillCard = {
  borderRadius: 18,
  padding: 18,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  backdropFilter: "blur(10px)",
  color: "#fff",
};

styles.skillCardHead = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
};

styles.skillIco = {
  width: 34,
  height: 34,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(125,211,252,0.14)",
};

styles.skillTitleText = {
  fontWeight: 950,
  fontSize: 18,
};

styles.skillBody = {
  opacity: 0.86,
  fontWeight: 750,
  lineHeight: 1.4,
};

// Resume section styles
styles.resumeWrap = {
  width: "min(1200px, calc(100vw - 48px))",
  height: "min(640px, calc(100vh - 120px))",
  borderRadius: 22,
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.20)",
  boxShadow: "0 18px 80px rgba(0,0,0,0.55)",
  padding: 28,
};

styles.resumeInner = {
  height: "100%",
  display: "grid",
  gridTemplateRows: "auto 1fr",
  gap: 18,
};

styles.resumeHead = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

styles.resumeHeadIco = {
  width: 34,
  height: 34,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  background: "rgba(245,158,11,0.16)",
  border: "1px solid rgba(245,158,11,0.35)",
};

styles.resumeTitle = {
  margin: 0,
  fontSize: 34,
  fontWeight: 950,
  letterSpacing: 0.6,
};

styles.resumeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 14,
  alignContent: "start",
};

styles.resumeCard = {
  borderRadius: 18,
  padding: 18,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  minHeight: 150,
  transition: "transform 160ms ease, border-color 160ms ease, background 160ms ease",
};

styles.resumeCardTop = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
};

styles.resumeCardIco = {
  width: 34,
  height: 34,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
};

styles.resumeCardTitle = {
  fontWeight: 950,
  fontSize: 16,
  lineHeight: 1.15,
};

styles.resumeCardBody = {
  opacity: 0.88,
  fontWeight: 750,
  lineHeight: 1.4,
  fontSize: 13.5,
};
