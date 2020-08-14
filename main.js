let entries = [];

function format(calcAvg) {
  return calcAvg.toFixed(1);
}

function calcAvg(entries) {
  let avgValue = entries.reduce(reducer) / entries.length;
  document.querySelector("#avg").innerHTML = format(avgValue);
}

function calcHigh() {
  let high = Math.max(...entries);
  document.getElementById("weekHigh").innerHTML = high;
}

function reducer(total, currentValue) {
  return total + currentValue;
}

function calcTotal(entries) {
  let totalValue = entries.reduce(reducer);
  document.querySelector("#total").innerHTML = totalValue;
  document.querySelector("#progress").innerHTML = totalValue;
}

function addEntry(newEntry) {
  let entryList = document.querySelector("ul");
  entryList.removeChild(entryList.firstElementChild);
  const listItem = document.createElement("li");
  const listValue = document.createTextNode(newEntry);
  listItem.appendChild(listValue);
  entryList.appendChild(listItem);
}

function handleSubmit(event) {
  event.preventDefault();
  const entry = Number(document.querySelector("#entry").value);

  document.querySelector("form").reset();
  if (!entry) {
    return;
  }

  if (entries.length >= 7) {
    location.reload();
  }
  addEntry(entry);
  entries.push(entry);
  calcTotal(entries);
  calcAvg(entries);
  calcHigh(entries);
  calcGoal();
}

function calcGoal() {
  let goal = document.querySelector("#goal").innerHTML;
  const totalValue = entries.reduce(reducer).toFixed(1);
  console.log(totalValue);
  const completedPercent = totalValue / (goal / 100) + 1;
  console.log(completedPercent);
  const progressCircle = document.querySelector(".progressCircle");
  if (completedPercent > 100) {
    completedPercent === 100;
  }
  progressCircle.style.background = `conic-gradient( #70db70 ${completedPercent}%, #2d3740 ${completedPercent}% 100%)`;
}

function goalSubmit() {
  let goalEntry = Number(document.querySelector("#goalEntry").value);
  document.querySelector("#goal").innerHTML = goalEntry;
  document.querySelector("#goalWrapper").reset();
}

function handleGoalSubmit(event2) {
  event2.preventDefault();
  goalSubmit();
}

const form2 = document
  .querySelector("#goalWrapper")
  .addEventListener("submit", handleGoalSubmit);
const form = document
  .querySelector("form")
  .addEventListener("submit", handleSubmit);
