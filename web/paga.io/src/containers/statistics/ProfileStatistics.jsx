import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { infoHeaderLeft, userImage, activeTab, sx, dx } from "helper/constant";
import CurrentTrainingChart from "components/profilestatistics/CurrentTrainingChart";
import CompareTrainingsChart from "components/profilestatistics/CompareTrainingsChart";
import AppLoader from "components/common/AppLoader";

const ProfileStatistics = (props) => {
  const [statisticTab, setStatisticTab] = useState(1);
  const [chartTab, setChartTab] = useState(1);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await getStatsForUser();
      setUserInfo(result);
    };
    getData();
  }, []);

  async function getStatsForUser() {
    await new Promise((r) => setTimeout(r, 1));
    return {
      currentTraining: {
        paddleAdvancementMeters: 5.1,
        energyKj: 12,
        bpm: 15,
        distanceKm: 12,
        averagePowerLeftW: 50,
        averagePowerRightW: 70,
      },
      previousTrainings: {
        paddleAdvancementMeters: 1.0,
        energyKj: 8,
        bpm: 5,
        distanceKm: 10,
        averagePowerLeftW: 30,
        averagePowerRightW: 20,
      },
    };
  }

  return (
    <div className="pwa-mobile-container">
      <div className="dark2">
        <div className="profile-header flex-x align-center space-between pa20">
          <div>
            <img
              onClick={() => props.history.push("/view-profile")}
              className="cursor-pointer"
              src={infoHeaderLeft}
              alt=""
            />
          </div>
          <div className="an-18 bold-text light--text">Statistiche</div>
          <div></div>
        </div>
        <div className="flex-x align-center pl20">
          <div className="statistics-profile-photo">
            <img src={userImage} alt="" />
          </div>
          <div className="an-22 bold-text light--text pl15">Mariano</div>
        </div>
        <div className="statistic-tabs flex-x">
          <div
            className={classNames(
              "tab an-12 bold-text grey--text flex-1",
              statisticTab === 1 && "active"
            )}
            onClick={() => setStatisticTab(1)}
          >
            {statisticTab === 1 && (
              <div className="active-tab-arrow">
                <img src={activeTab} alt="" />
              </div>
            )}
            MED
          </div>
          <div
            className={classNames(
              "tab an-12 bold-text grey--text flex-1",
              statisticTab === 2 && "active"
            )}
            onClick={() => setStatisticTab(2)}
          >
            {statisticTab === 2 && (
              <div className="active-tab-arrow">
                <img src={activeTab} alt="" />
              </div>
            )}
            POWER
          </div>
          <div
            className={classNames(
              "tab an-12 bold-text grey--text flex-1 no-border",
              statisticTab === 3 && "active"
            )}
            onClick={() => setStatisticTab(3)}
          >
            {statisticTab === 3 && (
              <div className="active-tab-arrow">
                <img src={activeTab} alt="" />
              </div>
            )}
            SIMULATION
          </div>
        </div>
        <div className="two-tab-block flex-x  an-14 bold-text pt30">
          <div
            className={classNames(
              "flex-1 text-center pb15 inner-tab",
              chartTab === 1 && "active"
            )}
            onClick={() => setChartTab(1)}
          >
            Ultimo Allenamento
          </div>
          <div
            className={classNames(
              "flex-1 text-center pb15 inner-tab",
              chartTab === 2 && "active"
            )}
            onClick={() => setChartTab(2)}
          >
            Totale
          </div>
        </div>
      </div>
      {userInfo ? (
        <Fragment>
          <div className="chart pt10">
            {chartTab === 2 ? (
              <CompareTrainingsChart userInfo={userInfo} />
            ) : (
              <CurrentTrainingChart userInfo={userInfo.currentTraining} />
            )}
          </div>
          <div className="sx-dx-block flex-x py25 px25">
            <div className="sx-block flex-1 pa20 an-14 bold-text light--text">
              <div className="sx-image">
                {chartTab === 2 && (
                  <div className="an-14 regular-text sx-text">
                    <span>+27%</span>
                  </div>
                )}
                <img src={sx} alt="" />
              </div>
            </div>
            <div className="dx-block flex-1 pa20 an-14 bold-text light--text text-right">
              <div className="dx-image">
                {chartTab === 2 && (
                  <div className="an-14 regular-text dx-text">
                    <span>+27%</span>
                  </div>
                )}
                <img src={dx} alt="" />
              </div>
            </div>
          </div>
          <div className="flex-x light--text an-16 bold-text">
            <div className="flex-1 flex-x flex-end">
              <div className="mr30">SX</div>
              <div className="mr20 an-18 regular-text">
                {userInfo.currentTraining.averagePowerLeftW} w
              </div>
            </div>
            <div className="flex-1 flex-x">
              <div className="mr30 ml20 an-18 regular-text">
                {userInfo.currentTraining.averagePowerRightW} w
              </div>
              <div>DX</div>
            </div>
          </div>
        </Fragment>
      ) : (
        <AppLoader />
      )}
    </div>
  );
};
ProfileStatistics.propTypes = {
  history: PropTypes.object,
};
export default ProfileStatistics;
