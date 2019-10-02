import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, Charts, FusionTheme);

const dailysales= {
  chart: {
    palettecolors:"#1b5e20",    
    aligncaptionwithcanvas: "0",
    plottooltext: "Rs <b>$dataValue</b> worth of sales done in $label",
    theme: "fusion"
  },
  data: [
    {
      label: "Kandy",
      value: "41"
    },
    {
      label: "Wellawaya",
      value: "39"
    },
    {
      label: "Badulla",
      value: "38"
    },
    {
      label: "Hambanthota",
      value: "32"
    },
    {
      label: "Pitigala",
      value: "26"
    },
    {
      label: "Matara",
      value: "25"
    },
    {
      label: "Galle",
      value: "25"
    },
    {
      label: "Ambalangoda",
      value: "24"
    },
    {
      label: "Kaluthara",
      value: "23"
    },
    {
      label: "Horana",
      value: "22"
    },
    {
      label: "Diwulapitiya",
      value: "18"
    },
    {
      label: "Chilaw",
      value: "16"
    },
    {
      label: "Pththalam",
      value: "15"
    },
    {
      label: "Anuradhapura",
      value: "13"
    },
    {
      label: "Polonnaruwa",
      value: "12"
    },
    {
      label: "Kuliyapitiya",
      value: "11"
    },
    {
      label: "Kurunagala",
      value: "10"
    },
    {
      label: "Mathale",
      value: "6"
    },
    {
      label: "Kegalle",
      value: "4"
    },
    {
      label: "Awissawella",
      value: "1"
    },
    {
      label: "Rathnapura",
      value: "1"
    },
    {
      label: "Negombo",
      value: "1"
    },
    {
      label: "Gampaha",
      value: "1"
    },
    {
        label: "Homagama",
        value: "20"
      }
  ]
}
export default dailysales;