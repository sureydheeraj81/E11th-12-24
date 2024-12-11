import React from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { Bar } from 'react-chartjs-2';
import { RegDataChart } from '../services/Apis';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomColor = () => `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, 0.8)`;

const ChartComponent = ({ queryKey, fetchFn, chartTitle, label }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey, 
    queryFn: fetchFn, 
  });

  const chartData = React.useMemo(() => {
    if (!data) return null;

    const labels = [];
    const values = [];
    const backgroundColors = [];

    data.forEach(({ month, year, count }) => {
      labels.push(`${month} ${year}`);
      values.push(count);
      backgroundColors.push(getRandomColor());
    });

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          backgroundColor: backgroundColors,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: chartTitle,
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: `Number of ${label}` },
      },
      x: {
        title: { display: true },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p className="text-danger">Failed to load data.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '100%',
        height: '280px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export const DataChart = () => {
  const fetchSubscriptionData = async () => {
    const response = await RegDataChart();
    return response.data.subscriptions;
  };

  return (
    <ChartComponent
      queryKey={['subscriptionData']}
      fetchFn={fetchSubscriptionData}
      chartTitle="Subscription Trend"
      label="Subscriptions"
    />
  );
};

export const DataChartReg = () => {
  const fetchRegistrationData = async () => {
    const response = await RegDataChart();
    return response.data.corsRegistrations;
  };

  return (
    <ChartComponent
      queryKey={['registrationData']}
      fetchFn={fetchRegistrationData}
      chartTitle="User Registration Trend"
      label="Registrations"
    />
  );
};





// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useEffect, useState } from "react";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const DataChart = ({ dataVal }) => {

//   const [chartData, setChartData] = useState(null);

//   const monthsMap = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
//   const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//   const getRandomColor = () =>`rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, 0.8)`;

//   useEffect(() => {
//     if (typeof dataVal !== "object" || Object.keys(dataVal).length === 0) {
//       return;
//     }

//     const sortedKeys = Object.keys(dataVal).sort();
//     const formattedArray = sortedKeys.map(date => {
//       const [year, month] = date.split('-');
//       const monthName = monthsMap[parseInt(month, 10) - 1];
//       return `${monthName} ${year} `;
//     });
//     const labels = formattedArray;
//     const counts = sortedKeys.map((key) => dataVal[key]);

//     const chartConfig = {
//       labels: labels,
//       datasets: [
//         {
//           label: "Monthly Data",
//           data: counts,
//           backgroundColor: Array.from({ length: 12 }, () => getRandomColor()),
//         },
//       ],
//     };
//     setChartData(chartConfig);
//   }, [dataVal]);

//   return (
//     <div>
//       {chartData ? (
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: "top",
//               },
//               // title: {
//               //   display: true,
//               //   text: "Monthly Comparison",
//               // },
//             },
//           }}
//         />
//       ) : (
//         <p>Loading chart...</p>
//       )}
//     </div>
//   );
// };

// export default DataChart;
