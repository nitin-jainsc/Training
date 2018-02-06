window.onload = updateChart;
function updateChart() {
    var json = null;
    var url = "data.json";
    var data;
    fetchLegends(url, function (data) {
        console.log(data);
        json = JSON.parse(data);
        console.log(json);
    });
    var dataset = transformPie(json);
    console.log("DATASET : : " + dataset);
    drawChart(dataset);
    drawDonutChart(dataset);
}
function fetchLegends(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                callback(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
            }
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}
function transformPie(json) {
    var dataset = [];
    dataset.push(['name','value'])
    for (var i in json) {
        dataset.push([json[i].name,json[i].value]);
    }
    return dataset;
}


// Load google charts
google.charts.load('current', { 'packages': ['corechart'] });
//google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart(dataset) {
    var data = google.visualization.arrayToDataTable(dataset);

    // Optional; add a title and set the width and height of the chart
    var options = { 'title': 'Value per person' };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}





function drawDonutChart(dataset) {
    var data = google.visualization.arrayToDataTable(dataset);

    var options = {
      title: 'Value per person',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }