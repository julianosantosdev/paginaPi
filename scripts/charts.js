Chart.defaults.font.family = "Nunito";
Chart.defaults.color = "#000";

const section = document.getElementById("chart");
const config = {
  type: "bar",
  data: {
    labels: ["1A", "1B", "2A", "2B", "3A", "3C"],
    datasets: [{ label: "Matriculas", data: [32, 35, 40, 30, 25, 31] }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  },
};

const barChart = new Chart(section, config);
