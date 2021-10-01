import { Button, Input, Row } from "antd";
import React, { useRef, useState } from "react";
import { Redirect } from "react-router";
import { DeleteOutlined } from "@ant-design/icons";

const Update = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const ref = useRef(null);

  const imageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const removeSelectedImage = () => {
    setSelectedImage();
    if (ref.current) {
      console.log(ref);
      ref.current.value = null;
    }
  };

  return props.selectedImage ? (
    <div style={{ margin: "0 50px" }}>
      <h1 style={{ textAlign: "center" }}>
        Update Image {props.selectedImage}
      </h1>
      <br />
      <br />
      <Row wrap style={{ rowGap: "14px", flexDirection: "column" }}>
        <Input placeholder="Title of Image" />
        <input
          ref={ref}
          onChange={imageChange}
          type="file"
          accept=".jpg, .jpeg, .png"
        />
        {selectedImage ? (
          <div className="img-preview-container">
            <img
              className="preview-img"
              src={URL.createObjectURL(selectedImage)}
              alt=""
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={removeSelectedImage}
            ></Button>
          </div>
        ) : (
          <div className="no-img-container">
            {/* <h4>Select an image</h4> */}
          </div>
        )}
      </Row>
      {selectedImage && <br />}
      <Button type="primary">Update</Button>
    </div>
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default Update;
