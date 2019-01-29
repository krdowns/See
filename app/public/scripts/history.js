window.onload = function renderChart(data, labels) {
    var dates=[];
    var emotions=[];

    $.ajax({
        url: './api/entries',
        dataType: 'json'
    }).done(function(data) {
        data.data.forEach(function(singleData) {
            dates.push(singleData.date);
            emotions.push(singleData.watson.document_tone.tones[0].tone_name);
        });
        // console.log(dates,emotions)
        myChart.update();
    });

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["0", "10", "20", "30"],
            datasets: [{
                label: 'Recent Triggers',
                data: [dates],
                borderColor: 'rgba(255, 192, 192, 1)',
                backgroundColor: 'rgba(255, 192, 192, 0.2)',
            }]
        },
        options: {            
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    },
                    ticks: { 
                        beginAtZero: true,
                        max: 10,
                        stepSize: 5,
                    }
                }]
            }
        }
    });
}


// DROPDOWN //
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

//   GET ALL ENTRIES
    $.ajax({
        method: 'GET',
        url: "/" + 'api/entries',
        success: handleSuccess,
        error: handleError
    });


    function handleSuccess(dates) {
        dates.data.forEach(singleEntry => {
            let month=moment(singleEntry.date).format('MMM');
            let day=moment(singleEntry.date).format('DD');
                $('#recent-entry-container').append(`
                <div id="single-entry-row">
                    <div class="recent-entry-date>
                        <h1 id="date-target" class="month">
                        ${month}
                        </h1>
                        <p class="day">
                        ${day}
                        </p>
                    </div>
                    <div class="recent-entry>
                        <p id="entry-target">
                        ${singleEntry.content}
                        </p>
                        <?xml version="1.0" encoding="UTF-8"?>
                        <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <title>Icons / Toggle / Default / dark</title>
                            <desc>Created with Sketch.</desc>
                            <g id="Icons-/-Toggle-/-Default-/-dark" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path d="M12,12 L16,12 L16,10 L12,10 L12,6 L10,6 L10,10 L6,10 L6,12 L10,12 L10,16 L12,16 L12,12 Z M11,0 C17.074,0 22,4.925 22,11 C22,17.075 17.074,22 11,22 C4.926,22 0,17.075 0,11 C0,4.925 4.926,0 11,0 Z" id="Combined-Shape" fill="#1F2334" fill-rule="nonzero"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                `)
            })
    }

    function handleError(e) {
        console.log('error', e);
        $('.recent-entry-date').text('Failed to load.');
    }

