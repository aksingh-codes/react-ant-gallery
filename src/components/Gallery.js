import { Button, Card, Image, Popover, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Gallery = ({ images, setSelectedImage }) => {
  const [active, setActive] = useState(null);
  const content = () => {
    return (
      <div>
        <Link to="/update">
          <Button style={{ marginRight: "8px" }} type="primary">
            Update
          </Button>
        </Link>
        <Button>Delete</Button>
      </div>
    );
  };

  return (
    <div className="img-gallery">
      <Row justify="center" gutter={30}>
        {images.map(({ image, id, title }) => {
          return (
            <div
              className="card-container"
              onMouseOver={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
            >
              <Card
                hoverable
                style={{ width: 280 }}
                cover={<Image alt="example" src={image} />}
                onClick={() => setSelectedImage(id)}
              >
                <Meta title={title} />
                <div
                  className={active === id ? "update-btn active" : "update-btn"}
                >
                  <Link to="/update">
                    <Button style={{ padding: 0 }} type="link">
                      Update
                    </Button>
                  </Link>
                </div>
              </Card>
              <Button
                className={active === id ? "delete-btn active" : "delete-btn"}
                icon={<DeleteOutlined />}
                type='ghost'
                size='small'
              ></Button>
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default Gallery;
