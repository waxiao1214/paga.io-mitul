import React, { useState } from "react";
import Step1GeneralInfo from "components/createprofile/Step1GeneralInfo";
import Step2Weight from "components/createprofile/Step2Weight";
import Step3ProfilePhoto from "components/createprofile/Step3ProfilePhoto";
import PropTypes from "prop-types";

const newProfileData = {
  name: "",
  age: "",
  sesso: "",
  canoeType: null,
  height: 172,
  weight: 40,
  imageUrl: null,
  profile: null,
};

const CreateProfile = (props) => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState(newProfileData);

  const { history } = props;

  const submitStep1 = (value) => {
    setFormValues({ ...formValues, ...value });
    setStep(2);
  };

  const submitStep2 = (value) => {
    setFormValues({ ...formValues, ...value });
    setStep(3);
  };

  const submitStep3 = (value) => {
    setFormValues({ ...formValues, ...value });
    // const createProfile = {
    //   ...formValues,
    //   ...value
    // }
    history.push("/view-profile");
  };

  const backToStep3 = (value) => {
    setFormValues({ ...formValues, ...value });
    setStep(2);
  };

  return (
    <div className="pwa-mobile-container">
      {step === 1 ? (
        <Step1GeneralInfo formValues={formValues} submitStep1={submitStep1} />
      ) : step === 2 ? (
        <Step2Weight
          formValues={formValues}
          submitStep2={submitStep2}
          setStep={setStep}
        />
      ) : (
        <Step3ProfilePhoto
          formValues={formValues}
          submitStep3={submitStep3}
          backToStep3={backToStep3}
        />
      )}
    </div>
  );
};
CreateProfile.propTypes = {
  history: PropTypes.object,
};
export default CreateProfile;
