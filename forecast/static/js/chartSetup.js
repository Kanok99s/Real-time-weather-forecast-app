document.addEventListener('DOMContentLoaded', () => {
    const chartElement = document.getElementById('chart');
    if (!chartElement) {
        console.error('Canvas element not found.');
        return;
    }

    const ctx = chartElement.getContext('2d');
    const gradient = ctx.createLinearGradient(0, -10, 0, 100);
    gradient.addColorStop(0, 'rgba(250,0,0,1)');
    gradient.addColorStop(1, 'rgba(136,255,0,1)');

    const forecastItems = document.querySelectorAll('.forecast-item');
    const temps = [];
    const hours = [];

    forecastItems.forEach(item => {
        const time = item.querySelector('.forecast-time')?.textContent?.trim();
        const temp = item.querySelector('.forecast-temperatureValue')?.textContent?.trim();

        if (time && temp) {
            hours.push(time);
            temps.push(parseFloat(temp));
        }
    });

    if (temps.length === 0 || hours.length === 0) {
        console.error('Temp or hour values are missing.');
        return;
    }

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [
                {
                    label: 'Celsius Degrees',
                    data: temps,
                    borderColor: gradient,
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'black',
                    fill: false,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                y: {
                    display: true,
                    grid: {
                        drawOnChartArea: true,
                        color: 'rgba(200, 200, 200, 0.1)'
                    },
                    suggestedMin: minTemp - 5,
                    suggestedMax: maxTemp + 5,
                },
            },
            animation: {
                duration: 1000,
            }
        }
    });
});
