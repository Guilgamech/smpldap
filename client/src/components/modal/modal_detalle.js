import React, { Component } from "react";
import { Button, Dialog } from "element-react";
class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: this.props.dialogVisible,
      nameButton: this.props.nameButton || "",
      title: this.props.title || "",
      user: this.props.user,
    };
  }
  CloseModal = () => {
    this.props.onClickButton();
    this.setState({ dialogVisible: false });
  };
  render() {
    return (
      <div>
        <Button
          type="text"
          onClick={() => this.setState({ dialogVisible: true })}
        >
          {this.props.nameButton}
        </Button>
        <Dialog className="text-center"
          title="DETALLES GENERALES"
          size="tiny"
          visible={this.state.dialogVisible}
          onCancel={() =>
            this.setState({ dialogVisible: !this.state.dialogVisible })
          }
          lockScroll={false}
        >
          <Dialog.Body>
           <div className="container">
             <div className="row">
                <div className="text-center" style={{marginBottom: "10px"}}>
                  <p><strong>Nombre de usuario </strong></p>
                  {this.state.user.displayName}
                </div>
                <div className="text-center" style={{marginBottom: "10px"}}>
                  <p><strong>Descripción </strong></p>
                  {this.state.user.description}
                </div>
                <div className="text-center" style={{marginBottom: "10px"}}>
                  <p><strong>Ubicación </strong></p>
                  {this.state.user.dn}
                </div>
                <div className="text-center" style={{marginBottom: "10px"}}>
                  <p><strong>Servicios</strong> </p>
                </div>
                <div className="text-center" style={{marginBottom: "10px"}}>
                  <p>Correo: {this.state.user.serviceMail}</p>
                  <p>Jabber: {this.state.user.serviceJabber}</p>
                  <p>Internet: {this.state.user.serviceInternet}</p>
                
                
                
                </div>
             </div>
           </div>
          </Dialog.Body>
                </Dialog>
      </div>
    );
  }
}

export default Modal;
