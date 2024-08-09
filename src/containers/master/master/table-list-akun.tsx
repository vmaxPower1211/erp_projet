import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-master-list.css'
import { dataaccountmaster } from '../../../api/master/data-account-master';

const TableListAkun: Component = () => {

  const [RowData, setRowData] = createSignal([{"id":1}]);

  onMount(async () => {
    const accountmaster = await dataaccountmaster("data account master");
    console.log("accountread", accountmaster);
    setRowData(accountmaster)
  })

    const columnDefs = [
        { field: 'account_name', headerName: 'Nama'},
        { field: 'access', headerName: 'Akses'},
        {
          headerName: 'COA',
          valueGetter: (params) => {
            // Combine coa_kd and coa_name into a single string
            return `${params.data.coa_kd}  ${params.data.coa_name}`;
          }
        },
      ];
    
      const rowData = [
        { account_name: '1-1100', email: 'Kas', access:'Admin', kategori: 'Kas & Bank'},
        { account_name: '1-1200', email: 'Bank', access:'Admin', kategori: 'Akun Piutang'},
        { account_name: '1-1202', email: 'Bank Mandiri Giro', access:'Admin', kategori: 'Akun Piutang'},
        { account_name: '1-1300', email: 'Piutang Usaha', access:'Admin', kategori: 'Kas & Bank'},
        { account_name: '2-1100', email: 'Geodis', access:'Admin', kategori: 'Kas & Bank'},
        { account_name: '2-1100', email: 'Trimuda Nusantara Karya', access:'Admin', kategori: 'Kas & Bank'},
        { account_name: '2-1100', email: 'Hutang Usaha', access:'Admin', kategori: 'Kas & Bank'}
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        pagination: true,
        paginationPageSize: 7,
        rowHeight: 33
      }
  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'70vh', height:'24vw'}}>
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

export default TableListAkun;
