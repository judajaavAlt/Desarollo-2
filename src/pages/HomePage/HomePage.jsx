import { React } from "react";
import HomeGraphic from "../../components/Home/HomeGraphic";
import "./homePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="home-graphic-section">
        <HomeGraphic />
      </section>
    </div>
  );
};

export default HomePage;
