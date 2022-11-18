import React from "react";

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.Value,
    };
  }

  componentDidMount() {
    if (
      (this.props.Value !== "") &
      (this.props.Value !== null) &
      (this.props.Value !== undefined)
    ) {
      this.setState({ inputValue: this.props.Value });
    }
  }

  handleChangeForAll(evt) {
    this.setState({ inputValue: evt.target.value });
    if (this.props.onChange !== undefined) {
      this.props.onChange(evt.target.value);
    }
  }

  componentWillReceiveProps(props) {
    if (
      (props.Value !== "") &
      (props.Value !== null) &
      (props.Value !== undefined)
    ) {
      this.setState({ inputValue: props.Value });
    } else {
      if (props.HandleClear === "True") this.setState({ inputValue: "" });
    }
  }

  render() {
    return (
      <div>
        <input
          autoComplete="off"
          type={this.props.Type}
          onChange={this.handleChangeForAll.bind(this)}
          name={this.props.Name}
          id={this.props.Id}
          className={this.props.Class}
          value={this.state.inputValue}
          placeholder={this.props.PlaceHolder}
        />
      </div>
    );
  }
}

InputBox.defaultProps = {
  Type: "text",
  Name: "",
  Class: "form-control ui-inputbox",
  Id: "",
  PlaceHolder: "",
  Value: "",
};

export default InputBox;
