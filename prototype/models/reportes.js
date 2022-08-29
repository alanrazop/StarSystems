const labels = ["January", "February", "March"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const config = {
  type: "pie",
  data: data,
  options: {},
};

const myChart = new Chart(document.getElementById("myChart"), config);
