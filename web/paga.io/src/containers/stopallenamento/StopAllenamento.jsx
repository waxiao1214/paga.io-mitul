import React from "react";
import PropTypes from "prop-types";
import { infoIcon, profileLogo, userImage } from "helper/constant";
import { PauseOutlined } from "@ant-design/icons";

const StopAllenamento = (props) => {
  const { history } = props;
  return (
    <div className="pwa-mobile-container">
      <div className="profile-header flex-x align-center space-between pa20">
        <div>
          <img
            onClick={() => history.push("/information")}
            className="cursor-pointer"
            src={infoIcon}
            alt=""
          />
        </div>
        <div>
          <img src={profileLogo} alt="" />
        </div>
        <div
          className="light--text an-16 regular-text cursor-pointer"
          onClick={() => history.push("/choose-workout")}
        ></div>
      </div>
      <div className="an-18 bold-text text-center light--text pt5">FREE</div>
      <div className="an-16 regular-text text-center sky--text pt5">
        Allenamento in corso…
      </div>
      <div className="profile-image-section flex-x center pt20">
        <div className="px30">
          <div className="profile-photo">
            <img src={userImage} alt="" />
          </div>
        </div>
      </div>
      <div className="an-22 bold-text light--text text-center pt10">
        Antonio C
      </div>
      <div className="buttons-group flex-x center pt30">
        <button className="pause-btn an-20 bold-text mr20">
          <PauseOutlined />
        </button>
        <button className="terminate-btn an-20 bold-text">TERMINA</button>
      </div>
    </div>
  );
};

StopAllenamento.propTypes = {
  history: PropTypes.object,
};

export default StopAllenamento;
