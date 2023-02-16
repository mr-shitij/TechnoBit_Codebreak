import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Chart() {


  const [data, setData] = useState([]);

  function getData(){
    setInterval(() => {
      axios.get(`http://localhost:5000/api/vehicle/`).then((response) => {
        console.log(response.data);

        let d = data;
        response.data.forEach(element => {
          d.push({
            x: element.airFlowRate,
            y:element.tyrePressure
          })
        });
        if(d.length > 50)
          d = d.slice(-1, -30);
        setData(d);
      });
  
    }, 2000);
  }
  
  useEffect(() => {
    setData([
      { x: 100, y: 200 },
      { x: 120, y: 100 },
      { x: 170, y: 300 },
      { x: 140, y: 250 },
      { x: 150, y: 400 },
      { x: 110, y: 280 }
    ])
    getData();
  }, []); 
  
  useEffect(()=> getData(), [data])


  return (
    <ResponsiveContainer width="99%" height="99%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
        width={500}
        height={300}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
