import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {useEffect, useState} from 'react';
// import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import axios from "axios";
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const navigate = useNavigate();
  const [editingRow, setEditingRow] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleLinkChange = (id) => {
    navigate(`/edit?id=${id}`);
  };
  const handleViewChange = (id) => {
    navigate(`/edit?id=${id}`);
  };
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "vehicleNumber",
      headerName: "Vehicle Number",
      type: "string",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "mileage",
      headerName: "Mileage",
      type: "number",
      flex: 1,
    },
    {
      field: "maintainenaceStatus",
      headerName: "Maintainenace Status",
      type: String,
      flex: 1,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      type: Number,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      type: "string",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      )
    
  },
];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/vehicle/").then((response) => {
      setRows(response.data);
    });
  }, []);
  
        
  console.log(rows)
  let mockDataTeam=[]
  for (let i = 0; i < rows.length; i++) {
    let jsonObject={
      id:rows[i]._id,
      vehicleNumber:rows[i].vehicleNumber,
      mileage:rows[i].mileage,
      maintainenaceStatus:rows[i].maintainenaceStatus===1?"No":"Yes",
      capacity:rows[i].availableCapacity,
    }
    mockDataTeam.push(jsonObject)
  }
  console.log(mockDataTeam)

  
  return (

    <Box m="20px">
      <Header title="Vehicles" subtitle="Managing the Vehicles" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >        
        <DataGrid rows={mockDataTeam} columns={columns} onCellClick={
          (item)=>{
            console.log(item);
            if(item.field === "edit")
              handleLinkChange(item.id);
            if(item.field === "vehicleNumber")
              handleViewChange(item.id);
          }
        }/>
      
      </Box>
    </Box>
  );
};

export default Team;


// import { Button } from 'react-bootstrap'
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import { useState, useEffect} from "react";


// const [vehicleList, setVehicleList] = useState([]);

// useEffect(() => {
//   async function fetchVehicles() {
//     try {
//       const response = await axios.get("http://localhost:5000/api/vehicle/");
//       setVehicleList(response.data);
//     } catch (error) {
//       console.error(error);
//       setVehicleList([]);
//     }
//   }
//   fetchVehicles();
// }, []);
  

// const handleButtonClick = async () => {
//   try {
//     const response = await axios.get(`http://localhost:6000/api/vehicle/`);
//     console.log(response)
//     console.log(response.data.length)
//     for (let i = 0; i < response.data.length; i++) {
//       let jsonObject={
//         vehicleNumber:response[i].vehicleNumber,
//         mileage:response[i].mileage,
//         maintainenaceStatus:response[i].maintainenaceStatus,
//         capacity:response[i].availableCapacity,
//       }
//       mockDataTeam.push(jsonObject)
//     }
//     console.log(mockDataTeam)
//     // setVehicleData(response.data);
//   } catch (error) {
//     console.error(error);
//     // setVehicleData(null);
//   }
// };