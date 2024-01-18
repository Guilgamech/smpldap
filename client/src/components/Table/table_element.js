import React, { Component } from "react";
import {
    Button, Table
    } from "element-react";

class TableElement extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          columns: [
            {
              label: "Nombre y apellidos",
              prop: "displayName",
              align: 'center'
            },
            {
              label: "Nombre de usuario",
              prop: "userAccountControl",
            },
            {
              label: "CI",
              prop: "identification",
            },
            {
              label: "Tipo de usuario",
              prop: "serviceInternet",
            },
            {
              label: "Operaciones",
              fixed: 'right',
              render: (row, column, index)=>{
                return <span><Button type="text" size="small" onClick={this.deleteRow.bind(this, index)}>Remove</Button></span>
              }
            }
          ],
          data: this.props.listOfUser
        }
      }
      componentDidMount(){
        console.log(this.props.listOfUser);
      }
      deleteRow(index) {
        const { data } = this.state;
        data.splice(index, 1);
        this.setState({
          data: [...data]
        })
      }
      
      render() {
        return (
          <Table
            style={{width: '100%'}}
            columns={this.state.columns}
            data={this.state.data}
            border={true}
            maxHeight={250}
          />
        )
      }
}

export default TableElement;