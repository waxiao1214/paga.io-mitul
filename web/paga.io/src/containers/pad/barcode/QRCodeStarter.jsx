import React from "react";
import { IpadBarcode } from "helper/constant";
import QRCode from "qrcode.react";

const QRCodeStarter = () => {
  return (
    <div className="pwa-pad-container">
      <div className="Ipad-container">
        <div className="text-center pa50">
          <img src={IpadBarcode} alt="ipad" />
        </div>
        <div className="barcode-container">
          <QRCode value="http://facebook.github.io/react/" size={200} />
        </div>
        <div className="an-32 bold-text light--text text-center pt15">
          Inquadra con lo Smartphone
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

export default QRCodeStarter;
