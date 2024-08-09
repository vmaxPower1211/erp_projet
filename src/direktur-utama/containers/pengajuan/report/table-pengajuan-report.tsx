import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-pengajuan-report.css';
import { dataplanning } from '../../../../api/planning/dataplanning';

interface TablePengajuanReportDUProps {
    onRowClicked: (event: { data: any; node: any }) => void;
  }

const TablePengajuanReportDU: Component<TablePengajuanReportDUProps> = (props) => {

  const [RowData, setRowData] = createSignal([{}]);

  onMount(async () => {
    const data_planning = await dataplanning("data detail plan");
    console.log("data detail plan", data_planning);
    setRowData(data_planning)
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
    { field: 'id', headerName: 'NO'},
    { field: 'entry_ts', headerName: 'Tanggal'},
    { field: 'description', headerName: 'Keterangan'},
    { field: 'category', headerName: 'Kategori'},
    { field: 'planningtype', headerName: 'Jenis', cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true }},
    { field: 'amount', headerName: 'Jumlah'},
    { field: 'status'},
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
    rowHeight: 35
  }

  return (
    <div>
      <div class="ag-theme-alpine" style={{width:'140vh', height:'28vh', "margin":"auto"}}>
        <AgGridSolid
            columnDefs={columnDefs}
            rowData={RowData()}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            onRowClicked={props.onRowClicked}
        />
      </div>
    </div>
  );
};

export default TablePengajuanReportDU;
