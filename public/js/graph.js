google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Set Data
    var data = google.visualization.arrayToDataTable([
      ['Time', 'Temp'],
      ["Mon",27],["Tue",32],["Wed",31],["Thu",30],["Fri",27]
      ,["Sat",24],["Sun",31]
      ]);
    // Set Options
    var options = {
      title: 'Weekly Forecast',
      hAxis: {title: 'Temp °C'},
      vAxis: {title: 'Day'},
      legend: 'none'
    };
    // Draw Chart
    var chart = new google.visualization.BarChart(document.getElementById('graph1'));
    
    chart.draw(data, options);
    }