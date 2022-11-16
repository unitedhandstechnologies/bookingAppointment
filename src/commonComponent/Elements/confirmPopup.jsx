import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from "react-bootstrap"

const ConfirmPopup = (props) => {

    const { show, setShow, title, warning, okBtnText, cancleBtnText, ImagePath, setClick } = props;
    const { t } = useTranslation();

    return (

        <Modal show={show} onHide={setShow} centered>
            <div className="reject-appointment" style={{ display: "block" }}>
                <div className="modal-dialog my-0" >
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="divForm my-4">
                                <div className="d-flex flex-column text-center">
                                    <div className="patient-forget-password-text">
                                        <p>{title}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <img src={ImagePath} className="img-fluid w-25" alt="Responsive img" />
                                </div>
                                <div className="text-center mb-5">
                                    <span>{warning}</span><br />
                                </div>
                                <div className="mt-3 text-center">
                                    <button className="btn MyButton reset-password-button w-25 me-5"
                                        onClick={() => setClick()}>
                                        {okBtnText}
                                    </button>
                                    <button className="btn MyButton reset-password-button w-25"
                                        onClick={() => {
                                            setShow(false)
                                        }}>
                                        {cancleBtnText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
};

export default ConfirmPopup;
