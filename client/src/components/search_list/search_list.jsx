import React, { Component } from "react";
import {
  Card,
  Button,
  Switch,
  DateRangePicker,
  Loading,
  Dropdown,
} from "element-react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../modal/modal";
import ModalDetail from "../modal/modal_detalle";
import {
  faEnvelope,
  faGlobe,
  faCommentAlt,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import * as direction from "../direction/direction";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import "./search_table.css";
import EditModal from "../modal/modal_editar";
class Search_List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfUser: [],
      visible: false,
      search: this.props.search,
      loading: false,
      unicodePwd: "",
      unicodePwd1: "",
      mailQuota: 60,
      error: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      identification: ""
    };
  }
  componentDidMount() {
    this.getAll();
  }
  onDismiss(key, value) {
    if (value === "delete") this.deleteUser(key);
    if (value === "inactive") this.moveInactiveUser(key);
    if (value === "identification") this.changeIdentification(key);
  }
  onDismiss1(key, value) {
    if (value === "delete") this.changePassword(key);

    this.setState({
      error: false,
    });
  }
  onDismiss2(key, value) {
    if (value === "delete") this.changeQuota(key);

    this.setState({
      error: false,
    });
  }

  changePassword(key) {
    let user = JSON.parse(localStorage.getItem("user"));
    let { listOfUser } = this.state;
    console.log(this.state.unicodePwd);
    let userChanged = {
      dn: listOfUser[key - 1].dn,
      modification: {
        unicodePwd: this.state.unicodePwd,
      },
    };
    console.log(userChanged);
    axios
      .put(direction.API_USER_UPDATE, userChanged, {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      })
      .then(() => this.setState({ unicodePwd: "" }));
  }
  changeIdentification(key) {
    let user = JSON.parse(localStorage.getItem("user"));
    let { listOfUser } = this.state;
    console.log(this.state.identification);
    let userChanged = {
      dn: listOfUser[key - 1].dn,
      modification: {
        identification: this.state.identification,
      },
    };
    console.log(userChanged);
    axios
      .put(direction.API_USER_UPDATE, userChanged, {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      })
      .then(() => this.setState({ identification: "" }));
  }


  changeQuota(key) {
    console.log("Cuota")
    let user = JSON.parse(localStorage.getItem("user"));
    let { listOfUser } = this.state;
    let userChanged = {
      dn: listOfUser[key - 1].dn,
      modification: {
        mailQuota: this.state.mailQuota * 1024 * 1024,
      },
    };
    console.log(userChanged);
    axios
      .put(direction.API_USER_UPDATE, userChanged, {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      })
      .then(() => this.setState({ mailQuota: 60 }));
  }
  getAll() {
    //let search = localStorage.getItem('search');
    let search = this.props.search;
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ listOfUser: [] });
    //console.log(user.authToken);
    console.log("Busqueda nueva ", search);

    axios
      .post(
        direction.API_SEARCH,
        { query: search },
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      )
      .then((r) => {
        this.setState({ listOfUser: r.data, search: true, loading: false });
       
      });
     
    
  }
  deleteUser(key, value) {
    let user = JSON.parse(localStorage.getItem("user"));
    let { listOfUser } = this.state;
    let userAccountControl = 66050;
    if (listOfUser[key - 1].userAccountControl === 66050)
      userAccountControl = 66048;

    let userChanged = {
      dn: listOfUser[key - 1].dn,
      modification: {
        userAccountControl: userAccountControl,
      },
    };
    axios.put(direction.API_USER_UPDATE, userChanged, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    });
  }
  onChange(key, value, other) {
    let user = JSON.parse(localStorage.getItem("user"));
    let listOfUser = this.state.listOfUser;
    listOfUser[key - 1]["" + value] = other ? "enable" : "disable";
    axios.put(
      direction.API_USER_UPDATE,
      {
        dn: listOfUser[key - 1].dn,
        modification: { [value]: listOfUser[key - 1]["" + value] },
      },
      {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    );
    this.setState({ listOfUser });
  }
  handleDate(index, date) {
    let { listOfUser } = this.state;
    listOfUser[index - 1]["date_range"] = date;
    this.setState({ listOfUser });
  }
  handleSend(key) {
    let user = JSON.parse(localStorage.getItem("user"));
    let { listOfUser } = this.state;
    console.log(listOfUser);
    //console.log(listOfUser[key - 1]['date_range']);
    let userChanged = {
      dn: listOfUser[key - 1].dn,
      modification: {
        serviceMail: listOfUser[key - 1].serviceMail,
        serviceInternet: listOfUser[key - 1].serviceInternet,
        serviceJabber: listOfUser[key - 1].serviceJabber,
        dateIni: listOfUser[key - 1].date_range[0],
        dateEnd: listOfUser[key - 1].date_range[1],
      },
    };
    axios.post(direction.API_USER_UPDATE, userChanged, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search !== prevProps.search) {
      console.log("Busqueda de otra persona");
      this.setState({ search: this.props.search, loading: true });
      this.getAll();
    }
  }
  handlePassword(e) {
    let unicodePwd = e.target.value;
    this.setState({ unicodePwd: unicodePwd });
  }
  handleIdentification(e){
    let identification = e.target.value;
    this.setState({ identification: identification });
  }

  handlePassword1(e) {
    console.log(e.target.name);
    console.log(e.target.value);
  }

  handleQuota(e) {
    let mailQuota = e;
    console.log(e);
    //60, 100, 150, 300, 500, 1024, 2048
    if(mailQuota>60 && mailQuota<= 100){
      mailQuota = 100;
    }else if(mailQuota>100 && mailQuota<= 150){
      mailQuota = 150;
    }else if(mailQuota>150 && mailQuota<= 300){
      mailQuota = 300;
    }else if(mailQuota>300 && mailQuota<= 500){
      mailQuota = 500;
    }else if(mailQuota>500 && mailQuota<= 1024){
      mailQuota = 1024;
    }else if(mailQuota>1024 ){
      mailQuota = 2048;
    }
    console.log(mailQuota);
    this.setState({ mailQuota: mailQuota });
  }
  moveInactiveUser(key, value){
    let user = JSON.parse(localStorage.getItem("user"));
    let { listOfUser } = this.state;
    
    let userChanged = {
      oldDN: listOfUser[key - 1].dn,
      newDN: "CN="+listOfUser[key - 1].givenName+", "+ "OU=INACTIVOS,DC=reduc,DC=edu,DC=cu"
    };
    axios.put(direction.API_MOVE_USER, userChanged, {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    });
  }
  render() {
    let index = 0;
    return (
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        {this.state.loading ? (
          <Loading fullscreen="True" text="Está cargando" />
        ) : this.state.search && this.state.listOfUser.length > 0 ? (
          <>
            <table class="content-table">
              <thead>
                <tr>
                  <th>Nombre y apellidos</th>
                  <th>Nombre de usuario</th>
                  <th>correo</th>
                  <th>CI</th>
                  <th>Tipo de usuario</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listOfUser.map((user) => {
                  index++;
                  let border = "0 px";
                  let color = "black";

                  if (
                    user.userAccountControl == 66050 ||
                    user.userAccountControl == 546
                  ) {
                    border = "1px solid";
                    color = "red";
                  }
                  return (
                    <>
                      <tr style={{
                        color: `${color}`,
                        border: `${border}`,
                      }}>
                        <td>{user.displayName}</td>
                        <td>{user.sAMAccountName}</td>
                        <td>{user.mail}</td>
                        <td>{user.identification}</td>
                        <td>{user.role}</td>
                        <td style={{ display: "inline-flex" }}>
                          <>
                          <div style={{ display: "inline-flex" }}>
                            <div style={{ marginTop: "5px"  }}>
                              <label
                                style={{
                                  color: "#666",
                                  fontSize: "1.3em",
                                  marginRight: "5px",
                                }}
                              >
                                <FontAwesomeIcon icon={faEnvelope} />
                              </label>
                              <Switch
                                value={
                                  user.serviceMail === "enable" ? true : false
                                }
                                onText=""
                                offText=""
                                onFocus={() => console.log("focus")}
                                onBlur={() => console.log("blur")}
                                onChange={this.onChange.bind(
                                  this,
                                  index,
                                  "serviceMail"
                                )}
                              ></Switch>
                            </div>
                            <div style={{ marginTop: "5px" }}>
                              <label
                                style={{
                                  color: "#666",
                                  fontSize: "1.3em",
                                  marginRight: "5px",
                                  marginLeft: "5px"
                                }}
                              >
                                <FontAwesomeIcon icon={faCommentAlt} />
                              </label>
                              <Switch
                                value={
                                  user.serviceJabber === "enable" ? true : false
                                }
                                onText=""
                                offText=""
                                onFocus={() => console.log("focus")}
                                onBlur={() => console.log("blur")}
                                onChange={this.onChange.bind(
                                  this,
                                  index,
                                  "serviceJabber"
                                )}
                              ></Switch>

                            </div>
                            <div style={{marginTop: "5px" }}>
                              <label
                                style={{
                                  color: "#666",
                                  fontSize: "1.3em",
                                  marginRight: "5px",
                                  marginLeft: "5px"
                                }}
                              >
                                <FontAwesomeIcon icon={faGlobe} />
                              </label>
                              <Switch
                                value={
                                  user.serviceInternet === "enable"
                                    ? true
                                    : false
                                }
                                onText=""
                                offText=""
                                onFocus={() => console.log("focus")}
                                onBlur={() => console.log("blur")}
                                onChange={this.onChange.bind(
                                  this,
                                  index,
                                  "serviceInternet"
                                )}
                              ></Switch>
                            </div>
                            <div
                             
                            >
                            <div className="block" style={{marginRight: "2px",marginLeft: "2px"}}>
                                
                                <DateRangePicker
                                  value={
                                    this.state.listOfUser[index - 1].date_range
                                  }
                                  placeholder="Tiempo de inhabilitado"
                                  onChange={this.handleDate.bind(this, index)}
                                />
                              </div>
                            </div>
                            <div >
                            <Button
                                type="primary"
                                onClick={this.handleSend.bind(this, index)}
                              >
                              <FontAwesomeIcon icon={faSave} />
                            </Button>
                                
                             
                            </div>
                            </div>
                            <Dropdown style={{marginTop: "5px", marginLeft: "2px"}}
                              hideOnClick={false}
                              menu={
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <Modal
                                      user={user}
                                      typeModal="mail"
                                      nameButton="Cambiar cuota"
                                      bodyDocument="Cuota de correo(MB)"
                                      typeInput="number"
                                      nameInput="mailQuota"
                                      onChangeInput={this.handleQuota.bind(
                                        this
                                      )}
                                      mailQuota={this.state.mailQuota}
                                      onClickButton={this.onDismiss2.bind(
                                        this,
                                        index,
                                        "delete"
                                      )}
                                    />
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <Modal
                                      user={user}
                                      typeModal="pass"
                                      nameButton="Cambiar contraseña"
                                      bodyDocument="Contraseña"
                                      typeInput="password"
                                      nameInput="unicodePwd"
                                      onChangeInput={this.handlePassword.bind(
                                        this
                                      )}
                                      onClickButton={this.onDismiss1.bind(
                                        this,
                                        index,
                                        "delete"
                                      )}
                                    />
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <Modal
                                      user={user}
                                      nameButton={
                                        user.userAccountControl == 66050 ||
                                        user.userAccountControl == 546
                                          ? "Habilitar"
                                          : "Deshabilitar"
                                      }
                                      bodyDocument={` Está seguro que desea ${
                                        user.userAccountControl == 66050 ||
                                        user.userAccountControl == 546
                                          ? "habilitar "
                                          : "deshabilitar "
                                      }
                                este usuario？`}
                                      onClickButton={this.onDismiss.bind(
                                        this,
                                        index,
                                        "delete"
                                      )}
                                    />
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <ModalDetail
                                      user={user}
                                      typeModal="pass"
                                      nameButton="Detalles usuario"
                                      bodyDocument="Usuario"
                                      typeInput="password"
                                      nameInput="unicodePwd"
                                      onClickButton={this.onDismiss1.bind(
                                        this,
                                        index,
                                        "delete"
                                      )}
                                    />
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <Modal
                                      user={user}
                                      nameButton="Editar carné"
                                      bodyDocument="CI: "
                                      typeInput="text"
                                      nameInput="identification"
                                      onChangeInput={this.handleIdentification.bind(
                                        this
                                      )}
                                      onClickButton={this.onDismiss.bind(
                                        this,
                                        index,
                                        "identification"
                                      )}
                                    />
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                  <Modal
                                      user={user}
                                      nameButton= "Mover a inactivo"
                                      bodyDocument={` Está seguro que desea mover a inactivo este usuario？`}
                                      onClickButton={this.onDismiss.bind(
                                        this,
                                        index,
                                        "inactive"
                                      )}
                                    />
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                  <EditModal
                                      user={user}
                                      nameButton= "Mover usuario a otra ubicación"
                                      
                                    />
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              }
                            >
                              <span className="el-dropdown-link">
                                <i className="el-icon-more el-icon--right"></i>
                              </span>
                            </Dropdown>
                          </>
                        </td>
                      </tr>
                      {/*  <Card
                className="box-card "
                key={user.identification}
                style={{
                  width: "60%",
                  margin: "15px auto",
                  color: `${color}`,
                  border: `${border}`,
                }}
                header={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ color: "#666" }}>
                      <FontAwesomeIcon icon={faUser} />
                      <span style={{ marginLeft: "5px" }}>
                        {user.displayName}
                        <br />
                        <small>{user.mail}</small>
                      </span>
                    </h2>

                    <div style={{ paddingRight: "10px" }}>
                      <Dropdown
                        hideOnClick={false}
                        menu={
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Modal
                                user={user}
                                typeModal="mail"
                                nameButton="Cambiar cuota"
                                bodyDocument="Cuota de correo(MB)"
                                typeInput="number"
                                nameInput="mailQuota"
                                onChangeInput={this.handleQuota.bind(this)}
                                onClickButton={this.onDismiss2.bind(
                                  this,
                                  index,
                                  "delete"
                                )}
                              />
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Modal
                                user={user}
                                typeModal="pass"
                                nameButton="Cambiar contraseña"
                                bodyDocument="Contraseña"
                                typeInput="password"
                                nameInput="unicodePwd"
                                onChangeInput={this.handlePassword.bind(this)}
                                onClickButton={this.onDismiss1.bind(
                                  this,
                                  index,
                                  "delete"
                                )}
                              />
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Modal
                                user={user}
                                nameButton={
                                  user.userAccountControl == 66050 ||
                                  user.userAccountControl == 546
                                    ? "Habilitar"
                                    : "Deshabilitar"
                                }
                                bodyDocument={` Está seguro que desea ${
                                  user.userAccountControl == 66050 ||
                                  user.userAccountControl == 546
                                    ? "habilitar "
                                    : "deshabilitar "
                                }
                                este usuario？`}
                                onClickButton={this.onDismiss.bind(
                                  this,
                                  index,
                                  "delete"
                                )}
                              />
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <ModalDetail
                                user={user}
                                typeModal="pass"
                                nameButton="Detalles usuario"
                                bodyDocument="Usuario"
                                typeInput="password"
                                nameInput="unicodePwd"
                                
                                onClickButton={this.onDismiss1.bind(
                                  this,
                                  index,
                                  "delete"
                                )}
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        }
                      >
                        <span className="el-dropdown-link">
                          <i className="el-icon-more el-icon--right"></i>
                        </span>
                      </Dropdown>
                    </div>
                  </div>
                }
              >
                <div
                  style={{
                    margin: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ color: "#666", fontSize: "1.3em" }}>
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                    <span style={{ marginLeft: "5px" }}>Lugar:</span>
                  </label>
                  <p>{user.dn}</p>
                </div>
                <div
                  style={{
                    margin: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                ></div>
                <div
                  style={{
                    margin: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ color: "#666", fontSize: "1.3em" }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span style={{ marginLeft: "5px" }}>
                      Servicio de correo
                    </span>
                  </label>
                  <Switch
                    value={user.serviceMail === "enable" ? true : false}
                    onText=""
                    offText=""
                    onFocus={() => console.log("focus")}
                    onBlur={() => console.log("blur")}
                    onChange={this.onChange.bind(this, index, "serviceMail")}
                  ></Switch>
                </div>
                <div
                  style={{
                    margin: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ color: "#666", fontSize: "1.3em" }}>
                    <FontAwesomeIcon icon={faCommentAlt} />
                    <span style={{ marginLeft: "5px" }}>
                      Servicio de jabber
                    </span>
                  </label>
                  <Switch
                    value={user.serviceJabber === "enable" ? true : false}
                    onText=""
                    offText=""
                    onFocus={() => console.log("focus")}
                    onBlur={() => console.log("blur")}
                    onChange={this.onChange.bind(this, index, "serviceJabber")}
                  ></Switch>
                </div>
                <div
                  style={{
                    margin: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ color: "#666", fontSize: "1.3em" }}>
                    <FontAwesomeIcon icon={faGlobe} />
                    <span style={{ marginLeft: "5px" }}>
                      Servicio de internet
                    </span>
                  </label>
                  <Switch
                    value={user.serviceInternet === "enable" ? true : false}
                    onText=""
                    offText=""
                    onFocus={() => console.log("focus")}
                    onBlur={() => console.log("blur")}
                    onChange={this.onChange.bind(
                      this,
                      index,
                      "serviceInternet"
                    )}
                  ></Switch>
                </div>

                <div style={{ clear: "both" }}></div>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <div className="block">
                    <span className="demonstration">
                      <p>Tiempo de inhabilitación del servicio</p>
                    </span>
                    <DateRangePicker
                      value={this.state.listOfUser[index - 1].date_range}
                      placeholder="Seleccione un rango"
                      onChange={this.handleDate.bind(this, index)}
                    />
                  </div>
                </div>

                <hr />
                <div style={{ clear: "both" }}></div>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    type="primary"
                    onClick={this.handleSend.bind(this, index)}
                  >
                    Enviar
                  </Button>
                </div>
              </Card>
           */}
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : this.state.search && this.state.listOfUser.length === 0 ? (
          <Card
            className="box-card"
            style={{ width: "60%", margin: "15px auto" }}
          >
            <div
              style={{ color: "black", fontSize: "20px", textAlign: "center" }}
            >
              <span role="img">😞</span> Su búsqueda no arrojó ningún resultado
            </div>
          </Card>
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search_List);
