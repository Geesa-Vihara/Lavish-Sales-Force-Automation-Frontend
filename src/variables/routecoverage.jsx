import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from "fusioncharts";
import FusionMaps from "fusioncharts/fusioncharts.maps";
import SriLanka from 'fusionmaps/maps/fusioncharts.srilanka';
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, FusionMaps,SriLanka,FusionTheme);

const routecoverage = {
    chart: {
      legendposition: "BOTTOM",
      entitytooltext: "$lname: <b>$datavalue </b>sales",
      entityfillhovercolor: "#f1f8e9",
      theme: "fusion"
    },
    colorrange: {
      gradient: "0",
      color: [
        {
          maxvalue: "4",
          displayvalue: "2-4",
          code: "#dcedc8"
        },
        {
          maxvalue: "6",
          displayvalue: "4-6",
          code: "#aed581"
        },
        {
          maxvalue: "8",
          displayvalue: "6-8",
          code: "#8bc34a"
        },
        {
          maxvalue: "10",
          displayvalue: "8-10",
          code: "#1b5e20"
        },
        {
          maxvalue: "11",
          displayvalue: "N/A",
          code: "#e0e0e0"
        }
      ]
    },
    data: [
      {
        data: [
          {
            id: "LK.AP",
            value: "10",
            tooltext: "N/A"
          },
          {
            id: "LK.AD",
            value: "9",
            //tooltext: "N/A"
          },
          {
            id: "LK.BD",
            value: "9",
            //tooltext: "N/A"
          },
          {
            id: "LK.BC",
            value: "9",
            tooltext: "N/A"
          },
          {
            id: "LK.CO",
            value: "7",
            //tooltext: "N/A"
          },
          {
            id: "LK.GL",
            value: "9",
            //tooltext: "N/A"
          },
          {
            id: "LK.GQ",
            value: "5",
            //tooltext: "N/A"
          },
          {
            id: "LK.HB",
            value: "2",
            //tooltext: "N/A"
          },
          {
            id: "LK.JA",
            value: "10",
            tooltext: "N/A"
          },
          {
            id: "LK.KT",
            value: "1",
            //tooltext: "N/A"
          },
          {
            id: "LK.KY",
            value: "6.4"
          },
          {
            id: "LK.KE",
            value: "4.5"
          },
          {
            id: "LK.KL",
            value: "5.7",
            tooltext: "N/A"
          },
          {
            id: "LK.KG",
            value: "6.4"
          },
          {
            id: "LK.MB",
            value: "4.9",
            tooltext: "N/A"
          },
          {
            id: "LK.MT",
            value: "2.9",
            tooltext: "N/A"
          },
          {
            id: "LK.MH",
            value: "6.4"
          },
          {
            id: "LK.MJ",
            value: "7",
            tooltext: "N/A"
          },
          {
            id: "LK.MP",
            value: "5.1",
            tooltext: "N/A"
          },
          {
            id: "LK.NW",
            value: "7.1",
            tooltext: "N/A"
          },
          {
            id: "LK.PR",
            value: "5.4"
          },
          {
            id: "LK.PX",
            value: "6.7"
          },
          {
            id: "LK.RN",
            value: "6.5"
          },
          {
            id: "LK.TC",
            value: "6.1",
            tooltext: "N/A"
          },
          {
            id: "LK.VA",
            value: "6.4",
            tooltext: "N/A"
          }
        ]
      }
    ]
  };
  export default routecoverage;