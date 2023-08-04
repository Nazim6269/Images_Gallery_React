//require("dotenv").config();
import { useEffect, useState } from "react";
import "./App.css";
import Images from "./components/Images";
import Search from "./components/Search";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=8761127-15c354fd40a23de8d36bfe25d&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <Search searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-6xl text-center mx-auto mt-32">
          Images Not Fouond
        </h1>
      )}

      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <Images image={image} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
