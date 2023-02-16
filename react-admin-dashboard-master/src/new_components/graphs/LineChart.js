import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
            name: "Page " + d.length,
            rpmEngine: element.rpmEngine,
            pedalPosition: element.pedalPosition,
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
      {
        name: "Page 1",
        rpmEngine: 4000,
        pedalPosition: 2400,
        amt: 2400
      },
      {
        name: "Page 2",
        rpmEngine: 3000,
        pedalPosition: 1398,
        amt: 2210
      },
      {
        name: "Page 3",
        rpmEngine: 2000,
        pedalPosition: 9800,
        amt: 2290
      },
      {
        name: "Page 4",
        rpmEngine: 2780,
        pedalPosition: 3908,
        amt: 2000
      },
      {
        name: "Page 5",
        rpmEngine: 1890,
        pedalPosition: 4800,
        amt: 2181
      },
      {
        name: "Page 6",
        rpmEngine: 2390,
        pedalPosition: 3800,
        amt: 2500
      },
      {
        name: "Page 7",
        rpmEngine: 3490,
        pedalPosition: 4300,
        amt: 2100
      }
    ])
    getData();
  }, []); 
  
  useEffect(()=> getData(), [data])

  return (
    <ResponsiveContainer width="99%" height="99%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="rpmEngine"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="pedalPosition" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
