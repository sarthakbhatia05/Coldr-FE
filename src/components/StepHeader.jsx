import React from 'react';

const StepHeader = ({ step }) => (
  <div className="step-header">
    <h2>{step === 1 ? 'Step 1: Setup Your Profile' : 'Step 2: Application Details'}</h2>
    <p>{step === 1 ? 'Upload your resume and create your professional profile' : 'Fill in the job-specific details to send your application'}</p>
  </div>
);

export default StepHeader;
