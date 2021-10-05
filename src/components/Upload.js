import _isEmpty from "lodash/isEmpty";
import { Button, Input, Form, notification} from "antd";
import React, { useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import ImageApi from "../apis/ImageApi";
import { useHistory } from "react-router";

const Upload = () => {
  const history = useHistory()
  const [selectedImage, setSelectedImage] = useState(null)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const ref = useRef(null);

  const openNotification = (type, message, desc) => {
    if (type === "success") {
      notification.success({
        message: message,
        description: desc,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    } else {
      notification.error({
        message: message,
        description: desc,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  };

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

  const handleUpload = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    
    ImageApi.post("/post/singlefile", formData)
      .then((results) => {
        console.log("res", results);
        if (_isEmpty(results.data) === false) {
          openNotification(
            "success",
            "Success",
            "Image successfully uploaded!"
          );
          setTimeout(() => {
            history.push('/')
          }, 1500);
        } else {
          openNotification(
            "error",
            "Error",
            "Failed to upload image, please try again!"
          );
        }
      })
      .catch((err) => {
        openNotification(
          "error",
          "Error",
          "Failed to upload image, please try again!"
        );
        console.log(err)
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ margin: "0 50px" }}>
      <h1 style={{ textAlign: "center" }}>Upload Image</h1>
      <br />
      <br />
      <Form onFinish={handleUpload}>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please input title of Image'
            }
          ]}
        >
          <Input
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title of Image"
          />
        </Form.Item>
        <Form.Item>
          <input
            required
            ref={ref}
            onChange={imageChange}
            type="file"
            accept=".jpg, .jpeg, .png"
          />
        </Form.Item>

        <Form.Item>
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
        </Form.Item>
        <Form.Item>
          <Button disabled={loading} type="primary"  htmlType='submit'>
            Upload
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Upload;
