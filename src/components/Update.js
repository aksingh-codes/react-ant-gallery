import _isEmpty from "lodash/isEmpty";
import { Button, Input, Form, notification } from "antd";
import React, { useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import ImageApi from "../apis/ImageApi";
import { useHistory } from "react-router";

const Update = (props) => {
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleUpdate = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    ImageApi.delete(`/delete/${props.selectedImage}`)
      .then((res) => {
        if (_isEmpty(res.data) === false) {
          // success
          // update new image

          ImageApi.post("/post/singlefile", formData)
            .then((results) => {
              console.log("res", results);
              if (_isEmpty(results.data) === false) {
                openNotification(
                  "success",
                  "Success",
                  "Image successfully updated!"
                );
                
                props.setTriggerRemount(!props.triggerRemount)

                setTimeout(() => {
                  history.push("/");
                }, 1500);
              } else {
                openNotification(
                  "error",
                  "Error",
                  "Failed to update image, please try again!"
                );
              }
            })
            .catch((err) => {
              openNotification(
                "error",
                "Error",
                "Failed to update image, please try again!"
              );
              console.log(err);
            })
            
            props.setTriggerRemount(!props.triggerRemount)

        } else {
          // error
          openNotification(
            "error",
            "Error",
            "Failed to update image, please try again!"
          );
        }
      })
      .catch((err) => {
        console.log("error", err);
        openNotification(
          "error",
          "Error",
          "Failed to update image, please try again!"
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ margin: "0 50px" }}>
      <h1 style={{ textAlign: "center" }}>Update Image</h1>
      <br />
      <br />
      <Form onFinish={handleUpdate}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input title of Image",
            },
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
          <Button disabled={loading} type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Update;
