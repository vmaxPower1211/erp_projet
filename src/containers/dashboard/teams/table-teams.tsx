import AgGridSolid from 'ag-grid-solid';

import './table-teams.css'
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal } from 'solid-js';
import TagsHeader from './tags-header';
import { Icon } from '@iconify-icon/solid';
import FormEditAkunTeams from './forms/edit-akun-teams';


const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);

const [editedData, setEditedData] = createSignal(null);

const showEditPopup = (rowData: any) => {
    setEditedData(rowData);
    setIsEditPopupOpen(!isEditPopupOpen());
};

function CloseEditPopUp() {
    setIsEditPopupOpen(false);
}


const TableTeams = () => {
    const columnDefs = [
        { field: "Name" },
        { field: "Email" },
        { field: "Access" },
        { field: "Role" },
        { field: "Category" },
        {
            field: 'aksi', cellRenderer: (params: any) => {
                return (
                    <div style={{ "margin-top": "8px", display: "flex", "justify-content": "space-between", width: "50px" }}>
                        <button onClick={() => showEditPopup(params.data)}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                        <button><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
                    </div>
                );
            }
        }

    ];

    const rowData = [
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
        {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        }, {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        }, {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        }, {
            "Name": "Dede Herman",
            "Email": "dedeherman@braincodesolution",
            "Access": "Admin",
            "Role": "Employee, Supplier",
            "Category": "Suppervisor",
            "Action": "button"
        },
    ];

    const defaultColDef = {
        flex: 1,
    };

    // event listener
    const selectionChangedCallback = (e: any) => {
        console.log('selection has changed', e);
    };

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <div style={{ height: '60vh', width: '65vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={rowData} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                />
            </div>
            <div>
            </div>
            {isEditPopupOpen() && (<FormEditAkunTeams OnClose={CloseEditPopUp} />)}
        </div>
    );
};

export default TableTeams;