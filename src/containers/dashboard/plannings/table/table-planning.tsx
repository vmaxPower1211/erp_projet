import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { data_detailplanning } from '../../../../api/planning/data-detailplanning';

const TablePlanning: Component = () => {

  const [RowData, setRowData] = createSignal([{}]);

  onMount(async () => {
    const data_planning = await data_detailplanning("data detail plan");
    console.log("data detail plan", data_planning);
    setRowData(data_planning)
  })

  const columnDefs = [
    { field: 'date', headerName: 'Tanggal'},
    { field: 'number_planning', headerName: 'Jumlah'}
  ];

  const rowData = [
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'},
    { Tanggal: '2016-08-90', Jumlah: '7'}
  ];


  const defaultColDef = {
    flex: 1,
    sortable: true,
  }

  const gridOptions = {
    pagination: true,
    paginationPageSize: 3,
    rowHeight: 33
  }

  return (
    <div>
      <div class="ag-theme-alpine" style={{width:'60vh', height:'30vh', "margin-top":"10px"}}>
        <AgGridSolid
            columnDefs={columnDefs}
            rowData={RowData()}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default TablePlanning;
