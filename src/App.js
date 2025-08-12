import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Alert, AlertTitle } from "@mui/material";
import ICIForm from "./components/ICIForm";

function App() {
  const [result, setResult] = useState("");

  const weights = {
    age: 0.015,           // Weight per year of age
    sex: {
      male: 0.05,         // Additional risk for males
      female: 0.0         // Baseline for females
    },
    bmi: 0.008,           // Weight per BMI unit

    lvef: -0.002,         // Negative weight (higher LVEF = lower risk)
    gls: 0.008,           // Weight per GLS unit (more negative = higher risk)
    creatinine: 0.05,     // Weight per mg/dl

    stroke: 0.015,
    chf: 0.005,
    pvd: 0.030,
    cad: 0.000,
    htn: 0.020,
    lvlge: 0.005,

    dualIci: 0.030,
    cancerMetastasis: 0.025,

    cancerTypes: {
      "Breast": 0.005,
      "Endocrine": 0.008,
      "Genitourinary": 0.002,
      "Gastrointestinal": 0.015,
      "Head and Neck": 0.014,
      "Hematologic (Blood)": 0.008,
      "Lung": 0.020,
      "Neurological": 0.016,
      "Skin": 0.009, 
      "Soft Tissue/Bone": 0.013,
      "Other": 0.011
    },

    baseline: 0.005
  };

const handleCalculate = (formData) => {
  let raw_logreg_output = -0.6127; 

  raw_logreg_output += (-0.0273) * formData.lvef; // LVEF as a percentage
  raw_logreg_output += (+0.0175) * formData.age;
  raw_logreg_output += (+0.0745) * formData.bmi;
  raw_logreg_output += (+0.1283) * formData.gls; // GLS absolute value + percentage
  raw_logreg_output += (+0.4216) * formData.creatinine;

  raw_logreg_output += (+0.2496) * (formData.dualIci ? 1 : 0);
  raw_logreg_output += (+0.3424) * (formData.lvlge ? 1 : 0);
  raw_logreg_output += (+0.1020) * (formData.cancerMetastasis ? 1 : 0);

  raw_logreg_output += (+0.3390) * (formData.sex === "male" ? 1 : 0);

  const cancerTypes = formData.cancerTypes || [];
  raw_logreg_output += (-0.4643) * (cancerTypes.includes("Breast") ? 1 : 0);
  raw_logreg_output += (+0.0449) * (cancerTypes.includes("Endocrine") ? 1 : 0);
  raw_logreg_output += (-0.1727) * (cancerTypes.includes("Gastrointestinal") ? 1 : 0);
  raw_logreg_output += (+0.3156) * (cancerTypes.includes("Genitourinary") ? 1 : 0);
  raw_logreg_output += (+0.3544) * (cancerTypes.includes("Head and Neck") ? 1 : 0);
  raw_logreg_output += (+0.2631) * (cancerTypes.includes("Hematologic (Blood)") ? 1 : 0);
  raw_logreg_output += (+0.2302) * (cancerTypes.includes("Lung") ? 1 : 0);
  raw_logreg_output += (+0.2421) * (cancerTypes.includes("Neurological") ? 1 : 0);
  raw_logreg_output += (+0.1422) * (cancerTypes.includes("Other") ? 1 : 0);
  raw_logreg_output += (+0.0275) * (cancerTypes.includes("Skin") ? 1 : 0);
  raw_logreg_output += (+0.1602) * (cancerTypes.includes("Soft Tissue/Bone") ? 1 : 0);

  raw_logreg_output += (-1.0371) * (formData.stroke ? 1 : 0);
  raw_logreg_output += (-0.5987) * (formData.chf ? 1 : 0);
  raw_logreg_output += (-0.5034) * (formData.pvd ? 1 : 0);
  raw_logreg_output += (-0.3297) * (formData.cad ? 1 : 0);
  raw_logreg_output += (+0.1644) * (formData.htn ? 1 : 0);

  const probabilityACE = 1 / (1 + Math.exp(-1*raw_logreg_output));

  //const riskPercentage = Math.round(probabilityACE * 1000) / 100;
  let riskPercentage = probabilityACE * 100; // Convert to percentage
  riskPercentage = Math.round(riskPercentage * 100) / 100;

  setResult(`${riskPercentage}%`);
};

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Card>
        <CardContent>
          {/* <Typography variant="body1" paragraph>
            Please fill in the details below to estimate the chance of developing an ACE event.
          </Typography> */}
          {/* <Alert severity="info" style={{ marginBottom: "1rem" }}>
            <AlertTitle>Definition: Acute Cardiac Events (ACE)</AlertTitle>
            In this tool, ACE refers to a range of cardiovascular complications observed 
            after immune checkpoint inhibitor (ICI) treatment. The composite ACE outcome 
            includes atrial fibrillation, atrial flutter, supraventricular tachycardia, 
            ventricular arrhythmias, second-degree atrioventricular block, complete heart 
            block, coronary artery disease, congestive heart failure, systolic heart failure, 
            diastolic heart failure, myocardial infarction, mitral valve disease, myocarditis.
          </Alert> */}
          <ICIForm onCalculate={handleCalculate} />
          {/* Display result if any */}
          {result && (
            <Alert severity="info" style={{ marginTop: "1rem" }}>
              <strong>Estimated ACE Risk:</strong> {result}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;