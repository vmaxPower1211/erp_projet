import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal, onMount } from 'solid-js';
// import { Icon } from '@iconify-icon/solid';
import './table-kas.css'
import { DataArusKas } from '../../../../../api/planning/data-aruskas';



const TableDaftarKas = () => {
    const [RowData, setRowData] = createSignal([{}]);

    onMount(async () => {
        const kas = await DataArusKas("data kas waiting");
        console.log("data kas", kas);
        // setRowData(kas);
        const filteredKas = kas.filter(item => item.status === "Waiting" || item.status === "InProgress");
        setRowData(filteredKas);     
      })
      
    const columnDefs = [
        { field: "kas_ts", headerName: "Tanggal" },
        { field: "id" , headerName: "ID"},
        { field: "dari" },
        { field: "kepada" },
        { field: "biaya" },
        { field: "keterangan" },

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
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center', "margin-top":"10px" }}>
            <div style={{ height: '35vh', width: '65vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={RowData()} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                />
            </div>
        </div>
    );
};

export default TableDaftarKas;