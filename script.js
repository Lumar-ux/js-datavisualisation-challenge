let yearTag, crimeTag;
let yearTag2, crimeTag2;
let chart0;
const data1 = {
  categories: [],
  series: [],
};
const data2 = {
  categories: [],
  series: [],
};
const data0 = {
  series: [],
};

function GetApiTab() {
  let chartInsertChart1 = document.createElement("div");
  chartInsertChart1.id = "chart-area0";
  const conteneur = document.getElementById("firstHeading");
  conteneur.insertAdjacentElement("afterend", chartInsertChart1);
  const el3 = document.getElementById("chart-area0");
  return el3;
}
function setOptChart0(el, data) {
  const options = {
    chart: { width: 800, height: 911 },
    xAxis: {
      title: "X Axis",
      pointOnColumn: false,
      tickInterval: 1,
    },
    yAxis: {
      title: "Y Axis",
    },
    showDot: true,
    responsive: true,
  };
  return toastui.Chart.lineChart({ el, data, options });
}
let counter = 1;
let Init = false;
function DataTab() {
  const url = Init
    ? "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=1&type=json"
    : "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json";
  fetch(url, { cache: "no-store" })
    .then((response) => response.json())
    .then((jsonData) => {
      if (!data0.series[0]) {
        data0.series = [{ name: "Nb Crime", data: [] }];
      }
      if (!Init) {
        for (let i = 0; i < jsonData.length; i++) {
          data0.series[0].data.push({
            x: counter,
            y: parseInt(jsonData[i][1]),
          });
          counter++;
        }
        Init = true;
      } else {
        data0.series[0].data.push({
          x: counter,
          y: parseInt(jsonData[0][1]),
        });
        counter++;
      }
      if (!chart0) {
        const el0 = GetApiTab();
        chart0 = setOptChart0(el0, data0);
      } else {
        chart0.setData(data0);
      }
      console.log(data0.series);
    });
}
DataTab();
setInterval(DataTab, 1000);
function GetDataTab() {
  let chartInsert = document.createElement("div");
  chartInsert.id = "chart-area1";
  const conteneur1 = document.getElementById("table1");
  conteneur1.insertAdjacentElement("beforebegin", chartInsert);
  const el = document.getElementById("chart-area1");
  let chartInsert2 = document.createElement("div");
  chartInsert2.id = "chart-area2";
  const conteneur2 = document.getElementById("table2");
  conteneur2.insertAdjacentElement("beforebegin", chartInsert2);
  const el2 = document.getElementById("chart-area2");
  yearTag = conteneur1.querySelectorAll(
    "tbody>tr:first-child>th:nth-child(n+3)"
  );
  yearTag2 = conteneur2.querySelectorAll("thead>tr>th:nth-child(n+3)");
  crimeTag = conteneur1.querySelectorAll("tbody>tr:nth-child(n+1)>td");
  crimeTag2 = conteneur2.querySelectorAll("tbody>tr>td");
  return [el, el2];
}
function setOptChart1(el, data) {
  const options = {
    chart: { width: 800, height: 3500 },
    series: {
      shift: true,
      selectable: true,
    },
    yAxis: {
      categorySpacing: 10,
    },
    theme: {
      series: {
        barWidth: 8,
        hover: {
          color: "#00ff00",
          borderColor: "#73C8E7",
          borderWidth: 3,
          shadowColor: "rgba(0, 0, 0, 0.7)",
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          shadowBlur: 6,
        },
      },
    },
  };
  return toastui.Chart.barChart({ el, data, options });
}
function setOptChart2(el, data) {
  const options = {
    chart: { width: 800, height: 911 },
    series: {
      shift: true,
      selectable: true,
      zoomable: true,
      dot: {
        radius: 15,
      },
      // dataLabels: { visible: true, offsetY: -10 }
    },
    plot: {
      hover: {
        cursor: "pointer", // Changer le curseur en pointeur
      },
    },
    theme: {
      series: {
        dataLabels: {
          fontFamily: "monaco",
          useSeriesColor: true,
          textBubble: {
            visible: true,
            arrow: {
              visible: true,
              width: 5,
              height: 5,
              direction: "bottom",
            },
          },
        },
      },
    },
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
// const el0 = GetApiTab();
// DataTab();
DataYearTab();
DataCrimeTab();

const chart1 = setOptChart1(el1, data1);
const chart2 = setOptChart2(el2, data2);
// chartGet.addData(newData, newCategory);
