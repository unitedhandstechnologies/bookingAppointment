import React, { Component, useState } from "react";
import PatientHeader from "./header2";
import PatientFooter from "./footer";
import PatientLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Field, Formik } from "formik";
import { number, object, string } from "yup";
import moment from "moment";
import ErrorMessage from "../../commonComponent/Elements/errorMessage";
import exadoActions from "../../redux/exado/action";
import { bindActionCreators } from "redux";
import { localStorageKeys, promiseWrapper } from "../../utility/common";
import { useEffect } from "react";

const AddFunds = (props) => {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(null);

  const { t } = props;

  useEffect(() => {
    clearTimeout(timer);
  }, []);

  const toggleCardForm = () => {
    setShowAddCardForm(!showAddCardForm);
  };

  const getYearList = () => {
    const currentYear = new Date().getFullYear();
    const range = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );
    return range(currentYear, currentYear + 22, 1);
  };
  const makePayment = (values) => {
    if (saveCard) {
      promiseWrapper(props.actions.saveCardInfo, {
        modal: {
          addFunds: values.amount.toString(),
          creditCardNumber: values.cardNumber.toString(),
          validUntil: `${values.month}/${values.year}`,
          cvcCode: parseInt(values.cvv),
          userGuid: localStorage.getItem(localStorageKeys.userId),
        },
      })
        .then((data) => {
          if (data.data.isSuccess) {
            setSuccess(data.data.message);
            setShowAddCardForm(false);
            setTimer(
              setTimeout(() => setSuccess("")),
              2000
            );
          } else setError(data.data.errorMessage);
          setTimer(
            setTimeout(() => setError("")),
            2000
          );
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div>
        <PatientHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <PatientLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div>
                  <div className="row search-bar">
                    <div className="py-4 search-bar-text w-100 bg-light">
                      Your saved cards
                    </div>
                  </div>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12 table-min-height">
                      <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                          <thead>
                            <tr className="new-patient-table-title">
                              <th>Card Details</th>
                              <th>Card Number</th>
                              <th>Expiry Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="card-details">
                              <td>
                                <img
                                  src="assets/images/Mastercard_2019_logo.svg"
                                  alt="master card"
                                />{" "}
                                Master Card
                              </td>
                              <td className="text-nowrap">
                                ****-****-****-1234
                              </td>
                              <td>12-32</td>
                              <td>
                                <button className="btn btn-success">
                                  Add fund
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-end my-3">
                          <button
                            className="btn btn-success"
                            onClick={() => toggleCardForm()}
                          >
                            {showAddCardForm
                              ? "Cancel Fund Transfer"
                              : "Add fund with new card"}
                          </button>
                        </div>
                      </div>
                      {showAddCardForm && (
                        <Formik
                          initialValues={{
                            name: "",
                            cardNumber: "",
                            amount: "",
                            month: "",
                            year: "",
                            cvv: "",
                          }}
                          onSubmit={(values) => makePayment(values)}
                          validationSchema={addFundSchema}
                        >
                          {({
                            handleSubmit,
                            errors,
                            touched,
                            getFieldProps,
                            values,
                            isValid,
                          }) => (
                            <form onSubmit={handleSubmit} className="divForm">
                              <div className="row search-bar">
                                <div className="py-4 search-bar-text w-100 bg-light  d-flex justify-content-center">
                                  Add funds
                                </div>
                              </div>
                              <div className="d-flex justify-content-center my-2">
                                <div className="w-50">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label htmlFor="name">
                                        Name on your card
                                      </label>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="search-bar-text-input mb-2">
                                        <Field
                                          type="text"
                                          name="name"
                                          id="name"
                                          className={`form-control ${
                                            errors.name &&
                                            touched.name &&
                                            "error-message-input"
                                          }`}
                                          // autoFocus
                                        />
                                        {errors.name && touched.name && (
                                          <ErrorMessage
                                            error={errors.name}
                                            t={t}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <label
                                        htmlFor="cardNumber"
                                        className="form-label"
                                      >
                                        {t(
                                          "Public.AddFundsPopup.Credit_Card_Number"
                                        )}
                                      </label>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="search-bar-text-input mb-2">
                                        <input
                                          type="number"
                                          name="cardNumber"
                                          className={`form-control ${
                                            errors.cardNumber &&
                                            touched.cardNumber &&
                                            "error-message-input"
                                          }`}
                                          // maxLength={16}
                                          {...getFieldProps("cardNumber")}
                                        />
                                        {errors.cardNumber &&
                                          touched.cardNumber && (
                                            <ErrorMessage
                                              error={errors.cardNumber}
                                              t={t}
                                            />
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <label htmlFor="amount">Amount</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="search-bar-text-input mb-2">
                                        <Field
                                          type="number"
                                          name="amount"
                                          className={`form-control ${
                                            errors.amount &&
                                            touched.amount &&
                                            "error-message-input"
                                          }`}
                                        />
                                        {errors.amount && touched.amount && (
                                          <ErrorMessage
                                            error={errors.amount}
                                            t={t}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-sm-3">
                                      <label className="form-label">
                                        {t("Public.AddFundsPopup.Valid_Until")}
                                      </label>
                                    </div>
                                    <div className="col-sm-2">
                                      <div className="search-bar-text-input mb-2">
                                        <select
                                          name="month"
                                          className={`form-control ${
                                            errors.month &&
                                            touched.month &&
                                            "error-message-input"
                                          }`}
                                          {...getFieldProps("month")}
                                        >
                                          {!values.month && (
                                            <option value="">month</option>
                                          )}
                                          {moment
                                            .monthsShort()
                                            .map((month, i) => (
                                              <option value={i} key={i}>
                                                {month}
                                              </option>
                                            ))}
                                        </select>
                                        {errors.month && touched.month && (
                                          <ErrorMessage
                                            error={errors.month}
                                            t={t}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-sm-3">
                                      <div className="search-bar-text-input mb-2">
                                        <select
                                          name="year"
                                          className={`form-control ${
                                            errors.year &&
                                            touched.year &&
                                            "error-message-input"
                                          }`}
                                          {...getFieldProps("year")}
                                        >
                                          {!values.year && (
                                            <option value="">Year</option>
                                          )}
                                          {getYearList().map((year) => (
                                            <option key={year} value={year}>
                                              {year}
                                            </option>
                                          ))}
                                        </select>
                                        {errors.year && touched.year && (
                                          <ErrorMessage
                                            error={errors.year}
                                            t={t}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-sm-2">
                                      <label
                                        htmlFor="cvv"
                                        className="form-label"
                                      >
                                        CVV
                                      </label>
                                    </div>
                                    <div className="col-sm-2">
                                      <div className="search-bar-text-input mb-2">
                                        <input
                                          type="password"
                                          name="cvv"
                                          className={`form-control ${
                                            errors.cvv &&
                                            touched.cvv &&
                                            "error-message-input"
                                          }`}
                                          maxLength={3}
                                          {...getFieldProps("cvv")}
                                        />
                                        {errors.cvv && touched.cvv && (
                                          <ErrorMessage
                                            error={errors.cvv}
                                            t={t}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="divFormRow mt-2">
                                    <input
                                      className="form-check-input"
                                      name="saveCard"
                                      id="saveCard"
                                      type="checkbox"
                                      autoComplete="corrent-password"
                                      onClick={() =>
                                     
                                       (prev)=>setSaveCard(!prev.saveCard)
                                      }
                                    />
                                    <label
                                      htmlFor="saveCard"
                                      className="rememberMe form-label ms-2"
                                    >
                                      {t("Public.AddFundsPopup.Save_Card?")}
                                    </label>
                                  </div>
                                  <div className="mt-2 d-flex justify-content-end">
                                    <button
                                      className="btn MyButton register-button"
                                      type="submit"
                                      disabled={!isValid}
                                    >
                                      {t("Public.AddFundsPopup.Make_Payment")}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          )}
                        </Formik>
                      )}
                    </div>
                    <PatientFooter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// class AddFunds extends Component {
//    constructor(props) {
//      super(props);
//      this.state = {
//        showAddCardForm: false,
//        saveCard: false,
//        success: "",
//        error: "",
//        timer: null,
//      };
//    }
 
//    componentWillUnmount() {
//      clearTimeout(this.state.timer);
//    }
 
//    toggleCardForm = () => {
//      this.setState((prev) => ({ showAddCardForm: !prev.showAddCardForm }));
//    };
 
//    getYearList = () => {
//      const currentYear = new Date().getFullYear();
//      const range = (start, stop, step) =>
//        Array.from(
//          { length: (stop - start) / step + 1 },
//          (_, i) => start + i * step
//        );
//      return range(currentYear, currentYear + 22, 1);
//    };
 
//    makePayment = (values) => {
//      if (this.state.saveCard) {
//        promiseWrapper(this.props.actions.saveCardInfo, {
//          modal: {
//            addFunds: values.amount.toString(),
//            creditCardNumber: values.cardNumber.toString(),
//            validUntil: `${values.month}/${values.year}`,
//            cvcCode: parseInt(values.cvv),
//            userGuid: localStorage.getItem(localStorageKeys.userId),
//          },
//        })
//          .then((data) => {
//            if (data.data.isSuccess)
//              this.setState({
//                success: data.data.message,
//                showAddCardForm: false,
//                timer: setTimeout(() => this.setState({ success: "" }), 2000),
//              });
//            else
//              this.setState({
//                error: data.data.errorMessage,
//                timer: setTimeout(() => this.setState({ error: "" }), 2000),
//              });
//          })
//          .catch((error) => console.log(error));
//      }
//    };
 
//    render() {
//      // console.log(Array.from({length:}));
//      const { t } = this.props;
//      const { showAddCardForm, error, success } = this.state;
//      return (
//        <div>
//          <PatientHeader />
//          <div className="main">
//            <div className="container-fluid">
//              <div className="row">
//                <PatientLeftPanel />
//                <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
//                  <div>
//                    <div className="row search-bar">
//                      <div className="py-4 search-bar-text w-100 bg-light">
//                        Your saved cards
//                      </div>
//                    </div>
//                    {error && (
//                      <div className="alert alert-danger" role="alert">
//                        {error}
//                      </div>
//                    )}
//                    {success && (
//                      <div className="alert alert-success" role="alert">
//                        {success}
//                      </div>
//                    )}
//                    <div className="row mt-3 d-flex justify-content-center">
//                      <div className="col-md-12 table-min-height">
//                        <div className="tableContainer table-responsive">
//                          <table className="table table-bordered appointmentTable">
//                            <thead>
//                              <tr className="new-patient-table-title">
//                                <th>Card Details</th>
//                                <th>Card Number</th>
//                                <th>Expiry Date</th>
//                                <th>Action</th>
//                              </tr>
//                            </thead>
//                            <tbody>
//                              <tr className="card-details">
//                                <td>
//                                  <img
//                                    src="assets/images/Mastercard_2019_logo.svg"
//                                    alt="master card"
//                                  />{" "}
//                                  Master Card
//                                </td>
//                                <td className="text-nowrap">
//                                  ****-****-****-1234
//                                </td>
//                                <td>12-32</td>
//                                <td>
//                                  <button className="btn btn-success">
//                                    Add fund
//                                  </button>
//                                </td>
//                              </tr>
//                            </tbody>
//                          </table>
//                          <div className="d-flex justify-content-end my-3">
//                            <button
//                              className="btn btn-success"
//                              onClick={() => this.toggleCardForm()}
//                            >
//                              {showAddCardForm
//                                ? "Cancel Fund Transfer"
//                                : "Add fund with new card"}
//                            </button>
//                          </div>
//                        </div>
//                        {showAddCardForm && (
//                          <Formik
//                            initialValues={{
//                              name: "",
//                              cardNumber: "",
//                              amount: "",
//                              month: "",
//                              year: "",
//                              cvv: "",
//                            }}
//                            onSubmit={(values) => this.makePayment(values)}
//                            validationSchema={addFundSchema}
//                          >
//                            {({
//                              handleSubmit,
//                              errors,
//                              touched,
//                              getFieldProps,
//                              values,
//                              isValid,
//                            }) => (
//                              <form onSubmit={handleSubmit} className="divForm">
//                                <div className="row search-bar">
//                                  <div className="py-4 search-bar-text w-100 bg-light  d-flex justify-content-center">
//                                    Add funds
//                                  </div>
//                                </div>
//                                <div className="d-flex justify-content-center my-2">
//                                  <div className="w-50">
//                                    <div className="row">
//                                      <div className="col-sm-6">
//                                        <label htmlFor="name">
//                                          Name on your card
//                                        </label>
//                                      </div>
//                                      <div className="col-sm-6">
//                                        <div className="search-bar-text-input mb-2">
//                                          <Field
//                                            type="text"
//                                            name="name"
//                                            id="name"
//                                            className={`form-control ${
//                                              errors.name &&
//                                              touched.name &&
//                                              "error-message-input"
//                                            }`}
//                                            // autoFocus
//                                          />
//                                          {errors.name && touched.name && (
//                                            <ErrorMessage
//                                              error={errors.name}
//                                              t={t}
//                                            />
//                                          )}
//                                        </div>
//                                      </div>
//                                      <div className="col-sm-6">
//                                        <label
//                                          htmlFor="cardNumber"
//                                          className="form-label"
//                                        >
//                                          {t(
//                                            "Public.AddFundsPopup.Credit_Card_Number"
//                                          )}
//                                        </label>
//                                      </div>
//                                      <div className="col-sm-6">
//                                        <div className="search-bar-text-input mb-2">
//                                          <input
//                                            type="number"
//                                            name="cardNumber"
//                                            className={`form-control ${
//                                              errors.cardNumber &&
//                                              touched.cardNumber &&
//                                              "error-message-input"
//                                            }`}
//                                            // maxLength={16}
//                                            {...getFieldProps("cardNumber")}
//                                          />
//                                          {errors.cardNumber &&
//                                            touched.cardNumber && (
//                                              <ErrorMessage
//                                                error={errors.cardNumber}
//                                                t={t}
//                                              />
//                                            )}
//                                        </div>
//                                      </div>
//                                      <div className="col-sm-6">
//                                        <label htmlFor="amount">Amount</label>
//                                      </div>
//                                      <div className="col-sm-6">
//                                        <div className="search-bar-text-input mb-2">
//                                          <Field
//                                            type="number"
//                                            name="amount"
//                                            className={`form-control ${
//                                              errors.amount &&
//                                              touched.amount &&
//                                              "error-message-input"
//                                            }`}
//                                          />
//                                          {errors.amount && touched.amount && (
//                                            <ErrorMessage
//                                              error={errors.amount}
//                                              t={t}
//                                            />
//                                          )}
//                                        </div>
//                                      </div>
//                                      <div className="col-sm-3">
//                                        <label className="form-label">
//                                          {t("Public.AddFundsPopup.Valid_Until")}
//                                        </label>
//                                      </div>
//                                      <div className="col-sm-2">
//                                        <div className="search-bar-text-input mb-2">
//                                          <select
//                                            name="month"
//                                            className={`form-control ${
//                                              errors.month &&
//                                              touched.month &&
//                                              "error-message-input"
//                                            }`}
//                                            {...getFieldProps("month")}
//                                          >
//                                            {!values.month && (
//                                              <option value="">month</option>
//                                            )}
//                                            {moment
//                                              .monthsShort()
//                                              .map((month, i) => (
//                                                <option value={i} key={i}>
//                                                  {month}
//                                                </option>
//                                              ))}
//                                          </select>
//                                          {errors.month && touched.month && (
//                                            <ErrorMessage
//                                              error={errors.month}
//                                              t={t}
//                                            />
//                                          )}
//                                        </div>
//                                      </div>
//                                      <div className="col-sm-3">
//                                        <div className="search-bar-text-input mb-2">
//                                          <select
//                                            name="year"
//                                            className={`form-control ${
//                                              errors.year &&
//                                              touched.year &&
//                                              "error-message-input"
//                                            }`}
//                                            {...getFieldProps("year")}
//                                          >
//                                            {!values.year && (
//                                              <option value="">Year</option>
//                                            )}
//                                            {this.getYearList().map((year) => (
//                                              <option key={year} value={year}>
//                                                {year}
//                                              </option>
//                                            ))}
//                                          </select>
//                                          {errors.year && touched.year && (
//                                            <ErrorMessage
//                                              error={errors.year}
//                                              t={t}
//                                            />
//                                          )}
//                                        </div>
//                                      </div>
//                                      <div className="col-sm-2">
//                                        <label
//                                          htmlFor="cvv"
//                                          className="form-label"
//                                        >
//                                          CVV
//                                        </label>
//                                      </div>
//                                      <div className="col-sm-2">
//                                        <div className="search-bar-text-input mb-2">
//                                          <input
//                                            type="password"
//                                            name="cvv"
//                                            className={`form-control ${
//                                              errors.cvv &&
//                                              touched.cvv &&
//                                              "error-message-input"
//                                            }`}
//                                            maxLength={3}
//                                            {...getFieldProps("cvv")}
//                                          />
//                                          {errors.cvv && touched.cvv && (
//                                            <ErrorMessage
//                                              error={errors.cvv}
//                                              t={t}
//                                            />
//                                          )}
//                                        </div>
//                                      </div>
//                                    </div>
//                                    <div className="divFormRow mt-2">
//                                      <input
//                                        className="form-check-input"
//                                        name="saveCard"
//                                        id="saveCard"
//                                        type="checkbox"
//                                        autoComplete="corrent-password"
//                                        onClick={() =>
//                                          this.setState((prev) => ({
//                                            saveCard: !prev.saveCard,
//                                          }))
//                                        }
//                                      />
//                                      <label
//                                        htmlFor="saveCard"
//                                        className="rememberMe form-label ms-2"
//                                      >
//                                        {t("Public.AddFundsPopup.Save_Card?")}
//                                      </label>
//                                    </div>
//                                    <div className="mt-2 d-flex justify-content-end">
//                                      <button
//                                        className="btn MyButton register-button"
//                                        type="submit"
//                                        disabled={!isValid}
//                                      >
//                                        {t("Public.AddFundsPopup.Make_Payment")}
//                                      </button>
//                                    </div>
//                                  </div>
//                                </div>
//                              </form>
//                            )}
//                          </Formik>
//                        )}
//                      </div>
//                      <PatientFooter />
//                    </div>
//                  </div>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//      );
//    }
//  }
 


const mapStoreToprops=(state, props)=> {
  return {};
}

const mapDispatchToProps=(dispatch) =>{
  const actions = bindActionCreators(exadoActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AddFunds));

const addFundSchema = object({
  name: string().required("ErrorMessages.field_requires"),
  cardNumber: number().required("ErrorMessages.field_requires"),
  amount: number()
    .required("ErrorMessages.field_requires")
    .positive("number must be positive"),
  month: number().required("ErrorMessages.field_requires"),
  year: number().required("ErrorMessages.field_requires"),
  cvv: number().required("ErrorMessages.field_requires"),
});
