import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { step2, manheight, plusIcon, minusIcon } from "helper/constant";
import { Slider } from "antd";
import { foot } from "helper/constant";

const Step2Weight = ({ submitStep2, setStep, formValues }) => {
  const [weight, setWeight] = useState(40);
  const [height, setHeight] = useState(176);

  useEffect(() => {
    setWeight(formValues.weight);
    setHeight(formValues.height);
  }, [formValues]);

  const completedStep2 = () => {
    const obj = {
      weight,
      height,
    };
    submitStep2(obj);
  };

  const onChangeWeight = (weight) => {
    setWeight(weight);
  };

  const onChangeHeight = (h) => {
    setHeight(h);
  };

  const minusWeight = () => {
    if (weight > 0) {
      setWeight(weight - 1);
    }
  };

  const plusWeight = () => {
    if (weight < 150) {
      setWeight(weight + 1);
    }
  };

  const minusHeight = () => {
    if (height > 0) {
      setHeight(height - 1);
    }
  };

  const plusHight = () => {
    if (height < 220) {
      setHeight(height + 1);
    }
  };
  return (
    <div>
      <div className="profile-header flex-x align-center space-between pa20">
        <div
          className="an-16 regular--text light--text cursor-pointer"
          onClick={() => setStep(1)}
        >
          <LeftOutlined /> Indietro
        </div>
        <div className="an-18 bold-text light--text">Nuovo profilo</div>
        <div
          className={classNames(
            "an-16 regular-text cursor-pointer light--text"
          )}
          onClick={completedStep2}
        >
          Avanti <RightOutlined />
        </div>
      </div>
      <div className="text-center py30">
        <img src={step2} alt="step2" />
      </div>
      <div className="an-16 bold-text text-center light--text">
        Inserisci peso ed altezza
      </div>
      <div className="man-height-block text-center flex-x pos-relative center mx65 mt30">
        <div>
          <img src={manheight} alt="height" />
        </div>
        <div className="foot">
          <img src={foot} alt="" />
        </div>
        <div className="vertical-slider">
          <div className="plus-icon" onClick={plusHight}>
            <img src={plusIcon} alt="" />
          </div>
          <Slider
            vertical
            tipFormatter={(value) => (
              <span className="an-16 bold-text">{`${value}  cm`}</span>
            )}
            tooltipVisible
            value={height}
            max={220}
            onChange={onChangeHeight}
            tooltipPlacement="bottomLeft"
          />
          <div className="plus-icon minus-icon" onClick={minusHeight}>
            <img src={minusIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="weight-block px40 pt40">
        <div className="flex-x space-between">
          <div className="plus-icon" onClick={minusWeight}>
            <img src={minusIcon} alt="" />
          </div>
          <div className="plus-icon" onClick={plusWeight}>
            <img src={plusIcon} alt="" />
          </div>
        </div>
        <Slider
          tipFormatter={(value) => (
            <span className="an-16 bold-text">{`${value}  kg`}</span>
          )}
          tooltipVisible
          value={weight}
          max={150}
          onChange={onChangeWeight}
        />
      </div>
    </div>
  );
};
Step2Weight.propTypes = {
  submitStep2: PropTypes.func,
  setStep: PropTypes.func,
  formValues: PropTypes.object,
};
export default withRouter(Step2Weight);
