import { createSignal, type Component, onMount, onCleanup, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import '../../dashboaard/plannings/table/table-planning.css';
import { Icon } from '@iconify-icon/solid';
import { useNavigate } from '@solidjs/router';
import { DataMonthlyPengajuan } from '../../../api/planning/new-pengajuan/new-pengajuan';
// import { dataIdPlan } from '../../dashboard/plannings/table/table-pengajuan-baru';
import { DataDetailMonthly } from '../../../api/planning/new-pengajuan/monthly-detail-pengajuan';
import { GridOptions } from 'ag-grid-community';
import EditMonthlyPlan from './popup/edit-monthly-plan';


const TablePengajuanDetail: Component = () => {
  const navigate = useNavigate();
  const [RowData, setRowData] = createSignal([{}]);
  const [editData, setEditData] = createSignal({
    id: 0,
    keterangan: '',
  })

  onMount(async () => {
    const monthlypengajuan = await DataDetailMonthly("data monthly detail plan");
    console.log("MONTHLY detail plan", monthlypengajuan);
    monthlypengajuan.forEach((plan) =>
      setEditData({
        id: plan.pengajuan_id,
        keterangan: plan.keterangan,
      })
    )
    setRowData(monthlypengajuan)
    localStorage.setItem('editDetailMonthly', JSON.stringify([...monthlypengajuan]));
  })

  const [backendData, setBackendData] = createSignal([{}]);
  const [popUpOpen, setPopUpOpen] = createSignal(false);
  const [popupData, setPopupData] = createSignal(null);
  const [confirmationStatus, setConfirmationStatus] = createSignal(false);
  const [formSubmitted, setFormSubmitted] = createSignal(false);

  //   onMount(async () => {
  //     const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
  //     console.log("dataplanning", data_planning);
  //     setRowData(data_planning);
  //   })

  //   const fetchData = async () => {
  //     const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
  //     setRowData(data_planning);
  //   };

  //   onMount(() => {
  //     fetchData();
  //   });

  const handlePopUpApproved = (data) => {
    if (data.status === 'Approved') {
      setPopupData(data);
      setPopUpOpen(true);
    }
  };




  // const onCellClicked = (data) => {
  //         setDataIDPlan(data.id);
  //         navigate('/pengajuan/pengajuan_detail');
  //   };

  const handleSelectionChanged = (event) => {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      const selectedRowData = selectedRows[0];
      handlePopUpApproved(selectedRowData);
      // Step 2: Update confirmationStatus based on checkbox
      setConfirmationStatus(selectedRowData.confirm || false);

    }
    if (formSubmitted()) {
      event.api.deselectAll(); // Deselect the checkbox
    }
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

  const [dataMonthly, setDataMonthly] = createSignal(null)


  const areRowsEqual = (row1, row2) => {
    // Implementasikan logika perbandingan berdasarkan properti yang sesuai
    return row1.rowIndex === row2.rowIndex;
  };

  const [editID, setEditID] = createSignal(0)
  const [totalPrice, setTotalPrice] = createSignal(0);

  const handleCellValueChanged = async (params) => {
    const { data } = params;
  
    localStorage.setItem('editDetailMonthly', JSON.stringify(RowData()));
  
    // Recalculate total if 'qty' or 'price' is changed
    if (params.colDef.field === 'quantity' || params.colDef.field === 'price') {
      const newTotal = data.quantity * Number(data.price);
  
      // Update local storage only for the changed row
      const updatedData = RowData().map((row, index) =>
        index === params.rowIndex ? { ...row, quantity: Number(data.quantity), price: Number(data.price), total: newTotal } : row
      );
  
      // Update local storage
      localStorage.setItem('editDetailMonthly', JSON.stringify(updatedData));
      
      // Update the state with the changed row
      setRowData(updatedData);
    }
  
    // Log data setelah seluruh proses
    console.log('edited', RowData());
    console.log('id', data.pengajuan_id)

    setEditID(data.pengajuan_id)

  };
  

  const gridOptions = {
    columnDefs: [
      // { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 61 },
      // { field: 'id', headerName: 'ID', editable: false },
      { field: 'pengajuan_id', headerName: 'Pengajuan ID', editable: false, width: 60 },
      { field: 'id', headerName: 'ID', editable: false, width: 60 },

      { field: 'namapengajuan', headerName: 'Pengajuan', editable: false },
      { field: 'keterangan', editable: false },
      { field: 'kebutuhan', editable: true },
      { field: 'coa_kd', headerName: 'COA', editable: true, width: 85 },

      { field: 'quantity', headerName: 'Qty', editable: true,  width: 90 },
      { field: 'uom', width: 100 },
      { field: 'price', headerName: 'Harga', editable: true, valueFormatter: (params) => formatRupiah(params.value),  width: 110 },
      { field: 'total', headerName: 'Jumlah', editable: true, valueFormatter: (params) => formatRupiah(params.value),  width: 110 },
    ],
    onCellValueChanged: handleCellValueChanged,
    pagination: true,
    paginationPageSize: 4,
    rowHeight: 40,
    // onSelectionChanged: handleSelectionChanged,

  };

  const defaultColDef = {
    // flex: 1,
    sortable: true,
  }

  const [onEdit, setOnEdit] = createSignal(false);

  const handleEditClick = () => {
    const localStorageData = JSON.parse(localStorage.getItem('editDetailMonthly'));
    if (localStorageData) {
      setOnEdit(true);
      setRowData(localStorageData);
      console.log("berhasil store", RowData());
      handleSubmitEdit();
    } else {
      console.log("lain")
    }
    // setEditPopUp(true);
  };

  const calculateTotal = () => {
    const gridData = RowData();
    let sumtotal = 0;
    for (const row of gridData) {
      return sumtotal;
    }
  }

  const handleSubmitEdit = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 11);

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const timestamp = `${formattedDate}${formattedTime}`;

    const updatedData = RowData().map(item => ({
      ...item,
      pengajuan_id: 0
    }));

    const formated = {
      details: 
      updatedData
    }

    const updatePengajuan = new FormData();
    updatePengajuan.append('id', editData().id.toString());
    updatePengajuan.append('entry_ts', timestamp);
    updatePengajuan.append('namapengajuan', editData().keterangan);
    updatePengajuan.append('tipepengajuan', 'Monthly');
    updatePengajuan.append('total', `${calculateTotal()}`);
    updatePengajuan.append('status','Waiting');
    updatePengajuan.append('alasan', 'Sudah di revisi');


    console.log("format", formated)

    try {
      const response = await fetch (`/api/monthlypengajuan/detail`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formated)
      });

      const response2 = await fetch (`/api/pengajuan/${editID()}`, {
        method: 'PUT',
        body: updatePengajuan,
      });

      if (response.ok && response2.ok) {
        console.log('Data berhasil diubah');
        alert('Data berhasil diubah');
        navigate('/pengajuan/pengajuan_dashboard');
      } else {
        const errorMessage = await response.text();
        alert(`Gagal menambah data. Pesan kesalahan: ${errorMessage}`);
        console.error('Gagal menambah data:', errorMessage);
        const errorMessage2 = await response2.text();
        alert(`Gagal menambah data. Pesan kesalahan: ${errorMessage2}`);
        console.error('Gagal menambah data:', errorMessage2);
      }

    } catch (error) {
      console.log("error", error)
    }
  }

  const [editPopUp, setEditPopUp] = createSignal(false);

  function showEditPopup(){
    setEditPopUp(true)
  }

  const ClosePopUp = () => {
    setEditPopUp(false);
  };


  return (
    <div style={{ "justify-content": "center", "margin-top":"30px" }}>

      <h1 style={{ "font-size": "18px", "text-align":"left","margin-bottom":"5px"}}>
        {onEdit() ? 'Edit Detail Pengajuan Monthly': 'Detail Pengajuan Monthly'}</h1>
      <div class="ag-theme-alpine" style={{ width: '141vh', height: '21vw', margin: "auto" }}>
        <AgGridSolid
          //   columnDefs={columnDefs}
          rowData={RowData()}
          //   onCellClicked={onCellClicked}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
        />
      </div>
      <div>
        {/* <button onClick={handleEditClick}>Edit</button> */}
        <br/>
        <button class="simpan-perubahan-detail" onClick={showEditPopup}>Simpan</button>
          {editPopUp() && 
          <div class='overlay'>
            <div class="absolute">
            <div class="confirm-edit-detail">
                Apakah anda yakin ingin mengirim perubahan?
                <div class="btn-confirm-edit-detail">
                  <button class="btn-iya-tidak iya" onClick={ClosePopUp}>Tidak</button>
                  <button class="btn-iya-tidak tidak" onClick={handleSubmitEdit}>Ya</button>
                </div>
            </div>
            </div>
          </div>
          }
      </div>
    </div>
  );
};

export default TablePengajuanDetail;

