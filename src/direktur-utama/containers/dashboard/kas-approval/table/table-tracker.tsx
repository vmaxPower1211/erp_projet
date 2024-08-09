import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { Component, createSignal, onMount } from 'solid-js';
// import { Icon } from '@iconify-icon/solid';
import './table-kas.css'
import { DataArusKas } from '../../../../../api/planning/data-aruskas';

interface TableTrackerProps {
    onRowClicked: (event: { data: any; node: any }) => void;
  }
  

const TableTracker: Component<TableTrackerProps> = (props) => {
    const [RowData, setRowData] = createSignal([{}]);

    onMount(async () => {
        const kas_tracker = await DataArusKas("data approval");
        console.log("data approval", kas_tracker);
        setRowData(kas_tracker)
      })

      function getCellStyle(params: { value: string; }) {
        if (params.value === 'Waiting') {
          return { color: '#FFC700' };
        } else if (params.value === 'Approved') {
          return { color: '#05FF00' };
        } else if (params.value === 'Rejected') {
            return { color: '#FF0000' };
        } else {
          return { color: '#860089' };
        }
      }    
      
      const columnDefs = [
        { field: "kas_ts", headerName: "Tanggal" },
        { field: "id" , headerName: "ID"},
        { field: "dari" },
        { field: "kepada" },
        { field: "biaya" },
        { field: "keterangan" },
        { field: "status", cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true } },
    ];
    // 
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


    const gridOptions = {
        pagination: true,
        paginationPageSize: 5,
        rowHeight: 33
      }

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center', "margin-top":"10px" }}>
            <div style={{ height: '35vh', width: '65vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={RowData()} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    gridOptions={gridOptions}
                    onRowClicked={props.onRowClicked}
                />
            </div>
        </div>
    );
};

export default TableTracker;