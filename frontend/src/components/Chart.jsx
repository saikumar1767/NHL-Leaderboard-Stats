import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({ team }) => {
  // Data for the chart
  const data = [
    { name: "Wins", y: team?.wins },
    { name: "Losses", y: team?.losses },
    { name: "Ties", y: team?.ties },
  ];

  const [chartType, setChartType] = React.useState(
    localStorage.getItem("chartType") ?? "pie"
  );

  const changeChartType = (event) => {
    setChartType(event.target.value);
    localStorage.setItem("chartType", event.target.value);
  };

  // Calculate total matches
  const totalMatches =
    (team?.wins || 0) + (team?.losses || 0) + (team?.ties || 0);

  const options = {
    chart: {
      type: chartType,
      zoomType: "xy",
      events: {
        render() {
          // Remove any existing text
          if (this.totalMatchesText) {
            this.totalMatchesText.destroy();
          }
          // here, adding new text
          this.totalMatchesText = this.renderer
            .text(
              `Total Matches: ${totalMatches}`,
              this.plotWidth / 2 +
                (chartType !== "pie" ? -20 : 0) +
                this.plotLeft,
              this.plotHeight +
                (chartType !== "bar" ? (chartType !== "pie" ? 80 : 15) : 100) +
                this.plotTop
            )
            .css({
              color: "#333333",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            })
            .attr({
              align: "center",
              zIndex: 5,
            })
            .add();
        },
      },
    },
    title: {
      text: "Team Stats",
    },
    yAxis:
      chartType !== "pie"
        ? {
            title: {
              text: "# of Matches",
            },
          }
        : {
            title: {
              text: "",
            },
          },
    xAxis:
      chartType !== "pie"
        ? {
            categories: ["Wins", "Losses", "Ties"],
          }
        : undefined,
    series: [
      {
        name: "Matches",
        colorByPoint: true,
        data: chartType === "line" ? data.map((item) => item.y) : data,
      },
    ],
    tooltip: {
      formatter: function () {
        if (chartType === "pie") {
          return `${this.series.name}: <b>${this.point.y}</b> (${
            this.point.percentage?.toFixed(1) || 0
          }%)`;
        } else if (chartType === "line") {
          return `<b>${this.point.category}</b>: ${this.point.y}`;
        } else {
          return `<b>${this.point.name}</b>: ${this.point.y}`;
        }
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)",
        },
      },
    },
  };

  return (
    <div className="flex flex-col pt-[4%] w-[100%]">
      <div className="my-4 w-[50%] m-auto">
        <label
          htmlFor="select-1"
          className="block text-sm font-medium mb-5 dark:text-white"
        >
          <strong>Select Chart Type</strong>
        </label>
        <div className="flex border-2 border-gray-600 rounded-lg">
          <select
            id="select-1"
            className="py-3 px-4 w-full border-1 border-gray-600 rounded-lg text-sm"
            onChange={(event) => changeChartType(event)}
            defaultValue={chartType}
          >
            <option value="pie">Pie</option>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="column">Column</option>
            <option value="area">Area</option>
            <option value="scatter">Scatter</option>
          </select>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
