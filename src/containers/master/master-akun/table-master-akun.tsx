import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Icon } from '@iconify-icon/solid';
import './table-master-akun.css'
import EditAkunMaster from './forms/edit-akun-master';
import { dataaccountmaster } from '../../../api/master/data-account-master';
import ConfirmDeleteAkun from './pop-up/confirm-delete-akun';
import TambahAkunMaster from './forms/tambah-akun-master';

const TableAkunMaster: Component = () => {

  const [RowData, setRowData] = createSignal([{"id":1}]);

  onMount(async () => {
    const accountmaster = await dataaccountmaster("data account master");
    console.log("accountread", accountmaster);
    setRowData(accountmaster)
  })

    const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);
  
    const [editedData, setEditedData] = createSignal(null);

    const [id, setId] = createSignal(0);
    const [account_name, setAccount_name] = createSignal<string>();
    const [role, setRole] = createSignal<string[]>([]);
    const [username, setUsername] = createSignal<string>();
    const [password, setPassword] = createSignal<string>();

    
    const showEditPopup = (data) => {
      const { id, account_name, role, username, password } = data;
      console.log("isi data: ", data);
      setId(id);
      setAccount_name(account_name);
      setRole(role);
      setUsername(username);
      setPassword(password);
      setIsEditPopupOpen(!isEditPopupOpen());
    };
  
    function ClosePopUp () {
      setIsEditPopupOpen (false);
      setDeletePopUp (false);
    }

    const [DeletePopUp, setDeletePopUp] = createSignal(false);



    const handleDeletePopUp = (id: number) => {
      console.log("ID yang diklik:", id);
      setId(id);
      setDeletePopUp(!DeletePopUp());
    }

    

    const columnDefs = [
        { field: 'account_name', headerName: 'Nama'},
        { field: 'email' },
        { field: 'access', headerName: 'Akses'},
        { field: 'role', headerName: 'Posisi'},
        {headerName: 'COA',
          valueGetter: (params) => {
              // Combine coa_kd and coa_name into a single string
              return `${params.data.coa_kd}  ${params.data.coa_name}`;
          }
        },
        { field: 'aksi', cellRenderer: (params: any) => {
            return (
              <div style={{"margin-top": "8px", display:"flex", "justify-content":"space-between", width:"50px"}}>
                <button onClick={() => showEditPopup(params.data)}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                <button onClick={() => handleDeletePopUp(params.data.id)}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
              </div>
            );
          }}
      ];

      //onClick={() => showEditPopup(params.data)}
    
      const rowData = [
       { nama: '', email: '', akses: '', posisi: '', kategori: '' }
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        pagination: true,
        paginationPageSize: 10,
        rowHeight: 33
      }
  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'141vh', height:'32vw',margin:"auto"}}>
            <AgGridSolid
                columnDefs={columnDefs}
                rowData={RowData()}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
            />
        </div>
      {isEditPopupOpen() && (<EditAkunMaster 
                              dataId={id()} 
                              account_name={account_name()}
                              role={role()}
                              username={username()} 
                              password={password()} 
                              OnClose={ClosePopUp}/>)}
      {DeletePopUp() && (<ConfirmDeleteAkun dataId={id()} OnClose={ClosePopUp}/>)}
    </div>
  );
};

export default TableAkunMaster;
