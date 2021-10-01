import { Button } from "antd";
import React from "react";
import { UploadOutlined as UploadOutlinedIcon } from "@ant-design/icons";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const Header = () => {
  return (
    <div className="site-header">
      <Link to="/">
        <h1>React Ant Gallery</h1>
      </Link>
      <Route exact path="/" component={Upload} />
    </div>
  );
};

export default Header;

const Upload = () => {
  const screens = useBreakpoint();

  return (
    <Link to="/upload">
      {screens.xs ? (
        <Button icon={<UploadOutlinedIcon />} type="primary">
        </Button>
      ) : (
        <Button icon={<UploadOutlinedIcon />} type="primary">
          Upload Image
        </Button>
      )}
    </Link>
  );
};
