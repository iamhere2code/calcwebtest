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
  Paper,
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
    "Head/Neck",
    "Hematologic",
    "Lung",
    "Neurological",
    "Skin",
    "Tissue/Bone",
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
      sex,

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

  const inputSX = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#CFD8DC" },
    "&:hover fieldset": { borderColor: "#90A4AE" },
    "&.Mui-focused fieldset": { borderColor: "#0A3D79", borderWidth: 2 },
  },
  "& .MuiOutlinedInput-input": { py: 1.25 },
};

const sectionTitleSX = {
  fontWeight: 700,
  fontSize: "1.05rem",
  color: "#263238",
  mb: 0.75,
};

const formLabelSX = {
  fontWeight: 600,
  color: "#455A64",
  mb: 0.75,
};


  return (
<Paper
  elevation={0}
  sx={{
    border: "1px solid",
    borderColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
    bgcolor: "#FAFAFB",
  }}
>
  {/* Header Bar */}
  <Box
    sx={{
      bgcolor: "#0A3D79",
      color: "#fff",
      px: 3,
      py: 2,
      borderBottom: "1px solid rgba(255,255,255,0.15)",
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
      ICI ACE Risk Calculator
    </Typography>
  </Box>

  {/* Form Body */}
  <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3 } }}>
    {/* ============ DEMOGRAPHICS ============ */}
    <Typography sx={sectionTitleSX}>Demographics</Typography>
    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={2} sx={{ mb: 2 }}>
      {/* Age */}
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          size="small"
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          variant="outlined"
          sx={inputSX}
        />
      </Grid>

      {/* Sex */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth required size="small">
          <InputLabel id="sex-label">Sex</InputLabel>
          <Select
            labelId="sex-label"
            label="Sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            input={<OutlinedInput label="Sex" />}
            sx={inputSX}
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
          size="small"
          label="BMI"
          type="number"
          inputProps={{ step: "0.1" }}
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
          variant="outlined"
          sx={inputSX}
        />
      </Grid>
    </Grid>

    {/* ============ LABS & IMAGING ============ */}
    <Typography sx={sectionTitleSX}>Labs & Imaging</Typography>
    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          size="small"
          label="LVEF (%)"
          type="number"
          inputProps={{ step: "0.1" }}
          value={lvef}
          onChange={(e) => setLvef(e.target.value)}
          variant="outlined"
          sx={inputSX}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          size="small"
          label="Global Long. Strain (GLS)"
          type="number"
          inputProps={{ step: "0.1" }}
          value={gls}
          onChange={(e) => setGls(e.target.value)}
          variant="outlined"
          sx={inputSX}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          size="small"
          label="Creatinine (mg/dL)"
          type="number"
          inputProps={{ step: "0.01" }}
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
          variant="outlined"
          sx={inputSX}
        />
      </Grid>

      {/* LV LGE */}
      <Grid item xs={12} sm={4}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={formLabelSX}>
            LV LGE
          </FormLabel>
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

    {/* ============ MEDICAL HISTORY ============ */}
    <Typography sx={sectionTitleSX}>Medical History</Typography>
    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={2} sx={{ mb: 2 }}>
      {/* Stroke */}
      <Grid item xs={12} sm={6}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={formLabelSX}>
            Stroke
          </FormLabel>
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
          <FormLabel component="legend" sx={formLabelSX}>
            CHF
          </FormLabel>
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
          <FormLabel component="legend" sx={formLabelSX}>
            PVD
          </FormLabel>
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
          <FormLabel component="legend" sx={formLabelSX}>
            CAD
          </FormLabel>
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
          <FormLabel component="legend" sx={formLabelSX}>
            Hypertension (HTN)
          </FormLabel>
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
    </Grid>

    {/* ============ ONCOLOGY & TREATMENT ============ */}
    <Typography sx={sectionTitleSX}>Oncology & Treatment</Typography>
    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={2} sx={{ mb: 2 }}>
      {/* Dual ICI */}
      <Grid item xs={12} sm={6}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={formLabelSX}>
            Dual ICI
          </FormLabel>
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
          <FormLabel component="legend" sx={formLabelSX}>
            Cancer Metastasis
          </FormLabel>
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
        <FormLabel component="legend" sx={formLabelSX}>
          Cancer (Select all that apply)
        </FormLabel>
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
              sx={{ mr: 2 }}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>

    {/* ============ SUBMIT BUTTON ============ */}
    <Box sx={{ mt: 1 }}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        sx={{
          bgcolor: "#0A3D79",
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 1.5,
          px: 3,
          "&:hover": { bgcolor: "#083363" },
        }}
      >
        Calculate
      </Button>
    </Box>
  </Box>
</Paper>
  );
}

export default ICIForm;
