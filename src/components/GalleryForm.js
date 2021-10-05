import React from "react";

const GalleryForm = ({ text, handleSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  return (
    <div style={{ margin: "0 50px" }}>
      <h1 style={{ textAlign: "center" }}>{text} Image</h1>
      <br />
      <br />
      <Form onFinish={handleSubmit}>
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
            {text}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GalleryForm;
