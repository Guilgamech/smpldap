import React, { Component } from "react";
import { Input, Message } from "element-react";
import axios from "axios";
import * as direction from "../direction/direction";
import "./login.css";
import "./Login_v17/css/main.css";
import "./Login_v17/css/util.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
    };
  }

  login = async (e) => {
    e.preventDefault();
    let { user } = this.state;

    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!user.email.match(mailformat)) {
      user.email = user.email + "@reduc.edu.cu";
    }

    let error = true;
    
    await axios
      .post(direction.API_LOGIN, user)
      .then((r) => {
        error = false;
        localStorage.setItem("user", JSON.stringify(r.data[0]));
      })
      .catch((e) => {
        if (e)
          Message({
            showClose: true,
            message: "Usuario o contraseña incorrecto",
            type: "error",
          });
      });
    if (!error) window.location = "/dashboard";
  };
  onChange(key, value) {
    let user = this.state.user;
    user[key] = value;
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-34">
                  Ingrese sus credenciales{" "}
                </span>
                <div
                  className="wrap-input100 rs1-wrap-input100 validate-input m-b-20"
                  data-validate="Type user name"
                >
                  <Input
                    id="first-name"
                    className="input100"
                    type="text"
                    placeholder="Usuario"
                    value={this.state.user.email}
                    onChange={this.onChange.bind(this, "email")}
                  />{" "}
                  <span className="focus-input100"> </span>{" "}
                </div>{" "}
                <div
                  className="wrap-input100 rs2-wrap-input100 validate-input m-b-20"
                  data-validate="Contraseña"
                >
                  <Input
                    className="input100"
                    type="password"
                    placeholder="Password"
                    value={this.state.user.password}
                    onChange={this.onChange.bind(this, "password")}
                  />{" "}
                  <span className="focus-input100"> </span>{" "}
                </div>
                <div className="container-login100-form-btn">
                  <button
                    className="login100-form-btn"
                    onClick={this.login.bind(this)}
                  >
                    Entrar{" "}
                  </button>{" "}
                </div>{" "}
              </form>
              <div className="login100-more"> </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </React.Fragment>
    );
  }
}

export default Login;
