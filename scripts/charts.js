Chart.defaults.font.family = "Nunito";

const section = document.getElementById("chart");
const config = {
  type: "bar",
  data: {
    labels: ["Bill", "Jeff", "Michael", "Tim", "Zuck"],
    datasets: [{ labels: "numeros", data: [5, 2, 12, 10, 3] }],
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
