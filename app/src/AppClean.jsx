import { useEffect, useState } from "react";
import "./AppClean.css";

const DISPATCH_URL = "https://redavi19-asu.github.io/icomputer-dispatch-platform/";
const CONTROL_URL = "https://control.icomputeranything.com/";
const CONTROL_TRIAL_URL = `${CONTROL_URL}#trial`;
const DIRECTOR_URL = "https://scenepilot.ryanedavis.workers.dev/";
const UNIFIED_URL = "https://unified.icomputeranything.com/";
const DC_LIVE_URL = "https://dc-live.pages.dev/";
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
    title: "Cybersecurity & Backup",
    text: "Security engineering, endpoint protection, security operations, firewall review, hardening, backup, recovery, vulnerability awareness, and practical risk reduction for supported environments.",
    tags: ["Security Engineer", "Endpoint Security Engineer", "SecOps / Security Operations"],
  },
];


const products = [
  {
    id: "ica-control",
    theme: "control",
    featured: true,
    eyebrow: "RMM + ENDPOINT SECURITY OPERATIONS",
    status: "APP STORE / TESTFLIGHT PREP",
    mark: "IC",
    title: "ICA Control",
    tagline: "One command center for endpoint management, security operations, customer support, and service delivery.",
    summary: "ICA Control combines RMM / Endpoint Management, EDR, IDS / IPS security monitoring, and Vulnerability Management in one customer-to-endpoint workflow. Customers can onboard themselves, enroll supported devices, request Fix-It support, and stay tied to the correct ICA account and operator console.",
    cardPills: ["RMM / Endpoint Management", "EDR", "IDS / IPS", "Vulnerability Management", "Ask ICA + Fix-It", "Windows / macOS / Linux + Android"],
    platforms: ["Web operator console", "Windows endpoints", "macOS endpoints", "Linux endpoints", "Android", "iPhone + iPad companion"],
    accountAccess: "Password recovery plus Google, Apple, and Microsoft identity support. Social buttons activate where provider credentials are configured. Customer and operator access remain role-separated; iPhone/iPad is a companion/control client, not a hidden desktop-style endpoint agent.",
    capabilities: [
      "RMM / Endpoint Management — enrolled device inventory, health posture, telemetry, update visibility, diagnostics, approved actions, and customer-authorized remote support",
      "EDR / Endpoint Detection & Response — Wazuh endpoint/XDR/SIEM events, alerts, incidents, investigation, and response workflows unified into ICA Control",
      "IDS / IPS — Suricata network IDS/IPS alert events feed intrusion detection and response workflows into the ICA security stack",
      "Vulnerability Management — Greenbone/OpenVAS findings flow into vulnerability review, remediation, rescan, and verification",
      "Unified customer onboarding: name/business name, email, phone, service choice, secure account setup, and endpoint enrollment",
      "Automatic customer activation after identity verification — no normal technician approval click",
      "Customer portal, operator console, role-based access, MFA, sessions, account deletion, and audit history",
      "Ask ICA systems-intelligence assistant plus Fix-It workflow, subscription and non-subscription service paths, and Stripe-backed billing",
      "Authorized remediation, rescan/verify lifecycle, command controls, credential rotation, and replay-resistant endpoint actions"
    ],
    surfaces: ["Operator Console", "Customer Portal", "Endpoint Health", "Security Operations", "Ask ICA", "Apple Companion"],
    capturePlan: ["Main operator dashboard", "Security / three-engine view", "Customer + device detail", "iPhone onboarding", "iPad companion"],
    liveUrl: CONTROL_URL,
    liveLabel: "Open ICA Control",
    secondaryUrl: CONTROL_TRIAL_URL,
    secondaryLabel: "Request 14-Day Trial"
  },
  {
    id: "urban-director",
    theme: "director",
    eyebrow: "LIVE PRODUCTION + CREATOR EDITING",
    status: "LIVE WEB + APP STORE BUILD",
    mark: "UD",
    title: "Urban Director Studio",
    tagline: "A mobile-first production room for cameras, switching, replay, audio, graphics, recording, and creator editing.",
    summary: "Urban Director Studio brings live-production controls and a creator-friendly editor into one system. Directors can connect compatible sources, run Preview and Program, manage production audio, replay moments, record, add graphics, and move captured media into an editing workflow built for phones and tablets.",
    cardPills: ["Camera Multiview", "Preview / Program", "Instant Replay", "Creator Editor", "Social Sign-In", "iPhone + iPad"],
    platforms: ["Web production console", "iPhone / iPad workflow", "Remote camera devices", "Compatible capture/audio sources"],
    accountAccess: "Account portal includes password recovery and Google, Apple, and Microsoft social identity support where provider credentials are configured.",
    capabilities: [
      "Camera/source multiview with Preview and Program switching",
      "Director controls, camera naming, remote camera workflow, crew communication and intercom",
      "Master audio controls, production routing, recording, broadcast controls, graphics, and instant replay",
      "Creator editor with media, text, captions, overlays, audio, effects, aspect ratios, save/preview/export controls",
      "Mobile-first collapsible production panels and touch-friendly editing controls",
      "Long-media stability work centered on metadata-first loading, proxy-friendly editing, recovery, and lower-memory preview behavior",
      "Account portal, password recovery, social sign-in support, and protected production access"
    ],
    surfaces: ["Camera Multiview", "Preview + Program", "Master Audio", "Instant Replay", "Creator Editor", "Graphics + Broadcast"],
    capturePlan: ["Live production console", "Multiview / Program", "Instant Replay", "Editor timeline", "iPhone / iPad production view"],
    liveUrl: DIRECTOR_URL,
    liveLabel: "Open Urban Director"
  },
  {
    id: "dispatchos",
    theme: "dispatch",
    eyebrow: "FIELD SERVICE + LOGISTICS OPERATIONS",
    status: "LIVE DEMO",
    mark: "DO",
    title: "DispatchOS",
    tagline: "Booking, dispatch, drivers, routing, customers, and company controls in one operational workspace.",
    summary: "DispatchOS is a multi-role service-dispatch platform designed around the actual job lifecycle: customer intake, dispatcher decisions, driver assignments, status updates, routing, company settings, and persistent operational records.",
    cardPills: ["Booking", "Dispatcher Dashboard", "Driver App", "Auto Dispatch", "Routing", "Social Sign-In"],
    platforms: ["Responsive web workspace", "Dispatcher dashboard", "Driver workflow", "Customer booking pages"],
    accountAccess: "Owner and driver account flows support password recovery plus Google, Apple, and Microsoft identity support where provider credentials are configured.",
    capabilities: [
      "Customer booking pages that create jobs directly into the operations workflow",
      "Dispatcher dashboard with jobs, customers, drivers, assignments, status, and map context",
      "Driver app with online/offline state, active assignment workflow, queue behavior, directions, and job status updates",
      "Manual, Assisted, and Auto Dispatch modes with company-level controls",
      "Workspace settings for booking, driver app, customer updates, intake source, industry mode, and dispatch behavior",
      "Persistent data layer with Cloudflare/D1 production services and SQLite-backed development/runtime support",
      "Role-aware authentication, account recovery, social identity support, subscription plans, and company administration"
    ],
    surfaces: ["Booking Page", "Dispatch Dashboard", "Live Map", "Driver App", "Workspace Settings", "Admin / Billing"],
    capturePlan: ["Dispatcher dashboard", "Live jobs + map", "Driver active job", "Booking page", "Workspace settings"],
    liveUrl: DISPATCH_URL,
    liveLabel: "Open DispatchOS"
  },
  {
    id: "ica-unified",
    theme: "unified",
    eyebrow: "LMS + AMS BUSINESS OPERATIONS",
    status: "LIVE PLATFORM",
    mark: "IU",
    title: "ICA Unified",
    tagline: "Learning, workforce administration, credentials, documents, onboarding, approvals, and business operations together.",
    summary: "ICA Unified is a multi-tenant LMS + AMS platform designed to reduce the gap between learning systems and day-to-day administration. Organizations can keep people, learning, credentials, documents, onboarding, approvals, and operational workflows in one connected environment.",
    cardPills: ["LMS + AMS", "Workforce", "Credentials", "Documents", "Social Sign-In", "Approvals"],
    platforms: ["Multi-tenant web platform", "Responsive business workspace", "Organization / workforce workflows"],
    accountAccess: "Unified account work includes password recovery and Google, Apple, and Microsoft identity support where provider credentials are configured.",
    capabilities: [
      "Learning-management and administrative-management workflows in one product",
      "Workforce and organization administration",
      "Credentials and learning records",
      "Documents and controlled operational records",
      "Employee/user onboarding and approval flows",
      "Multi-tenant SaaS foundation for organizations with separated business context",
      "Unified account recovery and social onboarding support"
    ],
    surfaces: ["Organization Home", "Learning", "Workforce", "Credentials", "Documents", "Approvals"],
    capturePlan: ["Organization dashboard", "Learning workspace", "Workforce view", "Credentials / documents", "Onboarding / approvals"],
    liveUrl: UNIFIED_URL,
    liveLabel: "Open ICA Unified"
  },
  {
    id: "dc-live",
    theme: "dclive",
    eyebrow: "PROTECTED EVENTS + MEDIA ACCESS",
    status: "LIVE VIEWER APP",
    mark: "DC",
    title: "DC Live",
    tagline: "Events, viewer accounts, entitlements, protected playback, purchases, rentals, and a personal media library.",
    summary: "DC Live is a protected event and media platform with a separate viewer front end and backend control plane. Viewers can create an account, purchase or rent eligible access, return to their library, and play protected media through entitlement-aware playback.",
    cardPills: ["Events", "Viewer Accounts", "Stripe Access", "Social Sign-In", "Protected Playback", "My Library"],
    platforms: ["Viewer web app", "Cloudflare Worker backend", "Protected media delivery"],
    accountAccess: "Viewer authentication includes registration, sign-in/out, password recovery, and Google, Apple, and Microsoft social identity support where provider credentials are configured. Owner/master access remains separate.",
    capabilities: [
      "Event discovery and event-detail experiences",
      "Viewer registration, sign-in, session state, password recovery, and social identity support",
      "Stripe checkout tied to viewer access",
      "Entitlements for purchased or rented event access",
      "Personal library showing active viewer access",
      "Protected playback URLs and backend-controlled media authorization",
      "Separated owner/master controls and viewer-facing access"
    ],
    surfaces: ["Events", "Event Detail", "Viewer Sign-In", "Checkout", "My Library", "Protected Player"],
    capturePlan: ["Events landing page", "Event detail", "Viewer sign-in", "My Library", "Protected playback"],
    liveUrl: DC_LIVE_URL,
    liveLabel: "Open DC Live"
  }
];

const work = [
  {
    eyebrow: "Endpoint Security + RMM",
    title: "ICA Control",
    text: "Unified onboarding, endpoint health, security operations, customer service, Ask ICA, Fix-It, subscriptions, and non-subscription support across the ICA Control ecosystem.",
    productId: "ica-control",
    cta: "View ICA Control",
    accent: true,
  },
  {
    eyebrow: "Live Production",
    title: "Urban Director Studio",
    text: "A mobile-first production environment for camera sources, Preview/Program switching, replay, recording, audio, graphics, and creator editing.",
    productId: "urban-director",
    cta: "View Urban Director",
  },
  {
    eyebrow: "Field Operations",
    title: "DispatchOS",
    text: "Booking, dispatcher workflows, driver assignments, routing, company settings, customer updates, and automated dispatch in one operational system.",
    productId: "dispatchos",
    cta: "View DispatchOS",
  },
  {
    eyebrow: "Business Operations",
    title: "ICA Unified",
    text: "A connected LMS + AMS platform for learning, workforce administration, credentials, documents, onboarding, approvals, and organization workflows.",
    productId: "ica-unified",
    cta: "View ICA Unified",
  },
  {
    eyebrow: "Live Project",
    title: "Intrigued Mutts",
    text: "A live React project combining original merchandise, community ideas, and market-focused interactive features.",
    href: INTRIGUED_MUTTS_URL,
    cta: "Visit Intrigued Mutts",
  },
];

function AppClean() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!selectedProduct) return undefined;
    const priorOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProduct]);
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
          <a href="#pricing" onClick={closeMenu}>Software Pricing</a>
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
            <div className="ica-kicker">I COMPUTER ANYTHING / PRODUCT STUDIO + IT SERVICES</div>
            <h1>Real software. Real IT. One company that can build, run, and secure it.</h1>
            <p>
              ICA builds its own software products and delivers the infrastructure, support, development, and security work behind real business technology. Explore the products, open the live systems, or bring ICA a workflow that needs to be built.
            </p>
            <div className="ica-actions">
              <a className="ica-button ica-button-primary" href="#software">Explore ICA products</a>
              <a className="ica-button ica-button-secondary" href="#services">Get IT help</a>
            </div>
            <div className="ica-hero-products" aria-label="ICA product shortcuts">
              {products.map((product) => (
                <button type="button" key={product.id} onClick={() => setSelectedProduct(product)}>
                  <span>{product.mark}</span>
                  <b>{product.title}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="ica-command-card" aria-label="I Computer Anything capabilities">
            <div className="ica-command-top">
              <span /> <span /> <span />
              <strong>ICA // PRODUCT + SYSTEMS</strong>
            </div>
            <div className="ica-command-grid">
              <div><small>BUILD</small><b>Custom Software</b></div>
              <div><small>RUN</small><b>IT + Infrastructure</b></div>
              <div><small>SECURE</small><b>Endpoint + SecOps</b></div>
              <div><small>PRODUCTS</small><b>5 Active Systems</b></div>
            </div>
            <div className="ica-status"><i /> Systems online. New projects open.</div>
          </div>
        </section>

        <section className="ica-section" id="services">
          <div className="ica-section-heading">
            <span>01 / SERVICES</span>
            <h2>One technology partner, several ways to help.</h2>
            <p>From a broken workstation to a custom business application or endpoint-security workflow, the goal is the same: solve the problem cleanly and leave you with something dependable.</p>
          </div>
          <div className="ica-card-grid">
            {services.map((service) => (
              <article className="ica-service-card" key={service.title}>
                <div className="ica-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                {service.tags && (
                  <div className="ica-feature-pills ica-security-role-pills">
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
              </article>
            ))}
          </div>
          <a className="ica-inline-link" href={serviceForm}>Request an IT service →</a>
        </section>

        <section className="ica-section ica-software-section" id="software">
          <div className="ica-section-heading ica-software-heading">
            <span>02 / ICA PRODUCT STUDIO</span>
            <h2>Five products. One ICA ecosystem.</h2>
            <p>
              Every card below reflects the product that exists now — not an old MVP description. Click any product for a full capability preview, platform notes, account/onboarding details, and the real screens we need to capture next.
            </p>
          </div>

          <div className="ica-product-proof" aria-label="ICA product catalog summary">
            <div><strong>5</strong><span>active software products</span></div>
            <div><strong>1</strong><span>parent technology company</span></div>
            <div><strong>Web + Mobile + Desktop</strong><span>platform-aware workflows</span></div>
          </div>

          <div className="ica-product-grid">
            {products.map((product) => (
              <article
                className={`ica-product-card ica-product-${product.theme} ${product.featured ? "featured" : ""}`}
                key={product.id}
                role="button"
                tabIndex={0}
                aria-label={`Preview ${product.title}`}
                onClick={() => setSelectedProduct(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedProduct(product);
                  }
                }}
              >
                <div className="ica-product-card-head">
                  <span>{product.eyebrow}</span>
                  <em>{product.status}</em>
                </div>
                <div className="ica-product-card-core">
                  <div className="ica-product-mark" aria-hidden="true">{product.mark}</div>
                  <div>
                    <h3>{product.title}</h3>
                    <p className="ica-product-tagline">{product.tagline}</p>
                  </div>
                </div>
                <p className="ica-product-summary">{product.summary}</p>
                <div className="ica-feature-pills ica-product-card-pills">
                  {product.cardPills.map((pill) => <span key={pill}>{pill}</span>)}
                </div>
                <div className="ica-product-card-foot">
                  <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedProduct(product); }}>
                    Full product preview <span>→</span>
                  </button>
                  {product.liveUrl && (
                    <a
                      href={product.liveUrl}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {product.liveLabel || "Open product"}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="ica-product-transparency">
            <strong>Transparent preview policy.</strong>
            <p>
              The interface maps describe real product surfaces and workflows; they are not presented as screenshots. The next visual pass will replace the capture slots with real images taken from the current release builds.
            </p>
          </div>
        </section>

        <section className="ica-section ica-pricing-section" id="pricing">
          <div className="ica-section-heading">
            <span>03 / SOFTWARE PRICING</span>
            <h2>Custom software priced by scope, not guesswork.</h2>
            <p>
              These are professional planning ranges for custom software projects. Final quotes are based on features, platforms, integrations, security, deployment, and ownership requirements.
            </p>
          </div>

          <div className="ica-pricing-grid">
            {[
              {
                title: "Starter Custom App",
                price: "$3,500–$6,000",
                text: "A focused branded application with a clean customer-facing workflow.",
                items: ["Single core workflow", "Business branding", "Responsive interface", "Basic forms + data"],
              },
              {
                title: "Business App",
                price: "$7,500–$12,000",
                text: "A multi-feature business application prepared for mobile deployment.",
                items: ["Multiple workflows", "User accounts", "Notifications", "App-store-ready build"],
              },
              {
                title: "App + Backend + Dashboard",
                price: "$10,000–$18,000",
                text: "A complete software system connecting users, backend services, and management tools.",
                items: ["Secure authentication", "Cloud/backend services", "Admin dashboard", "API integrations"],
                featured: true,
              },
              {
                title: "Advanced Custom Software",
                price: "$15,000–$30,000+",
                text: "Operational software with advanced workflows, automation, media, or real-time features.",
                items: ["Complex workflows", "Desktop + mobile options", "Real-time functionality", "Custom integrations"],
              },
              {
                title: "Operations / Logistics Platform",
                price: "$20,000–$40,000+",
                text: "Larger business platforms for dispatch, routing, drivers, customers, tracking, and proof-of-service workflows.",
                items: ["Multi-role dashboards", "Live operational data", "Driver/mobile workflows", "Custom business logic"],
              },
            ].map((plan) => (
              <article className={plan.featured ? "ica-price-card featured" : "ica-price-card"} key={plan.title}>
                <span>{plan.title}</span>
                <h3>{plan.price}</h3>
                <p>{plan.text}</p>
                <ul>
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="ica-pricing-note">
            <strong>Project pricing is quoted after scope.</strong>
            <p>
              Hosting, domains, Apple or Google developer accounts, SMS, maps, payment processing, and other third-party services are separate when required. Optional maintenance and future feature work can be quoted separately.
            </p>
          </div>

          <div className="ica-actions">
            <a className="ica-button ica-button-primary" href={serviceForm}>Request a Custom Software Quote</a>
          </div>
        </section>

        <section className="ica-section" id="work">
          <div className="ica-section-heading">
            <span>04 / SELECTED WORK</span>
            <h2>Products and systems ICA is actively building, shipping, and operating.</h2>
          </div>
          <div className="ica-work-grid">
            {work.map((item) => (
              <article className={item.accent ? "ica-work-card featured" : "ica-work-card"} key={item.title}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.productId ? (
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(products.find((product) => product.id === item.productId))}
                  >
                    {item.cta} →
                  </button>
                ) : (
                  <a href={item.href}>{item.cta} →</a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="ica-section ica-about" id="about">
          <div>
            <span className="ica-mini-label">05 / ABOUT</span>
            <h2>Hands-on IT meets hands-on development and security engineering.</h2>
          </div>
          <div className="ica-about-copy">
            <p>
              I Computer Anything sits between traditional IT support, software development, infrastructure, and endpoint security operations. That means projects can be approached from both sides: what the customer sees and what has to stay secure and reliable behind it.
            </p>
            <p>
              The focus is small businesses, organizations, and practical products that benefit from direct communication, clear solutions, and technology built around the real workflow.
            </p>
          </div>
        </section>

        <section className="ica-contact" id="contact">
          <div>
            <span>06 / LET'S BUILD</span>
            <h2>Tell me what you need the technology to do.</h2>
            <p>Website, custom software, network work, cybersecurity, endpoint support, or a company-specific version of an existing ICA product.</p>
          </div>
          <a className="ica-button ica-button-light" href={serviceForm}>Start a Request</a>
        </section>
      </main>

      {selectedProduct && (
        <div
          className="ica-product-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <section
            className={`ica-product-modal ica-product-${selectedProduct.theme}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ica-product-modal-title"
          >
            <div className="ica-product-modal-top">
              <div>
                <span>{selectedProduct.eyebrow}</span>
                <em>{selectedProduct.status}</em>
              </div>
              <button type="button" aria-label="Close product preview" onClick={() => setSelectedProduct(null)}>×</button>
            </div>

            <div className="ica-product-modal-hero">
              <div className="ica-product-mark large" aria-hidden="true">{selectedProduct.mark}</div>
              <div>
                <h2 id="ica-product-modal-title">{selectedProduct.title}</h2>
                <p>{selectedProduct.tagline}</p>
              </div>
            </div>

            <p className="ica-product-modal-summary">{selectedProduct.summary}</p>

            <div className="ica-product-modal-columns">
              <div className="ica-product-detail-block">
                <span>WHAT IT DOES</span>
                <ul>
                  {selectedProduct.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
              </div>

              <aside className="ica-product-detail-side">
                <div>
                  <span>PLATFORMS / SURFACES</span>
                  <div className="ica-modal-pills">
                    {selectedProduct.platforms.map((platform) => <b key={platform}>{platform}</b>)}
                  </div>
                </div>
                <div>
                  <span>ACCOUNT + ONBOARDING</span>
                  <p>{selectedProduct.accountAccess}</p>
                </div>
              </aside>
            </div>

            <div className="ica-product-interface-map">
              <div className="ica-product-preview-title">
                <div>
                  <span>INTERFACE MAP</span>
                  <strong>What you can actually open and use</strong>
                </div>
                <small>Product map — not a screenshot</small>
              </div>
              <div className="ica-product-surface-grid">
                {selectedProduct.surfaces.map((surface, index) => (
                  <div key={surface}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{surface}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="ica-product-captures">
              <div className="ica-product-preview-title">
                <div>
                  <span>REAL SCREENSHOT PASS</span>
                  <strong>Capture list already defined</strong>
                </div>
                <small>No generated screenshots</small>
              </div>
              <div className="ica-capture-grid">
                {selectedProduct.capturePlan.map((capture) => (
                  <div className="ica-capture-frame" key={capture}>
                    <div className="ica-capture-chrome"><i /><i /><i /></div>
                    <div className="ica-capture-body">
                      <span>REAL APP SCREEN</span>
                      <strong>{capture}</strong>
                      <small>Capture from the current product build</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ica-product-modal-actions">
              {selectedProduct.liveUrl && (
                <a className="ica-button ica-button-primary" href={selectedProduct.liveUrl}>
                  {selectedProduct.liveLabel || "Open live product"}
                </a>
              )}
              {selectedProduct.secondaryUrl && (
                <a className="ica-button ica-button-secondary" href={selectedProduct.secondaryUrl}>
                  {selectedProduct.secondaryLabel}
                </a>
              )}
              <a className="ica-button ica-button-secondary" href="#contact" onClick={() => setSelectedProduct(null)}>
                Ask about {selectedProduct.title}
              </a>
            </div>
          </section>
        </div>
      )}

      <footer className="ica-footer">
        <div><strong>I Computer Anything</strong><span>IT • Development • Software • Security</span></div>
        <p>Built to solve real problems.</p>
      </footer>
    </div>
  );
}

export default AppClean;
