import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Icon } from '@iconify-icon/solid';
import { createEffect, createSignal } from 'solid-js';
import './table_income_report.css';


const Table_income_report: Component = () => {
    const [gridApi, setGridApi] = createSignal(null);
    const columnDefs = [
        { field: 'Tanggal' },
        { field: 'Deskripsi' },
        { field: 'Total' }
    ];

    const rowData = [
        { Tanggal: '09/10/22', Deskripsi: 'Lorem Ipsum', Total: '2.000.000' },
        { Tanggal: '09/10/22', Deskripsi: 'Lorem Ipsum', Total: '2.000.000' },
        { Tanggal: '09/10/22', Deskripsi: 'Lorem Ipsum', Total: '2.000.000' }
    ];

    const defaultColDef = {
        flex: 1,
        filter: 'agTextColumnFilter',
    };

    const gridOptions = {
        // Opsi GridOptions Anda di sini
        rowHeight: 40,
        suppressCellSelection: true, // Contoh opsi
        // ... opsi lainnya

        getRowStyle: (params) => {
            // Anda dapat mengatur properti gaya CSS untuk setiap baris di sini
            return { paddingBottom: '10px' }; // Contoh: menambahkan jarak bawah 10px untuk setiap baris
        },
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
    };


    return (
        <div>
            <div class="ag-theme-alpine" style={{ width: '28vw' }}>
                <AgGridSolid
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    domLayout='autoHeight'
                    gridOptions={gridOptions}
                />

            </div>

        </div>
    );
};

export default Table_income_report;
