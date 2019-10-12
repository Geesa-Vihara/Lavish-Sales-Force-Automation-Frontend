import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, Charts, FusionTheme);

const salesovertheyear = {
    chart: {
      palettecolors:"#dcedc8",    
      drawAnchors: "1",
      anchorBorderColor: "#1b5e20",
      numbersuffix: " Rs",
      rotatelabels: "1",
      setadaptiveymin: "1",
      theme: "fusion"
    },
    data: [
      {
        label: "January",
        value: "89.45"
      },
      {
        label: "February",
        value: "89.87"
      },
      {
        label: "March",
        value: "89.64"
      },
      {
        label: "April",
        value: "90.13"
      },
      {
        label: "May",
        value: "90.67"
      },
      {
        label: "June",
        value: "90.54"
      },
      {
        label: "July",
        value: "90.75"
      },
      {
        label: "August",
        value: "90.8"
      },
      {
        label: "September",
        value: "91.16"
      },
      {
        label: "October",
        value: "91.37"
      },
      {
        label: "November",
        value: "91.66"
      },
      {
        label: "December",
        value: "91.8"
      }
    ]
};
export default salesovertheyear;