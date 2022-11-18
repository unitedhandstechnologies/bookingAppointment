import React from "react";

class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onclick() {
    this.props.ClickEvent();
  }

  render() {
    return (
      <button
        className={this.props.ClassName}
        name={this.props.Name}
        id={this.props.ID}
        onClick={this.props.Action}
        style={this.props.Style}
        type={this.props.Type ? this.props.Type : "button"}
      >
        {this.props.Icon}
        {this.props.Text}
      </button>
    );
  }
}

ButtonComponent.defaultProps = {
  ClassName: "d-blue-button",
  Text: "Button",
  Icon: "",
  ID: "btn",
  Name: "Name",
};

export default ButtonComponent;
