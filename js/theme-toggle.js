(function () {
  var storageKey = "tech-wyatt-theme";
  var button = document.querySelector(".theme-toggle");

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function preferredTheme() {
    var storedTheme = getStoredTheme();

    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    var isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", theme);

    if (!button) {
      return;
    }

    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.querySelector(".theme-toggle-text").textContent = isDark ? "Light" : "Dark";
  }

  setTheme(preferredTheme());

  if (button) {
    button.addEventListener("click", function () {
      var nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      storeTheme(nextTheme);
      setTheme(nextTheme);
    });
  }
})();
