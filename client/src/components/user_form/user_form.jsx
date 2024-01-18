import React, { Component } from "react";
import {
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

import "./user_form.css";

i18n.use(locale);

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        lastName: "",
        lastName1: "",
        ci: "",
        typeCurse: "",
        phone: "",
        address: "",
        title: "",
        date1: null,
        date2: null,
        delivery: false,
        resource: 1,
        description: "",
        type: "OTRAS CUENTAS",
        ou: "",
        username: "",
        unicodePwd: "",
        mailQuota: "",
      },
      val: [],
      value1: null,
      value2: null,
      value3: null,
      ou: "OU=UC",
      options: [],
      possibleUserName: "",
      props: {
        value: "label",
        children: "ou_values",
      },
      errors: {},
      mailTemplate: [
        {
          value: "60",
          label: "60",
        },
        {
          value: "100",
          label: "100",
        },
        {
          value: "150",
          label: "150",
        },
      ],
    };
  }
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
    form["type"] = val[0];

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
      let dn =
        "CN=" +
        form["name"] +
        " " +
        form["lastName"] +
        " " +
        form["lastName1"] +
        "," +
        form["ou"] +
        ",OU=CATALOGO,DC=reduc,DC=edu,DC=cu";
      let userAdd = {
        dn: dn,
        entry: {
          givenName: form["name"],
          distinguishedName: dn,
          sn: `${form["lastName"]} ${form["lastName1"]}`,
          identification: form["ci"],
          sAMAccountName: form.username,
          description: this.state.val.join("/"),
          accountExpires: this.state.value3,
          unicodePwd: form["unicodePwd"],
          /* typeCurse: form['typeCurse'],
          phone: form['phone'],
          address: form['address'],
          title: form['title'],
          dateIni: form['date1'],
          dateEnd: form['date2'],
          delivery: form['delivery'],
          source: form['resource'], */
        },
      };
      if (this.state.form.mailQuota !== "") {
        userAdd.entry["mailQuota"] = parseInt(form["mailQuota"]) * 1024 * 1024;
      }
      console.log(userAdd);
      axios
        .post(direction.API_USER_ADD, userAdd, {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Message({
              showClose: true,
              message: "Usuario insertado correctamente",
              type: "info",
            });

            this.props.history.replace("/dashboard");
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

  async checkUserName() {
    let user = JSON.parse(localStorage.getItem("user"));

    const mailPrefix = "@reduc.edu.cu";
    let username = this.checkPossibleUserName();

    let { form } = this.state;
    if (username) {
      for (let i = 0; ; i++) {
        if (i === 0) {
          let { data: res } = await axios.post(
            direction.API_SEARCH,
            { query: `${username}${mailPrefix}` },
            {
              headers: {
                Authorization: `Bearer ${user.authToken}`,
              },
            }
          );
          if (!res.length) {
            form["username"] = username;
            this.setState({ form });
            break;
          }
        } else {
          let { data: res } = await axios.post(
            direction.API_SEARCH,
            { query: `${username}${i}${mailPrefix}` },
            {
              headers: {
                Authorization: `Bearer ${user.authToken}`,
              },
            }
          );
          if (!res.length) {
            form["username"] = username + "" + i;
            this.setState({ form });
            break;
          }
        }
      }
    }
  }
  //to do
  checkPossibleUserName() {
    let possibleUserName = "";
    let { name, lastName } = this.state.form;
    name = name.toLowerCase().trim();
    lastName = lastName.toLowerCase().trim();

    let aux = name.split(" ");
    aux[0] = aux[0].toLowerCase();
    aux[0] = aux[0].replace("á", "a");
    aux[0] = aux[0].replace("é", "e");
    aux[0] = aux[0].replace("í", "i");
    aux[0] = aux[0].replace("ó", "o");
    aux[0] = aux[0].replace("ú", "u");
    aux[0] = aux[0].replace("ñ", "n");

    lastName = lastName.toLowerCase();
    lastName = lastName.replace(" ", "");
    lastName = lastName.replace("á", "a");
    lastName = lastName.replace("é", "e");
    lastName = lastName.replace("í", "i");
    lastName = lastName.replace("ó", "o");
    lastName = lastName.replace("ú", "u");
    lastName = lastName.replace("ñ", "n");
    console.log(`${aux[0]}.${lastName}`);
    return `${aux[0]}.${lastName}`;
  }
  handleType = (selectedOption) => {
    this.setState({ type: selectedOption });
  };
  validate = () => {
    let errors = {};
    let check = false;
    if (this.state.form.name === "") {
      errors.name = " El nombre no debe estar vacío";
      check = true;
    }
    if (this.state.form.lastname === "") {
      errors.lastname = " El primer apellido no debe estar vacío";
      check = true;
    }
    if (this.state.form.lastname1 === "") {
      errors.lastname1 = " El segundo apellido no debe estar vacío";
      check = true;
    }
    if (this.state.form.ou === "") {
      errors.ou = " Debe elegir el tipo de cuenta";
      check = true;
    }
    const reg = /^\d+$/;
    if (this.state.form.ci === "" || !reg.test(this.state.form.ci)) {
      errors.ci = " El carné no debe estar vacío y solo debe contener números";
      check = true;
    }
    if (this.state.form.username === null) {
      errors.username = " El nombre de usuario no debe estar vacío";
      check = true;
    }
    if (this.state.form.unicodePwd !== this.state.form.unicodePwd1) {
      errors.unicodePwd = " La contraseña no coincide";
      check = true;
    }
    const num = /^[0-9]+$/;
    console.log("mailQuota", this.state.form.mailQuota);
    if (
      this.state.form.mailQuota !== "" &&
      !num.test(this.state.form.mailQuota)
    ) {
      errors.mailQuota = " La cuota no debe contener letras";
      check = true;
    }
    this.setState({ errors });
    return check;
  };

  changeMail(val) {
    let { form } = this.state;
    form["mailQuota"] = val;
    this.setState({ form });
  }
  closeForm(){
    this.props.history.replace("/dashboard");
  }
  render() {
    const { value1 } = this.state;
    const { type } = this.state.form;
    return (
      <Card
        className="box-card"
        style={{ margin: "50px" }}
        header={
          <div className="clearfix">
            <span
              style={{ color: "black", fontWeight: "bold", fontSize: "1.2em" }}
            >
              Agregar nuevo usuario
            </span>
          </div>
        }
      >
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
              <Form.Item label="Carné de identidad">
                <Input
                  value={this.state.form.ci}
                  onChange={this.onChange.bind(this, "ci")}
                ></Input>
                {this.state.errors.ci !== undefined ? (
                  <Tag type="danger">{this.state.errors.ci}</Tag>
                ) : null}
              </Form.Item>
              <Form.Item label="Nombre(s)">
                <Input
                  value={this.state.form.name}
                  onChange={this.onChange.bind(this, "name")}
                ></Input>
                {this.state.errors.name !== undefined ? (
                  <Tag type="danger">{this.state.errors.name}</Tag>
                ) : null}
              </Form.Item>

              <Form.Item label="Primer Apellido">
                <Input
                  value={this.state.form.lastName}
                  onChange={this.onChange.bind(this, "lastName")}
                  onBlur={this.checkUserName.bind(this)}
                ></Input>
                {this.state.errors.lastname !== undefined ? (
                  <Tag type="danger">{this.state.errors.lastname}</Tag>
                ) : null}
              </Form.Item>
              <Form.Item label="Segundo Apellido">
                <Input
                  value={this.state.form.lastName1}
                  onChange={this.onChange.bind(this, "lastName1")}
                ></Input>
                {this.state.errors.lastname1 !== undefined ? (
                  <Tag type="danger">{this.state.errors.lastname1}</Tag>
                ) : null}
              </Form.Item>
              <Form.Item label="Nombre de usuario">
                <Input
                  value={this.state.form.username}
                  onChange={this.onChange.bind(this, "username")}
                ></Input>
                {this.state.errors.username !== undefined ? (
                  <Tag type="danger">{this.state.errors.username}</Tag>
                ) : null}
                {/*this.state.possibleUserName.map((username) => {
                  return <Tag onClick={this.putUserName}>{username["username"]}</Tag>;
                })*/}
              </Form.Item>
              <Form.Item label="Fecha de expiración">
                <DatePicker
                  value={this.state.value3}
                  placeholder="Pick a day"
                  onChange={(date) => {
                    console.debug("DatePicker1 changed: ", date);
                    this.setState({ value3: date });
                  }}
                  disabledDate={(time) => time.getTime() < Date.now() - 8.64e7}
                />
                {this.state.errors.accountExpired !== undefined ? (
                  <Tag type="danger">{this.state.errors.accountExpired}</Tag>
                ) : null}
              </Form.Item>
              <Form.Item label="Contraseña">
                <Input
                  type="password"
                  value={this.state.form.unicodePwd}
                  onChange={this.onChange.bind(this, "unicodePwd")}
                ></Input>
                {this.state.errors.unicodePwd !== undefined ? (
                  <Tag type="danger">{this.state.errors.unicodePwd}</Tag>
                ) : null}
              </Form.Item>
              <Form.Item label="Repetir Contraseña">
                <Input
                  type="password"
                  value={this.state.form.unicodePwd1}
                  onChange={this.onChange.bind(this, "unicodePwd1")}
                ></Input>
              </Form.Item>
              <Form.Item label="Cuota de correo (Mb)">
                <Select
                  size="large"
                  value={this.state.mailQuota}
                  onChange={this.changeMail.bind(this)}
                >
                  {this.state.mailTemplate.map((el) => {
                    return (
                      <Select.Option
                        key={el.value}
                        label={el.label}
                        value={el.value}
                      />
                    );
                  })}
                </Select>
                {/** <Input
                  type="number"
                  value={this.state.form.mailQuota}
                  onChange={this.onChange.bind(this, "mailQuota")}
                ></Input> */}
                {this.state.errors.mailQuota !== undefined ? (
                  <Tag type="danger">{this.state.errors.mailQuota}</Tag>
                ) : null}
              </Form.Item>
            </Layout.Col>

            {/**ESTUDIANTE */}
            {type === "ESTUDIANTES" ? (
              <Layout.Col span="18" style={{ padding: "5px" }}>
                <Form.Item label="Tipo de curso">
                  <Radio.Group
                    value={this.state.form.typeCurse}
                    onChange={this.onChange.bind(this, "typeCurse")}
                  >
                    <Radio value="Diurno"></Radio>
                    <Radio value="Dirigido"></Radio>
                  </Radio.Group>
                </Form.Item>
              </Layout.Col>
            ) : (
              ""
            )}

            {/**Externo*/}
            {type === "externo" ? (
              <Layout.Col span="18" style={{ padding: "5px" }}>
                <Form.Item label="Teléfono">
                  <Input
                    value={this.state.form.phone}
                    onChange={this.onChange.bind(this, "phone")}
                  ></Input>
                </Form.Item>
                <Form.Item label="Dirección particular">
                  <Input
                    type="textarea"
                    value={this.state.form.address}
                    onChange={this.onChange.bind(this, "address")}
                  ></Input>
                </Form.Item>
              </Layout.Col>
            ) : (
              ""
            )}

            {/** FIN Externo*/}
            {/**POSTGRADO */}
            {type === "OTRAS CUENTAS" ? (
              <Layout.Col span="18" style={{ padding: "5px" }}>
                <Form.Item label="Tipo de curso">
                  <Radio.Group
                    value={this.state.form.resource}
                    onChange={this.onChange.bind(this, "resource")}
                  >
                    <Radio value="Diplomado"></Radio>
                    <Radio value="Maestría"></Radio>
                    <Radio value="Doctorado"></Radio>
                    <Radio value="Otro"></Radio>
                  </Radio.Group>
                </Form.Item>
              </Layout.Col>
            ) : (
              ""
            )}
            {/**FIN POSTGRADO */}
          </Layout.Row>

          <Form.Item>
            <Button type="primary" nativeType="submit">
              Crear
            </Button>
            <Button onClick={this.closeForm.bind(this)}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default User;
