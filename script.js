let yearTag, crimeTag;
const data1 = {
  categories: [],
  series: [],
};
const data2 = {
  categories: [],
  series: [],
};

function GetDataTab1(){
  let chartInsert = document.createElement("div"); 
  chartInsert.id="chart-area1";
  const conteneur1 = document.getElementById("table1");
  conteneur1.insertAdjacentElement("afterend",chartInsert);
  const el = document.getElementById("chart-area1");
  yearTag = document.getElementsByTagName("th");
  crimeTag = document.getElementsByTagName("td");
  return (el);
}
function GetDataTab2(){
  let chartInsert = document.createElement("div"); 
  chartInsert.id="chart-area2";
  const conteneur1 = document.getElementById("table2");
  conteneur1.insertAdjacentElement("afterend",chartInsert);
  const el2 = document.getElementById("chart-area2");
  yearTag = document.getElementsByTagName("th");
  crimeTag = document.getElementsByTagName("td");
  return (el2);
}
function setOptChart1(el, data){
  const options = {
    chart: { width: 800, height: 3500 },
    series: {shift: true},
  };
  return (toastui.Chart.barChart({ el, data, options }));
}
function setOptChart2(el, data){
  const options = {
    chart: { width: 800, height: 911 },
    series: {shift: true},
  };
  return (toastui.Chart.areaChart({ el, data, options }));
}

function DataYearTab1(){
  for (let i = 0; i < yearTag.length; i++) {
    const txtContent = yearTag[i].textContent.trim();
    if (txtContent.length === 4 && !isNaN(txtContent)) {
      data1.categories.push(txtContent);
    }
  }
}
function DataYearTab2(){
  for (let i = 0; i < yearTag.length; i++) {
    const txtContent2 = yearTag[i].textContent.trim();
    if (txtContent2.length === 7 && txtContent2!=="Country") {
      data2.categories.push(txtContent2);
    }
  }
}
function DataCrimeTab1() {
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
      data1.series.push({name:listTmp[0],data:listDigit});
      listTmp = [];
      listDigit = [];
    }
  }
}
console.log(data1.series)
function DataCrimeTab2() {
  let listTmp2 = [];
  let listDigit2 = [];
  for (let c = 420; c<crimeTag.length; c++) {
    const prContent = crimeTag[c].textContent.trim();
    listTmp2.push(prContent);
    if ((c+1) % 3 === 0 && c !== 420) {
      console.log(listTmp2)
      for (let c2 = 1; c2 < listTmp2.length; c2++) {
        let value = listTmp2[c2];
        if (value === ':') {
          listDigit2.push(0);
        }else {
          listDigit2.push(Number(value));
        }
      }
      console.log(listTmp2[0])
      data2.series.push({name:listTmp2[0],data:listDigit2});
      listTmp2 = [];
      listDigit2 = [];
    }
  }
}
console.log(data1.series)
console.log(data1)
console.log(toastui.Chart);

const el1 = GetDataTab1();
DataYearTab1();
DataCrimeTab1();
const chart1 = setOptChart1(el1, data1);

console.log(data2)
const el2 = GetDataTab2();
DataCrimeTab2();
DataYearTab2();
const chart2 = setOptChart2(el2, data2);
// chartGet.addData(newData, newCategory);