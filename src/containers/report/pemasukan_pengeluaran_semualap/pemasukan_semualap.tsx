import { onMount, type Component, createSignal } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import { Grid, GridOptions, ISetFilterParams } from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { ColDef, MenuItemDef } from 'ag-grid-enterprise';


import './inex_semualap.css';
import { DataIncome } from '../../../api/report/data-income';


const Pemasukan_semualap: Component = () => {

    const [RowData, setRowData] = createSignal([{}]);

    onMount(async () => {
      const income = await DataIncome ("hallo");
      console.log("income", income);
      setRowData(income);
    })
    
    const columnDefs = [
        { headerName: 'Tanggal', field: 'income_ts' },
        { headerName: 'Keterangan', field: 'keterangan' },
        { headerName: 'Jumlah', field: 'amount' }
    ];

    const rowData = [
        {
            "tanggal": '10/12/22',
            "keterangan": "Lorem Ipsum Dolor Sit Amet",
            "jumlah": 2000000
        }
    ];

    const defaultColDef = {
        flex: 1,
        filter: 'agTextColumnFilter',
    };

    const gridOptions = {
        pagination: true,
        paginationPageSize: 5,
        rowHeight: 40,
        // frameworkComponents, // Tambahkan frameworkComponents ke dalam gridOptions
    };

    return (
        <div>
            <div class="inex-semualap-container">
                <p>Pemasukan</p>

                {/* div untuk mengatur tabel kas besar dari ag grid */}
                <div class="inex-semualap-table">
                    <div class="ag-theme-alpine" style={{ width: '28vw' }}>
                        <AgGridSolid
                            columnDefs={columnDefs}
                            rowData={RowData()}
                            defaultColDef={defaultColDef}
                            domLayout='autoHeight'
                            gridOptions={gridOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pemasukan_semualap;
