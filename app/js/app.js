window.onload = () => {

    const filePath = './json/barChartData.json';

    async function fetchData() {
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            throw new Error('There has been a problem with your fetch operation:', error);
        }
    }

    let barChartData = {
        labels: [],
        datasets: [
            {
                label: 'Customers',
                data: [],
                backgroundColor: '#303f9f',
            },
            {
                label: 'Users',
                data: [],
                backgroundColor: '#3f51b5',
            },
        ],
    };

    let jsonData = null;
    async function renderBarChart() {
        try {
            jsonData = await fetchData();

            barChartData.labels = jsonData.labels;

            barChartData.datasets[0].data = jsonData.datasets[0].data;
            barChartData.datasets[0].label = jsonData.datasets[0].label;

            barChartData.datasets[1].data = jsonData.datasets[1].data;
            barChartData.datasets[1].label = jsonData.datasets[1].label;


        } catch (error) {
            console.error('Error rendering plot:', error);
        }
    }

    renderBarChart();


    const barChart = document.getElementById('barChart');
    const pieChart = document.getElementById('pieChart');

    new Chart(barChart, {
        type: 'bar',
        data: barChartData,
        options: {
            layout: {
                padding: {
                    top: 10
                }
            },
            plugins: {
                title: {
                    display: false,
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        },
    });

    const pieChartDataFilePath = './json/pieChartData.json';
    async function fetchPieChartData() {
        try {
            const response = await fetch(pieChartDataFilePath);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            throw new Error('There has been a problem with your fetch operation:', error);
        }
    }

    let pieChartData = null;
    async function renderPieChart() {
        try {
            pieChartData = await fetchPieChartData();
            console.log(pieChartData);

            new Chart(pieChart, {
                type: 'pie',
                data: pieChartData,
                options: {
                    layout: {
                        padding: {
                            top: 15,
                            right: 10,
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: "right",
                            labels: {
                                boxWidth: 15,
                                boxHeight: 15,
                            }
                        },
                    },
                    responsive: true,
                },
            });
        } catch (error) {
            console.error('Error rendering pie chart:', error);
        }
    }

    renderPieChart();
};