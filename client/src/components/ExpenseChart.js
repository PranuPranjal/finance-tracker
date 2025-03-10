import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ExpenseChart({ transactions }) {
  const chartRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    if (myChart.current) {
      myChart.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    const expensesByMonth = Array(12).fill(0);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    transactions.forEach((transaction) => {
      const monthIndex = new Date(transaction.date).getMonth();
      expensesByMonth[monthIndex] += parseFloat(transaction.amount);
    });

    const data = {
      labels: monthNames,
      datasets: [{
        label: 'Monthly Expenses',
        data: expensesByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      }]
    };

    myChart.current = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.5)',
            },
            title: {
              display: true,
              text: 'Amount (₹)',
              font: {
                size: 16,
                weight: 'bold',
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: 'Months',
              font: {
                size: 16,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        },
      },
    });
    
    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, [transactions]); 

  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default ExpenseChart;