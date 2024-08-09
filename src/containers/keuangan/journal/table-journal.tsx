import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-journal.css'
import { DataJournal } from '../../../api/keuangan/data-journal';

const TableJournal: Component = () => {
    const [RowData, setRowData] = createSignal([{}]);

    onMount(async () => {
      const datajournal = await DataJournal("data coa master");
      console.log("datacoa", datajournal);
      setRowData(datajournal)
    })

    const columnDefs = [
        { field: 'id' , headerName: 'ID'}, // Menambahkan filter pada kolom "make"
        { field: 'faktur_ts', headerName: 'Faktur'}, 
        { field: 'journal_ts', headerName: 'Tanggal' }, // Menambahkan filter pada kolom "model"
        { field: 'income_id', headerName: 'Pemasukan' },
        { field: 'expense_id', headerName: 'Pengeluaran' },
        { field: 'keterangan' }
      ];  
    
      const rowData = [
        { id: '1-T300', faktur:'', tanggal:'', pengeluaran:'Loren Ipsum', pemasukan:'' }
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
            rowData={RowData()}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default TableJournal;
