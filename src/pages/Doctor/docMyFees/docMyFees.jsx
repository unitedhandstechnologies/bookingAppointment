import React from "react";
import exadoDocActions from "../../../redux/exadoDoc/action";
import { toast } from "react-toastify";
import { promiseWrapper } from "../../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DoctorHeader from "../docHeader";
import DoctorFooter from "../docFooter";
import DoctorLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import { withTranslation } from "react-i18next";
import AdditionalServices from "./additionalServices";

class DoctorMyFees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      CurrencyName: "",
      CurrencyData: [],
      MyFees: {
        feesGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currencyId: 0,
        onlineAppointmentFees: 100,
        refundPercentage: 0,
        inClinicAppointmentFees: 0,
        refundInClinicPercentage: 0,
        isChatFree: true,
        chatFees: 0,
        acceptOnlinePayment: false,
      },
      saveMyFees: {
        feesGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currencyId: 0,
        onlineAppointmentFees: 0,
        refundPercentage: 0,
        inClinicAppointmentFees: 0,
        refundInClinicPercentage: 0,
        isChatFree: true,
        chatFees: 0,
        acceptOnlinePayment: false,
      },
    };
  }

  componentDidMount() {
    promiseWrapper(this.props.actions.getDoctorFees, {
      userGuid: localStorage.getItem("user-id"),
    }).then((data) => {
      this.setState({ MyFees: data }, () => {
        this.setState({ saveMyFees: this.state.MyFees });
        this.setState((prevState) => ({
          saveMyFees: {
            ...prevState.saveMyFees,
            refundPercentage: data.refundPercentage.toString(),
          },
        }));
        this.setState((prevState) => ({
          saveMyFees: {
            ...prevState.saveMyFees,
            refundInClinicPercentage: data.refundInClinicPercentage.toString(),
          },
        }));
        this.setState((prevState) => ({
          saveMyFees: {
            ...prevState.saveMyFees,
            isChatFree: data.isChatFree.toString(),
          },
        }));

        promiseWrapper(this.props.actions.getCurrency).then((jsdata) => {
          this.setState({ CurrencyData: jsdata }, () => {
            jsdata.map((d, i) => {
              d.display = d.currencyCode + " (" + d.currency + ")";
              if (d.currencyID === data.currencyId) {
                this.setState({ CurrencyName: d.currencyCode });
              }
            });
            this.setState({ LoadedData: true });
          });
        });
      });
    });
  }

  UpdateCurrency = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        currencyId: e.target.value,
      },
    }));
    this.state.CurrencyData.map((d, i) => {
      if (d.currencyID == e.target.value) {
        this.setState({ CurrencyName: d.currencyCode });
      }
    });
  };

  UpdateRefundPercentage = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        refundPercentage: e.target.value,
      },
    }));
  };

  UpdateRefundInClinicPercentage = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        refundInClinicPercentage: e.target.value,
      },
    }));
  };

  UpdateIsChatFree = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        isChatFree: e.target.value,
      },
    }));
    if (e.target.value === "false") {
      this.setState((prevState) => ({
        saveMyFees: {
          ...prevState.saveMyFees,
          chatFees: 0,
        },
      }));
    }
  };

  UpdateOnlineAppointmentFees = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        ["onlineAppointmentFees"]: e.target.value,
      },
    }));
  };

  UpdateInClinicAppointmentFees = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        ["inClinicAppointmentFees"]: e.target.value,
      },
    }));
  };

  UpdateChatFees = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        ["chatFees"]: e.target.value,
      },
    }));
  };

  stringToBoolean(string) {
    switch (string.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
        return false;
      default:
        return Boolean(string);
    }
  }

  SaveMyFees() {
    let errorMessage = "";
    // console.log(this.state.saveMyFees["isChatFree"]);
    // console.log(this.state.saveMyFees["chatFees"]);
    if (
      this.state.saveMyFees["currencyId"] === "" ||
      this.state.saveMyFees["currencyId"] === 0
    ) {
      errorMessage += `Please select currency \n`;
    }
    // if (this.state.saveMyFees["isChatFree"] === false && (this.state.saveMyFees["chatFees"] === null || (this.state.saveMyFees["chatFees"] === 0) {
    //     errorMessage += `Please enter chat fees\n`;
    // }
    if (errorMessage != "") {
      toast.error(errorMessage);
      return;
    }
    let Fees = {
      feesGuid: this.state.saveMyFees["feesGuid"],
      userGuid: localStorage.getItem("user-id"), //this.state.saveMyFees["userGuid"],
      currencyId: Number(this.state.saveMyFees["currencyId"]),
      onlineAppointmentFees: Number(
        this.state.saveMyFees["onlineAppointmentFees"]
      ),
      refundPercentage: Number(this.state.saveMyFees["refundPercentage"]),
      inClinicAppointmentFees: Number(
        this.state.saveMyFees["inClinicAppointmentFees"]
      ),
      refundInClinicPercentage: Number(
        this.state.saveMyFees["refundInClinicPercentage"]
      ),
      isChatFree: this.stringToBoolean(this.state.saveMyFees["isChatFree"]),
      chatFees: Number(this.state.saveMyFees["chatFees"]),
      acceptOnlinePayment: this.state.saveMyFees["acceptOnlinePayment"],
    };

    promiseWrapper(this.props.actions.saveDoctorFees, {
      doctorFeesInfoModel: Fees,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        toast.success(data.data.message);
      } else {
        toast.error(data.data.message);
      }
    });
  }

  UpdateIsAcceptOnline = (e) => {
    this.setState((prevState) => ({
      saveMyFees: {
        ...prevState.saveMyFees,
        ["acceptOnlinePayment"]: e.target.checked,
      },
    }));
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <DoctorHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <DoctorLeftPanel />
              {this.state && this.state.LoadedData && (
                <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                  <div className="row bg-light">
                    <div className="search-bar py-4">
                      <div className="col-md-12 search-bar-text">
                        {t("Doctor.MyFees.My_Fees")}
                      </div>
                    </div>
                    <div className="my-fees">
                      <div className="row pb-4 select-currency-row">
                        <div className="col-md-4 select-currency-title">
                          {t("Doctor.MyFees.Select_Currency")}
                        </div>
                        <div className="col-md-8">
                          <div className="divForm">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="search-bar-text-input mb-4">
                                  <select
                                    value={this.state.saveMyFees["currencyId"]}
                                    onChange={this.UpdateCurrency.bind(this)}
                                    className="selectpicker physician-servicies-select form-control w-100 appearance-auto"
                                    id="select-currency-select"
                                  >
                                    <option value="0">
                                      {t("Doctor.MyFees.Select_Currency")}
                                    </option>
                                    {this.state.CurrencyData.map((h, i) => (
                                      <option key={i} value={h.currencyID}>
                                        {h.display}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4 online-appoitment-row">
                        <div className="col-md-4 online-appoitment-title">
                          {t("Doctor.MyFees.Online_Appointment_Fees")}
                        </div>
                        <div className="col-md-8">
                          <div className="divForm">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="search-bar-text-input">
                                  <input
                                    type="text"
                                    onChange={this.UpdateOnlineAppointmentFees.bind(
                                      this
                                    )}
                                    className="form-control"
                                    placeholder="0.00"
                                    value={
                                      this.state.saveMyFees[
                                        "onlineAppointmentFees"
                                      ]
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="search-bar-text-input mb-4">
                                  <span className="online-appoitment-selected">
                                    {this.state.CurrencyName}
                                  </span>{" "}
                                  {t("Doctor.MyFees.per_Consultation")}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="mb-3">
                                {t("Doctor.MyFees.How_much_amount")}
                              </div>
                              <div className="search-bar-text-input mb-4">
                                <div className="d-flex  justify-content-between divForm-radio mt-1">
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="0"
                                        checked={
                                          this.state.saveMyFees[
                                            "refundPercentage"
                                          ] === "0"
                                        }
                                        onChange={this.UpdateRefundPercentage.bind(
                                          this
                                        )}
                                      />
                                      <label className="form-check-label">
                                        0%
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="25"
                                        checked={
                                          this.state.saveMyFees[
                                            "refundPercentage"
                                          ] === "25"
                                        }
                                        onChange={this.UpdateRefundPercentage.bind(
                                          this
                                        )}
                                      />
                                      <label className="form-check-label">
                                        25%
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="50"
                                        checked={
                                          this.state.saveMyFees[
                                            "refundPercentage"
                                          ] === "50"
                                        }
                                        onChange={this.UpdateRefundPercentage.bind(
                                          this
                                        )}
                                      />
                                      <label className="form-check-label">
                                        50%
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="75"
                                        checked={
                                          this.state.saveMyFees[
                                            "refundPercentage"
                                          ] === "75"
                                        }
                                        onChange={this.UpdateRefundPercentage.bind(
                                          this
                                        )}
                                      />
                                      <label className="form-check-label">
                                        75%
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="100"
                                        checked={
                                          this.state.saveMyFees[
                                            "refundPercentage"
                                          ] === "100"
                                        }
                                        onChange={this.UpdateRefundPercentage.bind(
                                          this
                                        )}
                                      />
                                      <label className="form-check-label">
                                        100%
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pb-4 inclinic-appoitment-row">
                        <div className="col-md-4 inclinic-appoitment-title">
                          {t("Doctor.MyFees.InClinic_Appointment_Fees")}
                        </div>
                        <div className="col-md-8">
                          <div className="divForm">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="search-bar-text-input">
                                  <input
                                    type="text"
                                    onChange={this.UpdateInClinicAppointmentFees.bind(
                                      this
                                    )}
                                    className="form-control"
                                    placeholder="0.00"
                                    value={
                                      this.state.saveMyFees[
                                        "inClinicAppointmentFees"
                                      ]
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="search-bar-text-input mb-4">
                                  <span className="inclinic-appoitment-selected">
                                    {this.state.CurrencyName}
                                  </span>{" "}
                                  {t("Doctor.MyFees.per_Consultation")}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-1" style={{ width: "3%" }}>
                                <div className="search-bar-text-input">
                                  <input
                                    className="form-check-input"
                                    name="is-accept-online-payment"
                                    type="checkbox"
                                    id="accept-online-payment"
                                    value=""
                                    checked={
                                      this.state.saveMyFees[
                                        "acceptOnlinePayment"
                                      ] === true
                                    }
                                    onChange={this.UpdateIsAcceptOnline.bind(
                                      this
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="search-bar-text-input mb-4">
                                  {t("Doctor.MyFees.Accept_Online_Payment")}
                                </div>
                              </div>
                            </div>
                            {this.state.saveMyFees.acceptOnlinePayment && (
                              <div className="row">
                                <div className="mb-3">
                                  {t("Doctor.MyFees.How_much_amount")}
                                </div>
                                <div className="search-bar-text-input mb-4">
                                  <div className="d-flex  justify-content-between divForm-radio mt-1">
                                    <div className="form-check">
                                      <div>
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          value="0"
                                          checked={
                                            this.state.saveMyFees[
                                              "refundInClinicPercentage"
                                            ] === "0"
                                          }
                                          onChange={this.UpdateRefundInClinicPercentage.bind(
                                            this
                                          )}
                                        />
                                        <label className="form-check-label">
                                          0%
                                        </label>
                                      </div>
                                    </div>
                                    <div className="form-check">
                                      <div>
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          value="25"
                                          checked={
                                            this.state.saveMyFees[
                                              "refundInClinicPercentage"
                                            ] === "25"
                                          }
                                          onChange={this.UpdateRefundInClinicPercentage.bind(
                                            this
                                          )}
                                        />
                                        <label className="form-check-label">
                                          25%
                                        </label>
                                      </div>
                                    </div>
                                    <div className="form-check">
                                      <div>
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          value="50"
                                          checked={
                                            this.state.saveMyFees[
                                              "refundInClinicPercentage"
                                            ] === "50"
                                          }
                                          onChange={this.UpdateRefundInClinicPercentage.bind(
                                            this
                                          )}
                                        />
                                        <label className="form-check-label">
                                          50%
                                        </label>
                                      </div>
                                    </div>
                                    <div className="form-check">
                                      <div>
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          value="75"
                                          checked={
                                            this.state.saveMyFees[
                                              "refundInClinicPercentage"
                                            ] === "75"
                                          }
                                          onChange={this.UpdateRefundInClinicPercentage.bind(
                                            this
                                          )}
                                        />
                                        <label className="form-check-label">
                                          75%
                                        </label>
                                      </div>
                                    </div>
                                    <div className="form-check">
                                      <div>
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          value="100"
                                          checked={
                                            this.state.saveMyFees[
                                              "refundInClinicPercentage"
                                            ] === "100"
                                          }
                                          onChange={this.UpdateRefundInClinicPercentage.bind(
                                            this
                                          )}
                                        />
                                        <label className="form-check-label">
                                          100%
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4 chat-consultation-row">
                        <div className="col-md-4 chat-consultation-title">
                          {t("Doctor.MyFees.Chat_Consultation_Fees")}
                        </div>
                        <div className="col-md-8">
                          <div className="divForm">
                            <div className="row">
                              <span className="pb-2">
                                {t("Doctor.MyFees.Would_you_like_to_chat_free")}
                              </span>
                              <div className="col-md-6 mb-3">
                                <div className="d-flex divForm-radio justify-content-between mt-1">
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="true"
                                        checked={
                                          this.state.saveMyFees[
                                            "isChatFree"
                                          ] === "true"
                                        }
                                        onChange={this.UpdateIsChatFree.bind(
                                          this
                                        )}
                                      />
                                      <label className="form-check-label">
                                        {t("Doctor.MyFees.Yes")}
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="false"
                                        checked={
                                          this.state.saveMyFees[
                                            "isChatFree"
                                          ] === "false"
                                        }
                                        onChange={this.UpdateIsChatFree.bind(
                                          this
                                        )}
                                      />
                                      <label className="form-check-label">
                                        {t("Doctor.MyFees.No")}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {this.state &&
                              this.state.saveMyFees["isChatFree"] ===
                                "false" && (
                                <div id="divChatFees" className="row chat-free">
                                  <div className="col-md-4">
                                    <div className="search-bar-text-input">
                                      <input
                                        type="text"
                                        onChange={this.UpdateChatFees.bind(
                                          this
                                        )}
                                        className="form-control"
                                        placeholder="0.00"
                                        value={
                                          this.state.saveMyFees["chatFees"]
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="search-bar-text-input mb-4">
                                      <span className="chat-consultation-selected">
                                        {this.state.CurrencyName}
                                      </span>{" "}
                                      {t("Doctor.MyFees.per_Consultation")}
                                    </div>
                                  </div>
                                </div>
                              )}
                            <div className="w-100 d-flex flex-column align-items-end">
                              <input
                                type="submit"
                                onClick={this.SaveMyFees.bind(this)}
                                className="btn save-button my-2"
                                value={t("Doctor.MyFees.Save")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <AdditionalServices />
                  </div>
                  <DoctorFooter />
                </div>
              )}
            </div>
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
)(withTranslation()(DoctorMyFees));
