import { Card, CardContent } from '@mui/material';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { useEffect, useState } from 'react';
import api from '../../../../configs/api';

export default function LineChart() {
    const [data, setData] = useState([]);

    const getData = () => {
        api.get('/aluguel').then((res) => {
            const dados = res.data;

            let cont = [];
            let total = 1;
            for (let i = 0; i < dados.length; i++) {
                if (
                    i < dados.length - 1 &&
                    moment(dados[i].aluguelFeito).format('yyyy-mm-dd') ===
                        moment(dados[i + 1].aluguelFeito).format('yyyy-mm-dd')
                ) {
                    total++;
                } else {
                    cont.push({ x: Date.parse(dados[i].aluguelFeito), y: total });
                    total = 1;
                }
            }
            setData(cont);
        });
    };

    useEffect(() => {
        getData();
    });

    const lineChart = {
        series: [
            {
                name: 'Total',
                data: data
            }
        ],
        title: {
            text: 'Alugueis por dia',
            align: 'left'
        },
        subtitle: {
            text: 'Mostra os algueis feitos em cada dia',
            align: 'left'
        },
        legend: {
            horizontalAlign: 'left'
        },
        markers: {
            size: 5,
            style: 'hollow'
        },
        xaxis: {
            name: 'Dia',
            type: 'datetime',
            tickAmount: 6,
            title: {
                text: 'Data'
            }
        },
        yaxis: {
            name: 'total',
            title: {
                text: 'Total'
            }
        },
        dataLabels: {
            enabled: false
        },
        noData: {
            text: 'Carregando...'
        },
        tooltip: {
            x: {
                title: 'Dia',
                format: 'dd/MM/yyyy'
            },
            y: {
                title: 'Total'
            }
        },
        fill: {
            type: 'gradient',
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#673ab7', '#947dbe', '#470ead'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: []
            }
        }
    };

    return (
        <Card sx={{ minWidth: 250, m: 1, p: 1 }}>
            <CardContent>
                <Chart options={lineChart} series={lineChart.series} type="area" width={450} height={350} />
            </CardContent>
        </Card>
    );
}
