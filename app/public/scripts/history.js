function renderChart(data, labels) {
    var dates=[];
    var emotions=[];

    $.ajax({
        url: './api/entries',
        dataType: 'json'
    }).done(function(data) {
        console.log(data.data[0].date);
        console.log(data.data[0].watson.document_tone.tones[0].tone_id)
        data.data.forEach(function() {
            dates.push(data.data[0].date);
            emotions.push(data.data[0].watson.document_tone.tones[0].tone_id);
        });
        myChart.update();
    });

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"],
            datasets: [{
                label: 'Recent Triggers',
                data: dates, emotions,
                borderColor: 'rgba(255, 192, 192, 1)',
                backgroundColor: 'rgba(255, 192, 192, 0.2)',
            }]
        },
        options: {            
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
    
}

$("#renderBtn").click(
    function () {
    renderChart();
    }
);