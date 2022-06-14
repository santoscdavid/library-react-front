import { Card, CardContent, CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from '../../../../configs/api';

export default function PizzaChart() {
    const [rents, setRents] = useState([]);

    const getRents = () => {
        api.get('/aluguel').then(({ data }) => {
            setRents(data);
        });
    };

    function filterOnDeadline(obj) {
        if ('devolucao' in obj && obj.devolucao <= obj.previsaoEntrega) {
            return true;
        }
    }

    function filterNotReturned(obj) {
        if ('devolucao' in obj && obj.devolucao === null) {
            return true;
        }
    }

    function filterOnDelay(obj) {
        if ('devolucao' in obj && obj.devolucao > obj.previsaoEntrega) {
            return true;
        }
    }

    var onTime = rents.filter(filterOnDeadline);
    var notReturned = rents.filter(filterNotReturned);
    var onDelay = rents.filter(filterOnDelay);

    useEffect(() => {
        getRents();
    }, []);

    const donutChart = {
        series: [notReturned.length, onTime.length, onDelay.length],
        chart: {
            type: 'pie'
        },
        labels: ['Não devolvido', 'No prazo', 'Em atraso'],
        colors: ['#5AB55E', '#F55246', '#FEB019'],
        fill: {
            colors: ['#5AB55E', '#F55246', '#FEB019']
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    return (
        <Card sx={{ minWidth: 250, m: 1, p: 1 }}>
            <CardHeader
                title="Média dos status de Aluguel"
                titleTypographyProps={{ fontSize: '1rem', fontWeight: 'Bold' }}
            />
            <CardContent>
                <Chart options={donutChart} series={donutChart.series} type="donut" width={450} height={350} />
            </CardContent>
        </Card>
    );
}
