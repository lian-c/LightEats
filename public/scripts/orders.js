//calculates total price or prep time
const calcTotal = (order, priceOrPrep) => {
  let result = 0;
  for (const price of order) {
    result += price[priceOrPrep]
  }
  return result;
}
module.exports = { calcTotal};
