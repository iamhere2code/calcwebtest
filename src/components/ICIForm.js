import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormGroup
} from "@mui/material";


function ICIForm({ onCalculate }) {
  // ------------------------------
  // NUMERIC FIELDS
  // ------------------------------
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [lvef, setLvef] = useState("");
  const [gls, setGls] = useState("");
  const [creatinine, setCreatinine] = useState("");

  // ------------------------------
  // SEX (DROPDOWN)
  // ------------------------------
  const [sex, setSex] = useState("");

  // ------------------------------
  // YES/NO FIELDS
  // ------------------------------
  const [stroke, setStroke] = useState(false);
  const [chf, setChf] = useState(false);
  const [pvd, setPvd] = useState(false);
  const [cad, setCad] = useState(false);
  const [htn, setHtn] = useState(false);
  const [lvlge, setLvlge] = useState(false);
  const [dualIci, setDualIci] = useState(false);
  const [cancerMetastasis, setCancerMetastasis] = useState(false);

  // ------------------------------
  // CANCER (SELECT ALL THAT APPLY)
  // ------------------------------
  const cancerOptions = [
    "Breast",
    "Endocrine",
    "Genitourinary",
    "Gastrointestinal",
    "Head and Neck",
    "Hematologic (Blood)",
    "Lung",
    "Neurological",
    "Skin",
    "Soft Tissue/Bone",
    "Other"
  ];
  const [cancerTypes, setCancerTypes] = useState([]);

  const handleCancerCheck = (option) => {
    if (cancerTypes.includes(option)) {
      setCancerTypes(cancerTypes.filter((item) => item !== option));
    } else {
      setCancerTypes([...cancerTypes, option]);
    }
  };

  const genderMapping = {
    "Female": 0,
    "Male": 1,
    "Other": 2, // Example if you have more options
    "": null,   // Handle the "select an option" case
  };
  // some form inputs may not work numerically
  // Ex. for sex rather than 

  // ------------------------------
  // HANDLE SUBMIT
  // ------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      // numeric
      age: Number(age),
      bmi: Number(bmi),
      lvef: Number(lvef),
      gls: Number(gls),
      creatinine: Number(creatinine),

      // dropdown
      sex, // not able to calculate properly because it may not be viewing this as a number

      // yes/no
      stroke,
      chf,
      pvd,
      cad,
      htn,
      lvlge,
      dualIci,
      cancerMetastasis,

      // multi-select
      cancerTypes
    };
    onCalculate(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      
      {/* ============ DEMOGRAPHICS ============ */}
      <Typography variant="h6" gutterBottom>
        Demographics
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Age */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            variant="outlined"
          />
        </Grid>

        {/* Sex */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required>
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              label="Sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              input={<OutlinedInput label="Sex" />}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* BMI */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            label="BMI"
            type="number"
            inputProps={{ step: "0.1" }}
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      {/* ============ LABS & IMAGING ============ */}
      <Typography variant="h6" gutterBottom>
        Labs &amp; Imaging
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            label="LVEF (%)"
            type="number"
            inputProps={{ step: "0.1" }}
            value={lvef}
            onChange={(e) => setLvef(e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            label="GLS (%)"
            type="number"
            inputProps={{ step: "0.1" }}
            value={gls}
            onChange={(e) => setGls(e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            label="Creatinine (mg/dL)"
            type="number"
            inputProps={{ step: "0.01" }}
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      {/* ============ MEDICAL HISTORY ============ */}
      <Typography variant="h6" gutterBottom>
        Medical History
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Stroke */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Stroke</FormLabel>
            <RadioGroup
              row
              value={stroke ? "yes" : "no"}
              onChange={(e) => setStroke(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* CHF */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">CHF</FormLabel>
            <RadioGroup
              row
              value={chf ? "yes" : "no"}
              onChange={(e) => setChf(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* PVD */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">PVD</FormLabel>
            <RadioGroup
              row
              value={pvd ? "yes" : "no"}
              onChange={(e) => setPvd(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* CAD */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">CAD</FormLabel>
            <RadioGroup
              row
              value={cad ? "yes" : "no"}
              onChange={(e) => setCad(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* HTN */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Hypertension (HTN)</FormLabel>
            <RadioGroup
              row
              value={htn ? "yes" : "no"}
              onChange={(e) => setHtn(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* LV LGE */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">LV LGE</FormLabel>
            <RadioGroup
              row
              value={lvlge ? "yes" : "no"}
              onChange={(e) => setLvlge(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      {/* ============ ONCOLOGY & TREATMENT ============ */}
      <Typography variant="h6" gutterBottom>
        Oncology &amp; Treatment
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Dual ICI */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Dual ICI</FormLabel>
            <RadioGroup
              row
              value={dualIci ? "yes" : "no"}
              onChange={(e) => setDualIci(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Cancer Metastasis */}
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Cancer Metastasis</FormLabel>
            <RadioGroup
              row
              value={cancerMetastasis ? "yes" : "no"}
              onChange={(e) => setCancerMetastasis(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Cancer (multi-select) */}
        <Grid item xs={12}>
          <FormLabel component="legend">Cancer (Select all that apply)</FormLabel>
          <FormGroup row>
            {cancerOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={cancerTypes.includes(option)}
                    onChange={() => handleCancerCheck(option)}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>

      {/* ============ SUBMIT BUTTON ============ */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Calculate
        </Button>
      </Box>
    </Box>
  );
}

export default ICIForm;
