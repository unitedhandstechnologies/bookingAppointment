import React from "react";

const dispNone = {
  display: "none",
};

class GridTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedHeader: [],
    };
  }

  componentWillMount() {
    this.state.orderedHeader = this.props.TableHeader.sort(
      this.GetSortOrder("order")
    );
  }

  componentDidMount() {
    window.$.extend(true, window.$.fn.dataTable.defaults, {
      pageLength: 10,
      bLengthChange: false,
    });

    let allowedSortCol = [];
    this.state.orderedHeader.forEach((v, idx) => {
      if ("orderable" in v) {
        allowedSortCol.push({ orderable: v.orderable });
      } else {
        allowedSortCol.push({ orderable: false });
      }
    });

    if (this.props != undefined)
      this.props.GridSeetingData["columns"] = allowedSortCol;

    if (this.props.isTableGrid == "True") {
      window.$(`#${this.props.gridID}`).dataTable({
        oLanguage: {
          // "sEmptyTable": '<div className="progress md-progress rimary-color-dark">< div className= "indeterminate" ></div></div >'
          sEmptyTable: "Fetching Data...",
        },
      });
    }
  }

  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  RCallAction(fval) {
    this.props.onGridAction(fval);
  }

  RView(fval) {
    this.props.onView(fval);
  }

  REdit(fval) {
    this.props.onEdit(fval);
  }

  RDelete(fval) {
    this.props.onDelete(fval);
  }

  RMakeActive(fval) {
    this.props.onMakeActive(fval);
  }

  RMakeDeactive(fval) {
    this.props.onMakeDeactive(fval);
  }
  onTRDRadioSelect(fval) {
    this.props.TRDRadioSelect(fval);
  }

  componentWillReceiveProps(props) {
    if (props.TableRow != null) {
      let table = window.$(`#${props.gridID}`).DataTable();
      window.$(`#${props.gridID} tbody`).empty();
      table.destroy();
    }
  }
  componentDidUpdate() {
    if (this.props.TableRow != null) {
      if (this.props.GridSeetingData != "") {
        window.$(`#${this.props.gridID}`).DataTable(this.props.GridSeetingData);
      } else {
        window.$(`#${this.props.gridID}`).DataTable({
          order: [[0, "desc"]],
        });
      }
    }
  }

  render() {
    return (
      <div className="pr-fullwidth">
        <table
          id={this.props.gridID}
          className="table table-striped table-bordered table-hover"
        >
          <thead>
            <tr>
              {this.state.orderedHeader.map((h, i) => (
                <TableHeader
                  key={h.field}
                  keyHead={h.type}
                  header={h.headerName}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.TableRow != null &&
              this.props.TableRow.map((prd, idx) => (
                <TableRow
                  onRDCallAction={this.RCallAction.bind(this)}
                  onRDView={this.RView.bind(this)}
                  onRDEdit={this.REdit.bind(this)}
                  onRDDelete={this.RDelete.bind(this)}
                  onRDMakeActive={this.RMakeActive.bind(this)}
                  onRDMakeDeactive={this.RMakeDeactive.bind(this)}
                  TRDRadioSelect={this.onTRDRadioSelect.bind(this)}
                  key={idx}
                  row={prd}
                  headers={this.props.TableHeader}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.keyHead != "hidden") {
      return <th>{this.props.header}</th>;
    } else {
      return <th style={dispNone}>{this.props.header}</th>;
    }
  }
}

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  TRCallAction(fval) {
    this.props.onRDCallAction(fval);
  }

  TRView(fval) {
    this.props.onRDView(fval);
  }

  TREdit(fval) {
    this.props.onRDEdit(fval);
  }

  TRDelete(fval) {
    this.props.onRDDelete(fval);
  }

  TRMakeActive(fval) {
    this.props.onRDMakeActive(fval);
  }

  TRMakeDeactive(fval) {
    this.props.onRDMakeDeactive(fval);
  }
  TRDRadioSelect(fval) {
    this.props.TRDRadioSelect(fval);
  }
  onRadionSelect(fval) {
    this.props.TRDRadioSelect(fval);
  }

  render() {
    return (
      <tr>
        {this.props.headers.map((v, idx) => (
          <TableRowData
            onTRDCallAction={this.TRCallAction.bind(this)}
            onTRDView={this.TRView.bind(this)}
            onTRDEdit={this.TREdit.bind(this)}
            onTRDDelete={this.TRDelete.bind(this)}
            //TRDRadioSelect={this.TRDRadioSelect.bind(this)}
            onTRDMakeActive={this.TRMakeActive.bind(this)}
            onTRDMakeDeactive={this.TRMakeDeactive.bind(this)}
            onTRDRadioSelect={this.onRadionSelect.bind(this)}
            key={idx}
            row={this.props.row}
            headfield={v.field}
            headType={v.type}
            headValue={v.colValue}
          />
        ))}
      </tr>
    );
  }
}

class TableRowData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rdata: null,
    };
  }

  componentWillMount() {
    let tempdata;
    if (this.props.headType == "int") {
      tempdata = this.props.row[this.props.headfield];
    } else if (this.props.headType == "hidden") {
      tempdata = this.props.row[this.props.headfield];
    } else if (this.props.headType == "double") {
      tempdata = Number(this.props.row[this.props.headfield]);
    } else if (this.props.headType == "string") {
      tempdata = this.props.row[this.props.headfield].toString();
    } else if (this.props.headType == "bool") {
      tempdata = this.props.row[this.props.headfield]
        .toString()
        .replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } else if (this.props.headType == "date") {
      var dateFormat = require("dateformat");
      tempdata = dateFormat(
        this.props.row[this.props.headfield],
        "dd-mm-yyyy hh:mm:ss"
      );
    } else if (this.props.headType == "status") {
      tempdata = this.props.row[this.props.headfield].toString();
    } else if (this.props.headType == "action") {
      if (this.props.headValue == "" || this.props.headValue == null) {
        tempdata = "action";
      } else {
        tempdata = this.props.headValue;
      }
    } else if (this.props.headType == "View") {
      tempdata = "view";
    } else if (this.props.headType == "Edit") {
      tempdata = "edit";
    } else if (this.props.headType == "Delete") {
      tempdata = "delete";
    } else if (this.props.headType == "ViewEditDelete") {
      tempdata = "vieweditdelete";
    } else if (this.props.headType == "ViewEdit") {
      tempdata = "viewedit";
    } else if (this.props.headType == "ViewDelete") {
      tempdata = "viewdelete";
    } else if (this.props.headType == "EditDelete") {
      tempdata = "editdelete";
    } else if (this.props.headType == "MakeActive") {
      tempdata = "makeactive";
    } else if (this.props.headType == "MakeDeactive") {
      tempdata = "makedeactive";
    } else if (this.props.headType == "checkbox") {
      tempdata = "checkbox";
    } else if (this.props.headType == "expand") {
      tempdata = "expand";
    } else if (this.props.headType == "Serial") {
      tempdata = this.props.row[this.props.headfield].toString();
    }
    // Sanjay Jun 25 2019
    else if (this.props.headType == "Radio") {
      let colvalues = this.props.headfield.split(",");
      if (colvalues.length > 0) {
        tempdata = this.props.row[colvalues[0]].toString();
      } else {
        tempdata = this.props.row[this.props.headfield].toString();
      }
    } else if (this.props.headType == "Percent") {
      tempdata = this.props.row[this.props.headfield].toString();
    } else {
      tempdata = this.props.row[this.props.headfield].toString();
    }
    this.state.rdata = tempdata;
  }

  TRDCallAction() {
    let head = this.props.headfield.substring(
      0,
      this.props.headfield.length - 2
    );
    this.props.onTRDCallAction(this.props.row[head]);
  }

  TRDView() {
    let head = this.props.headfield.substring(
      0,
      this.props.headfield.length - 2
    );
    this.props.onTRDView(this.props.row[head]);
  }

  TRDEdit() {
    let head = this.props.headfield.substring(
      0,
      this.props.headfield.length - 2
    );
    this.props.onTRDEdit(this.props.row[head]);
  }

  TRDDelete() {
    let head = this.props.headfield.substring(
      0,
      this.props.headfield.length - 2
    );
    this.props.onTRDDelete(this.props.row[head]);
  }

  TRDMakeActive() {
    let head = this.props.headfield.substring(
      0,
      this.props.headfield.length - 2
    );
    this.props.onTRDDelete(this.props.row[head]);
  }

  TRDMakeDeactive() {
    let head = this.props.headfield.substring(
      0,
      this.props.headfield.length - 2
    );
    this.props.onTRDDelete(this.props.row[head]);
  }
  //Sanjay Jun 25 2018
  TRDRadioClick(evnt) {
    let itemid;
    let colvalues = this.props.headfield.split(",");
    if (colvalues.length > 0) {
      itemid = this.props.row[colvalues[0]].toString();
    } else {
      itemid = this.props.row[this.props.headfield].toString();
    }
    this.props.onTRDRadioSelect(itemid);
  }
  onRadiochange(evnt) {}

  render() {
    if (this.props.headType == "action") {
      return (
        //<td onClick={this.TRDCallAction.bind(this)} dangerouslySetInnerHTML={{__html: this.state.rdata}} />
        <td>
          <a onClick={this.TRDCallAction.bind(this)}>{this.state.rdata}</a>
        </td>
      );
    } else if (this.props.headType == "expand") {
      return (
        <td className="details-control">
          <i className="fa fa-expand" aria-hidden="true"></i>
        </td>
      );
    } else if (this.props.headType == "hidden") {
      return <td style={dispNone}>{this.state.rdata}</td>;
    } else if (this.props.headType == "View") {
      return (
        <td>
          <a
            onClick={this.TRDView.bind(this)}
            title="View"
            className="fa fa-eye"
          ></a>
        </td>
      );
    } else if (this.props.headType == "Edit") {
      return (
        <td>
          <a
            onClick={this.TRDEdit.bind(this)}
            title="Edit"
            className="fa fa-edit"
          ></a>
        </td>
      );
    } else if (this.props.headType == "Delete") {
      return (
        <td>
          <a
            onClick={this.TRDDelete.bind(this)}
            title="Delete"
            className="fa fa-trash"
          ></a>
        </td>
      );
    } else if (this.props.headType == "ViewEditDelete") {
      return (
        <td>
          <a
            onClick={this.TRDView.bind(this)}
            title="View"
            className="fa fa-eye"
          ></a>
          <a
            onClick={this.TRDEdit.bind(this)}
            title="Edit"
            className="fa fa-edit"
          ></a>
          <a
            onClick={this.TRDDelete.bind(this)}
            title="Delete"
            className="fa fa-trash"
          ></a>
        </td>
      );
    } else if (this.props.headType == "ViewEdit") {
      return (
        <td>
          <a
            onClick={this.TRDView.bind(this)}
            title="View"
            className="fa fa-eye"
          ></a>
          <a
            onClick={this.TRDEdit.bind(this)}
            title="Edit"
            className="fa fa-edit"
          ></a>
        </td>
      );
    } else if (this.props.headType == "ViewDelete") {
      return (
        <td>
          <a
            onClick={this.TRDView.bind(this)}
            title="View"
            className="fa fa-eye"
          ></a>
          <a
            onClick={this.TRDDelete.bind(this)}
            title="Delete"
            className="fa fa-trash"
          ></a>
        </td>
      );
    } else if (this.props.headType == "EditDelete") {
      return (
        <td>
          <a
            onClick={this.TRDEdit.bind(this)}
            title="Edit"
            className="fa fa-edit"
          ></a>
          <a
            onClick={this.TRDDelete.bind(this)}
            title="Delete"
            className="fa fa-trash"
          ></a>
        </td>
      );
    } else if (this.props.headType == "MakeActive") {
      return (
        <td>
          <a
            onClick={this.TRDMakeActive.bind(this)}
            title="MakeActive"
            className="fa fa-eye"
          ></a>
        </td>
      );
    } else if (this.props.headType == "MakeDeactive") {
      return (
        <td>
          <a
            onClick={this.TRDMakeDeactive.bind(this)}
            title="MakeDeactive"
            className="fa fa-eye-slash"
          ></a>
        </td>
      );
    } else if (this.props.headType == "checkbox") {
      return (
        <td className="checkboxtd">
          <input
            onClick={this.TRDCallAction.bind(this)}
            type="checkbox"
            value={
              this.props.row[
                this.props.headfield.substring(
                  0,
                  this.props.headfield.length - 2
                )
              ]
            }
            id={
              this.props.row[
                this.props.headfield.substring(
                  0,
                  this.props.headfield.length - 2
                )
              ]
            }
            name={this.props.headfield}
          ></input>
        </td>
      );
    } else if (this.props.headType == "Serial") {
      return (
        <td>
          <span>{this.state.rdata}</span>
        </td>
      );
    } else if (this.props.headType == "status") {
      return (
        <td>
          <span className={this.state.rdata.toLowerCase()}>
            {this.state.rdata}
          </span>
        </td>
      );
    }
    //Sanjay Jun 25 2019
    else if (this.props.headType == "Radio") {
      let ischecked = false;
      let colvalues = this.props.headfield.split(",");
      if (colvalues.length > 0) {
        ischecked = this.props.row[colvalues[1]];
      }
      // let d = this.props.row[this.props.headfield]
      return (
        <td>
          {" "}
          <input
            onClick={this.TRDRadioClick.bind(this)}
            onChange={this.onRadiochange}
            checked={ischecked}
            type="radio"
            name="Group"
          />
        </td>
      );
    } else if (this.props.headType == "Percent") {
      return <td>{this.state.rdata}%</td>;
    } else {
      return <td>{this.state.rdata}</td>;
    }
  }
}

GridTable.defaultProps = {
  gridID: "gridTable",
  isTableGrid: "False",
};

export default GridTable;
