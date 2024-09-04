$(document).ready(function() {
  
  console.log('Ready!');

  // Toggles comparisons
  $('#compareBooked').toggle($('#compareBookedToggle').is(':checked'));
  $('#compareStay').toggle($('#compareStayToggle').is(':checked'));

  // Add event listeners for the checkboxes
  $('#compareBookedToggle, #compareStayToggle').change(function() {
    const target = $(this).is('#compareBookedToggle') ? '#compareBooked' : '#compareStay';
    $(target).stop(true, true).slideToggle(this.checked);
  });

  // Highchart
  $(function () {
    // Helper function to generate random values
    function getRandomData(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Helper function to format conversion rates to 2 decimal places
    function formatConversionRate(value) {
      return parseFloat(value.toFixed(2));
    }

    // Generate data for each country for both years
    const countries = ['Greece', 'USA', 'Great Britain', 'Belgium', 'France', 'Germany'];
    const demandData2023 = [];
    const demandData2024 = [];
    const conversionRate2023 = [];
    const conversionRate2024 = [];

    countries.forEach(country => {
      const demand2023 = getRandomData(300, 2900);
      const bookings2023 = getRandomData(100, demand2023 - 1); // Ensure bookings are less than demand
      const rate2023 = formatConversionRate((bookings2023 / demand2023) * 100); // Conversion rate as a percentage

      const demand2024 = getRandomData(300, 2900);
      const bookings2024 = getRandomData(100, demand2024 - 1); // Ensure bookings are less than demand
      const rate2024 = formatConversionRate((bookings2024 / demand2024) * 100); // Conversion rate as a percentage

      demandData2023.push(demand2023);
      conversionRate2023.push(rate2023);

      demandData2024.push(demand2024);
      conversionRate2024.push(rate2024);
    });

    $('#chartContainer').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: '',
          align: 'left'
        },
        xAxis: [{
          categories: countries,
          crosshair: true
        }],
        yAxis: [{
            title: {
              text: 'Values'
            },
            opposite: false
        }, {
            title: {
              text: 'Conversion Rate (%)'
            },
            opposite: true
        }],
        tooltip: {
          shared: true,
          headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
        },
        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
        series: [{
          name: 'Demand 2023',
          type: 'column',
          data: demandData2023,
          stack: '2023',
          color: '#038477' // Slightly lighter shade of #005B52 for 2023 demand
        }, {
          name: 'Demand 2024',
          type: 'column',
          data: demandData2024,
          stack: '2024',
          color: '#9BD8D1' // Base color for 2024 demand
        }, {
          name: 'Conversion Rate 2023',
          type: 'line',
          yAxis: 1,
          data: conversionRate2023,
          color: '#038477' // Another shade based on #005B52 for 2023 conversion rate
        }, {
          name: 'Conversion Rate 2024',
          type: 'line',
          yAxis: 1,
          data: conversionRate2024,
          color: '#038477' // Yet another shade for 2024 conversion rate
        }]
    });
  });

});