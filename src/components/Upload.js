import { Button, Input, Row } from "antd";
import React from "react";

const Upload = () => {
  return (
    <div style={{ margin: "0 50px" }}>
      <h1 style={{textAlign:'center'}}>Upload Image</h1>
      <br /><br />
      <Row style={{rowGap: '14px'}} align="middle">
        <Input placeholder="Title of Image" />
        <input type="file" accept=".jpg, .jpeg, .png" />
        <img className='preview-img' src="" alt="" />
      </Row>
      <br />
      <Button>Upload</Button>
    </div>
  );
};

export default Upload;
