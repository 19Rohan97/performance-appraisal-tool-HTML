// multistep.js
document.addEventListener("DOMContentLoaded", () => {
  const steps = Array.from(
    document.querySelectorAll(".first_step, .second_step, .third_step")
  );
  const asides = Array.from(
    document.querySelectorAll(
      ".first_step_aside, .second_step_aside, .third_step_aside"
    )
  );
  const nextBtn = document.querySelector(".next-step");
  const prevBtn = document.querySelector(".prev-step");
  const submitBtn = document.querySelector(".submit-form");
  const form = document.querySelector(".pat_form");
  const stepCount = document.querySelector(".step_count");
  const stepIndicators = document.querySelectorAll(".steps .step");

  window.currentStep = 0;

  document.getElementById("appraisal_summary").classList.add("hidden");

  function validateStep(stepIndex) {
    const currentGroup = steps[stepIndex];
    const questions = currentGroup.querySelectorAll(".question-block");
    let isValid = true;

    questions.forEach((block) => {
      const name = block.querySelector("input[type='radio']")?.name;
      const checked = currentGroup.querySelector(
        `input[name='${name}']:checked`
      );
      if (!checked) {
        isValid = false;
        block.classList.add("border", "border-red-500", "rounded-md");
      } else {
        block.classList.remove("border", "border-red-500", "rounded-md");
      }
    });

    return isValid;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.showStep = function () {
    steps.forEach((step, index) => {
      step.classList.toggle("hidden", index !== window.currentStep);
      if (index === window.window.currentStep) {
        step.classList.add("fade-in");
        setTimeout(() => step.classList.remove("fade-in"), 500);
      }
    });

    asides.forEach((aside, index) => {
      aside.classList.toggle("hidden", index !== window.currentStep);
    });

    stepCount.textContent = `${window.currentStep + 1} of ${steps.length}`;

    stepIndicators.forEach((el, i) => {
      el.classList.remove("active", "completed");
      if (i < window.currentStep) el.classList.add("completed");
      else if (i === window.currentStep) el.classList.add("active");
    });

    prevBtn.classList.toggle("hidden", window.currentStep === 0);
    nextBtn.classList.toggle("hidden", window.currentStep === steps.length - 1);
    submitBtn.classList.toggle(
      "hidden",
      window.currentStep !== steps.length - 1
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  nextBtn.addEventListener("click", () => {
    if (
      window.currentStep < steps.length - 1 &&
      validateStep(window.currentStep)
    ) {
      window.currentStep++;
      showStep();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (window.currentStep > 0) {
      window.currentStep--;
      showStep();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return scrollToTop();

    const results = [];

    document.querySelectorAll(".question-block").forEach((block) => {
      const questionId = block.getAttribute("data-question");
      let questionText = block.querySelector(".pat_label")?.cloneNode(true);

      const tooltip = questionText?.querySelector(".group");
      if (tooltip) tooltip.remove();
      questionText = questionText?.innerText.trim().replace(/\s+/g, " ") || "";

      const rating = block.querySelector('input[type="radio"]:checked')?.value;
      const comment =
        block.querySelector(".pat_input")?.value.trim().replace(/\s+/g, " ") ||
        "";

      results.push({ question: questionId, questionText, rating, comment });
    });

    localStorage.setItem("patFormResponses", JSON.stringify(results));
    document.getElementById("appraisal_summary").classList.remove("hidden");
    document.getElementById("appraisal_form").classList.add("hidden");

    renderSummary();
  });

  showStep();
});
