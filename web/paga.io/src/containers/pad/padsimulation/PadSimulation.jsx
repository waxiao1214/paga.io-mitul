import React, { useState, useEffect } from "react";
import { userImage, battery, bpm, km, ms, sec } from "helper/constant";
import LeftProgressPanel from "components/common/LeftProgressPanel";
import RightProgressPanel from "components/common/RightProgressPanel";
import { PauseOutlined, ForwardOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const seriesList = [
  {
    load: 70,
    goal: 5,
    recovery: 15,
    type: "distance",
  },
  {
    load: 50,
    goal: 3,
    recovery: 45,
    type: "tempo",
  },
  {
    load: 60,
    goal: 6,
    recovery: 25,
    type: "distance",
  },
  {
    load: 60,
    goal: 6,
    recovery: 25,
    type: "distance",
  },
  {
    load: 60,
    goal: 6,
    recovery: 25,
    type: "distance",
  },
  {
    load: 60,
    goal: 6,
    recovery: 25,
    type: "distance",
  },
  {
    load: 60,
    goal: 6,
    recovery: 25,
    type: "distance",
  },
  {
    load: 60,
    goal: 6,
    recovery: 25,
    type: "distance",
  },
  {
    load: 60,
    goal: 6,
    recovery: 25,
    type: "distance",
  },
];

const PadSimulation = (props) => {
  const [series, setSeries] = useState(seriesList);
  const [activeSeries, setActiveSeries] = useState(5);
  const { match } = props;
  const { params } = match;

  useEffect(() => {
    setSeries(seriesList);
  }, []);

  const setNextSeries = () => {
    if (activeSeries < series.length) {
      setActiveSeries(activeSeries + 1);
    } else {
      setActiveSeries(1);
    }
  };

  return (
    <div className="pwa-pad-container">
      <div className="Ipad-container">
        <div>
          <div className="flex-x">
            <div>
              <LeftProgressPanel value={1200} />
            </div>
            <div className="flex-1">
              <div className="flex-x center pt15">
                <div className="pad-simulation-border-right pad-simulation-border-right pr25 flex-1">
                  <div
                    className="simulation-profile-name"
                    style={{ marginLeft: "auto", marginRight: 0 }}
                  >
                    <img src={userImage} alt="" />
                  </div>
                  <div className="an-16 bold-text light--text text-right pt10">
                    Antonio C
                  </div>
                </div>
                <div className="pad-simulation-border-right pl50 py10 flex-1 pad-center-text">
                  {params.id === "med" ? (
                    <div className="an-36 bold-text light--text">MED</div>
                  ) : params.id === "power" ? (
                    <div className="an-36 bold-text light--text">POWER</div>
                  ) : params.id === "free" ? (
                    <div className="an-36 bold-text light--text">FREE</div>
                  ) : (
                    <div className="an-36 bold-text light--text">
                      SIMULATION
                    </div>
                  )}
                  <div className="an-18 regular-text sky--text">
                    Allenamento in corso…
                  </div>
                </div>
                <div className="pl25 pos-relative flex-1">
                  <div className="an-18 bold-text light--text battery-simulation-number">
                    100%
                  </div>
                  <img src={battery} alt="" />
                  <div className="an-10 bold-text light--text pt10">
                    LIVELLO BATTERIA MACCHINA
                  </div>
                </div>
              </div>
              <div>
                {params.id === "simulation" || params.id === "free" ? (
                  <div>
                    <div className="flex-x center pt30">
                      <div className="text-center mr80 min-width-236px">
                        <div className="track-border">
                          <div className="track-inner-border">
                            <img src={bpm} alt="bpm" />
                          </div>
                        </div>
                        <div className="an-60 regular-text light--text">
                          100 bpm
                        </div>
                      </div>
                      <div className="text-center ml80 min-width-236px">
                        <div className="track-border">
                          <div className="track-inner-border">
                            <img
                              src={ms}
                              alt="bpm"
                              style={{ position: "relative", top: "-13px" }}
                            />
                          </div>
                        </div>
                        <div className="an-60 regular-text light--text">
                          3.5 m/s
                        </div>
                      </div>
                    </div>
                    <div className="flex-x center">
                      <button className="pause-btn pad-pause-btn-width cursor-pointer an-20 bold-text mr20">
                        <PauseOutlined />
                      </button>
                    </div>
                    <div className="flex-x center pt40">
                      <div className="text-center mr80 min-width-236px min-width-236px">
                        <div className="track-border">
                          <div className="track-inner-border">
                            <img src={km} alt="bpm" />
                          </div>
                        </div>
                        <div className="an-60 regular-text light--text">
                          0.1 km
                        </div>
                      </div>
                      <div className="text-center ml80 min-width-236px">
                        <div className="track-border">
                          <div className="track-inner-border">
                            <img src={sec} alt="bpm" />
                          </div>
                        </div>
                        <div className="an-60 regular-text light--text">
                          5.1 sec
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt15">
                    <div className="text-center min-width-236px">
                      <div className="track-border">
                        <div className="track-inner-border">
                          <img src={km} alt="bpm" />
                        </div>
                      </div>
                      <div className="an-60 regular-text light--text">
                        100 km
                      </div>
                    </div>
                    <div className="flex-x center">
                      <div className="text-center mr80 min-width-236px">
                        <div className="track-border">
                          <div className="track-inner-border">
                            <img src={bpm} alt="bpm" />
                          </div>
                        </div>
                        <div className="an-60 regular-text light--text">
                          100 bpm
                        </div>
                      </div>
                      <button className="pause-btn pad-pause-btn-width cursor-pointer an-20 bold-text mr20">
                        <PauseOutlined />
                      </button>
                      <div className="text-center ml80 min-width-236px">
                        <div className="track-border">
                          <div className="track-inner-border">
                            <img
                              src={ms}
                              alt="bpm"
                              style={{ position: "relative", top: "-13px" }}
                            />
                          </div>
                        </div>
                        <div className="an-60 regular-text light--text">
                          3.5 m/s
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <RightProgressPanel value={1000} />
            </div>
          </div>
        </div>
        <div className="flex-x center py15">
          {series &&
            series.map((e, i) => {
              if (i + 1 < activeSeries) {
                return (
                  <div
                    key={i}
                    className="pre-page an-20 bold-text back-pagination"
                  >
                    {i + 1}
                  </div>
                );
              }
              return null;
            })}
          <div className="current-page back-pagination an-20 bold-text">
            {activeSeries}
          </div>
          {series &&
            series.map((e, i) => {
              if (i + 1 > activeSeries) {
                return (
                  <div className="back-pagination next-page an-20 bold-text">
                    {i + 1}
                  </div>
                );
              }
              return null;
            })}
          <div
            className="back-pagination an-20 bold-text cursor-pointer"
            onClick={setNextSeries}
          >
            <ForwardOutlined className="an-30" />
          </div>
        </div>
      </div>
      <div className="land-scap-alert alert-modal">
        <div>
          <div className="modal-custom-header an-32 bold-text flex-x center">
            <img src={alert} alt="" /> ATTENZIONE
          </div>
          <div className="body-text text-center an-28 regular-text">
            Per favore, ruoto lo schermo
          </div>
        </div>
      </div>
    </div>
  );
};

PadSimulation.propTypes = {
  match: PropTypes.any,
};
export default PadSimulation;
