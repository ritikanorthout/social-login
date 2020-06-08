import React from "react";
import "./Home.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Home(props) {
  console.log("props", props);

  return (
    <div className="detail-container">
      <Header />
      <div className="text">Welcome {props.data.userInfo.name}</div>
      <Card className="containers">
        {(props.data.userInfo.imgUrl) &&
        <CardBody>
          <img
            width="200px"
            height="200px"
            src={props.data.userInfo.imgUrl}
            alt="Profle Pic"
          />
        </CardBody>
        }

        <CardBody>
          <CardTitle className="text">
            Name : {props.data.userInfo.name}
          </CardTitle>
          {props.data.userInfo.email ? (
            <p className="text">Email : {props.data.userInfo.email}</p>
          ) : null}
        </CardBody>
      </Card>
      <Footer />
    </div>
  );
}

export default Home;
