import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, Charts, FusionTheme);

const yearlyproducts = {
  chart: {
    
    palettecolors:"#8bc34a,#dcedc8,#aed581,#8bc34a,#689f38,#558b2f",
    showlegend: "1",  
    showpercentvalues: "0",
    aligncaptionwithcanvas: "0",
    captionpadding: "0",
    decimals: "1",
    plottooltext:
      "<b>$label</b> sold <b>$percentValue</b> amount  ",
    theme: "fusion"
  },
  data: [
    {
      label: "Tea pouch",
      value: "1000"
    },
    {
      label: "Tea bag",
      value: "5300"
    },
    {
      label: "Tea sachet",
      value: "10500"
    },
    {
      label: "Tea bulk",
      value: "18900"
    },
    {
      label: "Tea bottle",
      value: "17904"
    },
    {
      label: "Tea basket",
      value: "17904"
    }
  ]
};
export default yearlyproducts;