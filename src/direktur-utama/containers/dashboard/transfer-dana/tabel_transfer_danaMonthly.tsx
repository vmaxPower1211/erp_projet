import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal, type Component, onMount, onCleanup, createEffect } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tabel_transfer_dana.css';
import Form_transfer from './form_transfer';
import { dataplanning } from '../../../../api/planning/dataplanning';
import { DataMonthlyPengajuan } from '../../../../api/planning/new-pengajuan/new-pengajuan';

const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);
  
const [editedData, setEditedData] = createSignal(null);

const showEditPopup = (rowData: any) => {
  setEditedData(rowData);
  setIsEditPopupOpen(!isEditPopupOpen());
  setEvidence(rowData.evidence);
};

const [evidence, setEvidence] = createSignal('');

function CloseEditPopUp () {
  setIsEditPopupOpen (false);
}


const Tabel_transfer_danaMonthly = () => {
    const [RowData, setRowData] = createSignal([{}]);
    const [selectedRow, setSelectedRow] = createSignal(null);
    const [FormTransfer, setFormTransfer] = createSignal(null);


    onMount(async () => {
        const data_planning = await DataMonthlyPengajuan("data planning dashboard dan modul pengajuan");
        const approvedRows = data_planning.filter(row => row.status === 'Approved' && row.tipepengajuan === 'Monthly');
        console.log("dataplanning", approvedRows);
        setRowData(approvedRows);
    })

    const formatRupiah = (value) => {
        const numericValue = Number(value);

        if (isNaN(numericValue)) {
            return value;
        }

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(numericValue);
    };

    const columnDefs = [
        { field: 'id', headerName: "ID" },
        { field: 'entry_ts', headerName: "Tanggal" },
        { field: 'namapengajuan', headerName: "Nama Pengajuan" },
        { field: 'tipepengajuan', headerName: "Kategori", cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true }  },
        { field: 'total', headerName: "Jumlah", valueFormatter: (params) => formatRupiah(params.value) },
        { field: 'status', headerName: "Status" },
        {
            field: "transfer", headerName: "", cellRenderer: (params: any) => {
                return (
                    <div style={{ "justify-content": "center", "align-items": "center", "margin-right": "20px" }}>
                        <button onClick={() => showEditPopup(params.data)} style={{ "background-color": "#6E49E9", "justify-content": "center", "border-radius": "10px", "width": "5.5rem", "height": "2.3rem", "color": "white", "align-items": "center" }}>Transfer &gt</button>
                        {params.value}
                    </div>
                );
            }
        }
    ];

    const defaultColDef = {
        flex: 1,
    };

    // event listener
    const selectionChangedCallback = (e: any) => {
        console.log('selection has changed', e);
    };

    function getCellStyle(params: { value: string; }) {
        if (params.value === 'Weekly') {
            return { color: '#FF6838' };
        } else if (params.value === 'Monthly') {
            return { color: '#00BA29' };
        } else {
            return { color: '#860089' };
        }
    }


    const rowClassRules = {
        'evidence-present': (params) => params.data.evidence, // Menambahkan kelas 'evidence-present' jika evidence ada
    };

    const gridOptions = {
        // domLayout: 'autoHeight' as DomLayoutType,
        pagination: true,
        paginationPageSize: 4,
        rowHeight: 40
    }



    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <div style={{ height: '50vh', width: '65vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={RowData()} // use signal
                    columnDefs={columnDefs} // no signal
                    defaultColDef={defaultColDef}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                    rowClassRules={rowClassRules} 
                    rowSelection="multiple"
                    rowMultiSelectWithClick={true}
                    gridOptions={gridOptions}
                />
            </div>
            {isEditPopupOpen() && (<Form_transfer OnClose={CloseEditPopUp} evidence={evidence()}/>)}
        </div>
    );
};

export default Tabel_transfer_danaMonthly;