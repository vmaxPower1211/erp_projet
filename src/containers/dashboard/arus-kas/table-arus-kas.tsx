import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';


const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);
  
const [editedData, setEditedData] = createSignal(null);

const showEditPopup = (rowData: any) => {
  setEditedData(rowData);
  setIsEditPopupOpen(!isEditPopupOpen());
};

function CloseEditPopUp () {
  setIsEditPopupOpen (false);
}


const TableArusKas = () => {
    const columnDefs = [
        { field: "Tanggal" },
        { field: "ID" },
        { field: "Dari" },
        { field: "Kepada" },
        { field: "Biaya" },
        { field: "Keterangan" },

    ];

    const rowData = [
        {   
            "Tanggal": "02/2/23", 
            "ID": "ID:97174", 
            "Dari": "PT. Braincode", 
            "Kepada": "PT. Tus", 
            "Biaya": "Rp. 12.001.123",
            "Keterangan": "Lorem Ipsum"
        }, 
        {   
            "Tanggal": "02/2/23", 
            "ID": "ID:43756", 
            "Dari": "PT. Braincode", 
            "Kepada": "PT. Tus", 
            "Biaya": "Rp. 9.901.232 ",
            "Keterangan": "Lorem Ipsum"
        },   
        {   
            "Tanggal": "02/2/23", 
            "ID": "ID:70668", 
            "Dari": "PT. Braincode", 
            "Kepada": "PT. Tus", 
            "Biaya": "Rp. 124.000",
            "Keterangan": "Lorem Ipsum"
        },
        {   
            "Tanggal": "02/2/23", 
            "ID": "ID:43178", 
            "Dari": "PT. Braincode", 
            "Kepada": "PT. Tus", 
            "Biaya": "Rp. 243.123",
            "Keterangan": "Lorem Ipsum"
        },    

        ];

    const defaultColDef = {
        flex: 1,
    };

    // event listener
    const selectionChangedCallback = (e: any) => {
        console.log('selection has changed', e);
    };

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <div style={{ height: '50vh', width: '65vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={rowData} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                />
            </div>
        </div>
    );
};

export default TableArusKas;