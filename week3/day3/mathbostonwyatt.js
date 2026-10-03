const form = document.querySelector("#addition-form");
const firstNumberInput = document.querySelector("#first-number");
const secondNumberInput = document.querySelector("#second-number");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstNumber = Number(firstNumberInput.value);
  const secondNumber = Number(secondNumberInput.value);

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    result.textContent = "Please enter two valid numbers.";
    result.classList.add("error");
    return;
  }

  result.textContent = `Sum: ${firstNumber + secondNumber}`;
  result.classList.remove("error");
});