import React from "react";
import PropTypes from "prop-types";

const ProgressPanel = ({ value = 700 }) => {
  return (
    <div className="flex-y panel-container pos-relative">
      <div className="an-24 bold-text light--text right-panel-text">
        POTENZA BRACCIO DX
      </div>
      <div className="flex-1"></div>
      <div
        className="panel-slice slice-15"
        style={value > 1100 ? {} : { background: "transparent", border: 0 }}
      >
        <div>
          <div className="right-top-border-white"></div>
          <div className="right-top-w-number an-24 regular-text">1200W</div>
        </div>
      </div>
      <div
        className="panel-slice  slice-14"
        style={value > 1000 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-14"
        style={value > 1000 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-14"
        style={value > 1000 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-14"
        style={value > 900 ? {} : { background: "transparent", border: 0 }}
      >
        <div>
          <div className="right-border-white"></div>
          <div className="right-w-number an-24 regular-text">900W</div>
        </div>
      </div>
      <div
        className="panel-slice  slice-13 hide-slice-sm"
        style={value > 800 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-12"
        style={value > 800 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-11"
        style={value > 800 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-10"
        style={value > 700 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-9"
        style={value > 600 ? {} : { background: "transparent", border: 0 }}
      >
        <div>
          <div className="right-border-white"></div>
          <div className="right-w-number an-24 regular-text">600W</div>
        </div>
      </div>
      <div
        className="panel-slice  slice-8 hide-slice-sm"
        style={value > 500 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-8"
        style={value > 500 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-7"
        style={value > 500 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-6"
        style={value > 400 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-5"
        style={value > 300 ? {} : { background: "transparent", border: 0 }}
      >
        <div>
          <div className="right-border-white"></div>
          <div className="right-w-number an-24 regular-text">300W</div>
        </div>
      </div>
      <div
        className="panel-slice  slice-4 hide-slice-sm"
        style={value > 200 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-3"
        style={value > 200 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-2"
        style={value > 200 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-1"
        style={value > 100 ? {} : { background: "transparent", border: 0 }}
      ></div>
      <div
        className="panel-slice  slice-1"
        style={value > 100 ? {} : { background: "transparent", border: 0 }}
      >
        <div>
          <div className="right-border-white"></div>
          <div className="right-w-number an-24 regular-text">0W</div>
        </div>
      </div>
    </div>
  );
};

ProgressPanel.propTypes = {
  value: PropTypes.any,
};
export default ProgressPanel;
