import React, { Component } from "react";
import "../login/login.css";
import ReactAvatarEditor from "react-avatar-editor";
import { ToastContainer, toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { withTranslation } from "react-i18next";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoDocActions from "../../redux/exadoDoc/action";

class ProfileImgPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.profImg,
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 200,
      height: 200,
      disableCanvasRotation: false,
      isTransparent: false,
      backgroundColor: null,
    };
  }

  handlePopupClick = () => {
    this.props.toggle();
  };

  handleNewImage = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    const rect = this.editor.getCroppingRect();
    this.props.profImgData(img);
    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      },
    });

    let modelData = {
      userGuid: localStorage.getItem("user-id"),
      imgData: img,
    };

    promiseWrapper(this.props.actions.uploadProfileImage, {
      model: modelData,
    }).then((jsdata) => {
      window.localStorage.setItem("profile-image", jsdata.data.message);
    });

    this.props.toggle();
  };

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ allowZoomOut });
  };

  handleDisableCanvasRotation = ({
    target: { checked: disableCanvasRotation },
  }) => {
    this.setState({ disableCanvasRotation });
  };

  rotateScale = (e) => {
    const scale = parseFloat(e.target.value);
    e.preventDefault();
    this.setState({
      rotate: scale,
    });
  };

  rotateLeft = (e) => {
    e.preventDefault();

    this.setState({
      rotate: this.state.rotate - 90,
    });
  };

  rotateRight = (e) => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate + 90,
    });
  };

  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value);
    this.setState({ borderRadius });
  };

  handleXPosition = (e) => {
    const x = parseFloat(e.target.value);
    this.setState({ position: { ...this.state.position, x } });
  };

  handleYPosition = (e) => {
    const y = parseFloat(e.target.value);
    this.setState({ position: { ...this.state.position, y } });
  };

  handleWidth = (e) => {
    const width = parseInt(e.target.value);
    this.setState({ width });
  };

  handleHeight = (e) => {
    const height = parseInt(e.target.value);
    this.setState({ height });
  };

  logCallback(e) {
    // eslint-disable-next-line no-console
    console.log("callback", e);
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  };

  handlePositionChange = (position) => {
    this.setState({ position });
  };

  setBackgroundColor = (e) => {
    this.setState({ backgroundColor: e.target.value });
  };

  setTransparent = (e) => {
    const isTransparent = e.target.checked;
    // set color to white initially
    const backgroundColor = isTransparent ? "#FFFFFF" : null;

    this.setState({ backgroundColor, isTransparent });
  };

  render() {
    const { t } = this.props;
    return (
      <div className="modal" style={{ display: "block" }}>
        <div className="modal_content p-0 top-10">
          <div className="modal-header">
            <h5 className="modal-title">
              {t("Doctor.ProfileImgPopup.Upload_Image")}
            </h5>
            <span className="close h4" onClick={this.handlePopupClick}>
              &times;
            </span>
          </div>
          <div className="modal-body d-flex flex-column align-items-center">
            <Dropzone
              onDrop={(acceptedFiles) => {
                this.setState({ image: acceptedFiles[0] });
              }}
              noClick
              multiple={false}
              style={{
                width: this.state.width,
                height: this.state.height,
                marginBottom: "35px",
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="d-flex flex-column align-items-center"
                  {...getRootProps()}
                >
                  <ReactAvatarEditor
                    ref={this.setEditorRef}
                    scale={parseFloat(this.state.scale)}
                    width={this.state.width}
                    height={this.state.height}
                    position={this.state.position}
                    onPositionChange={this.handlePositionChange}
                    rotate={parseFloat(this.state.rotate)}
                    borderRadius={
                      this.state.width / (100 / this.state.borderRadius)
                    }
                    backgroundColor={this.state.backgroundColor}
                    onLoadFailure={this.logCallback.bind(this, "onLoadFailed")}
                    onLoadSuccess={this.logCallback.bind(this, "onLoadSuccess")}
                    onImageReady={this.logCallback.bind(this, "onImageReady")}
                    image={this.state.image}
                    className="editor-canvas"
                    disableCanvasRotation={this.state.disableCanvasRotation}
                  />
                  <br />

                  <div className="search-bar-text-input">
                    <div>
                      <label className="btn fileUpload btn-default">
                        {t("Doctor.ProfileImgPopup.Upload_Image")}{" "}
                        <input
                          name="newImage"
                          type="file"
                          onChange={this.handleNewImage}
                          {...getInputProps()}
                          style={{ display: "initial" }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className="d-flex align-items-center mt-3">
              {t("Doctor.ProfileImgPopup.Zoom:")}&nbsp;
              <input
                className="mt-1"
                name="scale"
                type="range"
                onChange={this.handleScale}
                min={this.state.allowZoomOut ? "0.1" : "1"}
                max="2"
                step="0.01"
                defaultValue="1"
              />
            </div>
            {/* {'Allow Scale < 1'}
                    <input
                        name="allowZoomOut"
                        type="checkbox"
                        onChange={this.handleAllowZoomOut}
                        checked={this.state.allowZoomOut}
                    />
                    <br /> */}
            <div className="d-flex align-items-center mt-3">
              {t("Doctor.ProfileImgPopup.Border_radius:")}&nbsp;
              <input
                className="mt-1"
                name="scale"
                type="range"
                onChange={this.handleBorderRadius}
                min="0"
                max="50"
                step="1"
                defaultValue="0"
              />
            </div>
            {/* Avatar Width:
                <input
                        name="width"
                        type="number"
                        onChange={this.handleWidth}
                        min="50"
                        max="400"
                        step="10"
                        value={this.state.width}
                    />
                    <br />
        Avatar Height:
                <input
                        name="height"
                        type="number"
                        onChange={this.handleHeight}
                        min="50"
                        max="400"
                        step="10"
                        value={this.state.height}
                    />
                    <br />
        X Position:
                <input
                        name="scale"
                        type="range"
                        onChange={this.handleXPosition}
                        min="0"
                        max="1"
                        step="0.01"
                        value={this.state.position.x}
                    />
                    <br />
        Y Position:
                <input
                        name="scale"
                        type="range"
                        onChange={this.handleYPosition}
                        min="0"
                        max="1"
                        step="0.01"
                        value={this.state.position.y}
                    />
                    <br /> */}
            <div className="d-flex align-items-center mt-3 w-100 justify-content-center">
              {t("Doctor.ProfileImgPopup.Rotate:")}:&nbsp;
              <button
                onClick={this.rotateLeft}
                className="btn fileUpload btn-default px-4 mx-1"
              >
                {t("Doctor.ProfileImgPopup.Left")}
              </button>
              <button
                onClick={this.rotateRight}
                className="btn fileUpload btn-default px-4"
              >
                {t("Doctor.ProfileImgPopup.Right")}
              </button>
            </div>
            {/* Disable Canvas Rotation
                <input
                        name="disableCanvasRotation"
                        type="checkbox"
                        onChange={this.handleDisableCanvasRotation}
                        checked={this.state.disableCanvasRotation}
                    />
                    <br />
        Rotation Scale:
                <input
                        name="scale"
                        type="range"
                        onChange={this.rotateScale}
                        min="0"
                        max="180"
                        step="1"
                        defaultValue="0"
                    />
                    <br />
        Transparent image?
                <input type="checkbox" onChange={this.setTransparent} defaultChecked={this.state.isTransparent}></input>
                    <br /> */}
            {this.state.isTransparent && (
              <div style={{ marginLeft: "1rem" }}>
                {t("Doctor.ProfileImgPopup.Background_color:")}
                <input
                  name="backgroundColor"
                  type="color"
                  defaultValue={this.state.backgroundColor}
                  onChange={this.setBackgroundColor}
                />
                <br />
              </div>
            )}

            {/* {!!this.state.preview && (
                        <img
                            src={this.state.preview.img}
                            style={{
                                borderRadius: `${(Math.min(this.state.preview.height, this.state.preview.width) +
                                    10) *
                                    (this.state.preview.borderRadius / 2 / 100)
                                    }px`,
                            }}
                        />
                    )}
                    {!!this.state.preview && (
                        <ProfImgPreview
                            width={
                                this.state.preview.scale < 1
                                    ? this.state.preview.width
                                    : (this.state.preview.height * 478) / 270
                            }
                            height={this.state.preview.height}
                            image="avatar.jpg"
                            rect={this.state.preview.rect}
                        />
                    )} */}
          </div>
          <div className="modal-footer">
            {/* <input type="button" onClick={this.handleSave} value="Save" /> */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSave}
            >
              {t("Doctor.ProfileImgPopup.Save_changes")}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handlePopupClick}
              data-dismiss="modal"
            >
              {t("Doctor.ProfileImgPopup.Close")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(exadoDocActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(ProfileImgPopup));
