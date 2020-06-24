import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const AppLoader = () => {
  return <Spin indicator={antIcon} className="app-loader" />;
};

export default AppLoader;
