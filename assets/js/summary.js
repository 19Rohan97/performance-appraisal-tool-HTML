// summary.js
function renderSummary() {
  const results = JSON.parse(localStorage.getItem("patFormResponses")) || [];

  const grouped = { CPP: [], CPB: [], CM: [] };
  results.forEach((item) => {
    if (item.question?.startsWith("1.")) grouped.CPP.push(item);
    else if (item.question?.startsWith("2.")) grouped.CPB.push(item);
    else if (item.question?.startsWith("3.")) grouped.CM.push(item);
  });

  function renderSection(sectionId, data) {
    const container = document.getElementById(sectionId);
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No responses yet.</p>";
      return;
    }

    data.forEach((item) => {
      const block = document.createElement("div");
      block.className = "form-group question-block";
      block.innerHTML = `<h3 class="pat_label leading-relaxed text-sm">${item.questionText}</h3>`;

      const ratingWrapper = generateRateWrapper(item.rating);
      block.appendChild(ratingWrapper);

      if (item.comment) {
        const commentEl = document.createElement("p");
        commentEl.className =
          "text-base text-[#5B5B5B] p-4 rounded-lg border border-[#CCCCCC] drop-shadow-xs bg-white";
        commentEl.textContent = item.comment;
        block.appendChild(commentEl);
      }

      container.appendChild(block);
    });
  }

  function generateRateWrapper(ratingValue) {
    const totalRatings = 10;
    const percentage = ((ratingValue - 1) / (totalRatings - 1)) * 100;

    const wrapper = document.createElement("div");
    wrapper.className = "rate-result";

    wrapper.innerHTML = `
        <div class="progress-line">
          <div class="progress-fill" style="width: calc(${percentage}% + 8px);"></div>
        </div>
        <div class="rate-values">
          ${[...Array(10)]
            .map((_, i) => {
              const val = 1 + i;
              return `<span class="rate-value ${
                ratingValue > i ? "active" : ""
              } ${
                ratingValue == val ? "selected" : ""
              }" data-value="${val}"></span>`;
            })
            .join("")}
        </div>
      `;

    return wrapper;
  }

  renderSection("CPP", grouped.CPP);
  renderSection("CPB", grouped.CPB);
  renderSection("CM", grouped.CM);
}

document.addEventListener("DOMContentLoaded", () => {
  const appraisalSummarySubmit = document.querySelector(".btn_submit_summary");
  const confirmationSkip = document.querySelector(".btn_skip");

  appraisalSummarySubmit.addEventListener("click", () => {
    document.getElementById("confirmation_modal").classList.remove("hidden");
  });
  confirmationSkip.addEventListener("click", () => {
    location.reload();
  });
});
