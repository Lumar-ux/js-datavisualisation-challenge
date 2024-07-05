let yearTag, crimeTag;
let yearTag2, crimeTag2;
const data1 = {
  categories: [],
  series: [],
};
const data2 = {
  categories: [],
  series: [],
};
const data0 = {
  // categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
  series: [],
};

function GetApiTab() {
  let chartInsertChart1 = document.createElement("div");
  chartInsertChart1.id = "chart-area0";
  const conteneur= document.getElementById("firstHeading");
  conteneur.insertAdjacentElement("afterend", chartInsertChart1);
  const el3 = document.getElementById("chart-area0");
  return (el3);
}
function setOptChart0(el, data) {
  const options = {
    chart: { width: 800, height: 911},
    series: { shift: true },
  };
  return (toastui.Chart.lineChart({ el, data, options }))
}
function DataTab() {
  fetch(
    "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json",{cache:"no-store",}
  ).then(response => response.json())
  .then(jsonData=>{
    console.log(jsonData)
    data0.series=[{name:'0',data:[]}];
    for (let i = 0; i < jsonData.length; i++) {
        for (let n = 0; n < jsonData[i].length; n += 2) {
          if (n + 1 < jsonData[i].length) {
            data0.series[0].data.push({
              x:parseInt(jsonData[i][n]),
              y:parseInt(jsonData[i][n + 1]),
            });
          }
      }
    }
    console.log(data0)
    console.log(data0.series[0].data)
  }).then(chart0=>chart0=setOptChart0(el0, data0));
}
function updateChart() {
  const newData = DataTab();
//   const el = GetApiTab();
//   const data = data0;
//   const setNewData = setOptChart0(el, data);
//   setNewData.setData(newData);
}
setInterval(updateChart, 1000)
function GetDataTab() {
  let chartInsert = document.createElement("div");
  chartInsert.id = "chart-area1";
  const conteneur1 = document.getElementById("table1");
  conteneur1.insertAdjacentElement("afterend", chartInsert);
  const el = document.getElementById("chart-area1");
  let chartInsert2 = document.createElement("div");
  chartInsert2.id = "chart-area2";
  const conteneur2 = document.getElementById("table2");
  conteneur2.insertAdjacentElement("afterend", chartInsert2);
  const el2 = document.getElementById("chart-area2");
  yearTag = conteneur1.querySelectorAll(
    "tbody>tr:first-child>th:nth-child(n+3)"
  );
  yearTag2 = conteneur2.querySelectorAll("thead>tr>th:nth-child(n+3)");
  crimeTag = conteneur1.querySelectorAll("tbody>tr:nth-child(n+1)>td");
  crimeTag2 = conteneur2.querySelectorAll("tbody>tr>td");
  // supbr = conteneur2.querySelector("tbody>tr:nth-child(8)>td:first-child");
  // if (supbr.innerHTML.includes('<br')) {
  //   supbr.innerHTML = supbr.innerHTML.replace(/<br\s*\/?>/gi, "");
  //   supbr.textContent = supbr.textContent.replace(/\s+/g, ' ').trim();
  // }
  return [el, el2];
}
function setOptChart1(el, data) {
  const options = {
    chart: { width: 800, height: 3500 },
    series: { shift: true },
  };
  return toastui.Chart.barChart({ el, data, options });
}
function setOptChart2(el, data) {
  const options = {
    chart: { width: 800, height: 911 },
    series: { shift: true },
  };
  return toastui.Chart.areaChart({ el, data, options });
}

function DataYearTab() {
  for (let i = 0; i < yearTag.length; i++) {
    const txtContent = yearTag[i].textContent.trim();
    data1.categories.push(txtContent);
  }
  for (let f = 0; f < yearTag2.length; f++) {
    const txtContent2 = yearTag2[f].textContent.trim();
    data2.categories.push(txtContent2);
  }
}
function DataCrimeTab() {
  let listTmp = [];
  let listDigit = [];
  for (let c = 0; c < crimeTag.length; c++) {
    const crimeContent = crimeTag[c].textContent.trim();
    listTmp.push(crimeContent);
    if ((c + 1) % 12 === 0 && c !== 0) {
      for (let cn = 1; cn < listTmp.length; cn++) {
        let value = listTmp[cn];
        if (value === ":") {
          listDigit.push(0);
        } else {
          listDigit.push(parseFloat(value.replace(",", ".")));
        }
      }
      data1.series.push({ name: listTmp[0], data: listDigit });
      listTmp = [];
      listDigit = [];
    }
  }
  for (let c2 = 0; c2 < crimeTag2.length; c2++) {
    const crimeContent = crimeTag2[c2].textContent.trim();
    listTmp.push(crimeContent);
    if ((c2 + 1) % 3 === 0 && c2 !== 0) {
      for (let cn2 = 1; cn2 < listTmp.length; cn2++) {
        let value = listTmp[cn2];
        if (value === ":") {
          listDigit.push(0);
        } else {
          listDigit.push(Number(value));
        }
      }
      // console.log(listTmp[0]);
      data2.series.push({ name: listTmp[0], data: listDigit });
      listTmp = [];
      listDigit = [];
    }
  }
}
const [el1, el2] = GetDataTab();
const el0 = GetApiTab();
// DataTab();
DataYearTab();
DataCrimeTab();

const chart1 = setOptChart1(el1, data1);
const chart2 = setOptChart2(el2, data2);
// chartGet.addData(newData, newCategory);
