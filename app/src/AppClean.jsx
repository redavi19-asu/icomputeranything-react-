import { useState } from "react";
import "./AppClean.css";

const DISPATCH_URL = "https://redavi19-asu.github.io/icomputer-dispatch-platform/";
const INTRIGUED_MUTTS_URL = "https://www.intriguedmutts.com";

const services = [
  {
    icon: "⌘",
    title: "Web & App Development",
    text: "Responsive websites, customer portals, internal tools, and practical full-stack applications for small businesses.",
  },
  {
    icon: "↯",
    title: "IT Support",
    text: "PC, software, connectivity, and end-user troubleshooting with remote or local support options.",
  },
  {
    icon: "◎",
    title: "Networks & Servers",
    text: "Wi-Fi, routers, switches, Windows Server, Linux, storage, and small-business infrastructure setup.",
  },
  {
    icon: "◇",
    title: "Security & Backup",
    text: "Practical firewall, backup, recovery, hardening, and security improvements without enterprise complexity.",
  },
];

const work = [
  {
    eyebrow: "Software Product",
    title: "DispatchOS",
    text: "A field-service dispatch platform with booking, driver workflows, company workspaces, job management, and installable driver and dispatcher apps.",
    href: DISPATCH_URL,
    cta: "Explore DispatchOS",
    accent: true,
  },
  {
    eyebrow: "Live Project",
    title: "Intrigued Mutts",
    text: "A live React project combining original merchandise, community ideas, and market-focused interactive features.",
    href: INTRIGUED_MUTTS_URL,
    cta: "Visit Intrigued Mutts",
  },
  {
    eyebrow: "Custom Development",
    title: "Built for your workflow",
    text: "Need something closer to DispatchOS but tailored to your company? I Computer Anything can build custom dashboards, intake flows, automations, and internal tools.",
    href: "#contact",
    cta: "Request a build",
  },
];

function AppClean() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const serviceForm = `${import.meta.env.BASE_URL || "/"}legacy/services-form.html`;

  return (
    <div className="ica-site">
      <header className="ica-nav">
        <a className="ica-brand" href="#top" onClick={closeMenu}>
          <img
            src={`${import.meta.env.BASE_URL}legacy/images/logo.png`}
            alt="I Computer Anything"
          />
          <span>I Computer Anything</span>
        </a>

        <button
          className="ica-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <nav className={menuOpen ? "ica-links is-open" : "ica-links"}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#software" onClick={closeMenu}>Software</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="ica-nav-cta" href="#contact" onClick={closeMenu}>Start a Project</a>
        </nav>
      </header>

      <main id="top">
        <section className="ica-hero">
          <div className="ica-glow ica-glow-one" />
          <div className="ica-glow ica-glow-two" />
          <div className="ica-hero-copy">
            <div className="ica-kicker">IT • DEVELOPMENT • SOFTWARE</div>
            <h1>Technology that actually does something for your business.</h1>
            <p>
              I Computer Anything builds software, websites, networks, and practical IT solutions for people who need technology to work — not get in the way.
            </p>
            <div className="ica-actions">
              <a className="ica-button ica-button-primary" href="#software">See the software</a>
              <a className="ica-button ica-button-secondary" href="#services">View IT services</a>
            </div>
          </div>

          <div className="ica-command-card" aria-label="I Computer Anything capabilities">
            <div className="ica-command-top">
              <span /> <span /> <span />
              <strong>ICA // SYSTEMS</strong>
            </div>
            <div className="ica-command-grid">
              <div><small>BUILD</small><b>Web + Apps</b></div>
              <div><small>RUN</small><b>Servers + Networks</b></div>
              <div><small>SUPPORT</small><b>IT Operations</b></div>
              <div><small>SHIP</small><b>SaaS Products</b></div>
            </div>
            <div className="ica-status"><i /> Systems online. New projects open.</div>
          </div>
        </section>

        <section className="ica-section" id="services">
          <div className="ica-section-heading">
            <span>01 / SERVICES</span>
            <h2>One technology partner, several ways to help.</h2>
            <p>From a broken workstation to a custom business application, the goal is the same: solve the problem cleanly and leave you with something dependable.</p>
          </div>
          <div className="ica-card-grid">
            {services.map((service) => (
              <article className="ica-service-card" key={service.title}>
                <div className="ica-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
          <a className="ica-inline-link" href={serviceForm}>Request an IT service →</a>
        </section>

        <section className="ica-section ica-software-section" id="software">
          <div className="ica-section-heading">
            <span>02 / SOFTWARE</span>
            <h2>Software built by I Computer Anything.</h2>
            <p>ICA is the parent company. Products get their own focused experience, while this site stays the place customers discover what we build.</p>
          </div>

          <article className="ica-dispatch-feature">
            <div className="ica-product-copy">
              <div className="ica-product-label">FLAGSHIP PRODUCT</div>
              <h3>DispatchOS</h3>
              <p>
                Dispatch operations without the clutter. Manage jobs, customers, drivers, booking, assignments, and company settings from one platform.
              </p>
              <div className="ica-feature-pills">
                <span>Dispatcher Dashboard</span>
                <span>Driver App</span>
                <span>Booking</span>
                <span>Company Workspace</span>
              </div>
              <div className="ica-actions">
                <a className="ica-button ica-button-primary" href={DISPATCH_URL} target="_blank" rel="noreferrer">View DispatchOS</a>
                <a className="ica-button ica-button-secondary" href="#contact">Need a custom version?</a>
              </div>
            </div>
            <div className="ica-product-screen">
              <div className="ica-screen-bar"><span>DispatchOS</span><em>LIVE OPERATIONS</em></div>
              <div className="ica-screen-body">
                <div className="ica-map-block"><b>LIVE MAP</b><i className="dot d1" /><i className="dot d2" /><i className="dot d3" /></div>
                <div className="ica-queue-block">
                  <span>JOB QUEUE</span>
                  <b>Emergency Service</b>
                  <b>Scheduled Visit</b>
                  <b>Driver Assigned</b>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="ica-section" id="work">
          <div className="ica-section-heading">
            <span>03 / SELECTED WORK</span>
            <h2>Things already built, shipped, or actively evolving.</h2>
          </div>
          <div className="ica-work-grid">
            {work.map((item) => (
              <article className={item.accent ? "ica-work-card featured" : "ica-work-card"} key={item.title}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.cta} →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="ica-section ica-about" id="about">
          <div>
            <span className="ica-mini-label">04 / ABOUT</span>
            <h2>Hands-on IT meets hands-on development.</h2>
          </div>
          <div className="ica-about-copy">
            <p>
              I Computer Anything sits between traditional IT support and software development. That means projects can be approached from both sides: what the customer sees and what has to work behind it.
            </p>
            <p>
              The focus is small businesses, organizations, and practical products that benefit from direct communication, clear solutions, and technology built around the real workflow.
            </p>
          </div>
        </section>

        <section className="ica-contact" id="contact">
          <div>
            <span>05 / LET'S BUILD</span>
            <h2>Tell me what you need the technology to do.</h2>
            <p>Website, custom software, network work, support, or a company-specific version of an existing ICA product.</p>
          </div>
          <a className="ica-button ica-button-light" href={serviceForm}>Start a Request</a>
        </section>
      </main>

      <footer className="ica-footer">
        <div><strong>I Computer Anything</strong><span>IT • Development • Software</span></div>
        <p>Built to solve real problems.</p>
      </footer>
    </div>
  );
}

export default AppClean;
