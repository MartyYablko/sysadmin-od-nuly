/* ======================================================
   HELPER
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     PROGRESS BAR (KAPITOLY)
  ====================================================== */

  const progressFill = document.getElementById("progressFill");
  if (progressFill) {
    const chapters = [
      "01-sysadmin.html",
      "02-os.html",
      "03-linux.html",
      "04-linux-instalace.html",
      "05-ssh-a-terminal.html",
      "06-uzivatele-skupiny-prava.html",
      "07-balicky-a-aktualizace.html",
      "08-firewall-ufw-iptables.html",
      "09-fail2ban.html",
      "10-logy-a-journalctl.html"
    ];

    const current = window.location.pathname.split("/").pop();
    const index = chapters.indexOf(current);

    if (index !== -1) {
      const percent = ((index + 1) / chapters.length) * 100;
      progressFill.style.width = percent + "%";
    }
  }


  /* ======================================================
     SIDEBAR – AKTIVNÍ KAPITOLA
  ====================================================== */

  const sidebarLinks = document.querySelectorAll(".sidebar a");
  const currentPage = window.location.pathname.split("/").pop();

  sidebarLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.style.background = "#020617";
      link.style.borderLeft = "3px solid var(--accent)";
    }
  });


  /* ======================================================
     VYHLEDÁVÁNÍ KAPITOL (SIDEBAR)
  ====================================================== */

  const chapterSearch = document.getElementById("searchInput");
  if (chapterSearch) {
    chapterSearch.addEventListener("input", () => {
      const q = chapterSearch.value.toLowerCase();
      document.querySelectorAll(".sidebar ul li").forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(q)
          ? ""
          : "none";
      });
    });
  }


  /* ======================================================
     VYHLEDÁVÁNÍ V OBSAHU KAPITOLY
  ====================================================== */

  const contentSearch = document.getElementById("contentSearch");
  const searchInfo = document.getElementById("searchInfo");

  if (contentSearch) {
    contentSearch.addEventListener("input", () => {
      const q = contentSearch.value.toLowerCase();
      let matches = 0;

      document.querySelectorAll(".content article").forEach(article => {
        if (!q) {
          article.style.display = "";
        } else if (article.textContent.toLowerCase().includes(q)) {
          article.style.display = "";
          matches++;
        } else {
          article.style.display = "none";
        }
      });

      if (searchInfo) {
        searchInfo.textContent = q ? `Nalezeno: ${matches}` : "";
      }
    });
  }


  /* ======================================================
     LAB – ROZBALENÍ ŘEŠENÍ
  ====================================================== */

  document.querySelectorAll(".show-solution").forEach(btn => {
    btn.addEventListener("click", () => {
      const solution = btn.nextElementSibling;
      if (!solution) return;

      solution.classList.toggle("visible");
      btn.textContent = solution.classList.contains("visible")
        ? "Skrýt řešení"
        : "Zobrazit řešení";
    });
  });


  /* ======================================================
     ARTICLE – FOCUS EFFECT (STUDIJNÍ REŽIM)
  ====================================================== */

  document.querySelectorAll(".content article").forEach(article => {
    article.addEventListener("mouseenter", () => {
      article.style.boxShadow = "0 0 0 1px var(--accent)";
    });

    article.addEventListener("mouseleave", () => {
      article.style.boxShadow = "";
    });
  });


  /* ======================================================
     OZNAČENÍ KAPITOLY JAKO HOTOVÉ (LOCALSTORAGE)
  ====================================================== */

  const pageKey = "done_" + currentPage;
  const header = document.querySelector(".content hgroup");

  if (header && currentPage) {
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔ Označit jako hotovo";
    doneBtn.style.marginTop = "1rem";
    doneBtn.style.background = "transparent";
    doneBtn.style.border = "1px solid var(--accent)";
    doneBtn.style.color = "var(--accent)";

    if (localStorage.getItem(pageKey)) {
      doneBtn.textContent = "✔ Hotovo";
      doneBtn.style.opacity = "0.6";
    }

    doneBtn.addEventListener("click", () => {
      localStorage.setItem(pageKey, "true");
      doneBtn.textContent = "✔ Hotovo";
      doneBtn.style.opacity = "0.6";
    });

    header.appendChild(doneBtn);
  }

});
