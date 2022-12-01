import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoPatientActions from "../../../redux/exadoPatient/action";
import { promiseWrapper } from "../../../utility/common";
import { Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../../commonComponent/Elements/errorMessage";

const WithdrawPopup = (props) => {
  const { withdrawModal, setWithDrawModal, t, getWithdrawSuccessMsg } = props;
  const [error, setError] = useState("");

  const submitWithdrawalData = (values) => {
    const withdrawData = {
      withdrawGuid: null,
      patientGuid: localStorage.getItem("user-id"),
      name: values.userName,
      accountNumber: values.accountNumber,
      reenterAccountNumber: values.reAccountNumber,
      ifscCode: values.ifscCode,
      isSavingAccount: values.accountType === "Current" ? false : true,
      withdrawAmount: 0,
    };
    if (values.accountNumber === values.reAccountNumber) {
      promiseWrapper(props.patientactions.withdrawMoney, {
        withdrawData: withdrawData,
      })
        .then((data) => {
          if (data) {
            if (data.success) {
              const success = `${t(
                "Patient.WithdrawReqSuccessModal.Withdraw_Request_Success_Message"
              )}`;
              setWithDrawModal(false);
              getWithdrawSuccessMsg(success);
            } else {
              setError(data.data.errorMessage);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Modal show={withdrawModal} onHide={setWithDrawModal} centered>
        <div
          className="modify-modal"
          id="withdraw-modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog mt-0 mb-0">
            <div className="modal-content">
              <div className="modal-header modify-modal-header">
                <h5
                  className="modal-title modify-modal-title"
                  id="exampleModalLabel"
                >
                  {t("Patient.WithdrawPopup.Withdraw")}
                </h5>
                <button
                  type="button"
                  className="close modify-modal-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={setWithDrawModal}
                >
                  <img
                    src="assets/images/close-line.png"
                    alt="close-line.png"
                    className="img-fluid"
                  />
                </button>
              </div>
              <div className="modal-body modify-modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <Formik
                  initialValues={{
                    userName: "",
                    accountNumber: "",
                    reAccountNumber: "",
                    ifscCode: "",
                    accountType: "Saving",
                  }}
                  onSubmit={(values) => submitWithdrawalData(values)}
                  validationSchema={withdrawalSchema}
                >
                  {({
                    handleSubmit,
                    errors,
                    touched,
                    getFieldProps,
                    values,
                    handleChange,
                  }) => (
                    <form
                      className="appointment-details"
                      onSubmit={handleSubmit}
                    >
                      <label className="mb-2">
                        {t("Patient.WithdrawPopup.Your_Name")}
                      </label>
                      <div className="search-bar-text-input delete-account-textarea">
                        <input
                          type="text"
                          className={
                            errors.userName && touched.userName
                              ? "form-control error-message-input"
                              : "form-control mb-2"
                          }
                          name="userName"
                          {...getFieldProps("userName")}
                        />
                        {errors.userName && touched.userName && (
                          <ErrorMessage error={errors.userName} t={t} />
                        )}
                      </div>
                      <label className="mb-2">
                        {t("Patient.WithdrawPopup.Account_Number")}
                      </label>
                      <div className="search-bar-text-input delete-account-textarea">
                        <input
                          type="text"
                          className={
                            errors.accountNumber && touched.accountNumber
                              ? "form-control error-message-input"
                              : "form-control mb-2"
                          }
                          name="accountNumber"
                          {...getFieldProps("accountNumber")}
                        />

                        {errors.accountNumber && touched.accountNumber && (
                          <ErrorMessage error={errors.accountNumber} t={t} />
                        )}
                      </div>
                      <label className="mb-2">
                        {t("Patient.WithdrawPopup.Re_Enter_Account_Number")}
                      </label>
                      <div className="search-bar-text-input delete-account-textarea">
                        <input
                          type="text"
                          className={
                            errors.reAccountNumber && touched.reAccountNumber
                              ? "form-control error-message-input"
                              : "form-control mb-2"
                          }
                          name="reAccountNumber"
                          {...getFieldProps("reAccountNumber")}
                        />
                        {errors.reAccountNumber && touched.reAccountNumber && (
                          <ErrorMessage error={errors.reAccountNumber} t={t} />
                        )}
                      </div>
                      <label className="mb-2">
                        {t("Patient.WithdrawPopup.IFSC_Code")}
                      </label>
                      <div className="search-bar-text-input delete-account-textarea">
                        <input
                          type="text"
                          className={
                            errors.ifscCode && touched.ifscCode
                              ? "form-control error-message-input"
                              : "form-control mb-2"
                          }
                          name="ifscCode"
                          {...getFieldProps("ifscCode")}
                        />
                        {errors.ifscCode && touched.ifscCode && (
                          <ErrorMessage error={errors.ifscCode} t={t} />
                        )}
                      </div>
                      <div className="form-group">
                        <div className="search-bar-text-input">
                          <label className="form-label">
                            {t("Patient.WithdrawPopup.Account_Type")}
                          </label>
                          <select
                            className="selectpicker physician-servicies-select form-control"
                            title="Saving"
                            name="accountType"
                            value={values.accountType}
                            onChange={handleChange}
                          >
                            <option>{t("Patient.WithdrawPopup.Saving")}</option>
                            <option>
                              {t("Patient.WithdrawPopup.Current")}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="my-5 d-flex justify-content-around">
                        <button
                          type="submit"
                          data-toggle="modal"
                          data-dismiss="modal"
                          data-target="#withdraw-submit"
                          className="btn appointment-accept-btn"
                        >
                          {t("Patient.WithdrawPopup.Submit")}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

function mapStoreToprops(state, props) {
  return {
    appoinmentModel: state.ExadoPatient.appoinmentModel,
    docAppoinmentDetails: state.ExadoPatient.docAppoinmentDetails,
  };
}

function mapDispatchToProps(dispatch) {
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(WithdrawPopup));

const withdrawalSchema = Yup.object({
  userName: Yup.string().required("WithdrawPopup.name"),
  accountNumber: Yup.number()
    .typeError("ErrorMessages.account_numberic_value")
    .required("WithdrawPopup.accountNumber"),
  reAccountNumber: Yup.number()
    .typeError("ErrorMessages.account_numberic_value")
    .required("WithdrawPopup.renterAccountNumber")
    .oneOf(
      [Yup.ref("accountNumber"), null],
      "ErrorMessages.account_number_match"
    ),
  ifscCode: Yup.string().required("WithdrawPopup.ifsc"),
});
