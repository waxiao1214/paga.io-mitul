import React from "react";
import { Modal } from "antd";
import { Button } from "antd";
import PropTypes from "prop-types";

// Modal for profile delete
const ProfileDeletionModal = ({ visible, toggle, onConfirm }) => {
  return (
    <Modal
      title="Elimina Profilo"
      className="eliminate-profile-modal"
      visible={visible}
      onCancel={toggle}
      width={308}
    >
      <div className="an-14 regular-text dark--text text-center px45">
        Sei sicuro di voler eliminare questo profilo?
      </div>
      <div className="flex-x align-center flex-end pt20">
        <div
          onClick={toggle}
          className="primary--text an-16 medium-text cursor-pointer"
        >
          INDIETRO
        </div>
        <div className="pl20">
          <Button
            onClick={onConfirm}
            type="primary"
            className="an-16 medium-text primary confirm-btn"
          >
            CONFERMA
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ProfileDeletionModal.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ProfileDeletionModal;
