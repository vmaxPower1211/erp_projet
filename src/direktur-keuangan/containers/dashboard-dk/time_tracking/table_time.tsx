import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { type Component, createSignal, onMount } from 'solid-js';
import './table_time.css';
import { dataTimeTracking } from '../../../../api/time_tracking/dataTimeTracking';

interface TableTimeProps {
  onRowClicked: (event: { data: any; node: any }) => void;
}



const Table_time: Component<TableTimeProps> = (props) => {

  const [RowData, setRowData] = createSignal([{}]);

  onMount(async () => {
    const data_timeTracking = await dataTimeTracking("data time tracking");
    console.log("data time tracking", data_timeTracking);
    setRowData(data_timeTracking)
  })

  const columnDefs = [
    { field: 'approval_ts', headerName: 'Tanggal' },
    { field: 'pengajuan_id', headerName: 'ID Pengajuan' },
    { field: 'realization', headerName: 'Jumlah' },
    { field: 'status', headerName: 'Status' },
    { field: 'alasan', headerName: 'Alasan' }
  ];



  const defaultColDef = {
    flex: 1,
    sortable: true,
  }

  const gridOptions = {
    // domLayout: 'autoHeight' as DomLayoutType,
    pagination: true,
    paginationPageSize: 4,
    rowHeight: 40,

    // getRowStyle: function (params) {
    //   // Kondisi di mana baris harus transparan
    //   if (params.data.isTransparent) {
    //     return { background: 'transparent' };
    //   }
    //   // Kondisi lainnya
    //   return null; // Gunakan gaya CSS default
    // },

  }


  // function getCellStyle(params: { value: string; }) {
  //   if (params.value === 'Weekly') {
  //     return { color: '#FF6838' };
  //   } else if (params.value === 'Monthly') {
  //     return { color: '#00BA29' };
  //   } else {
  //     return { color: '#860089' };
  //   }
  // }

  // event listener
  const selectionChangedCallback = (e: any) => {
    console.log('selection has changed', e);
  };

  return (
    <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
      <div style={{ height: '45vh', width: '65vw' }} class="ag-theme-alpine glass-table">
        <AgGridSolid
          rowData={RowData()}
          columnDefs={columnDefs}
          rowSelection="single" // no signal, inline
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          onSelectionChanged={selectionChangedCallback} // listen for grid event
          onRowClicked={props.onRowClicked}
        />
      </div>
    </div>
  );
};

export default Table_time;