document.addEventListener('DOMContentLoaded', () => {

    const filePath = './json/barChartData.json';
    const pieChartDataFilePath = './json/pieChartData.json';

    async function fetchData() {
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            barChartData.labels = jsonData.labels;
            barChartData.datasets[0].data = jsonData.datasets[0].data;
            barChartData.datasets[0].label = jsonData.datasets[0].label;
            barChartData.datasets[1].data = jsonData.datasets[1].data;
            barChartData.datasets[1].label = jsonData.datasets[1].label;

            renderBarChart(); // Call the rendering function here

            return jsonData;
        } catch (error) {
            throw new Error('There has been a problem with your fetch operation:', error);
        }
    }

    async function fetchPieChartData() {
        try {
            const response = await fetch(pieChartDataFilePath);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            pieChartData = jsonData;

            renderPieChart(); // Call the rendering function here

            return jsonData;
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

    let pieChartData = null;

    async function renderBarChart() {
        try {
            const barChart = document.getElementById('barChart');
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
        } catch (error) {
            console.error('Error rendering plot:', error);
        }
    }

    async function renderPieChart() {
        try {
            const pieChart = document.getElementById('pieChart');
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

    fetchData();
    fetchPieChartData();

});
