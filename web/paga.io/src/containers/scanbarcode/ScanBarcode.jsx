import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { profileLogo } from "helper/constant";

const ScanBarcode = () => {
  const [setResult] = useState("No result");
  const handleScan = (data) => {
    if (data) {
      console.log("data", data);
      setResult(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="pwa-mobile-container">
      <div className="text-center pa20">
        <img src={profileLogo} alt="" />
      </div>
      <div className="an-16 bold-text light--text text-center pb10">
        Scannerizza il codice QR
      </div>
      <div className="flex-y light scanner-block">
        <div className="an-14 regular-text py10 text-center px30 dark--text">
          Inquadra il codice QR sul Pad per connettere questo dispositivo
        </div>
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
        <div className="an-16 regular-text text-center py20 px30 dark--text">
          Impossibile scannerizzare il codice? Esci e riavvia l’applicazione
        </div>
      </div>
    </div>
  );
};

export default ScanBarcode;
