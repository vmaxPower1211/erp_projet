import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import { Grid, GridOptions, ISetFilterParams } from 'ag-grid-community';
// import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { ColDef, MenuItemDef } from 'ag-grid-enterprise';


import Semua_laporanNavbar from '../semua_laporanNavbar';
import './pemasukan.css';
import Tutup_buku from './tutup_buku';
import { DataIncome } from '../../../api/report/data-income';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
import Form_evidence from './form_evidence';


const Pemasukan: Component = () => {
  const [, { changeSubTitleNavbar }] = useSubNavbarStore();
  const [evidence, setEvidence] = createSignal('');
  const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);
  const [editedData, setEditedData] = createSignal(null);

  onMount(() => {
    changeSubTitleNavbar("Laporan Pemasukan");
  })

  const [RowData, setRowData] = createSignal([{}]);

  onMount(async () => {
    const income = await DataIncome("hallo");
    console.log("income", income);
    setRowData(income);
  })


  // pop up evidence
  const showEditPopup = (rowData: any) => {
    setEditedData(rowData);
    setIsEditPopupOpen(true);
    setEvidence(rowData.evidence);
    console.log("test", evidence());
  };

  function CloseEditPopUp() {
    setIsEditPopupOpen(false);
  }


  const agLinkCellRenderer = (params: any) => {
    const bukti = params.data.bukti;
    const link = `https://example.com/city/${bukti}`;

    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ "text-decoration": "underline", color: "blue" }}>
        {bukti}
      </a>
    );
  };

  const tagsCellRenderer = (params: any) => {
    const tags = params.value;
    let tagColor = 'transparent';

    switch (tags) {
      case 'VIP':
        tagColor = '#F56D59'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'In Progress':
        tagColor = '#C7C7C7'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'Urgent':
        tagColor = '#040404'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'Bug':
        tagColor = '#31DFEA'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'VVIP':
        tagColor = '#FF2100'; // Ganti dengan warna yang Anda inginkan
        break;
      default:
        tagColor = 'transparent'; // Warna default untuk nilai lain
    }

    return (
      <div>
        <span
          style={{
            "background-color": tagColor,
            "border-radius": '50%',
            "display": 'inline-block',
            "width": '10px',
            "height": '10px',
            "margin-right": '8px',
          }}
        ></span>
        {tags}
      </div>
    );
  };


  const columnDefs = [
    // { headerName: 'ID', field: 'planning_id' },
    { headerName: 'ID Pengajuan', field: 'id' },
    { headerName: 'Faktur', field: 'nomor_faktur' },
    { headerName: 'COA', field: 'coa_kd' },
    { headerName: 'Jumlah', field: 'amount' },
    { headerName: 'Tanggal', field: 'income_ts' },
    { headerName: 'Keterangan', field: 'keterangan' },
    {
      field: "transfer", headerName: "", cellRenderer: (params: any) => {
        return (
          <div style={{ "justify-content": "center", "align-items": "center", "margin-right": "20px" }}>
            <button onClick={() => showEditPopup(params.data)} style={{ "background-color": "#6E49E9", "justify-content": "center", "border-radius": "10px", "width": "5.5rem", "height": "2.3rem", "color": "white", "align-items": "center" }}>Evidence &gt</button>
            {params.value}
          </div>
        );
      }
    },
  ];

  // const rowData = [
  //   {
  //     "id": 1,
  //     "id_pengajuan": 123,
  //     "faktur": "KM20231016",
  //     "COA": "1-1000",
  //     "jumlah": 2000000,
  //     "tanggal": '10/12/22',
  //     "keterangan": "Lorem Ipsum Dolor Sit Amet",
  //     "bukti": "evidance.jpg",
  //     "tags": "VIP"
  //   },
  //   {
  //     "id": 2,
  //     "id_pengajuan": 123,
  //     "faktur": "KM20231016",
  //     "COA": "1-1000",
  //     "jumlah": 2000000,
  //     "tanggal": '10/12/22',
  //     "keterangan": "Lorem Ipsum Dolor Sit Amet",
  //     "bukti": "evidance.jpg",
  //     "tags": "In Progress"
  //   },
  //   {
  //     "id": 3,
  //     "id_pengajuan": 123,
  //     "faktur": "KM20231016",
  //     "COA": "1-1000",
  //     "jumlah": 2000000,
  //     "tanggal": '10/12/22',
  //     "keterangan": "Lorem Ipsum Dolor Sit Amet",
  //     "bukti": "evidance.jpg",
  //     "tags": "Urgent"
  //   },
  //   {
  //     "id": 4,
  //     "id_pengajuan": 123,
  //     "faktur": "KM20231016",
  //     "COA": "1-1000",
  //     "jumlah": 2000000,
  //     "tanggal": '10/12/22',
  //     "keterangan": "Lorem Ipsum Dolor Sit Amet",
  //     "bukti": "evidance.jpg",
  //     "tags": "Bug"
  //   },
  //   {
  //     "id": 5,
  //     "id_pengajuan": 123,
  //     "faktur": "KM20231016",
  //     "COA": "1-1000",
  //     "jumlah": 2000000,
  //     "tanggal": '10/12/22',
  //     "keterangan": "Lorem Ipsum Dolor Sit Amet",
  //     "bukti": "evidance.jpg",
  //     "tags": "VVIP"
  //   }
  // ];

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
      <Semua_laporanNavbar />
      <div class="pemasukan-container">
        {/* div untuk mengatur top table pada pemasukan yang terdiri dari judul tabel, search, dan sorting icon */}
        <div class="pemasukan-top-table">
          <div class="tutup-buku-container">
            <Tutup_buku />
          </div>

          <div class="search-container">
            <div class="search-input">
              <input
                type="text"
                class="form-control"
                id="filter-text-box"
                placeholder="Search..."
              />
              <span class="search-icon">
                <Icon icon="ic:baseline-search" color="gray" width="16" height="16" />
              </span>
            </div>
            <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
          </div>
        </div>
        {/* <p>Laporan Pemasukan</p> */}

        {/* div untuk mengatur tabel kas besar dari ag grid */}
        <div class="pemasukan-table">
          <div class="ag-theme-alpine" style={{ width: '68vw' }}>
            <AgGridSolid
              columnDefs={columnDefs}
              rowData={RowData()}
              defaultColDef={defaultColDef}
              domLayout='autoHeight'
              gridOptions={gridOptions}
            />
          </div>
          {isEditPopupOpen() && editedData() && (
            <Form_evidence
              evidence={evidence()}
              OnClose={CloseEditPopUp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Pemasukan;
