import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "./css/App.css";
import Header from "./Header";
import Gallery from "./Gallery";
import Update from "./Update";
import Upload from "./Upload";
import { BrowserRouter, Route } from "react-router-dom";
import ImageApi from "../apis/ImageApi";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [images, setImages] = useState([])
  const [triggerRemount, setTriggerRemount] = useState(true)

  useEffect(() => {
    ImageApi.get('/images')
    .then(
      results => {setImages(results.data)
        console.log(results.data);}
    )
    .catch(
      err => console.log(err)
    )
  }, [triggerRemount])

  return (
    <div>
    {/* <button onClick={() =>'20.2123','https://vcdn.adnxs.com/p/creative-image/0b/c0/8a/90/0bc08a90-a10f-4ea7-bc16-208d958c867e.png','Bird')}>s</button> */}
      <BrowserRouter>
        <Layout>
          <Header />
          <Layout.Content style={{ marginTop: "100px", minHeight: "78vh" }}>
            <Route exact path="/" >
              <Gallery images={images} setSelectedImage={setSelectedImage} triggerRemount={triggerRemount} setTriggerRemount={setTriggerRemount} />
            </Route>
            <Route exact path="/upload">
              <Upload triggerRemount={triggerRemount} setTriggerRemount={setTriggerRemount} />
            </Route>
            <Route exact path="/update" >
              <Update selectedImage={selectedImage} triggerRemount={triggerRemount} setTriggerRemount={setTriggerRemount} />
            </Route>
          </Layout.Content>
          <Layout.Footer>
            <div style={{ textAlign: "center" }}>@ React Ant Gallery</div>
          </Layout.Footer>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
