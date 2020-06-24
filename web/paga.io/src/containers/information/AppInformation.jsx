import React from "react";
import PropTypes from "prop-types";
import { infoHeaderLeft, infoScreenLogo, pjson } from "helper/constant";

const AppInformation = (props) => {
  return (
    <div className="pwa-mobile-container">
      <div className="profile-header flex-x align-center space-between pa20">
        <div>
          <img
            onClick={() => props.history.push("/view-profile")}
            className="cursor-pointer"
            src={infoHeaderLeft}
            alt=""
          />
        </div>
        <div className="an-18 bold-text light--text">Informazioni</div>
        <div></div>
      </div>
      <div className="text-center pt80 pb45">
        <img src={infoScreenLogo} alt="" />
      </div>
      <div className="profile-option-lists">
        <div className="flex-x light--text profile-option-list-border no-bottom">
          <div className="an-16 regular-text flex-1">Matricola</div>
          <div className="an-16 regular-text pl15 list-text flex-1">
            M3583TN84
          </div>
        </div>
        <div className="flex-x light--text profile-option-list-border no-bottom">
          <div className="an-16 regular-text flex-1">FW</div>
          <div className="an-16 regular-text pl15 list-text flex-1">
            2.0.3.5
          </div>
        </div>
        <div className="flex-x light--text profile-option-list-border">
          <div className="an-16 regular-text flex-1">APP</div>
          <div className="an-16 regular-text pl15 list-text flex-1">
            {pjson.version}
          </div>
        </div>
      </div>
    </div>
  );
};

AppInformation.propTypes = {
  history: PropTypes.object,
};

export default AppInformation;
