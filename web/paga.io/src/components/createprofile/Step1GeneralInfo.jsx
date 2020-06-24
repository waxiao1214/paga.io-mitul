import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Input, InputNumber } from "antd";
import PropTypes from "prop-types";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { step1 } from "helper/constant";
import CanoePickerDropdown from "./CanoePickerDropdown";

const Step1GeneralInfo = (props) => {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [sesso, setSesso] = useState("");
  const [canoeType, setCanoeType] = useState(null);
  const [isError, setIsError] = useState(true);
  const [isDropDown, setIsDropDown] = useState(false);
  const [error, setError] = useState({
    name: false,
    age: false,
    canoeType: false,
  });

  const { submitStep1, history, formValues } = props;

  useEffect(() => {
    if (name && name !== "" && age && age !== "" && canoeType) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    if (name && name !== "" && error.name) {
      setError({
        ...error,
        name: false,
      });
    }
    if (age && age !== "" && error.age) {
      setError({
        ...error,
        age: false,
      });
    }
    if (canoeType && error.canoeType) {
      setError({
        ...error,
        canoeType: false,
      });
    }
    if (sesso && sesso !== "" && error.sesso) {
      setError({
        ...error,
        sesso: false,
      });
    }
  }, [name, age, sesso, canoeType, error]);

  useEffect(() => {
    setname(formValues.name);
    setage(formValues.age);
    setSesso(formValues.sesso);
    setCanoeType(formValues.canoeType);
  }, [formValues]);

  const completedStep1 = () => {
    if (!isError) {
      const obj = {
        name,
        age,
        sesso,
        canoeType,
      };
      submitStep1(obj);
    } else {
      setError({
        name: name === "" ? true : false,
        age: age === "" ? true : false,
        canoeType: canoeType ? false : true,
        sesso: sesso !== "" ? false : true,
      });
    }
  };
  return (
    <div>
      {isDropDown ? (
        <CanoePickerDropdown
          setIsDropDown={setIsDropDown}
          canoeType={canoeType}
          setCanoeType={setCanoeType}
        />
      ) : (
        <div>
          <div className="profile-header flex-x align-center space-between pa20">
            <div
              className="an-16 regular--text light--text cursor-pointer"
              onClick={() => history.push("/view-profile")}
            >
              <LeftOutlined /> Indietro
            </div>
            <div className="an-18 bold-text light--text">Nuovo profilo</div>
            <div
              className={classNames(
                "an-16 regular-text cursor-pointer",
                isError ? "grey--text" : "light--text"
              )}
              onClick={completedStep1}
            >
              Avanti <RightOutlined />
            </div>
          </div>
          <div className="text-center py30">
            <img src={step1} alt="step1" />
          </div>
          <div className="an-16 bold-text text-center light--text">
            Inserisci, nome, età, sesso e tipo di canoa
          </div>
          <div className="step-1-form px25 pt25">
            <div>
              <Input
                value={name}
                onChange={(e) => setname(e.target.value)}
                className={classNames(
                  "app-input an-16 regular-text",
                  error.name && "error-input"
                )}
                placeholder="Scrivi il tuo nome"
              />
              {error.name && (
                <div className="danger--text an-14 medium-text pt10">
                  Please input your name!
                </div>
              )}
            </div>
            <div className="pt20">
              <InputNumber
                max={120}
                value={age}
                onChange={(e) => setage(e)}
                className={classNames(
                  "app-input an-16 regular-text",
                  error.age && "error-input"
                )}
                placeholder="Scrivi la tua età"
              />
              {error.age && (
                <div className="danger--text an-14 medium-text pt10">
                  Please input your age!
                </div>
              )}
            </div>
            <div
              className={classNames(
                "radio-input mt20 light--text an-16 regular-text flex-x align-center space-between",
                error.sesso && "error-input"
              )}
            >
              <div>Sesso</div>
              <div className="flex-x cursor-pointer">
                <div
                  className="flex-x align-center mr20"
                  onClick={() => setSesso("M")}
                >
                  M{" "}
                  <div
                    className={classNames(
                      "custom-radio ml10",
                      sesso === "M" && "active"
                    )}
                  ></div>
                </div>
                <div
                  className="flex-x align-center"
                  onClick={() => setSesso("F")}
                >
                  F{" "}
                  <div
                    className={classNames(
                      "custom-radio ml10",
                      sesso === "F" && "active"
                    )}
                  ></div>
                </div>
              </div>
            </div>
            {error.sesso && (
              <div className="danger--text an-14 medium-text pt10">
                Please chooose your gender!
              </div>
            )}
            <div
              className={classNames(
                "radio-input mt20 light--text an-16 regular-text flex-x align-center space-between",
                error.canoeType && "error-input"
              )}
            >
              <div>Tipo canoa</div>
              <div className="flex-x cursor-pointer an-16 primary--text cursor-pointer">
                <div onClick={() => setIsDropDown(true)}>
                  {canoeType ? canoeType : "Seleziona"}
                  <RightOutlined />
                </div>
              </div>
            </div>
            {error.canoeType && (
              <div className="danger--text an-14 medium-text pt10">
                Please pick the canoe type!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
Step1GeneralInfo.propTypes = {
  history: PropTypes.object,
  submitStep1: PropTypes.func,
  formValues: PropTypes.object,
};

export default withRouter(Step1GeneralInfo);
