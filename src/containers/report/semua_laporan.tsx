import { onMount, type Component } from 'solid-js';
import Semua_laporanNavbar from './semua_laporanNavbar';
import './semua_laporan.css';
import Pengeluaran_semualap from './pemasukan_pengeluaran_semualap/pengeluaran_semualap';
import Pemasukan_semualap from './pemasukan_pengeluaran_semualap/pemasukan_semualap';
import KasBesar_semualap from './pemasukan_pengeluaran_semualap/kasBesar_semualap';

import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import AgGridSolid from 'ag-grid-solid';
import { useNavbarStore } from '../../store/Navbar/NavbarStore';
import { useSubNavbarStore } from '../../store/Navbar/SubNavbarStore';

const Semua_laporan: Component = () => {

  const [, {changeTitleNavbar}] = useNavbarStore();

  onMount(() => {
      changeTitleNavbar("Report");
  })
  
  const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Semua Laporan");
    })
    
  return (
    <div>
      <Semua_laporanNavbar />
      {/* div untuk container semua laporan container */}
      <div class="semualap-container">

        {/* div untuk container top table pada semua laporan */}
        <div class="semualap-top-table">
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

        {/* div untuk judul tabel semua laporan */}
        {/* <div style={{"font-family":"Exo", "font-weight":"600"}}>
        <p>Semua <span>Laporan</span></p>
        </div> */}

        {/* div untuk table pemasukan dan pengeluaran */}
        <div class="inex-semualap-container" style={{ "display": "flex", "justify-content": "space-between" }}>
          {/* div untuk tabel pemasukan pada semua laporan */}
          <div class="pemasukan-semualap-container">
            <Pemasukan_semualap />
          </div>

          {/* div untuk tabel pengeluaran pada semua laporan */}
          <div class="pengeluaran-semualap-container">
            <Pengeluaran_semualap />
          </div>
        </div>

        <div class="kas-besar-semualap-container" style={{ "margin-top": "-4.5rem", "margin-bottom": "5rem" }}>
          <KasBesar_semualap />
        </div>


      </div>

    </div>
  );
};


export default Semua_laporan;