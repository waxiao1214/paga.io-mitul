import React from "react";
import PropTypes from "prop-types";
import { profileLogo, profile2 } from "helper/constant";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Workout = (props) => {
  const { history } = props;
  return (
    <div className="pwa-mobile-container">
      <div className="profile-header flex-x pa20 align-center">
        <div className="light--text flex-x align-center">
          <LeftOutlined onClick={() => history.push("/view-profile")} />
          <div className="text-center ml15">
            <div className="header-profile-name">
              <img src={profile2} alt="profile" />
            </div>
            <div className="an-10 bold-text">Antonio C</div>
          </div>
        </div>
        <div className="pl50">
          <img src={profileLogo} alt="" />
        </div>
      </div>
      <div className="an-18 bold-text text-center light--text py20">
        Scegli il tuo allenamento
      </div>
      <div className="profile-option-lists px50">
        <div
          onClick={() => history.push("/med")}
          className="flex-x light--text center profile-option-list-border pos-relative cursor-pointer no-bottom"
        >
          <div className="an-18 bold-text pl15 list-text text-center">
            MED
            <div className="an-11 regular-text nevy--text">
              Recupero tono muscolare
            </div>
          </div>
          <div className="workout-right-icon">
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => history.push("/power")}
          className="flex-x light--text center profile-option-list-border pos-relative cursor-pointer no-bottom"
        >
          <div className="an-18 bold-text pl15 list-text text-center">
            POWER
            <div className="an-11 regular-text nevy--text">
              Potenziamento del gesto
            </div>
          </div>
          <div className="workout-right-icon">
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => history.push("/simulation")}
          className="flex-x light--text center profile-option-list-border pos-relative cursor-pointer no-bottom"
        >
          <div className="an-18 bold-text pl15 list-text text-center">
            SIMULATION
            <div className="an-11 regular-text nevy--text">
              Simulazione di allenamento in acqua
            </div>
          </div>
          <div className="workout-right-icon">
            <RightOutlined />
          </div>
        </div>
        <div className="flex-x light--text center profile-option-list-border pos-relative cursor-pointer">
          <div className="an-18 bold-text pl15 list-text text-center">
            FREE
            <div className="an-11 regular-text nevy--text">Pagaiata libera</div>
          </div>
          <div className="workout-right-icon">
            <RightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

Workout.propTypes = {
  history: PropTypes.object,
};

export default Workout;
