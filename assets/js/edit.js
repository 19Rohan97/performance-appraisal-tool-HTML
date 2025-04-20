// edit.js
document
  .querySelector("#appraisal_summary .btn_edit")
  .addEventListener("click", () => {
    document.getElementById("appraisal_summary").classList.add("hidden");
    document.getElementById("appraisal_form").classList.remove("hidden");

    const savedData =
      JSON.parse(localStorage.getItem("patFormResponses")) || [];

    savedData.forEach((item) => {
      const ratingInput = document.querySelector(
        `input[name="${getRatingName(item.question)}"][value="${item.rating}"]`
      );
      if (ratingInput) {
        ratingInput.checked = true;
        ratingInput.dispatchEvent(new Event("change"));
      }

      const block = document.querySelector(
        `.question-block[data-question="${item.question}"]`
      );
      if (block) {
        const commentInput = block.querySelector("input.pat_input");
        if (commentInput) {
          commentInput.value = item.comment;
        }
      }
    });

    const activeTab = document.querySelector(".tab-btn.selected-tab");
    let stepIndex = 0;
    if (activeTab?.dataset.tab === "CPB") stepIndex = 1;
    else if (activeTab?.dataset.tab === "CM") stepIndex = 2;

    window.currentStep = stepIndex;
    window.showStep();
  });

function getRatingName(questionId) {
  if (!questionId || typeof questionId !== "string") return "";
  const parts = questionId.split(".");
  if (parts.length !== 2) return "";
  const [section, q] = parts;
  return `s${section}_q${q}_rating`;
}
