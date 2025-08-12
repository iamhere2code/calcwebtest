import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Alert, AlertTitle } from "@mui/material";
import ICIForm from "./components/ICIForm";

function App() {
  const [result, setResult] = useState("");

  // Placeholder for linking to your actual model
  /*const handleCalculate = (formData) => {
    // For demonstration only
    setResult("22%");
  };*/

  const predict1 = (inputs) => {
    let output = modelWeights.bias;
    console.log("Starting with bias:", output);

    for (const key in inputs) {
      const value = typeof inputs[key] === "boolean"
        ? (inputs[key] ? 1 : 0)
        : parseFloat(inputs[key]) || 0;

      output += value * (modelWeights[key] || 0); // for dropdown menu, 
      console.log(`Dropdown "${key}" value: "${inputs[key]}" mapped to:`, value);

    }
    return output;
  };

  const predict = (inputs) => {
    let output = modelWeights.bias;
    console.log("Starting with bias:", output);
  
    for (const key in inputs) {
      let value;
  
      // 1️⃣ Special case: handle dropdowns
      if (key === "dropdownFeatureName") {
        const mapping = {
          "Male": 1,
          "Other": 0,
          "Female": 0
        };
        value = mapping[inputs[key]] || 0;
        console.log(`Dropdown "${key}" value: "${inputs[key]}" mapped to:`, value);
      }
      // 2️⃣ Handle booleans
      else if (typeof inputs[key] === "boolean") {
        value = inputs[key] ? 1 : 0;
        console.log(`Boolean "${key}" value:`, value);
      }
      // 3️⃣ Handle numbers/strings
      else {
        value = parseFloat(inputs[key]) || 0;
        console.log(`Numeric "${key}" value:`, value);
      }
  
      const weight = modelWeights[key] || 0;
      const contribution = value * weight;
      console.log(`Weight for "${key}":`, weight, "| Contribution to output:", contribution);
  
      output += contribution;
    }
  
    console.log("Final raw score (z):", output);

    const percentage = 1 / (1 + Math.exp(-output)) * 100;
    console.log(`Chance: ${percentage.toFixed(2)}%`);
    return percentage;
  };

  const handlePrediction = (formData) => {
    const prediction = predict(formData);
    setResult(prediction);
  };


  const modelWeights = {
    bias:  0,
    age: 0.0175,
    Sex_Male: -0.3390, // seperate male and female
    bmi: 0.0745,
    lvef: -0.0273,
    gls: 0.1283,
    creatinine: 0.4216, 
    stroke: -1.0371,
    pvd: -0.5034,
    hypertension: 0.1644, 
    chf: -0.5987,
    cad: -0.3297,
    lvlge: 0.3424,
    dualIci: 0.2496,
    cancerMetastasis: 0.1020,
    Breast: -0.4643,
    Endocrine: 0.0449,
    Genitourinary: 0.3156,
    Gastrointestinal: -0.1727,
    Head_and_Neck: 0.3544,
    Hematologic: 0.2631,
    Lung: 0.2302,
    Neurological: 0.2421,
    Skin: 0.0275,
    Soft_Tissue_Bone: 0.1602,
    Other: 0.1422
  };
  

  return (
    <Container maxWidth="md" style={{marginTop: "2rem", marginBottom: "2rem"}}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            ACE Risk Calculator
          </Typography>

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

          <ICIForm onCalculate={handlePrediction} />

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