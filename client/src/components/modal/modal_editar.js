import React, { Component } from "react";
import {
  Dialog,
  Form,
  Input,
  Layout,
  Radio,
  Button,
  DatePicker,
  Card,
  Cascader,
  Message,
  Select,
  Tag,
} from "element-react";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/es";

import axios from "axios";
import * as direction from "../direction/direction";

import "../user_form/user_form.css";

i18n.use(locale);

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: this.props.dialogVisible,
      user: this.props.user,
      form: {
        ou:"",
      },
      val: [],
      ou: "OU=UC",
      options: [],
      props: {
        value: "label",
        children: "ou_values",
      },
      errors: {},
    
      
    };
  }
  CloseModal = () => {
    this.props.onClickButton();
    this.setState({ dialogVisible: false });
    console.log(this.props.mailQuota)
  };
 

  async componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    let options = this.state.options;
    let { data: option } = await axios.post(
      direction.API_OU,
      { ou: this.state.ou },
      {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    );
    let optionAux = [];
    for (let value of option) {
      if (value.hasOwnProperty("ou")) {
        let { data: optA } = await axios.post(
          direction.API_OU,
          { ou: "OU=" + value.ou + "," + this.state.ou },
          {
            headers: {
              Authorization: `Bearer ${user.authToken}`,
            },
          }
        );
        let cont = 0;
        for (let value1 of optA) {
          if (value1.hasOwnProperty("ou")) {
            cont++;
          }
        }
        if (cont !== 0) {
          optionAux.push({
            label: value.ou,

            ou_values: [],
          });
        } else {
          optionAux.push({
            label: value.ou,
          });
        }
      }
    }
    options = optionAux;
    this.setState({ options });
  }

  async handleItemChange(val) {
    console.log("entro aqui");
    console.log(val);
    this.setState({ val: val });
    let form = this.state.form;

    let ou = "OU=UC";
    for (let i = 0; i < val.length; i++) {
      ou = "OU=" + val[i] + "," + ou;
    }
    form["ou"] = ou;
    this.setState({ form: form, val: val });
    let user = JSON.parse(localStorage.getItem("user"));
    let { data: option } = await axios.post(
      direction.API_OU,
      { ou: ou },
      {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    );
    let optionAux = [];
    for (let value of option) {
      if (value.hasOwnProperty("ou")) {
        let { data: optA } = await axios.post(
          direction.API_OU,
          { ou: "OU=" + value.ou + "," + ou },
          {
            headers: {
              Authorization: `Bearer ${user.authToken}`,
            },
          }
        );
        let cont = 0;
        for (let value1 of optA) {
          if (value1.hasOwnProperty("ou")) {
            cont++;
          }
        }
        if (cont !== 0) {
          optionAux.push({
            label: value.ou,

            ou_values: [],
          });
        } else {
          optionAux.push({
            label: value.ou,
          });
        }
      }
    }
    //////////////////////////////////////
    let options = this.state.options;
    let len = val.length;
    let aux;
    let aux1;
    let aux2;
    let aux3;
    let aux4;
    let aux5;
    let aux6;
    let aux7;
    if (len === 1) {
      aux = options.findIndex((o) => o.label === val[0]);
      options[aux].ou_values = optionAux;
    }
    if (len === 2) {
      aux = options.findIndex((o) => o.label === val[0]);
      aux1 = options[aux].ou_values.findIndex((o) => o.label === val[1]);
      options[aux].ou_values[aux1].ou_values = optionAux;
    } else if (len === 3) {
      aux = options.findIndex((o) => o.label === val[0]);
      aux1 = options[aux].ou_values.findIndex((o) => o.label === val[1]);
      aux2 = options[aux].ou_values[aux1].ou_values.findIndex(
        (o) => o.label === val[2]
      );
      options[aux].ou_values[aux1].ou_values[aux2].ou_values = optionAux;
    } else if (len === 4) {
      aux = options.findIndex((o) => o.label === val[0]);
      aux1 = options[aux].ou_values.findIndex((o) => o.label === val[1]);
      aux2 = options[aux].ou_values[aux1].ou_values.findIndex(
        (o) => o.label === val[2]
      );
      aux3 = options[aux].ou_values[aux1].ou_values[aux2].ou_values.findIndex(
        (o) => o.label === val[3]
      );
      options[aux].ou_values[aux1].ou_values[aux2].ou_values[aux3].ou_values =
        optionAux;
    } else if (len === 5) {
      aux = options.findIndex((o) => o.label === val[0]);
      aux1 = options[aux].ou_values.findIndex((o) => o.label === val[1]);
      aux2 = options[aux].ou_values[aux1].ou_values.findIndex(
        (o) => o.label === val[2]
      );
      aux3 = options[aux].ou_values[aux1].ou_values[aux2].ou_values.findIndex(
        (o) => o.label === val[3]
      );
      aux4 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values.findIndex((o) => o.label === val[4]);
      options[aux].ou_values[aux1].ou_values[aux2].ou_values[aux3].ou_values[
        aux4
      ].ou_values = optionAux;
    } else if (len === 6) {
      aux = options.findIndex((o) => o.label === val[0]);
      aux1 = options[aux].ou_values.findIndex((o) => o.label === val[1]);
      aux2 = options[aux].ou_values[aux1].ou_values.findIndex(
        (o) => o.label === val[2]
      );
      aux3 = options[aux].ou_values[aux1].ou_values[aux2].ou_values.findIndex(
        (o) => o.label === val[3]
      );
      aux4 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values.findIndex((o) => o.label === val[4]);
      aux5 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values[aux4].ou_values.findIndex((o) => o.label === val[4]);
      options[aux].ou_values[aux1].ou_values[aux2].ou_values[aux3].ou_values[
        aux4
      ].ou_values[aux5].ou_values = optionAux;
    } else if (len === 7) {
      aux = options.findIndex((o) => o.label === val[0]);
      aux1 = options[aux].ou_values.findIndex((o) => o.label === val[1]);
      aux2 = options[aux].ou_values[aux1].ou_values.findIndex(
        (o) => o.label === val[2]
      );
      aux3 = options[aux].ou_values[aux1].ou_values[aux2].ou_values.findIndex(
        (o) => o.label === val[3]
      );
      aux4 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values.findIndex((o) => o.label === val[4]);
      aux5 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values[aux4].ou_values.findIndex((o) => o.label === val[4]);
      aux6 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values[aux4].ou_values[aux5].ou_values.findIndex(
        (o) => o.label === val[5]
      );
      options[aux].ou_values[aux1].ou_values[aux2].ou_values[aux3].ou_values[
        aux4
      ].ou_values[aux5].ou_values[aux6].ou_values = optionAux;
    } else if (len === 8) {
      aux = options.findIndex((o) => o.label === val[0]);
      aux1 = options[aux].ou_values.findIndex((o) => o.label === val[1]);
      aux2 = options[aux].ou_values[aux1].ou_values.findIndex(
        (o) => o.label === val[2]
      );
      aux3 = options[aux].ou_values[aux1].ou_values[aux2].ou_values.findIndex(
        (o) => o.label === val[3]
      );
      aux4 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values.findIndex((o) => o.label === val[4]);
      aux5 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values[aux4].ou_values.findIndex((o) => o.label === val[4]);
      aux6 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values[aux4].ou_values[aux5].ou_values.findIndex(
        (o) => o.label === val[5]
      );
      aux7 = options[aux].ou_values[aux1].ou_values[aux2].ou_values[
        aux3
      ].ou_values[aux4].ou_values[aux5].ou_values[aux6].ou_values.findIndex(
        (o) => o.label === val[5]
      );
      options[aux].ou_values[aux1].ou_values[aux2].ou_values[aux3].ou_values[
        aux4
      ].ou_values[aux5].ou_values[aux6].ou_values[aux7].ou_values = optionAux;
    }

    this.setState({ options });
  }

  onSubmit(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"));
    let { form } = this.state;
    let errors = this.validate();
    if (!errors) {
      let newDN =
        "CN=" +
        this.state.user.givenName +
        "," +
        this.state.form["ou"] +
        ",OU=CATALOGO,DC=reduc,DC=edu,DC=cu";
      
      let userMoved ={
        oldDN: this.state.user.dn,
        newDN: newDN
      }
      axios
        .put(direction.API_MOVE_USER, userMoved, {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Message({
              showClose: true,
              message: "Usuario movido correctamente",
              type: "info",
            });
          }
        })
        .catch((e) => {
          if (e.status === 400) {
            Message({
              showClose: true,
              message: e.message,
              type: "info",
            });
          }
        });
    }
  }

  onChange(key, value) {
    let { form } = this.state;
    form[key] = value;
    this.setState({ form });
  }
  change(val) {
    let form = this.state.form;
    form["type"] = val[0];

    let ou = "OU=UC";
    for (let i = 0; i < val.length; i++) {
      ou = "OU=" + val[i] + "," + ou;
    }
    form["ou"] = ou;
    this.setState({ form });
  }

 
  //to do
  
  handleType = (selectedOption) => {
    this.setState({ type: selectedOption });
  };
  validate = () => {
    let errors = {};
    let check = false;
   
    if (this.state.form.ou === "") {
      errors.ou = " Debe elegir el tipo de cuenta";
      check = true;
    }
    this.setState({ errors });
    return check;
  };

  closeForm(){
    this.props.history.replace("/dashboard");
  }
  render() {
    const { value1 } = this.state;
  
    return (
      <div>
        <Button
          type="text"
          onClick={() => this.setState({ dialogVisible: true })}
        >
          {this.props.nameButton}
        </Button>
        <Dialog
          size="large"
          title="Cambiar ubicación"
          visible={this.state.dialogVisible}
          onCancel={() =>
            this.setState({ dialogVisible: !this.state.dialogVisible })
          }
          lockScroll={false}
        >
          <Dialog.Body>
          <Form
          className="en-US"
          model={this.state.form}
          labelWidth="180"
          onSubmit={this.onSubmit.bind(this)}
        >
          <Layout.Row>
            <Layout.Col span="18" style={{ padding: "5px" }}>
              <Form.Item label="Tipo de cuenta">
                <Cascader
                  props={this.state.props}
                  options={this.state.options}
                  activeItemChange={this.handleItemChange.bind(this)}
                  onChange={this.change.bind(this)}
                  value={this.state.val}
                />
                {this.state.errors.ou !== undefined ? (
                  <Tag type="danger">{this.state.errors.ou}</Tag>
                ) : null}
              </Form.Item>
              
             
            </Layout.Col>

          </Layout.Row>

          <Form.Item>
            <Button type="primary" nativeType="submit">
              Cambiar
            </Button>          
          </Form.Item>
        </Form>
          </Dialog.Body>
          
        </Dialog>
      </div>
    );
  }
}

export default Modal;
