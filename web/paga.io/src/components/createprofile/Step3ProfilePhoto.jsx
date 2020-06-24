import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { LeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Upload } from "antd";
import { step3, addPhotoBack, cameraIcon } from "helper/constant";
import profilesAPI from "helper/profiles-api";

const Step3ProfilePhoto = ({ submitStep3, formValues, backToStep3 }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setImageUrl(formValues.imageUrl);
    setFile(formValues.profile);
  }, [formValues]);

  const completedStep3 = () => {
    const obj = {
      profile: file,
      imageUrl,
    };

    // TODO: Move to the correct place.
    profilesAPI
      .create(
        {
          name: formValues.name,
          age: formValues.age,
          weightInKg: formValues.weight,
          heightInCm: formValues.height,
          gender: formValues.sesso,
          canoeType: formValues.canoeType,
        },
        imageUrl
      )
      .then((id, err) => {
        console.log(`*** DEBUG: added user ${id} OR err ${err}`);
      });

    submitStep3(obj);
  };

  const backToStep3Handler = () => {
    const obj = {
      profile: file,
      imageUrl,
    };
    backToStep3(obj);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setFile(info.file.originFileObj);
      });
    }
  };

  return (
    <div>
      <div className="profile-header flex-x align-center space-between pa20">
        <div
          className="an-16 regular--text light--text"
          onClick={backToStep3Handler}
        >
          <LeftOutlined /> Indietro
        </div>
        <div className="an-18 bold-text light--text step-3-profile-head">
          Nuovo profilo
        </div>
        <div
          className={classNames(
            "an-16 regular-text cursor-pointer light--text"
          )}
          onClick={completedStep3}
        >
          Fine
        </div>
      </div>
      <div className="text-center py30">
        <img src={step3} alt="step3" />
      </div>
      <div className="profile-image-section flex-x center pt20">
        <div className="px30">
          <Upload
            onChange={handleChange}
            showUploadList={false}
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
          >
            <div className="profile-photo">
              {imageUrl ? (
                <img src={imageUrl} alt="" />
              ) : (
                <div>
                  <img src={addPhotoBack} alt="" />
                  <div className="select-photo-text text-center">
                    <div>
                      <img className="camera-icon" src={cameraIcon} alt="" />
                      <div className="an-12 regular-text light--text px30 pt5">
                        Carica immagine del profilo
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Upload>
        </div>
      </div>
      <div className="an-22 bold-text light--text text-center pt10">
        {formValues.name}
      </div>
      <div className="profile-option-lists px25">
        <div className="flex-x space-between light--text profile-option-list-border cursor-pointer no-bottom">
          <div className="an-16 regular-text pl10">Età</div>
          <div className="an-16 regular-text pl10">{formValues.age}</div>
        </div>
        <div className="flex-x space-between light--text profile-option-list-border cursor-pointer no-bottom">
          <div className="an-16 regular-text pl10">Sesso</div>
          <div className="an-16 regular-text pl10">{formValues.sesso}</div>
        </div>
        <div className="flex-x space-between light--text profile-option-list-border cursor-pointer no-bottom">
          <div className="an-16 regular-text pl10">Tipo Canoa</div>
          <div className="an-16 regular-text pl10">{formValues.canoeType}</div>
        </div>
        <div className="flex-x space-between light--text profile-option-list-border cursor-pointer no-bottom">
          <div className="an-16 regular-text pl10">Peso / Kg</div>
          <div className="an-16 regular-text pl10">{formValues.weight}</div>
        </div>
        <div className="flex-x space-between light--text profile-option-list-border cursor-pointer">
          <div className="an-16 regular-text pl10">Altezza / Cm</div>
          <div className="an-16 regular-text pl10">{formValues.height}</div>
        </div>
      </div>
    </div>
  );
};
Step3ProfilePhoto.propTypes = {
  submitStep3: PropTypes.func,
  setStep: PropTypes.func,
  formValues: PropTypes.object,
  backToStep3: PropTypes.func,
};
export default withRouter(Step3ProfilePhoto);
