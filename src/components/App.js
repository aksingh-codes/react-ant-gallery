import React, { useState } from "react";
import { Layout } from "antd";
import "./css/App.css";
import Header from "./Header";
import Gallery from "./Gallery";
import Update from "./Update";
import Upload from "./Upload";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const images = [
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592388748465-8c4dca8dd703?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsbGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Some Image",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1556609894-0ae309cb8354?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsbGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Some Image",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1593136878769-388e324638b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbGxpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Some Image",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1560695089-4f492591e86c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbGxpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Some Image",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1609203273185-891fa1029588?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYXZlbGxpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Some Image",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1616394585067-d3e824140aa1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRyYXZlbGxpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      title: "Some Image",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1516685304081-de7947d419d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80",
      title: "Some Image",
    },
  ];

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Header />
          <Layout.Content style={{ marginTop: "100px", minHeight: "78vh" }}>
            <Route exact path="/" >
              <Gallery images={images} setSelectedImage={setSelectedImage} />
            </Route>
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/update" >
              <Update selectedImage={selectedImage} />
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
