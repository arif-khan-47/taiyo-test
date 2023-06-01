import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import Layout from "../components/Layout/Layout";
import { useQuery } from "react-query";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const ChartPage = () => {
  const fetchChartData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    const data: any[] = await response.json();
    return data;
  };

  const { data: chartData = [], isLoading, error } = useQuery<any[]>('countries', fetchChartData);

  const formatChartData = (data: any) => {
    if (!isLoading && data) {
      const casesData = Object.entries(data?.cases).map(([date, value]) => ({ x: date, y: value }));
      const deathsData = Object.entries(data?.deaths).map(([date, value]) => ({ x: date, y: value }));
      const recoveredData = Object.entries(data?.recovered).map(([date, value]) => ({ x: date, y: value }));
      return {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: 'Cases',
            data: casesData,
            borderColor: 'red',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Deaths',
            data: deathsData,
            borderColor: 'yellow',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Recovered',
            data: recoveredData,
            borderColor: 'green',
            backgroundColor: 'red',
          },
        ],
      };
    }
  }
  let formattedData = null; // Declare formattedData variable
  if (!isLoading) {
    formattedData = formatChartData(chartData); // Store the value if not null or undefined
    console.log(formattedData)
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <div>
      <Layout>
        <div className="mt-20">
          {formattedData !== null && formattedData !== undefined ? (
            <Line options={options} data={formattedData} />
          ) : (
            <div className="h-screen flex"><div className=" m-auto">Loading chart data...</div></div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default ChartPage;
