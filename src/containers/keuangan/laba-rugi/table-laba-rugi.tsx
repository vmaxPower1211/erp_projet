import { createSignal, type Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-laba-rugi.css'

const TableLabaRugi: Component = () => {

    const columnDefs = [
        { field: 'cd_coa' , headerName: 'Kode COA'}, // Menambahkan filter pada kolom "make"
        { field: 'namacoa', headerName: 'Nama COA' }, // Menambahkan filter pada kolom "model"
        { field: 'deskripsi' },
        { field: 'asetawal', headerName: 'Biaya Awal' }, 
        { field: 'asetakhir', headerName: 'Biaya Akhir' }, 
        { field: 'total' }
      ];
    
      const rowData = [
        { cd_coa: '1-T300', namacoa:'', deskripsi:'Loren Ipsum', asetawal:'', asetakhir:'',total:'' }
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        // domLayout: 'autoHeight' as DomLayoutType,
        pagination: true,
        paginationPageSize: 4,
        rowHeight: 40
      }

 

  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'140vh', height:'21vw'}}>
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

export default TableLabaRugi;
