//import ReactFusionCharts from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
//import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
charts(FusionCharts);

const salesrepMonthlySales = {

    chart:{
        caption:"Monthly Average sales for last two years",
        subcaption:"2018-2019",
      //  xAxisName:"Month",
        yaxisname:"sales",
        numbersuffix:'%',
        showhovereffect: "1",
        drawcrossline: "1",
        plottooltext: "<b>$dataValue</b> of sales in $seriesName",
        theme:'fusion',
     //   palettecolors:"#1b5e20",  
    },
    categories:[
        {
            category:[
                {
                    label:'Jan'
                },
                {
                    label:'Frb'
                },
                {
                    label:'Mar'
                },
                {
                    label:'Apr'
                },
                {
                    label:'May'
                },
                {
                    label:'Jun'
                },
                {
                    label:'Jul'
                },
                {
                    label:'Aug'
                },
                {
                    label:'Sep'
                },
                {
                    label:'Oct'
                },
                {
                    label:'Nov'
                },
                {
                    label:'Dec'
                }
        ]
    }
],

    dataset:[
        {
            seriesname:'2018',
            data:[
                {
                    value:'62'
                },
                {
                    value:'26'
                },
                {
                    value:'70'
                },
                {
                    value:'60'
                },
                {
                    value:'56'
                },
                {
                    value:'45'
                },
                {
                    value:'50'
                },
                {
                    value:'80'
                },
                {
                    value:'57'
                },
                {
                    value:'40'
                },
                {
                    value:'74'
                },
                {
                    value:'60'
                }
            ]
        },
        {
            seriesname:'2019',
            data:[
                {
                    value:'30'
                },
                {
                    value:'45'
                },
                {
                    value:'25'
                },
                {
                    value:'55'
                },
                {
                    value:'70'
                },
                {
                    value:'47'
                },
                {
                    value:'80'
                },
                {
                    value:'48'
                },
                {
                    value:'69'
                },
                {
                    value:'90'
                },
                {
                    value:'79'
                },
                {
                    value:'59'
                }
            ]
        }
    ]
};
   
export default salesrepMonthlySales;