// rating.js
document.querySelectorAll(".rate-wrapper").forEach((wrapper) => {
  const rateInputs = wrapper.querySelectorAll('.rate input[type="radio"]');
  const progressFill = wrapper.querySelector(".progress-fill");
  const progressLine = wrapper.querySelector(".progress-line");
  const totalRatings = 10;

  rateInputs.forEach((input) => {
    input.addEventListener("change", () => {
      progressLine.classList.add("active");
      const selectedValue = parseInt(input.value);
      const percentagePerDot = 100 / (totalRatings - 1);
      const percentage = (selectedValue - 1) * percentagePerDot;
      progressFill.style.width = `calc(${percentage}% + 8px)`;
    });
  });
});
