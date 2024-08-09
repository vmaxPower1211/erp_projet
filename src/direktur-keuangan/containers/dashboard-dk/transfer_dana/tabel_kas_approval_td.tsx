import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal, type Component, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tabel_transfer_dana.css';
import { DataArusKas } from '../../../../api/planning/data-aruskas';

const Tabel_kas_approval_td = () => {
    const [RowData, setRowData] = createSignal([]);

    onMount(async () => {
        const data_kas = await DataArusKas("data planning dashboard dan modul pengajuan");
        console.log("data_kas", data_kas);
        setRowData(data_kas);
    }
    )

    const columnDefs = [
        { field: 'kas_ts', headerName: 'Tanggal' },
        { field: 'id', headerName: 'ID' },
        { field: 'dari', headerName: 'Dari' },
        { field: 'kepada', headerName: 'Kepada' },
        { field: 'biaya', headerName: 'Biaya' },
        { field: 'keterangan', headerName: 'Keterangan' },
        { field: 'status', headerName: 'Status' }
    ];

    // const rowData = [
    //     {
    //         "Tanggal": "02/2/23",
    //         "ID": "ID:97174",
    //         "Dari": "PT.Braincode",
    //         "Kepada": "PT.TUS",
    //         "Biaya": "15.000.000",
    //         "Keterangan": "Dollar",
    //         "Status": "Waiting"
    //     }
    // ];

    const defaultColDef = {
        flex: 1,
        sortable: true,
    }

    const gridOptions = {
        // domLayout: 'autoHeight' as DomLayoutType,
        pagination: true,
        paginationPageSize: 2,
        rowHeight: 40
    }

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <div style={{ height: '50vh', width: '65vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={RowData()} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    );
};

export default Tabel_kas_approval_td;