import { useEffect, useState } from "react";
import Photo from "./components/Photo";
import "./App.css";

function App() {
  const apiKey = `6nTJmTxz5NxdQs5CAFWRDMnxo_7qD34c6yshzr2ghVE`;
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); // page เริ่มต้น
  const [isLoading, setIsLoading] = useState(false); // ดัก ไม่ให้โหลดเยอะเกิน

  const fetchImage = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos((oldData) => {
        return [...oldData, ...data]; // นำภาพใหม่ต่อภาพเดิม
      });
    } catch (error) {
      console.log("Error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // ดักจับการ scroll
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        console.log("LOAD");
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event); // ยกเลิกการ scroll
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <h1>Infinite Scroll Photo | Upslash API</h1>
      <section className="photos">
        <div className="display-photo">
          {photos.map((data, index) => {
            return <Photo key={index} {...data} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
