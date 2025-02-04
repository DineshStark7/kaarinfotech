document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split("=");
      if (cookie[0] === name) return cookie[1];
    }
    return null;
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      themeIcon.classList.replace("bi-moon", "bi-sun");
    } else {
      body.classList.remove("dark-mode");
      themeIcon.classList.replace("bi-sun", "bi-moon");
    }
  }

  // Load saved theme preference
  let savedTheme = getCookie("theme") || "light";
  applyTheme(savedTheme);

  // Toggle Theme
  themeToggle.addEventListener("click", function () {
    let newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(newTheme);
    setCookie("theme", newTheme, 365);
  });
});
