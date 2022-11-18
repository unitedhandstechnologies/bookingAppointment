import { all } from "redux-saga/effects";
import expadoSaga from "./exado/saga";
import expadoDocSaga from "./exadoDoc/saga";
import expadoAdminSaga from "./exadoAdmin/saga";
import expadoPatientSaga from "./exadoPatient/saga";

export default function* rootSaga() {
  yield all([
    expadoSaga(),
    expadoDocSaga(),
    expadoAdminSaga(),
    expadoPatientSaga(),
  ]);
}
