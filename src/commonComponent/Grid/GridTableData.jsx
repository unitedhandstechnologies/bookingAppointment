import React from "react";

import GridTable from "./GridTable.jsx";

class GridTableData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GridData: [
                 
            ],
            headers: [
                { headerName: 'Product Id', field: 'ProdId', order: 1, },
                { headerName: 'Product Name', field: 'ProdName', order: 2 },
                { headerName: 'Price', field: 'Price', order: 5 },
                { headerName: 'Category Name', field: 'CategoryName', order: 4 },
                { headerName: 'Manufacturer', field: 'Manufacturer', order: 3 }
            ]
        };
    }

    render() {
        return (
            <GridTable TableHeader={this.state.headers} TableRow={this.state.GridData} />
        );
    }
}

export default GridTableData;

