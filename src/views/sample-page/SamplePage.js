import React, { useState } from 'react';
import { Button, Step, StepLabel, Stepper, Typography, TextField, Paper } from '@mui/material';

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData({
      ...formData,
      image: URL.createObjectURL(imageFile),
    });
  };

  const handleSave = () => {
    // Handle saving form data
    console.log('Form data:', formData);
    // Reset form data
    setFormData({
      name: '',
      email: '',
      image: null,
    });
    // Go to the first step
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {['Enter Details', 'Upload Image', 'Save'].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>

        {activeStep === 0 && (
          <div>
            <Typography>Step 1: Enter Details</Typography>
            <form>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </form>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        )}




        {activeStep === 1 && (
          <div>
            <Paper>
              <Typography>Step 2: Upload Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.image && (
                <img src={formData.image} alt="Uploaded" style={{ maxWidth: '100%' }} />
              )}
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Paper>

          </div>
        )}



        {activeStep === 2 && (
          <div>
            <Typography>Step 3: Save</Typography>
            <Button onClick={handleBack}>Back</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </div>


    </div>
  );
};

export default StepperComponent;
