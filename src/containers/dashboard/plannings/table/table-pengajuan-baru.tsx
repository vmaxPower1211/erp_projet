import { createSignal, type Component, onMount, onCleanup, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { Icon } from '@iconify-icon/solid';
// import FormConfirm from '../form/form-confirm';
import { dataplanning } from '../../../../api/planning/dataplanning';
import { RowData } from '../../../navbars/create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-insentif/pengajuanweekly-insentif';
import { useNavigate } from '@solidjs/router';
import { DataMonthlyPengajuan } from '../../../../api/planning/new-pengajuan/new-pengajuan';
import { type } from 'os';
import { setDataIDEvent, setDataIDMonthly, setDataIDWeekly, setSelectedCategory } from '../../../../store/Pengajuan/pengajuan-id';

const TablePengajuanBaru: Component = () => {

  const navigate = useNavigate();

  const [RowData, setRowData] = createSignal([{}]);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [selectedMonth, setSelectedMonth] = createSignal('');

  onMount(async () => {
    const monthlypengajuan = await DataMonthlyPengajuan("data monthly plan");
    console.log("data detail plan", monthlypengajuan);
    setRowData(monthlypengajuan)
  })

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    console.log("bulan ", selectedMonth())
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("search ", searchTerm());

  };

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

  const onCellClicked = (params) => {
    if (params.data.tipepengajuan === 'Weekly') {
      // console.log('meonk', params.data.id);
      setDataIDWeekly(params.data.id);
      setSelectedCategory(params.data.tipepengajuan)
      navigate('/pengajuan/pengajuan_detail');
    } else if (params.data.tipepengajuan === 'Event') {
      // console.log('meonk', params.data.id);
      setDataIDEvent(params.data.id);
      navigate('/pengajuan/pengajuan_detail');
      setSelectedCategory(params.data.tipepengajuan)
    } else if (params.data.tipepengajuan === 'Monthly') {
      // console.log('meonk', params.data.id);
      setDataIDMonthly(params.data.id);
      navigate('/pengajuan/pengajuan_detail');
      setSelectedCategory(params.data.tipepengajuan)
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

  const loadGridData = async () => {
    const selectedMonthValue = selectedMonth();
    const searchTermValue = searchTerm();


    console.log("search ", searchTermValue);
    console.log("bulan ", selectedMonthValue);
    const data_planning = await DataMonthlyPengajuan("data pengajuan baru");

    let filteredData = data_planning;

    if (selectedMonthValue) {
      filteredData = filteredData
        .filter((item) => item.entry_ts.startsWith(selectedMonthValue))
        .map((item) => ({
          ...item,
          entry_ts: item.entry_ts.slice(0, 10),
        }));
    }

    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        value && value.toString().toLowerCase().includes(
          (searchTermValue && searchTermValue) ? searchTermValue.toLowerCase() : ''
        )
      )
    );



    console.log("Filtered Data:", filteredData);
    console.log("search ", searchTerm());
    console.log("bulan ", selectedMonth())
    setRowData(filteredData);
  };

  onMount(loadGridData);

  createEffect(() => {
    loadGridData();
    return onCleanup(() => {
      // Clean up subscriptions or resources if needed
    });
  }, [selectedMonth, searchTerm]);


  function getCellStyle(params: { value: string; }) {
    if (params.value === 'Weekly') {
      return { color: '#FF6838' };
    } else if (params.value === 'Monthly') {
      return { color: '#00BA29' };
    } else {
      return { color: '#860089' };
    }
  }


  const columnDefs = [
    { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 61 },
    { field: 'id', headerName: 'ID', editable: false },
    { field: 'entry_ts', headerName: 'Tanggal', editable: false },
    // { field: 'coa_kd', headerName: 'COA', editable: false },
    { field: 'namapengajuan', headerName: 'Keterangan', editable: false },
    { field: 'tipepengajuan', cellStyle: getCellStyle, headerName: 'Kategori', cellClassRules: { 'bold-type': () => true }, editable: false },
    // { field: 'category', headerName: 'Jenis', editable: false },
    { field: "total", headerName: "Total", width: 95, valueFormatter: (params) => formatRupiah(params.value) },
    { field: 'status', headerName: 'Status', editable: false, onCellClicked },
    // { field: 'confirm', headerName: 'Konfirmasi', headerCheckboxSelection: true, checkboxSelection: true, editable: false },
  ];

  // const rowData = [
  //   { id: '11C7D', tanggal: '10-2-22', COA: '1-0000', kategori: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' , status: 'Waiting' },
  //   { id: '11C7C', tanggal: '10-2-22', COA: '1-1000', kategori: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Event' , status: 'Approved', confirm: true },
  //   { id: '11C7B', tanggal: '10-2-22', COA: '2-1001', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly', status: 'Rejected' },
  //   { id: '11C7A', tanggal: '9-2-22', COA: '2-2000', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
  //   { id: '11C7D', tanggal: '10-2-22', COA: '3-4001', kategori: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
  //   { id: '11C7C', tanggal: '10-2-22', COA: '3-5000', kategori: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Weekly' },
  //   { id: '11C7B', tanggal: '10-2-22', COA: '4-1000', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly' },
  //   { id: '11C7A', tanggal: '9-2-22', COA: '4-2000', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' }
  // ];


  const defaultColDef = {
    flex: 1,
    sortable: true,
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


  const gridOptions = {
    // domLayout: 'autoHeight' as DomLayoutType,
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
  }

  return (
    <div>
      <div style={{ display: "flex", "justify-content": "space-between" }}>
        <div>
          {/* <label for="monthSelect">Pilih Bulan: </label> */}
          <select id="monthSelect" onChange={handleMonthChange}>
            <option value="">Semua Bulan</option>
            <option value="2023-01">Januari</option>
            <option value="2023-02">Februari</option>
            <option value="2023-03">Maret</option>
            <option value="2023-04">April</option>
            <option value="2023-05">Mei</option>
            <option value="2023-06">Juni</option>
            <option value="2023-07">Juli</option>
            <option value="2023-08">Agustus</option>
            <option value="2023-09">September</option>
            <option value="2023-10">Oktober</option>
            <option value="2023-11">November</option>
            <option value="2023-12">Desember</option>

            {/* tambahkan opsi bulan lainnya sesuai kebutuhan */}
          </select>
        </div>
        <div class="rightcp" style={{ display: "flex", "flex-direction": "row", "align-items": "center" }}>
          <input type="text" placeholder="Search.." name="search"
            value={searchTerm()}
            onInput={handleSearchChange}
          />
          <span class="search-icon">
            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
          </span>
          <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
        </div>
      </div>

      <div style={{ "justify-content": "center" }}>
        <div class="ag-theme-alpine" style={{ width: '141vh', height: '21vw', margin: "auto" }}>
          <AgGridSolid
            columnDefs={columnDefs}
            rowData={RowData()}
            onCellClicked={onCellClicked}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            rowSelection="multiple"
            rowMultiSelectWithClick={true}
          />
        </div>
        {/* {popUpOpen() && <FormConfirm data={popupData()} confirm={confirmationStatus()} OnClose={ClosePopUp} />} */}
      </div>
      
    </div>
  );
};

export default TablePengajuanBaru;
function isEditing() {
  throw new Error('Function not implemented.');
}