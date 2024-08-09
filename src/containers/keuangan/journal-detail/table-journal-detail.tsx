import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-journal-detail.css'
import { DataJournalDetail } from '../../../api/keuangan/data-journal-detail';

const TableJournalDetail: Component = () => {
  const [RowData, setRowData] = createSignal([{}]);

    onMount(async () => {
      const datajournal = await DataJournalDetail("data coa master");
      console.log("datacoa", datajournal);
      setRowData(datajournal)
    })

    const columnDefs = [
        { field: 'journal_id', headerName: 'ID'}, // Menambahkan filter pada kolom "make"
        { field: 'faktur_ts', headerName: 'Faktur'},
        { field: 'coa_id', headerName: 'COA' }, // Menambahkan filter pada kolom "model"
        { field: 'debit' },
        { field: 'credit' },
        { field: 'info' },
        { field: 'balance' },
        { field: 'keterangan' }
      ];
    
      const rowData = [
        { id: '1-T300', COA:'', debit:'Loren Ipsum', kredit:'' , info:'', balance:''}
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

export default TableJournalDetail;
