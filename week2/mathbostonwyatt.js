// Get the arguments from the command line
const operation = process.argv[2];
const number1 = Number(process.argv[3]);
const number2 = Number(process.argv[4]);

// Perform the requested math operation
if (operation === "add") {
  console.log(number1 + number2);
} else if (operation === "subtract") {
  console.log(number1 - number2);
} else if (operation === "multiply") {
  console.log(number1 * number2);
} else if (operation === "divide") {
  console.log(number1 / number2);
} else if (operation === "exponent") { 
  console.log(number1 ** number2);
} else {
  console.log("Unknown operation. Use add, subtract, multiply, divide, or exponent.");
}