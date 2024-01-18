import React, { Component } from "react";
import { Button, Dialog, Input, Slider } from "element-react";
class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: this.props.dialogVisible,
      nameButton: this.props.nameButton || "",
      title: this.props.title || "",
      mailQuota: 60,
      unicodePwd: "",
      user: this.props.user,
    };
  }
  CloseModal = () => {
    this.props.onClickButton();
    this.setState({ dialogVisible: false });
    console.log(this.props.mailQuota)
  };
  componentDidUpdate(prevProps, prevState){
    if(prevProps.mailQuota !== prevState.mailQuota){
      console.log("Estado");
      console.log(this.state.mailQuota);
      this.setState({mailQuota: prevProps.mailQuota});
    }
  }
  render() {
    return (
      <div>
        <Button
          type="text"
          onClick={() => this.setState({ dialogVisible: true })}
        >
          {this.props.nameButton}
        </Button>
        <Dialog
          title="Operaciones"
          size="tiny"
          visible={this.state.dialogVisible}
          onCancel={() =>
            this.setState({ dialogVisible: !this.state.dialogVisible })
          }
          lockScroll={false}
        >
          <Dialog.Body>
            <span>
              {this.props.bodyDocument}
              {this.props.nameInput === 'mailQuota' ?
                <><Slider name={this.props.nameInput} showStops={true}  onChange={this.props.onChangeInput} min={60} max={2048} value={this.state.mailQuota}/></> :
                <input
                  
                  type={this.props.typeInput}
                  name={this.props.nameInput}
                  onChange={this.props.onChangeInput}
                ></input>
              }
            </span>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button
              onClick={() =>
                this.setState({ dialogVisible: !this.state.dialogVisible })
              }
            >
              Cancel
            </Button>
            <Button type="primary" onClick={this.CloseModal}>
              Confirm
            </Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}

export default Modal;
