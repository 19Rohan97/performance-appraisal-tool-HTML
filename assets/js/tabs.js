// tabs.js
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      tabs.forEach((t) =>
        t.classList.remove("bg-[#FAFAFA]", "text-blue", "selected-tab")
      );
      contents.forEach((c) => c.classList.add("hidden"));

      tab.classList.add("bg-[#FAFAFA]", "text-blue", "selected-tab");
      document.getElementById(target).classList.remove("hidden");
    });
  });

  tabs[0].click(); // activate first tab
});
