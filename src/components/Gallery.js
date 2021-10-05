import _isEmpty from "lodash/isEmpty";
import { Button, Card, Image, Modal, notification, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import ImageApi from "../apis/ImageApi";

const Gallery = ({ images, setSelectedImage, setTriggerRemount, triggerRemount }) => {
  const [active, setActive] = useState(null);
  const [currImageId, setCurrImageId] = useState('')

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

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(
    "Do you want to delete this image?"
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("Wait a minute while processing ...");
    setConfirmLoading(true);

    ImageApi.delete(`/delete/${currImageId}`)
      .then((res) => {
        if (_isEmpty(res.data) === false) {
          console.log("deleted");
          openNotification(
            "success",
            "Success",
            "Image successfully deleted!"
          );
          setTriggerRemount(!triggerRemount)
        } else {
          openNotification(
            "error",
            "Error",
            "Failed to delete image, please try again!"
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setVisible(false);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div className="img-gallery">
      <Row justify="center" gutter={30}>
        {images &&
          images.map(({ imgUrl, _id, title, cloudinary_id }) => {
            const image = imgUrl;
            const id = _id;
            return (
              <div
                key={id}
                className="card-container"
                onMouseOver={() => setActive(id)}
                onMouseLeave={() => setActive(null)}
              >
                <Card
                  hoverable
                  style={{ width: 280 }}
                  cover={<Image alt="example" src={image} />}
                  onClick={() => setSelectedImage(cloudinary_id)}
                >
                  <Meta title={title} />
                  <div
                    className={
                      active === id ? "update-btn active" : "update-btn"
                    }
                  >
                    <Link to="/update">
                      <Button style={{ padding: 0 }} type="link">
                        Update
                      </Button>
                    </Link>
                  </div>
                </Card>

                <Button
                  onClick={() => {
                    setCurrImageId(cloudinary_id)
                    showModal()
                  }}
                  className={active === id ? "delete-btn active" : "delete-btn"}
                  icon={<DeleteOutlined />}
                  type="ghost"
                  size="small"
                ></Button>

                <Modal
                  title="Confirm Delete"
                  visible={visible}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  okText="Yes"
                >
                  <p>{modalText}</p>
                </Modal>
              </div>
            );
          })}
      </Row>
    </div>
  );
};

export default Gallery;
