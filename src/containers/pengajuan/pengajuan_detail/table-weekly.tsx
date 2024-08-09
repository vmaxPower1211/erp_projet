import { createSignal, type Component, onMount, onCleanup, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import '../../dashboard/plannings/table/table-planning.css';
import { Icon } from '@iconify-icon/solid';
import { useNavigate } from '@solidjs/router';
// import { dataIdPlan } from '../../dashboard/plannings/table/table-pengajuan-baru';
import { DataWeeklyPengajuan } from '../../../api/planning/new-pengajuan/weekly-pengajuan';
import { DataDetailWeekly } from '../../../api/planning/new-pengajuan/weekly-detail-pengajuan';
import { GridOptions } from 'ag-grid-community';


const TablePengajuanDetailWeekly: Component = () => {
  const navigate = useNavigate();

    const [RowData, setRowData] = createSignal([{}]);
    const [editData, setEditData] = createSignal({
      id: 0,
      keterangan: '',
    })
  
    onMount(async () => {
        const weeklypengajuan = await DataDetailWeekly("data weekly detail plan");
        console.log("WEEKLY detail plan", weeklypengajuan);
        setRowData(weeklypengajuan)
        weeklypengajuan.forEach((plan) =>
        setEditData({
          id: plan.pengajuan_id,
          keterangan: plan.keterangan,
        })
      )
        localStorage.setItem('editDetailWeekly', JSON.stringify([...weeklypengajuan]));
    })


  const [backendData, setBackendData] = createSignal([{}]);
  const [popUpOpen, setPopUpOpen] = createSignal(false);
  const [popupData, setPopupData] = createSignal(null);
  const [confirmationStatus, setConfirmationStatus] = createSignal(false);
  const [formSubmitted, setFormSubmitted] = createSignal(false);


  const handlePopUpApproved = (data) => {
    if (data.status === 'Approved') {
      setPopupData(data);
      setPopUpOpen(true);
    }
  };


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
    { field: 'pengajuan_id', headerName: 'ID', editable: false, width: 100 },
    { field: 'namapengajuan', headerName: 'Pengajuan', editable: false},
    { field: 'coa_kd', headerName: 'COA', editable: true },
    { field: 'keterangan', editable: false },
    { field: 'kebutuhan', editable: true},
    { field: 'total', editable: true, headerName: 'Jumlah', valueFormatter: (params) => formatRupiah(params.value),  width: 100 },
  ],
    onCellValueChanged: handleCellValueChanged,
    pagination: true,
    paginationPageSize: 4,
    rowHeight: 40,
    onSelectionChanged: handleSelectionChanged,
    onCellEditingStopped: (event) => {
        // Periksa apakah sel yang diedit adalah 'amount' dan baris sudah dikonfirmasi
        if (event.column.getColId() === 'amount' && event.data.confirm) {
        // Reset nilai ke nilai asli
        event.api.applyTransaction({ update: [{ ...event.data }] });
        }
    },
};

  const defaultColDef = {
    flex: 1,
    sortable: true,
  }

  const [editPopUp, setEditPopUp] = createSignal(false);

  function showEditPopup(){
    setEditPopUp(true)
  }

  const ClosePopUp = () => {
    setEditPopUp(false);
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
    updatePengajuan.append('tipepengajuan', 'Weekly');
    updatePengajuan.append('total', `${calculateTotal()}`);
    updatePengajuan.append('status','Waiting');
    updatePengajuan.append('alasan', 'Sudah di revisi');


    console.log("format", formated)

    try {
      const response = await fetch (`/api/weeklypengajuan/detail`, {
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

  return (
    <div style={{ "justify-content": "center", "margin-top":"30px" }}>
      <h1 style={{ "font-size": "18px", "text-align":"left","margin-bottom":"5px"}}>Detail Pengajuan Weekly</h1>
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
      {/* {popUpOpen() && <FormConfirm data={popupData()} confirm={confirmationStatus()} OnClose={ClosePopUp} />} */}
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

export default TablePengajuanDetailWeekly;

