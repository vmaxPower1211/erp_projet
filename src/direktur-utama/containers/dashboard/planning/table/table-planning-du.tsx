import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning-du.css';

const TablePlanningDU: Component = () => {

  const columnDefs = [
    { field: 'Tanggal'},
    { field: 'Jumlah'}
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
      <div class="ag-theme-alpine" style={{width:'60vh', height:'30vh'}}>
        <AgGridSolid
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default TablePlanningDU;
