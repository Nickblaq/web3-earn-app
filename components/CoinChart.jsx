import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

import { historyOptions } from '../chartConfig';


const CoinChart = ({data}) => {

    const { day, week, month, year, detail } = data;
    const chartRef = useRef();
    const [timeFormat, setTimeFormat] = useState("24h");
  
    const DetermineTimeFormat = () => {
      switch (timeFormat) {
        case "24h":
          return day;
        case "7d":
          return week;
        case "30d":
          return month;
        case "1y":
          return year;
        default:
          return day;
      }
    };

    const getChart = async () => {
        if (chartRef && chartRef.current && detail) {
             await new Chartjs(chartRef.current, {
              type: "bar",
              data: {
                datasets: [
                  {
                    label: `${detail.name}`,
                    data: DetermineTimeFormat(),
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderColor: "#d9cbcb",
                    pointRadius: 0,
                    borderWidth: 2,
                  },
                ],
              },
              options: historyOptions,
            });
          }
    }

    useEffect(() => {
       getChart()
      }, [detail]);
  

    return(
        <>
        <div>
        <div className='text-left'>
            <p className='text-[#5A41F5] text-5xl font-black '>$ {" "} 0.00</p>
            <h1 className='pt-3 '>Total Balance</h1>
        </div>
      <div className=" h-48">

   
        <canvas ref={chartRef} id="mychart" width={250} height={250}></canvas>
        </div>
        </div>
        
        </>
    )
}



export default CoinChart;