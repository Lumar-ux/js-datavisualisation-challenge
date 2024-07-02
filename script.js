let yearTag, crimeTag;
const data1 = {
  categories: [],
  series: [],
};
const data2 = {
  categories: [],
  series: [],
};

function GetDataTab(){
  let chartInsert = document.createElement("div"); 
  chartInsert.id="chart-area1";
  const conteneur1 = document.getElementById("table1");
  conteneur1.insertAdjacentElement("afterend",chartInsert);
  const el = document.getElementById("chart-area1");
  let chartInsert2 = document.createElement("div"); 
  chartInsert2.id="chart-area2";
  const conteneur2 = document.getElementById("table2");
  conteneur2.insertAdjacentElement("afterend",chartInsert2);
  const el2 = document.getElementById("chart-area2")
  yearTag = document.getElementsByTagName("th");
  crimeTag = document.getElementsByTagName("td");
  return [el,el2];
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

function DataYearTab(){
  for (let i = 0; i < yearTag.length; i++) {
    const txtContent = yearTag[i].textContent.trim();
    if (txtContent.length === 4 && !isNaN(txtContent)) {
      data1.categories.push(txtContent);
    }else if (txtContent.length === 7 && txtContent!=="Country") {
      data2.categories.push(txtContent);
    }
  }
}
function DataCrimeTab() {
  let listTmp = [];
  let listDigit = []
  for (let c = 0; c<crimeTag.length; c++) {
    const crimeContent = crimeTag[c].textContent.trim();
    listTmp.push(crimeContent);
    if ((c + 1) % 12 === 0 && c !== 0&& c<420) {
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
    }else if ((c+1) % 3 === 0 && c !== 420 && c>420) {
      for (let c3 = 1; c3 < listTmp.length; c3++) {
        let value = listTmp[c3];
        if (value === ':') {
          listDigit.push(0);
        }else {
          listDigit.push(Number(value));
        }
      }
      console.log(listTmp[0])
      data2.series.push({name:listTmp[0],data:listDigit});
      listTmp = [];
      listDigit = [];
    }
  }
}
const [el1,el2] = GetDataTab();
DataYearTab();
DataCrimeTab();
const chart1 = setOptChart1(el1, data1);
const chart2 = setOptChart2(el2, data2);
// chartGet.addData(newData, newCategory);