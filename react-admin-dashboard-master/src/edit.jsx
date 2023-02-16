import React, { useState ,useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material";

const defaultValues = {
  _id:"",
  driverName: "",
  maintainenaceStatus: 0,
  srcLocation: {},
  destLocation:{}
};

const theme = createTheme({
    typography: {
      button: {
        fontSize: '1rem',
      },
      textfield: 'white',
    },
    palette: {
        primary: {
          main: '#0971f1',
          darker: '#053e85',
        },
        neutral: {
          main: '#64748B',
          contrastText: '#fff',
        },
      },
  });

const Form = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    console.log("I am from edit and id received is :"+id);
    defaultValues._id=id
    const [recv_data, setrecv_data] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/api/vehicle/${id}`).then((response) => {
            setrecv_data(response.data);
            console.log(recv_data)
        });
    }, []);
  const [formValues, setFormValues] = useState(defaultValues);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    defaultValues.driverName=formValues.driverName;
    defaultValues.maintainenaceStatus=formValues.maintainenaceStatus==="yes"?0:1;
    axios.post(`http://localhost:5000/api/vehicle/update/${id}`, defaultValues)
    .then(response => {
      // handle successful response
      console.log(response);
    })
    .catch(error => {
      // handle error
      console.error(error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column" defaultValue="color">
            <Grid item>
            <TextField
                id="name-input"
                name="driverName"
                label="Name"
                type="text"
                color='primary'
                value={formValues.driverName}
                onChange={handleInputChange}
            />
            </Grid>

            <Grid item>
            <FormControl>
                <FormLabel>maintainenaceStatus</FormLabel>
                <RadioGroup
                name="maintainenaceStatus"
                value={formValues.maintainenaceStatus}
                onChange={handleInputChange}
                row
                >
                <FormControlLabel
                    key="yes"
                    value="yes"
                    control={<Radio size="small" />}
                    label="yes"
                />
                <FormControlLabel
                    key="No"
                    value="No"
                    control={<Radio size="small" />}
                    label="No"
                />
                </RadioGroup>
            </FormControl>
            </Grid>

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Grid>
        </form>
    </ThemeProvider>
  );
};
export default Form;