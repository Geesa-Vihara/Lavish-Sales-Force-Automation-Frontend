import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, Widgets, FusionTheme);
const progressbetweenyears = {
    chart: {      
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      numbersuffix: "%",
      theme: "fusion",
      showtooltip: "0"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "25",
          code: "#c5e1a5"
        },
        {
          minvalue: "25",
          maxvalue: "50",
          code: "#8bc34a"
        },
        {
          minvalue: "50",
          maxvalue: "75",
          code: "#558b2f"
        },
        {
          minvalue: "75",
          maxvalue: "100",
          code: "#1b5e20"
        }
      ]
    },
    dials: {
      dial: [
        {
          value: "81"
        }
      ]
    }
  };
  export default progressbetweenyears;
