import { Line } from "react-chartjs-2";
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
}from'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var beneficios=[0,3,20,15,21,13];
var otro=[5,25,13,7,23,19];
var meses=["Enero","Frebero","Marzo","Abril","Mayo","Junio"];

var midata={
    labels:meses,
    datasets:[
    {
        label:'Vacaciones',
        data:beneficios,
        tension:0.5,
        fill:true,
        borderColor: 'rgb(255,99,132)',
        backgroundColor:'rgba(255,99,132,0.5)',
        pointRadius:5,
        pointBorderColor:'rgba(255,99,132)',
        pointbackgroundColor:'rgba(255,99,132)'
    },
    {
        label:'Faltas o Aunsencias',
        data:otro,
        tension:0.5,
        fill:true,
        borderColor: 'rgb(100,99,132)',
        backgroundColor:'rgba(100,99,132,0.5)',
        pointRadius:5,
        pointBorderColor:'rgba(100,99,132)',
        pointbackgroundColor:'rgba(100,99,132)'
    },
    ]
}

var misoptions={
    
};

export default function LinesChart(){
    return <Line data={midata} options={misoptions}/>
}
