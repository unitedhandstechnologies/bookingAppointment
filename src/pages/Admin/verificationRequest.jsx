import React from 'react';
import { toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';
import exadoAdminActions from '../../redux/exadoAdmin/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { promiseWrapper } from '../../utility/common';
import AdminHeader from './adminHeader';
import AdminLeftPanel from './../../commonComponent/LeftPanel/leftPanel';
import RejectPopup from './rejectPopup';




class VerificationRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            rejectPopup: false,
            DoctorUserID: "",
            buttonAction: 0,
            DoctorProfile: {
                "userGuid": "",
                "email": "",
                "firstName": "",
                "lastName": "",
                "phone": "",
                "gender": "",
                "country": "",
                "profileImage": "",
                "doB": "",
                "preferredLanguages": [
                    ""
                ],
                "physicianServices": [
                    {
                        "physicianService": "",
                        "verificationType": ""
                    }
                ],
                "ownPractice": true,
                "practiceNumber": "",
                "practiceDocuments": [
                    {
                        "fileGuid": "",
                        "docName": "",
                        "docURL": "",
                        "isDeleted": ""
                    }
                ],
                "clinicName": "",
                "clinicContact": "",
                "clinicEmail": "",
                "clinicAddress": "",
                "city": "",
                "state": "",
                "zip": "",
                "country": "",
                "educationModel": [
                    {
                        "doctorEducationGuid": "",
                        "degreeTitle": "",
                        "collage": "",
                        "passingYear": "",
                        "verificationType": "",
                        "educationCertificates": [
                            {
                                "fileGuid": "",
                                "docName": "",
                                "docURL": "",
                                "isDeleted": ""
                            }
                        ]
                    }
                ],
                "experienceModel": [
                    {
                        "doctorExperienceGuid": "",
                        "startDate": "",
                        "endDate": "",
                        "startDateYear": "",
                        "endDateYear": "",
                        "organizationName": "",
                        "verificationType": ""
                    }
                ]
            }
        };
    }

    componentDidMount() {
        promiseWrapper(this.props.actions.getDoctorViewDetails, { userGuid: this.props.match.params.userGuid }).then((jsdata) => {
            this.setState({ DoctorProfile: jsdata });
        });
    }

    Approve() {
        promiseWrapper(this.props.actions.verifyDoctorProfile, { userGuid: this.state.DoctorProfile.userGuid, verificationType: 3, cancelReason: "" }).then((jsdata) => {
            if (jsdata.isSuccess == true) {
                toast.success(jsdata.message);
                this.props.history.push("/admin-dashboard");
            }
            else {
                toast.error(jsdata.message);
            }
        });
    }

    togglePop = (num) => {
        this.setState({ buttonAction: num }, () => {
            this.setState({
                rejectPopup: !this.state.rejectPopup
            });
        });
    };

    render() {
        return (
            <div>
                <AdminHeader />
                <div className="main">
                    <div className="container-fluid">
                        <div className="row">
                            <AdminLeftPanel />
                            <div className="col-md-12 col-sm-12 col-lg-10 admin-mainRightPanel">
                                <div className="row search-bar">
                                    <div className="py-4 search-bar-text w-100 bg-light">Verification Request</div>
                                </div>
                                <div className="admin-mainRightPanel-content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="admin-doctor-profile-container d-flex align-items-center w-100">
                                                <div className="admin-doctor-profile d-flex justify-content-center align-items-center">
                                                    <img src={this.state.DoctorProfile.profileImage} style={{ borderRadius: "50px" }} />
                                                </div>
                                                <div className="admin-doctor-name">
                                                    {this.state.DoctorProfile.firstName === "" || this.state.DoctorProfile.firstName == null ? "---" : this.state.DoctorProfile.firstName}&nbsp;
                                                    {this.state.DoctorProfile.lastName === "" || this.state.DoctorProfile.lastName == null ? "---" : this.state.DoctorProfile.lastName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="admin-doctor-title mb-2 p-0">Personal Information</div>
                                        <hr />
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="mb-2">Email:</div>
                                                    <div className="mb-2">First Name:</div>
                                                    <div className="mb-2">Supported Languages for consultations:</div>
                                                    <div className="mb-2">Sex:</div>
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.email === "" || this.state.DoctorProfile.email == null ? "---" : this.state.DoctorProfile.email}</div>
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.firstName === "" || this.state.DoctorProfile.firstName == null ? "---" : this.state.DoctorProfile.firstName}</div>
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.preferredLanguages === null && this.state.DoctorProfile.preferredLanguages.length < 1 ? "---" : this.state.DoctorProfile.preferredLanguages.join(", ")}</div>
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.gender === "" || this.state.DoctorProfile.gender == null ? "---" : this.state.DoctorProfile.gender}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="mb-2">Mobile:</div>
                                                    <div className="mb-2">Last Name:</div>
                                                    <div className="mb-2">Country:</div>
                                                    <div className="mb-2">Date of Birth:</div>
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.phone === "" || this.state.DoctorProfile.phone == null ? "---" : this.state.DoctorProfile.phone}</div>
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.lastName === "" || this.state.DoctorProfile.lastName == null ? "---" : this.state.DoctorProfile.lastName}</div>
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.country === "" || this.state.DoctorProfile.country == null ? "---" : this.state.DoctorProfile.country}</div>
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.doB === "" || this.state.DoctorProfile.doB == null ? "---" : this.state.DoctorProfile.doB.substr(0, 10)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mt-5">
                                        <div className="admin-doctor-title mb-2 p-0">Additional Information</div>
                                        <hr />
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    Physician Services:</div>
                                                <div className="col-md-9">
                                                    <div>
                                                        {this.state.DoctorProfile.physicianServices !== null && this.state.DoctorProfile.physicianServices.length > 0 &&
                                                            this.state.DoctorProfile.physicianServices.sort((a, b) => (a.verificationType > b.verificationType) ? 1 : -1).map((e, idx) => (
                                                                <div className="row">
                                                                    <div className="col-md-7">
                                                                        <div className="mb-2">
                                                                            <div className="d-flex">
                                                                                {e.physicianService} &nbsp;<span style={{ color: "#FF0000" }}>{e.verificationType === 2 ? "[Not Verified]" : ""}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="mb-2">Own Practice:</div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.ownPractice === true ? "Yes" : "No"}</div>
                                                </div>
                                            </div>
                                            {this.state.DoctorProfile.ownPractice === true &&
                                                <div>
                                                    <div className="row">
                                                        <div className="col-md-3">Practice Number:</div>
                                                        {this.state.DoctorProfile.ownPractice === true &&
                                                            <div className="col-md-9">
                                                                <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.practiceNumber}</div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3">License</div>
                                                        <div className="col-md-9">
                                                            {this.state.DoctorProfile.practiceDocuments !== null && this.state.DoctorProfile.practiceDocuments.length > 0 &&
                                                                this.state.DoctorProfile.practiceDocuments.map((e, idx) => (
                                                                    <div className="row">
                                                                        <div className="col-md-7">
                                                                            <div className="mb-2">
                                                                                <div className="d-flex">
                                                                                    <div style={{ color: "#4EC1BA" }}><i className="far fa-file"></i></div>
                                                                                    <a className="mx-2" target="_blank" href={e.docURL}>{e.docName}</a> <span style={{ color: "#FF0000" }}>{e.isDeleted ? "[DELETED]" : ""}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            }



                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-2 admin-doctor-value mt-5">Education</div>
                                            <div className="admin-ducation-info">
                                                {this.state.DoctorProfile.educationModel !== null && this.state.DoctorProfile.educationModel.length > 0 &&
                                                    this.state.DoctorProfile.educationModel.sort((a, b) => (a.verificationType > b.verificationType) ? -1 : 1).map((d, idx) => (
                                                        <div>
                                                            <div>{d.degreeTitle} - {d.collage} -- {d.passingYear} <span style={{ color: "#FF0000" }}>{d.verificationType === 2 ? "[Not Verified]" : ""}</span></div>
                                                            <div>
                                                                {d.educationCertificates !== null && d.educationCertificates.length > 0 &&
                                                                    d.educationCertificates.map((e, idx) => (
                                                                        <div className="row">
                                                                            <div className="col-md-7">
                                                                                <div className="mb-2">
                                                                                    <div className="d-flex">
                                                                                        <div style={{ color: "#4EC1BA" }}><i className="far fa-file"></i></div>
                                                                                        <a className="mx-2" target="_blank" href={e.docURL}>{e.docName}</a> <span style={{ color: "#FF0000" }}>{e.isDeleted ? "[DELETED]" : ""}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {this.state.DoctorProfile.educationModel === null && this.state.DoctorProfile.experienceModel.length < 1 &&
                                                    <div>---</div>
                                                }
                                            </div>

                                            <div className="mb-2 admin-doctor-value mt-5">Current and passed work places <span>( ex: Hospitals, clinics, etc)</span></div>
                                            <ul className="admin-ducation-info">
                                                {this.state.DoctorProfile.experienceModel !== null && this.state.DoctorProfile.experienceModel.length > 0 &&
                                                    this.state.DoctorProfile.experienceModel.sort((a, b) => (a.verificationType > b.verificationType) ? -1 : 1).map((d, idx) => (
                                                        <li>{d.startDateYear} - {d.endDateYear} -- {d.organizationName} <span style={{ color: "#FF0000" }}>{d.verificationType === 2 ? "[Not Verified]" : ""}</span></li>
                                                    ))
                                                }
                                                {this.state.DoctorProfile.experienceModel === null && this.state.DoctorProfile.experienceModel.length < 1 &&
                                                    <li>---</li>
                                                }
                                            </ul>
                                        </div>
                                        <div className="row pb-5 mt-5">
                                            <div className="admin-doctor-title mb-2 p-0">Practice info</div>
                                            <hr />
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="mb-2">Practice Name:</div>
                                                        <div className="mb-2">Practice Contact Number:</div>
                                                        <div className="mb-2">City:</div>
                                                        <div className="mb-2">Zip:</div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.clinicName === "" || this.state.DoctorProfile.clinicName == null ? "---" : this.state.DoctorProfile.clinicName}</div>
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.clinicContact === "" || this.state.DoctorProfile.clinicContact == null ? "---" : this.state.DoctorProfile.clinicContact}</div>
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.city === "" || this.state.DoctorProfile.city == null ? "---" : this.state.DoctorProfile.city}</div>
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.zip === "" || this.state.DoctorProfile.zip == null ? "---" : this.state.DoctorProfile.zip}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="mb-2">Practice Email Address:</div>
                                                        <div className="mb-2">Practice Address:</div>
                                                        <div className="mb-2">State:</div>
                                                        <div className="mb-2">Country:</div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.clinicEmail === "" || this.state.DoctorProfile.clinicEmail == null ? "---" : this.state.DoctorProfile.clinicEmail}</div>
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.clinicAddress === "" || this.state.DoctorProfile.clinicAddress == null ? "---" : this.state.DoctorProfile.clinicAddress}</div>
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.state === "" || this.state.DoctorProfile.state == null ? "---" : this.state.DoctorProfile.state}</div>
                                                        <div className="mb-2 admin-doctor-value">{this.state.DoctorProfile.country === "" || this.state.DoctorProfile.country == null ? "---" : this.state.DoctorProfile.country}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="button" onClick={this.Approve.bind(this)} className="btn admin-doctor-approve-button px-4">Approve</button>
                                            <button type="button" onClick={this.togglePop.bind(this, 5)} className="btn admin-doctor-approve-button px-4">Need Additional Info</button>
                                            <button type="button" onClick={this.togglePop.bind(this, 4)} className="btn admin-doctor-reject-button px-4">Reject</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.rejectPopup ? <RejectPopup buttonActionValue={this.state.buttonAction}
                    toggle={this.togglePop}
                    docName={this.state.DoctorProfile.firstName === "" || this.state.DoctorProfile.firstName == null ? "---" : this.state.DoctorProfile.firstName + " " +
                        this.state.DoctorProfile.lastName === "" || this.state.DoctorProfile.lastName == null ? "---" : this.state.DoctorProfile.lastName}
                    docUserId={this.state.DoctorProfile.userGuid === "" || this.state.DoctorProfile.userGuid == null ? "---" : this.state.DoctorProfile.userGuid} /> : null}
            </div>
        )
    }
}

function mapStoreToprops(state, props) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators(exadoAdminActions, dispatch);
    return { actions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(VerificationRequest));