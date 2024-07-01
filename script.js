// const Chart = require('@toast-ui/chart');
// require('@toast-ui/chart/dist/toastui-chart.min.css');

let chartInsert = document.createElement("div"); 
chartInsert.id="chart";

const conteneur1 = document.getElementById("table1");
// const conteneur2 = document.getElementById("table2");
conteneur1.insertAdjacentElement("afterend",chartInsert);
// conteneur2.insertAdjacentElement("afterend",chartInsert);
const el = document.getElementById("chart");

let yearTag = document.getElementsByTagName("th");
let crimeTag = document.getElementsByTagName("td");
const data = {
  categories: [],
  series: [],
};
const options = {
  chart: { width: 964, height: 3500 },
};
for (let i = 0; i < yearTag.length; i++) {
  const textContent = yearTag[i].textContent.trim();
  if (textContent.length === 4 && !isNaN(textContent)) {
    data.categories.push(textContent);
  }
}
console.log(data.categories)
let listTmp = [];
let listDigit = []
for (let c = 0; c < 420; c++) {
  const crimeContent = crimeTag[c].textContent.trim();
  listTmp.push(crimeContent);
  if ((c + 1) % 12 === 0 && c !== 0) {
    for (let c2 = 1; c2 < listTmp.length; c2++) {
      let value = listTmp[c2];
       if (value === ':') {
        listDigit.push(0);
      } else {
        listDigit.push(parseFloat(value.replace(',', '.')));
      }
    }
    data.series.push({name:listTmp[0],data:listDigit});
    listTmp = [];
    listDigit = [];
  }
}
// console.log(data.series[0])
console.log(data.series)
// console.log("Final data.series:", data.series);
console.log(data)
console.log(toastui.Chart);
const chartGet = toastui.Chart.barChart({ el, data, options });