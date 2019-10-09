import ReactFusionCharts from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFusionCharts.fcRoot(FusionCharts, Column2D, FusionTheme);

const salesrepMonthlySales = {

    chart:{
        caption:"Monthly Average sales",
        subCaption:"2019",
        xAxisName:"Month",
        yAxisName:"sales",
        numberSuffix:'k',
        theme:'fusion',
        palettecolors:"#1b5e20",  
    },
    data:[
        {
            label:'Jan',
            value:'290'
        },
        {
            label:'Frb',
            value:'260'
        },
        {
            label:'Mar',
            value:'180'
        },
        {
            label:'Apr',
            value:'140'
        },
        {
            label:'May',
            value:'115'
        },
        {
            label:'Jun',
            value:'100'
        },
        {
            label:'Jul',
            value:'50'
        },
        {
            label:'Aug',
            value:'80'
        },
        {
            label:'Sep',
            value:'110'
        },
        {
            label:'Oct',
            value:'40'
        },
        {
            label:'Nov',
            value:'185'
        },
        {
            label:'Dec',
            value:'60'
        }
    ],
    trendlines: [
        {
            line:[ 
                {
                    startvalue: "150",
                    valueOnRight: "1",
                    displayvalue: "Monthly Target"
                }
            ]
        }
    ]   
}
export default salesrepMonthlySales;