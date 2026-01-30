/* ===============================
   PROGRESS BAR (postup studia)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const progressFill = document.getElementById("progressFill");

  if (!progressFill) return;

  const chapters = [
    "01-sysadmin.html",
    "02-os.html",
    "03-linux.html",
    "04-linux-instalace.html",
    "05-ssh-a-terminal.html",
    "06-uzivatele-skupiny-prava.html",
    "07-balicky-a-aktualizace.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();
  const index = chapters.indexOf(currentPage);

  if (index !== -1) {
    const progress = ((index + 1) / chapters.length) * 100;
    progressFill.style.width = `${progress}%`;
  }
});


/* ===============================
   VYHLEDÁVÁNÍ KAPITOL (SIDEBAR)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const links = document.querySelectorAll(".sidebar ul li");

    links.forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(query) ? "" : "none";
    });
  });
});


/* ===============================
   VYHLEDÁVÁNÍ V OBSAHU KAPITOLY
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const contentSearch = document.getElementById("contentSearch");
  const info = document.getElementById("searchInfo");

  if (!contentSearch) return;

  contentSearch.addEventListener("input", () => {
    const query = contentSearch.value.toLowerCase();
    let matches = 0;

    document.querySelectorAll(".content article").forEach(article => {
      const text = article.textContent.toLowerCase();

      if (query === "") {
        article.style.display = "";
      } else if (text.includes(query)) {
        article.style.display = "";
        matches++;
      } else {
        article.style.display = "none";
      }
    });

    if (info) {
      info.textContent = query
        ? `Nalezeno: ${matches}`
        : "";
    }
  });
});


/* ===============================
   LAB – ZOBRAZENÍ / SKRYTÍ ŘEŠENÍ
================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".show-solution").forEach(button => {
    button.addEventListener("click", () => {
      const solution = button.nextElementSibling;

      if (!solution) return;

      solution.classList.toggle("visible");

      button.textContent = solution.classList.contains("visible")
        ? "Skrýt řešení"
        : "Zobrazit řešení";
    });
  });
});


/* ===============================
   HOVER EFEKT NA ARTICLE (UX)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".content article").forEach(article => {
    article.addEventListener("mouseenter", () => {
      article.style.transform = "translateY(-2px)";
      article.style.transition = "0.2s ease";
    });

    article.addEventListener("mouseleave", () => {
      article.style.transform = "translateY(0)";
    });
  });
});
