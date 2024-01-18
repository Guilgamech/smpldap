import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Input, Button, Popover } from "element-react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as direction from "../../direction/direction";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/action";
class NavBar extends Component {
  state = {
    search: "",
    user: {},
  };
  onSelect(key, value) {
    if (key === "3") {
      window.location = "/login";
    }
  }
  onChange(key, value) {
    let search = this.state.search;
    search = value;
    this.setState({ search });
  }
  componentDidMount() {
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user") !== null) {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log(user);

      this.setState({
        user,
      });
    }
  }
  handleLogin() {
    window.location = "/login";
  }
  handleLogout() {
    axios.get(direction.API_LOGOUT);
    localStorage.removeItem("user");
    window.location = "/login";
  }
  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }
  handleSearch() {
    //localStorage.setItem('search', this.state.search);
    this.props.onSearch(this.state.search);
    //this.setState({search:''})
    this.props.history.replace("/search-list");
  }
  deleteSearch() {
    this.setState({ search: "" });
  }

  render() {
    return (
      <div>
        <Menu
          theme="dark"
          defaultActive="1"
          className="el-menu-demo"
          mode="horizontal"
          onSelect={this.onSelect.bind(this)}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {this.state.user.hasOwnProperty("authToken") ? (
            <React.Fragment>
              <Menu.Item index="1">
              <Link to="/dashboard">Dashboard</Link></Menu.Item>

              <Menu.Item style={{ flexGrow: 2 }}>
                <Input
                  placeholder="Nombre, correo o carné de identidad"
                  value={this.state.search}
                  onChange={this.onChange.bind(this, "search")}
                  onKeyDown={this.handleEnter.bind(this)}
                  prepend={
                    <Link to="/user-form">
                      <Button
                        icon="plus"
                        onClick={this.deleteSearch.bind(this)}
                      >
                        Agregar usuario
                      </Button>
                    </Link>
                  }
                  append={
                    <Button
                      type="primary"
                      icon="search"
                      onClick={this.handleSearch.bind(this)}
                    >
                      Buscar
                    </Button>
                  }
                />
              </Menu.Item>
            </React.Fragment>
          ) : null}
          {this.state.user.hasOwnProperty("mail") ? (
            <Popover
              placement="left"
              title="Info"
              width="350"
              trigger="hover"
              content={
                <div>
                  <p>
                    <b>Correo:</b> {this.state.user.mail}
                  </p>
                  <p>
                    <b>Departamento:</b> {this.state.user.description}
                  </p>
                  <div style={{ textAlign: "right", margin: 0 }}>
                    <Button
                      type="primary"
                      size="mini"
                      onClick={this.handleLogout.bind(this)}
                    >
                      Salir
                    </Button>
                  </div>
                </div>
              }
            >
              <Menu.Item index="2">
                Bienvenido {this.state.user.givenName}
              </Menu.Item>
            </Popover>
          ) : null}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (search) =>
      dispatch({ type: actionTypes.SEARCH_USER, search: search }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
