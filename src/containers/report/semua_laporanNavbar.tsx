import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import './semua_laporanNavbar.css';
import { useStore } from '../../store';

const Semua_laporanNavbar: Component = () => {
  const [{titleStore}] = useStore();

  const location = useLocation();

  return (
      <div>
      <div>
      <div class="header-report font-[Exo]">
          <div class="selection">
              <A href='/report/semua_laporan' classList={{ active: location.pathname === '/report/semua_laporan' }}>
                  <div class="menu-selection">
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.697M18 14v4h4m-4-7V7a2 2 0 0 0-2-2h-2"/>
                      <path d="M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm6 13a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-6-7h4m-4 4h3"/>
                    </g>
                  </svg>
                      <div class="name-selection mr-2">
                          Semua Laporan
                      </div>
                  </div>
              </A>
          </div>

          <div class="selection">
              <A href='/report/kas_besar' classList={{ active: location.pathname === '/report/kas_besar' }}>
                  <div class="menu-selection">                
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 14 14">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.19">
                      <path d="M8.5.5h-7a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7Z"/>
                      <path d="M8.5 5V.5l5 5H9a.5.5 0 0 1-.5-.5Zm-4-.5V3M3 8.5c0 .75.67 1 1.5 1s1.5 0 1.5-1C6 7 3 7 3 5.5c0-1 .67-1 1.5-1s1.5.38 1.5 1m-1.5 4V11m4-1.5h3"/>
                    </g>
                  </svg>                      
                  <div class="name-selection" style={{"margin-left":"-1vw"}}>
                          Kas Besar
                      </div>
                  </div>
              </A>
          </div>

          <div class="selection">
              <A href='/report/pemasukan' classList={{ active: location.pathname === '/report/pemasukan' }}>
                  <div class="menu-selection" style={{"margin-right": "-1.5vw"}}>                
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="35" viewBox="0 0 14 14">
                    <path fill="none" stroke="#7e7f90" stroke-linecap="round" stroke-linejoin="round"  stroke-width="1.3" d="m1.24.5l11.5 5.23m-2.15.81l2.15-.81l-.8-2.16M1.25 6h1.5a.5.5 0 0 1 .5.5v7h0h-2.5h0v-7a.5.5 0 0 1 .5-.5Zm5 1.5h1.5a.5.5 0 0 1 .5.5v5.5h0h-2.5h0V8a.5.5 0 0 1 .5-.5Zm5 1.5h1.5a.5.5 0 0 1 .5.5v4h0h-2.5h0v-4a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                  <div class="name-selection mr-2">
                          Pemasukan
                      </div>
                  </div>
              </A>
          </div>

          <div class="selection">
              <A href='/report/pengeluaran' classList={{ active: location.pathname === '/report/pengeluaran' }}>
                  <div class="menu-selection">          
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="35" viewBox="0 0 14 14">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  stroke-width="1.3" d="m1.24 6.54l11.5-5.23M10.59.5l2.15.81l-.8 2.15m1.31 10.05h-2.5h0v-7a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 .5.5v7h0Zm-5 0h-2.5h0v-5.5a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 .5.5v5.5h0Zm-5 0H.75h0v-4a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 .5.5v4h0Z"/>
                  </svg>      
                      <div class="name-selection mr-3.5">
                          Pengeluaran
                      </div>
                  </div>
              </A>
          </div>

      </div>
      </div>

      <div class="dashboard-title" style={{ "font-family":"Exo","font-size": "20px", "font-weight": "600"}}>
          {titleStore.title_subnavbar}
      </div>
      </div>  
    // <div>
    //   <div class="navbar-semuaLaporan">
    //     <A href='/report/semua_laporan' classList={{ active: location.pathname === '/report/semua_laporan' }}>Semua Laporan</A>
    //     <A href='/report/kas_besar' classList={{ active: location.pathname === '/report/kas_besar' }}>Kas Besar</A>
    //     <A href='/report/pemasukan' classList={{ active: location.pathname === '/report/pemasukan' }}>Pemasukan</A>
    //     <A href='/report/pengeluaran' classList={{ active: location.pathname === '/report/pengeluaran' }}>Pengeluaran</A>
    //   </div>
    // </div>
  );
};

export default Semua_laporanNavbar;
