import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
const defaultValues = {
  name: "",
  age: 0,
  gender: "",
  os: "",
  favoriteNumber: 0,
};
const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Driver Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="age"
            label="Available Capacity"
            type="number"
            value={formValues.age}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <div style={{ width: "400px" }}>
            
            <Slider
              value={formValues.favoriteNumber}
              onChange={handleSliderChange("favoriteNumber")}
              defaultValue={1}
              step={1}
              min={1}
              max={3}
              marks={[
                {
                  value: 1,
                  label: "1",
                },
                {
                  value: 2,
                  label: "2",
                },
                {
                  value: 3,
                  label: "3",
                },
              ]}
              valueLabelDisplay="off"
            />
          </div>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default Form;