import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Icon } from '@iconify-icon/solid';
import FormEditAkun from './forms/form-edit-coa';
import './table-coa-master.css'
import FormTambahCOA from './forms/form-tambah-coa';
import { datacoamaster } from '../../../api/master/data-coa-master';
import ConfirmPopUP from './pop-up/confirm-pop-up';

const TabelCOAMaster: Component = () => {

  const [RowData, setRowData] = createSignal([{}]);

  onMount(async () => {
    const data_coa = await datacoamaster("data coa master");
    console.log("datacoa", data_coa);
    setRowData(data_coa)
  })

  const [isEditPopup1Open, setisEditPopup1Open] = createSignal(false);
  const [id, setId] = createSignal(0);
  const [balance, setBalance] = createSignal(0);


  const showEditPopup1 = (id: number, balance: number) => {
    console.log("ID yang diklik:", id);
    setId(id);
    console.log("Balance:", balance);
    setBalance(balance);
    setisEditPopup1Open(!isEditPopup1Open());
  };

  function CloseEditPopUp() {
    setisEditPopup1Open(false);
    setConfirmPopUp(false);
  }

  const [ConfirmPopUp, setConfirmPopUp] = createSignal(false);

  const showEditPopup2 = (id: number) => {
    console.log("ID yang diklik:", id);
    setId(id);
    setConfirmPopUp(!ConfirmPopUp());
  };



  const columnDefs = [
    { valueGetter: 'node.rowIndex + 1', headerName: 'No' },
    { field: 'coa_kd', headerName: 'Kode COA' },
    { field: 'coa_name', headerName: 'Nama COA', width: 100 },
    { field: 'category', headerName: 'Kategori' },
    {
      field: 'aksi', cellRenderer: (params: any) => {
        return (
          <div style={{ "margin-top": "1vh", display: "flex", "justify-content": "space-between", width: "9vh" }}>
            <button onClick={() => showEditPopup1(params.data.id, params.data.balance)}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
            <button onClick={() => showEditPopup2(params.data.id)}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
          </div>
        );
      }
    }
  ];

  // Panggil ini setelah data pertama kali dimuat


  //onClick={() => showEditPopup(params.data)}

  const rowData = [
    { ID: '', kd_akun: '', coa_name: '', kategori: '' }
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
      <div class="ag-theme-alpine" style={{ width: '140vh', height: '24vw', margin: "auto" }}>
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={RowData()}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
        />
      </div>
      <div>
      </div>
      {isEditPopup1Open() && (<FormEditAkun OnClose={CloseEditPopUp} dataId={id()} balance={balance()} />)}
      {ConfirmPopUp() && (<ConfirmPopUP OnClose={CloseEditPopUp} dataId={id()} />)}
    </div>
  );
};

export default TabelCOAMaster;
