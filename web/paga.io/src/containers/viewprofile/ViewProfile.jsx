import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ProfileDeletionModal from "../../components/viewprofile/ProfileDeletionModal";
import {
  infoIcon,
  profileLogo,
  leftArrow,
  rightArrow,
  settings,
  closeIcon,
  barIcon,
} from "helper/constant";
import profilesAPI from "helper/profiles-api";
import { RightOutlined } from "@ant-design/icons";
import AppLoader from "components/common/AppLoader";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ViewProfile = (props) => {
  const { history } = props;
  const [isDelete, setDelete] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [active, setActive] = useState(0);
  const [isLoadingImage, SetIsLoadingImage] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const getProfilesHandler = async () => {
    setPageLoading(true);
    const result = await profilesAPI.getProfiles();
    setProfiles(result);
    if (result && result.length) {
      setActive(result.length - 1);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    getProfilesHandler();
  }, []);

  const goNext = () => {
    if (active === profiles.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const goBack = () => {
    if (active === 0) {
      setActive(profiles.length - 1);
    } else {
      setActive(active - 1);
    }
  };

  const handleImageLoaded = () => {
    console.log("loaded");
    SetIsLoadingImage(false);
  };

  const deleteProfileHandler = async () => {
    setDelete(false);
    console.log(profiles[active]);
    if (profiles[active]) {
      await profilesAPI.deleteProfile(profiles[active].id);
      getProfilesHandler();
    }
  };

  return (
    <div className="pwa-mobile-container">
      {pageLoading ? (
        <AppLoader />
      ) : (
        <>
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
            >
              Allenati <RightOutlined />
            </div>
          </div>
          {profiles && profiles.length && (
            <Fragment>
              <div className="an-18 bold-text text-center light--text pt5">
                Seleziona un profilo
              </div>
              <div className="profile-image-section flex-x center pt20">
                {profiles.length > 1 && (
                  <div>
                    <img
                      onClick={goBack}
                      className="cursor-pointer"
                      src={leftArrow}
                      alt=""
                    />
                  </div>
                )}
                <div className="px30">
                  <div className="profile-photo">
                    <div className="loading-image-class">
                      {isLoadingImage && <Spin indicator={antIcon} />}
                    </div>
                    <img
                      src={profiles[active].picture}
                      alt=""
                      onLoad={handleImageLoaded}
                    />
                  </div>
                </div>
                {profiles.length > 1 && (
                  <div>
                    <img
                      onClick={goNext}
                      className="cursor-pointer"
                      src={rightArrow}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="an-22 bold-text light--text text-center pt10">
                {profiles[active].name}
              </div>
              <div className="profile-option-lists">
                <div className="flex-x light--text center profile-option-list-border cursor-pointer no-bottom">
                  <div className="list-icon-class">
                    <img src={settings} alt="settings" />
                  </div>
                  <div className="an-16 regular-text pl15 list-text">
                    Dati profilo
                  </div>
                </div>
                <div
                  onClick={() => history.push("/profile-statistics")}
                  className="flex-x light--text center profile-option-list-border cursor-pointer no-bottom"
                >
                  <div className="list-icon-class">
                    <img src={barIcon} alt="settings" />
                  </div>
                  <div className="an-16 regular-text pl15 list-text">
                    Statistiche
                  </div>
                </div>
                <div
                  onClick={() => setDelete(true)}
                  className="flex-x light--text center profile-option-list-border cursor-pointer"
                >
                  <div className="list-icon-class">
                    <img src={closeIcon} alt="settings" />
                  </div>
                  <div className="an-16 regular-text pl15 list-text">
                    Elimina
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          <div className="profile-option-lists">
            <div>
              <Button
                className="create-profile-btn an-14 bold-text"
                onClick={() => history.push("/create-profile")}
              >
                Vuoi un nuovo profilo?{" "}
                <span className="primary--text ml5">Crealo!</span>
              </Button>
            </div>
            <div className="an-12 bold-text text-center light--text mt10">
              I tuoi dati sono al sicuro
            </div>
          </div>
          <ProfileDeletionModal
            visible={isDelete}
            toggle={() => setDelete(false)}
            onConfirm={deleteProfileHandler}
          />
        </>
      )}
    </div>
  );
};

ViewProfile.propTypes = {
  history: PropTypes.object,
};

export default ViewProfile;
