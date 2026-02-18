// ✅ React HashRouter bridge for clicks inside the legacy iframe
// Put this at the VERY bottom of public/legacy/script.js
(function () {
  function go(hashRoute) {
    try {
      // Send navigation to the TOP window (React app)
      window.top.location.hash = hashRoute;
    } catch (e) {
      // Fallback if top is blocked (shouldn't be in your case)
      window.location.hash = hashRoute;
    }
  }

  document.addEventListener(
    "click",
    function (e) {
      const el = e.target.closest("a,button");
      if (!el) return;

      const text = (el.textContent || "").trim().toLowerCase();
      const aria = (el.getAttribute("aria-label") || "").toLowerCase();
      const hrefRaw = el.getAttribute("href") || "";
      const href = hrefRaw.toLowerCase();

      // 1) Any legacy link to the services form -> route to React /services (keeps querystring)
      if (href.includes("services-form.html")) {
        e.preventDefault();
        e.stopPropagation();
        const q = hrefRaw.includes("?") ? hrefRaw.slice(hrefRaw.indexOf("?")) : "";
        go(`/services${q}`);
        return;
      }

      // 2) Licensing button/link -> route to React /services with a preset "service"
      if (text.includes("licens") || aria.includes("licens") || href.includes("licens")) {
        e.preventDefault();
        e.stopPropagation();
        go("/services?service=Licensing%20%26%20Scheduling");
        return;
      }

      // 3) Details / Scheduling / Book / Appointment -> also route to the services form
      if (
        text.includes("schedule") ||
        text.includes("scheduling") ||
        text.includes("book") ||
        text.includes("appointment") ||
        text.includes("details") ||
        aria.includes("schedule") ||
        aria.includes("book") ||
        aria.includes("appointment") ||
        aria.includes("details")
      ) {
        e.preventDefault();
        e.stopPropagation();
        go("/services");
        return;
      }
    },
    true // ✅ capture phase so we intercept BEFORE the iframe navigates
  );
})();
// Wrap everything so we don't run before the DOM exists and avoid duplicate declarations
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('transition-enabled');
  const activatePage = () => {
    requestAnimationFrame(() => {
      document.body.classList.add('page-transition-ready');
      document.body.classList.remove('page-transition-exit');
    });
  };
  activatePage();
  window.addEventListener('pageshow', activatePage);

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav?.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Active link highlight on scroll
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const links = Array.from(document.querySelectorAll('#site-nav a[href^="#"]'));

  const onScroll = () => {
    let current = sections[0]?.id;
    const fromTop = window.scrollY + 120; // account for sticky header
    for (const sec of sections) {
      if (sec.offsetTop <= fromTop) current = sec.id;
    }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  const sameOrigin = (url) => {
    try {
      const parsed = new URL(url, window.location.href);
      return parsed.origin === window.location.origin;
    } catch {
      return false;
    }
  };

  const isHashLink = href => href.startsWith('#');
  const isFileAnchor = (link) => {
    const href = link.getAttribute('href') || '';
    if (!href || isHashLink(href)) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return false;
    if (link.target && link.target !== '_self') return false;
    if (!sameOrigin(link.href)) return false;
    const linkUrl = new URL(link.href);
    const currentUrl = new URL(window.location.href);
    return linkUrl.pathname !== currentUrl.pathname;
  };

  document.querySelectorAll('a[href]').forEach(link => {
    if (!isFileAnchor(link)) return;
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.body.classList.remove('page-transition-ready');
      document.body.classList.add('page-transition-exit');
      const href = link.href;
      setTimeout(() => { window.location.href = href; }, 220);
    });
  });

  // ===== Splash fade on load =====
  window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    if (!splash) return;

    // small pause so the logo is seen, then fade (increased delay to let users read)
    setTimeout(() => {
      splash.classList.add('is-hiding');
      // remove from the DOM after the transition for performance (match CSS transition)
      setTimeout(() => splash.remove(), 1200);
    }, 1600);
  });
});


// ===== Video Modal Handlers =====
function openVideo() {
  const modal = document.getElementById("videoModal");
  const vid = document.getElementById("projectVideo");
  if (modal) modal.style.display = "flex";
  if (vid) { vid.currentTime = 0; vid.play(); }
}
function closeVideo() {
  const modal = document.getElementById("videoModal");
  const vid = document.getElementById("projectVideo");
  if (modal) modal.style.display = "none";
  if (vid) vid.pause();
}
// close on background click or ESC

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideo();
});
document.addEventListener('click', (e) => {
  const modal = document.getElementById("videoModal");
  if (modal && e.target === modal) closeVideo();
});

// Auto-close modal when video ends
document.addEventListener('DOMContentLoaded', () => {
  const vid = document.getElementById("projectVideo");
  if (vid) {
    vid.addEventListener('ended', () => {
      closeVideo();
    });
  }
});
