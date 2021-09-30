import { Button, Input, Row } from "antd";
import React from "react";
import { Redirect } from "react-router";

const Update = ({selectedImage}) => {
  return (
    selectedImage ?
    <div style={{ margin: "0 50px" }}>
      <h1 style={{textAlign:'center'}}>Update Image {selectedImage}</h1>
      <br /><br />
      <Row style={{rowGap: '14px'}} align="middle">
        <Input placeholder="Title of Image" />
        <input type="file" accept=".jpg, .jpeg, .png" />
        <img className='preview-img' src="" alt="" />
      </Row>
      <br />
      <Button>Update</Button>
    </div>
    : <Redirect to='/'></Redirect>
  );
};

export default Update;
