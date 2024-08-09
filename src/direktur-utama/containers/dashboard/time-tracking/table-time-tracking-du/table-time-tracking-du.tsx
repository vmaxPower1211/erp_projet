import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { Component, createSignal, onMount } from 'solid-js';
import { dataplanning } from '../../../../../api/planning/dataplanning';
// import { Icon } from '@iconify-icon/solid';
import './table-time-tracking-du.css'
import { dataTimeTracking } from '../../../../../api/time_tracking/dataTimeTracking';

interface TbTimeTrackingDUProps {
    onRowClicked: (event: { data: any; node: any }) => void;
  }
  

const TbTimeTrackingDU: Component<TbTimeTrackingDUProps> = (props) => {
    const [RowData, setRowData] = createSignal([{}]);

    onMount(async () => {
        const approval = await dataTimeTracking ("data approval");
        console.log("data approval", approval);
        setRowData(approval)
      })

      function getCellStyle(params: { value: string; }) {
        if (params.value === 'Weekly') {
          return { color: '#FF6838' };
        } else if (params.value === 'Monthly') {
          return { color: '#00BA29' };
        } else {
          return { color: '#860089' };
        }
      }    

      const columnDefs = [
        { field: 'approval_ts', headerName: 'Tanggal' },
        { field: 'pengajuan_id', headerName: 'ID Pengajuan' },
        { field: 'realization', headerName: 'Jumlah' },
        { field: 'status', headerName: 'Status' },
        { field: 'alasan', headerName: 'Alasan' }
      ];
    // const columnDefs = [
    //     { field: "id" , headerName: "ID"},
    //     { field: "entry_ts", headerName: "Tanggal" },
    //     { field: "description", headerName: "keterangan" },
    //     { field: "category", headerName: "Kategori" },
    //     { field: "planningtype", headerName: "Jenis" ,  cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true }},
    //     { field: "amount", headerName: "Jumlah" },
    //     { field: "status" },
    // ];

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
        paginationPageSize: 3,
        rowHeight: 33
      }

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
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

export default TbTimeTrackingDU;