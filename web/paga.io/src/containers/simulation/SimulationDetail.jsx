import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  profile2,
  plusIcon,
  minusIcon,
  recoveryImage,
  goalImage,
} from "helper/constant";
import { Slider } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import TrainingSetConfirm from "components/common/TrainingSetConfirm";

const seriesList = [
  {
    goal: 5,
    recovery: 15,
    type: "distance",
  },
  {
    goal: 3,
    recovery: 45,
    type: "tempo",
  },
  {
    goal: 6,
    recovery: 25,
    type: "distance",
  },
];

const SimulationDetail = (props) => {
  const [series, setSeries] = useState(seriesList);
  const [activeSeries, setActiveSeries] = useState(3);
  const [goal, setGoal] = useState(5);
  const [recovery, setRecovery] = useState(15);
  const [parameterTab, setParameterTab] = useState(1);
  const [isConfirm, setIsConfirm] = useState(false);

  const { history } = props;

  useEffect(() => {
    if (series) {
      const type = series[activeSeries - 1].type;
      setGoal(series[activeSeries - 1].goal);
      setRecovery(series[activeSeries - 1].recovery);
      setParameterTab(type === "tempo" ? 2 : 1);
      console.log("sfjaskjhfkjashfk");
    }
  }, [activeSeries, series]);

  const minusGoal = () => {
    if (goal > 0) {
      setGoal(goal - 1);
    }
  };

  const plusGoal = () => {
    if (goal < 150) {
      setGoal(goal + 1);
    }
  };

  const minusRecovery = () => {
    if (recovery > 0) {
      setRecovery(recovery - 1);
    }
  };

  const plusRecovery = () => {
    if (recovery < 150) {
      setRecovery(recovery + 1);
    }
  };

  const decreaseSeries = () => {
    if (activeSeries > 1) {
      setActiveSeries(activeSeries - 1);
    }
  };

  const increaseSeries = () => {
    if (activeSeries < series.length) {
      setActiveSeries(activeSeries + 1);
    }
  };

  const addSeries = () => {
    const obj = {
      goal,
      recovery,
      type: parameterTab === 1 ? "distance" : "tempo",
    };
    setSeries([...series, obj]);
    setActiveSeries(series.length + 1);
  };

  return (
    <div className="pwa-mobile-container">
      <div className="profile-header flex-x pa20 align-center space-between">
        <div className="light--text flex-x align-center">
          <LeftOutlined onClick={() => history.push("/choose-workout")} />
          <div className="text-center ml15">
            <div className="header-profile-name">
              <img src={profile2} alt="profile" />
            </div>
            <div className="an-10 bold-text">Antonio C</div>
          </div>
        </div>
        <div className="an-18 bold-text light--text step-3-profile-head">
          SIMULATION
        </div>
        <div
          className="an-16 regular-text light--text cursor-pointer"
          onClick={() => setIsConfirm(true)}
        >
          Fine
        </div>
      </div>
      <div className="an-18 bold-text text-center light--text pt20 pb25">
        Imposta i parametri
      </div>
      <div className="parameter-tab-container flex-x center">
        <div
          className={classNames(
            "parameter-tab an-16 bold-text",
            parameterTab === 1 && "active"
          )}
          onClick={() => setParameterTab(1)}
        >
          DISTANZA
        </div>
        <div
          className={classNames(
            "parameter-tab an-16 bold-text",
            parameterTab === 2 && "active"
          )}
          onClick={() => setParameterTab(2)}
        >
          TEMPO
        </div>
      </div>
      <div>
        <div className="weight-block px40 pt30">
          <div className="flex-x space-between">
            <div className="plus-icon" onClick={minusGoal}>
              <img src={minusIcon} alt="" />
            </div>
            {parameterTab === 1 ? (
              <div className="text-center light--text an-14 bold-text">
                <img src={goalImage} alt="recovery" className="mb10" />
                <div>{`${goal} KM`}</div>
              </div>
            ) : (
              <div className="text-center light--text an-14 bold-text">
                <img src={recoveryImage} alt="recovery" className="mb10" />
                <div>
                  {goal <= 60 ? `${goal}  s` : `${Math.floor(goal / 60)}  min`}
                </div>
              </div>
            )}
            <div className="plus-icon" onClick={plusGoal}>
              <img src={plusIcon} alt="" />
            </div>
          </div>
          {parameterTab === 1 ? (
            <Slider
              tipFormatter={(value) => (
                <span className="an-16 bold-text">{`${value} KM`}</span>
              )}
              tooltipVisible={false}
              value={goal}
              max={10}
              onChange={setGoal}
            />
          ) : (
            <Slider
              tipFormatter={(value) => (
                <span className="an-16 bold-text">
                  {value <= 60
                    ? `${value}  s`
                    : `${Math.floor(value / 60)}  min`}
                </span>
              )}
              tooltipVisible={false}
              value={goal}
              min={5}
              max={300}
              onChange={setGoal}
            />
          )}
        </div>
        <div className="weight-block px40 pt30">
          <div className="flex-x space-between">
            <div className="plus-icon" onClick={minusRecovery}>
              <img src={minusIcon} alt="" />
            </div>
            <div className="text-center light--text an-14 bold-text">
              <img src={recoveryImage} alt="recovery" className="mb10" />
              <div>
                {recovery <= 60
                  ? `${recovery}  s`
                  : `${Math.floor(recovery / 60)}  min`}
              </div>
            </div>
            <div className="plus-icon" onClick={plusRecovery}>
              <img src={plusIcon} alt="" />
            </div>
          </div>
          <Slider
            tipFormatter={(value) => (
              <span className="an-16 bold-text">
                {value <= 60 ? `${value}  s` : `${Math.floor(value / 60)}  min`}
              </span>
            )}
            tooltipVisible={false}
            value={recovery}
            min={5}
            max={300}
            onChange={setRecovery}
          />
        </div>
      </div>
      <div className="an-16 bold-text nevy--text text-center pt30">
        SERIE N°
      </div>
      {activeSeries && (
        <div className="custom-slider flex-x align-center pl30 py15">
          <div onClick={decreaseSeries} className="mr40">
            <LeftOutlined className="primary--text cursor-pointer" />
          </div>
          {activeSeries > 1 && (
            <div
              className="inactive-series an-20 bold-text cursor-pointer"
              onClick={() => setActiveSeries(activeSeries - 1)}
            >
              {activeSeries - 1}
            </div>
          )}
          <div className="active-series an-20 bold-text ml25">
            {activeSeries}
          </div>
          <div className="pl25">
            <div className="plus-icon" onClick={addSeries}>
              <img src={plusIcon} alt="" />
            </div>
          </div>
          {activeSeries !== series.length && (
            <div onClick={increaseSeries} className="ml40">
              <RightOutlined className="primary--text cursor-pointer" />
            </div>
          )}
        </div>
      )}
      <TrainingSetConfirm
        visible={isConfirm}
        toggle={() => setIsConfirm(false)}
        onConfirm={() => history.push("/stop-allenamento")}
      />
    </div>
  );
};

SimulationDetail.propTypes = {
  history: PropTypes.object,
};

export default SimulationDetail;
