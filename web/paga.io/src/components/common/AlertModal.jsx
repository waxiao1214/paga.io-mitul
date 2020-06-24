import React from "react";
import { Modal } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import { alert, confirm } from "helper/constant";

const AlertModal = ({
  className,
  visible,
  title,
  type = "alert",
  text = "",
  clickOnOk,
  clickOnCancel,
  isOk = true,
}) => {
  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      closable={false}
      className={classNames("alert-modal", className)}
    >
      {type === "alert" ? (
        <div>
          <div className="modal-custom-header an-32 bold-text flex-x center">
            <img src={alert} alt="" /> {title}
          </div>
          <div className="body-text text-center an-28 regular-text">{text}</div>
          {isOk && (
            <div className="text-center pb30">
              <button
                className="alert-ok-btn an-24 medium-text"
                onClick={clickOnOk}
              >
                Ok
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="confirm-modal-custom-header an-32 bold-text flex-x center">
            <div className="confirm-icon">
              <img src={confirm} alt="" />
            </div>
            <div>{title}</div>
          </div>
          <div className="body-text text-center an-28 regular-text">{text}</div>
          <div className="text-center pb30 flex-x flex-end align-center pr25">
            <div
              className="confirm-cancel-btn an-24 medium-text mr20"
              onClick={clickOnCancel}
            >
              INDIETRO
            </div>
            <button
              className="confirm-ok-btn an-24 medium-text"
              onClick={clickOnOk}
            >
              AGGIORNA
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

AlertModal.propTypes = {
  visible: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  clickOnOk: PropTypes.func,
  clickOnCancel: PropTypes.func,
  isOk: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default AlertModal;
