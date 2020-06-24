import React from "react";
import PropTypes from "prop-types";
import { LeftOutlined } from "@ant-design/icons";
import { checkMark } from "helper/constant";

const CanoePickerDropdown = ({ setIsDropDown, setCanoeType, canoeType }) => {
  return (
    <div>
      <div className="flex-x align-center space-between pa20">
        <div
          onClick={() => setIsDropDown(false)}
          className="an-16 regular--text light--text cursor-pointer"
        >
          <LeftOutlined />
        </div>
        <div className="an-18 bold-text light--text">Seleziona Canoa</div>
        <div className="grey--text an-16 regular-text"></div>
      </div>
      <div className="profile-option-lists">
        <div
          onClick={() => setCanoeType("K1")}
          className="flex-x light--text profile-option-list-border cursor-pointer no-bottom"
        >
          {canoeType === "K1" && (
            <div className="dropdown-selected pl10">
              <img src={checkMark} alt="settings" />
            </div>
          )}
          <div className="an-16 regular-text pl10 list-text pl40">K1</div>
        </div>
        <div
          onClick={() => setCanoeType("C1")}
          className="flex-x light--text profile-option-list-border cursor-pointer no-bottom"
        >
          {canoeType === "C1" && (
            <div className="dropdown-selected pl10">
              <img src={checkMark} alt="settings" />
            </div>
          )}
          <div className="an-16 regular-text pl10 list-text pl40">C1</div>
        </div>
        <div
          onClick={() => setCanoeType("C2")}
          className="flex-x light--text profile-option-list-border cursor-pointer"
        >
          {canoeType === "C2" && (
            <div className="dropdown-selected pl10">
              <img src={checkMark} alt="settings" />
            </div>
          )}
          <div className="an-16 regular-text pl10 list-text pl40">C2</div>
        </div>
      </div>
    </div>
  );
};
CanoePickerDropdown.propTypes = {
  setIsDropDown: PropTypes.func,
  setCanoeType: PropTypes.func,
  canoeType: PropTypes.string,
};

export default CanoePickerDropdown;
