import React from 'react';
import { Pie } from "react-chartjs-2";
import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
}from'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    );

export default function CircularChart({ sueldo }) {
        const datoss = [
            sueldo.SalarioBruto,
            sueldo.Deducciones,
            sueldo.Bonificaciones,
            sueldo.Impuestos,
        ];


var Tipo=["Salario Bruto","Deducciones","Bonificaciones","Impuestos"];


var data={
    labels:Tipo,
    datasets:[
    {
        label:'Prueba',
        data:datoss,
        backgroundColor:[
            'rgba(255,99,132,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(72,192,192,0.2)',
            'rgba(153,102,255,0.2)'
        ],
        borderColor:[
            'rgba(255,99,132,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(72,192,192,0.2)',
            'rgba(153,102,255,0.2)'
        ],
        borderWidth:1,
    },
    ]
}


var options={
    responsive:true,
    maintainAspectRatio:false,
};
return <Pie data={data} options={options} />;

}