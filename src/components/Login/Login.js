import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Login.css";
import { useDispatch } from "react-redux";

function Login(props) {
  const dispatch = useDispatch();

  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  const getLogin = (res) => {
    dispatch({ type: "AUTH_LOGIN", payload: res });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = props.data.userList;
    let loginUser =
      userData.length > 0
        ? userData.find(
            (user) =>
              user.email === userInfo.email && user.password === userInfo.password
          )
        : undefined;
    if (loginUser === undefined) {
      alert("Invalid email and password");
    } else {
      getLogin(loginUser);
    }
  };

  const responseFacebook = (response) => {
     const resp = { name: response.name, email:response.email, imageUrl: response.picture.data.url };
     getLogin(resp);
  };

  const responseGoogle = (response) => {
    getLogin(response.profileObj);
  };

  return (
    <section className="login_container">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Col sm="4" className="login-container">
            <div>
              <h1>Login</h1>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="username">Email</Label>
                  <Input
                    type="text"
                    value={userInfo.email}
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    onChange={(event) =>
                      setuserInfo({
                        email: event.target.value,
                        password: userInfo.password,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    value={userInfo.password}
                    name="password"
                    id="examplePassword"
                    placeholder="********"
                    required
                    onChange={(event) =>
                      setuserInfo({
                        email: userInfo.email,
                        password: event.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Button className="login_btn" type="submit">
                    SIGN IN
                  </Button>
                  <p>
                    Don't have account ! <Link to="/register">Register </Link>{" "}
                  </p>
                </FormGroup>
              </Form>
              <FacebookLogin
                // appId="1015016365581153" 
                appId="254085639343463" 
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
              />
              <br />
              <h6>Or</h6>
              <br />
              <GoogleLogin
                className="loginBtn"
                clientId="681084349248-r4e15s99nabjgtpp3bjffd8ba3l5itu8.apps.googleusercontent.com"
                buttonText="login with google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </Col>
        </div>
      </div>
    </section>
  );
}

export default Login;
