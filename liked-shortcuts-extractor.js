
(async () => {
  "use strict";

  // shortcuty liked shortcuts inventory extractor & markdown builder
  // runs locally in browser dev console when signed-in on a shortcuty.app tab

  const BASE = location.origin;
  const MAX_PAGES = 100;
  const TIMEOUT_MS = 20000;
  const records = new Map();

  if (
    location.hostname !== "browse.shortcuty.app" ||
    !location.pathname.startsWith("/liked-shortcuts")
  ) {
    alert("Open your Shortcuty Liked Shortcuts page first.");
    return;
  }

  const trim = s => (s || "").replace(/\s+/g, " ").trim();
  const esc = s => trim(s)
    .replace(/\\/g, "\\\\")
    .replace(/([\[\]*_`])/g, "\\$1");

  const text = (root, selector) =>
    trim(root.querySelector(selector)?.textContent);

  const number = (root, selector) => {
    const value = text(root, selector).replace(/,/g, "");
    return /^\d+$/.test(value) ? Number(value) : null;
  };

  const log = message =>
    console.log("[Shortcuty Catalog] " + message);

  async function fetchPage(page) {
    const url = `${BASE}/liked-shortcuts${
      page === 1 ? "" : "?page=" + page
    }`;

    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(),
      TIMEOUT_MS
    );

    try {
      const response = await fetch(url, {
        credentials: "same-origin",
        redirect: "follow",
        cache: "no-store",
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(
          `Page ${page}: HTTP ${response.status}`
        );
      }

      if (
        !new URL(response.url).pathname
          .startsWith("/liked-shortcuts")
      ) {
        throw new Error(
          `Page ${page} redirected away from your likes.`
        );
      }

      const html = await response.text();
      const doc = new DOMParser().parseFromString(
        html,
        "text/html"
      );

      if (
        /Login\s*[-–]\s*Shortcuty/i.test(doc.title) ||
        doc.querySelector(".login-page")
      ) {
        throw new Error(
          `Page ${page} returned the login page.`
        );
      }

      return doc;

    } finally {
      clearTimeout(timer);
    }
  }

  function extractCards(doc) {
    const cards = [
      ...doc.querySelectorAll(".modern-shortcut-card")
    ];

    const items = [];

    for (const card of cards) {
      const anchor = card.querySelector(
        'a.modern-card-link[href*="/shortcut/"]'
      );

      if (!anchor) continue;

      const match = anchor.getAttribute("href").match(
        /\/shortcut\/([0-9a-f-]{36})(?:[/?#]|$)/i
      );

      if (!match) continue;

      const id = match[1].toLowerCase();
      const name = text(card, ".card-title-modern");

      if (!name) continue;

      items.push({
        id,
        name,
        description: text(
          card,
          ".card-description-modern"
        ),
        category: text(card, ".category-badge")
          .replace(/^[^\p{L}\p{N}]+/u, "") ||
          "Uncategorized",
        author: text(card, ".author-name"),
        downloads: number(
          card,
          ".stat-item-downloads"
        ),
        likes: number(
          card,
          ".stat-item-likes"
        ),
        version: text(card, ".card-version"),
        detail: new URL(
          anchor.getAttribute("href"),
          BASE
        ).href,
        install:
          `https://shortcuty.app/api/shortcuts/${id}/get`
      });
    }

    return items;
  }

  function pageNumbers(doc) {
    return [
      ...doc.querySelectorAll(
        'a[href*="liked-shortcuts?page="]'
      )
    ].map(a => {
      try {
        return Number(
          new URL(a.href).searchParams.get("page")
        );
      } catch {
        return 0;
      }
    }).filter(n =>
      Number.isInteger(n) && n > 0
    );
  }

  try {
    log("Starting extraction...");

    const first = await fetchPage(1);
    const firstItems = extractCards(first);

    if (!firstItems.length) {
      throw new Error(
        "No shortcut cards found on Page 1."
      );
    }

    for (const item of firstItems) {
      records.set(item.id, item);
    }

    const initialNumbers = pageNumbers(first);

    let expected = initialNumbers.length
      ? Math.max(...initialNumbers)
      : null;

    if (expected && expected > MAX_PAGES) {
      throw new Error("Pagination exceeds safety limit.");
    }

    log(`Page 1: ${firstItems.length} shortcuts`);

    let lastPage = 1;

    for (
      let page = 2;
      page <= (expected || MAX_PAGES);
      page++
    ) {
      const doc = await fetchPage(page);
      const items = extractCards(doc);

      if (!items.length) {
        if (expected && page <= expected) {
          throw new Error(
            `Expected Page ${page}, but found no shortcuts.`
          );
        }
        break;
      }

      let fresh = 0;

      for (const item of items) {
        if (!records.has(item.id)) {
          records.set(item.id, item);
          fresh++;
        }
      }

      if (!fresh) {
        if (expected && page <= expected) {
          throw new Error(
            `Page ${page} repeated earlier results.`
          );
        }
        break;
      }

      lastPage = page;

      const nums = pageNumbers(doc);

      if (nums.length) {
        expected = Math.max(
          expected || 0,
          ...nums
        );
      }

      log(
        `Page ${page}: +${fresh} | Total: ${records.size}`
      );
    }

    if (!expected && lastPage === MAX_PAGES) {
      throw new Error(
        "Safety page limit reached. Export cancelled."
      );
    }

    // group shortcuts by assigned category
    const groups = new Map();

    for (const item of records.values()) {
      const category = item.category;

      if (!groups.has(category)) {
        groups.set(category, []);
      }

      groups.get(category).push(item);
    }

    const sorted = [...groups.entries()].sort(
      (a, b) => a[0].localeCompare(b[0])
    );

    const lines = [
      "# Shortcuty Liked Shortcuts",
      "",
      `> Exported: ${new Date().toISOString()}`,
      `> Unique shortcuts: ${records.size}`,
      `> Pages read: ${lastPage}`,
      "> Checked = will be used by Shortcuty Import Helper",
      "> Unchecked = will be ignored by Shortcuty Import Helper",
      "> Each ## section can be used in Shortcuty Import Helper to run in intervals per group, allowing the automation help to stop after each is completed where you can then select all newly added and moved them to a folder.",
      "> The install URLs redirect through Shortcuty to iCloud.",
      "> You can hand this markdown file to AI to organize the shortcuts further, as long as the same format/layout is kept so that it gets used in the way that Shortcuty Import Helper is built to expect.",
      ""
    ];

    for (const [category, items] of sorted) {
      lines.push(`## ${esc(category)}`, "");

      items.sort(
        (a, b) => a.name.localeCompare(b.name)
      );

      for (const item of items) {
        lines.push(
          `- [x] ${esc(item.name)}`,
          `  - Description: ${esc(
            item.description || "Not provided"
          )}`,
          `  - Install: ${item.install}`,
          `  - Shortcuty: ${item.detail}`,
          `  - Creator: ${esc(
            item.author || "Unknown"
          )}`,
          `  - Popularity: ${
            item.downloads ?? "?"
          } downloads; ${
            item.likes ?? "?"
          } likes`,
          `  - Version: ${esc(
            item.version || "Unknown"
          )}`,
          `  - UUID: ${item.id}`,
          ""
        );
      }
    }

    // download markdown document
    const markdown = lines.join("\n");

    const blob = new Blob([markdown], {
      type: "text/markdown;charset=utf-8"
    });

    const objectURL = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = objectURL;
    anchor.download = "Shortcuty Liked Shortcuts.md";
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(
      () => URL.revokeObjectURL(objectURL),
      30000
    );

    log(`COMPLETE: ${records.size} shortcuts`);
    log(`Pages: ${lastPage}`);
    log(`Groups: ${groups.size}`);

    alert(
      "Shortcuty Catalog complete!\n\n" +
      `${records.size} shortcuts\n` +
      `${lastPage} pages\n` +
      `${groups.size} categories\n\n` +
      "Downloaded: Shortcuty Liked Shortcuts.md"
    );

  } catch (error) {
    console.error(
      "[Shortcuty Catalog] Export stopped:",
      error
    );

    alert(
      "Catalog was NOT exported.\n\n" +
      error.message +
      "\n\nThis prevents an incomplete inventory."
    );
  }
})();
