import React, { Component } from "react";
import { promiseWrapper } from "../../../utility/common";

export class AddAdditionalServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalServicesList: [],
      addedServices: [],
      options: [],
      dropDownOpen: false,
    };
  }

  componentDidMount() {
    this.getDoctorAdditionalService();
  }

  getDoctorAdditionalService = () => {
    promiseWrapper(this.props.docactions.getAllDoctorAdditionalService, {
      params: { doctorGuid: localStorage.getItem("user-id") },
    })
      .then((data) =>
        this.setState(
          {
            additionalServicesList: data.data,
            selectedServiceGuid: data.data[0].serviceGuid,
            options: data.data,
          },
          () => this.getAdditionalServiceInfo()
        )
      )
      .catch((err) => console.log(err));
  };

  getAdditionalServiceInfo = () => {
    promiseWrapper(this.props.docactions.getAdditionalServiceInfo, {
      params: { appointmentGuid: this.props.appointmentGuid },
    })
      .then((data) => {
        this.addAdditionalService(null, data.data.servicesModel);
      })
      .catch((err) => console.log(err));
  };

  addAdditionalService = (service, array = null) => {
    if (array) {
      for (const serviceAdd of array) {
        this.state.addedServices.push(serviceAdd);
        for (const service of this.state.options) {
          if (service.serviceGuid === serviceAdd.serviceGuid)
            service.isAdded = true;
        }
      }
    } else {
      this.state.addedServices.push(service);
      for (const optionService of this.state.options) {
        if (service.serviceGuid === optionService.serviceGuid)
          optionService.isAdded = true;
      }
    }
    const additionalAmount = parseFloat(
      this.totalAdditionalAmount(this.state.addedServices)
    );
    this.props.addAdditionalServiceData(
      this.state.addedServices,
      additionalAmount
    );
    this.setState({
      addedServices: this.state.addedServices,
      options: this.state.options,
    });
  };

  removeAddedService = (service) => {
    let deleteIndex = 0;
    for (const addedService of this.state.addedServices) {
      if (addedService.serviceGuid === service.serviceGuid) break;
      deleteIndex++;
    }
    this.state.addedServices.splice(deleteIndex, 1);
    for (const addedService of this.state.options) {
      if (addedService.serviceGuid === service.serviceGuid)
        addedService.isAdded = false;
    }
    const additionalAmount = parseFloat(
      this.totalAdditionalAmount(this.state.addedServices)
    );
    this.props.addAdditionalServiceData(
      this.state.addedServices,
      additionalAmount
    );
    this.setState({
      addedServices: this.state.addedServices,
      options: this.state.options,
    });
  };

  onSearchInputChange = (e) => {
    const newOptions = this.state.additionalServicesList.filter((service) => {
      if (service.serviceName.includes(e.target.value)) return service;
      else return false;
    });
    this.setState({ options: newOptions });
  };

  // getServiceDetailsByGuid = (guid) => {
  //    let find = false
  //    for (const service of this.state.additionalServicesList) {
  //       if (find) break;
  //       if (service.serviceGuid === guid) { find = true; return service }
  //    }
  // }

  isServiceAdded = (service) => {
    let isAdded = false;
    for (const addedService of this.state.addedServices) {
      if (addedService.serviceGuid === service.serviceGuid) isAdded = true;
    }
    return isAdded;
  };

  onServiceClick = (service) => {
    if (this.isServiceAdded(service)) this.removeAddedService(service);
    else this.addAdditionalService(service);
  };

  totalAdditionalAmount = (addedServices) => {
    let additionalAmount = 0;
    for (const service of addedServices) {
      additionalAmount += service.amount;
    }
    return additionalAmount;
  };

  render() {
    const { addedServices, options, dropDownOpen } = this.state;
    const { t } = this.props;

    return (
      <>
        <div className="input-group mt-4">
          <input
            type="text"
            className="form-control"
            placeholder={t(
              "Doctor.AddAdditionalServices.Search_Additional_Services"
            )}
            onChange={(e) => this.onSearchInputChange(e)}
            onFocus={() => this.setState({ dropDownOpen: true })}
          />
          {dropDownOpen ? (
            <button
              className="input-group-text"
              type="button"
              onClick={() => this.setState({ dropDownOpen: false })}
            >
              <i className="fas fa-sort-down"></i>
            </button>
          ) : (
            <button
              className="input-group-text"
              type="button"
              onClick={() => this.setState({ dropDownOpen: true })}
            >
              <i className="fas fa-caret-right"></i>
            </button>
          )}
        </div>
        {dropDownOpen && (
          <div className="search-bar-dropdown">
            <ul className="list-group">
              {options.map((service, i) => {
                return (
                  <div className="d-flex" key={i}>
                    <button
                      className="list-group-item list-group-item-action success"
                      type="button"
                      onClick={() => this.onServiceClick(service)}
                    >
                      {service.serviceName} - {service.amount} €
                    </button>
                    <div className="input-group-text">
                      <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        onChange={() => this.onServiceClick(service)}
                        checked={service.isAdded ? service.isAdded : false}
                      />
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
        {addedServices.length > 0 && (
          <div className="mt-3">
            <table className="table table-bordered appointmentTable">
              <thead>
                <tr className="new-patient-table-title">
                  <th className="text-center">
                    {t("Doctor.AddAdditionalServices.Service_Name")}
                  </th>
                  <th className="text-center">
                    {t("Doctor.AddAdditionalServices.Description")}
                  </th>
                  <th className="text-center">
                    {t("Doctor.AddAdditionalServices.Amount")}
                  </th>
                  <th className="text-center">
                    {t("Doctor.AddAdditionalServices.Action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {addedServices.map((service, i) => (
                  <tr key={i}>
                    <td>{service.serviceName}</td>
                    <td>{service.description}</td>
                    <td>{service.amount}</td>
                    <td>
                      <button
                        className="btn btn-hero"
                        type="button"
                        onClick={() => this.removeAddedService(service)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }
}

export default AddAdditionalServices;
