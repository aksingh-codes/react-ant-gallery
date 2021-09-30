import { Button, Card, Popover, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { Link } from "react-router-dom";

const Gallery = ({images, setSelectedImage}) => {
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
  )};

  return (
    <div className="img-gallery">
      <Row justify="center" gutter={30}>
        {images.map(({image, id, title}) => {
          return (
            <Popover key={id} content={content} trigger="click">
              <Card
                hoverable
                style={{ width: 280 }}
                cover={<img alt="example" src={image} />}
                onClick={() => setSelectedImage(id)}
              >
                <Meta title={title} />
              </Card>
            </Popover>
          );
        })}
      </Row>
    </div>
  );
};

export default Gallery;

