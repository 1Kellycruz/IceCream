const numScoopsEl = document.getElementById('numberOfScoops');
const cupEl = document.getElementById('cupOrCone_cup');
const coneEl = document.getElementById('cupOrCone_cone');

const btnEl = document.getElementById('submit');

const toppingsEl = document.getElementById('toppings');
const sprinklesEl = document.getElementById('toppingsSprinkles');
const whippedCreamEl = document.getElementById('toppingsWhippedCream');
const hotFudgeEl = document.getElementById('toppingsHotFudge');
const cherryEl = document.getElementById('toppingsCherry');

const basePriceEl = document.getElementById('basePrice');
const toppingsCostEl = document.getElementById('toppingsCost');
const taxEl = document.getElementById('tax');
const totalDueEl = document.getElementById('totalDue');

btnEl.onclick = function () {
  const numScoops = +numScoopsEl.value;
  const basePrice = getBasePrice(numScoops);
  basePriceEl.innerHTML = basePrice.toFixed(2);

  const toppingsCost = getToppingsCost();
  toppingsCostEl.innerHTML = toppingsCost.toFixed(2);

  const subtotal = basePrice + toppingsCost;
  const tax = getTax(subtotal);
  taxEl.innerHTML = tax.toFixed(2);

  const totalDue = subtotal + tax;
  totalDueEl.innerHTML = totalDue.toFixed(2);
};

cupEl.onchange = onCupConeChange;
coneEl.onchange = onCupConeChange;

function onCupConeChange() {
  if (cupEl.checked) {
    toppingsEl.style.display = 'flex';
  } else {
    toppingsEl.style.display = 'none';
  }
}

function getBasePrice(numberOfScoops) {
  if (numberOfScoops < 1 || numberOfScoops > 4) {
    throw new Error('numberOfScoops must be between 1 and 4');
  }

  const firstScoopPrice = 2.25;
  const addlScoopPrice = 1.25;

  const numberOfAdditionalScoops = numberOfScoops - 1;
  const priceForAllAdditionalScoops = numberOfAdditionalScoops * addlScoopPrice;
  return firstScoopPrice + priceForAllAdditionalScoops;
}

function getToppingsCost() {
  let toppingsCost = 0;
  // only calculate toppingsCost if user selected cup
  if (cupEl.checked) {
    if (sprinklesEl.checked) {
      toppingsCost += 0.5;
    }
    if (whippedCreamEl.checked) {
      toppingsCost += 0.25;
    }
    if (hotFudgeEl.checked) {
      toppingsCost += 1.25;
    }
    if (cherryEl.checked) {
      toppingsCost += 0.25;
    }
  }
}

function getTax(amount) {
  const tax = 0.11; // 11% sales tax
  return amount * tax;
}
