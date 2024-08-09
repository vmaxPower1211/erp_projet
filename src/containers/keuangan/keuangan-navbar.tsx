import { A, useLocation } from '@solidjs/router';
import { Icon } from '@iconify-icon/solid';
import { onMount, type Component } from 'solid-js';
import './keuangan-navbar.css'
import { useStore } from '../../store';
import { useSubNavbarStore } from '../../store/Navbar/SubNavbarStore';

const KeuanganNavbar: Component = () => {
  
  const [{titleStore}] = useStore();
  const location = useLocation();
  

  return (
    <div>
      <div class="navbar-keuangan">

            <div class="selection">
                <A href='/keuangan/keuanganModul_dashboard' classList={{ active: location.pathname === '/keuangan/keuanganModul_dashboard' }}>
                    <div class="menu-selection">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                            <path d="M3 7V5h2V4a2 2 0 0 1 2-2h6v7l2.5-1.5L18 9V2h1c1.05 0 2 .95 2 2v16c0 1.05-.95 2-2 2H7c-1.05 0-2-.95-2-2v-1H3v-2h2v-4H3v-2h2V7H3m4 4H5v2h2v-2m0-4V5H5v2h2m0 12v-2H5v2h2Z"/>
                            </svg>
                        <div class="name-selection" style={{"margin-left":"-1vw"}}>
                            Dashboard
                        </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/keuangan/journaldetail' classList={{ active: location.pathname === '/keuangan/journaldetail' }}>
                    <div class="menu-selection">    
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512" fill="none">
                          <path d="M290 32H144a64.07 64.07 0 0 0-64 64v320a64.07 64.07 0 0 0 64 64h146Zm78 0h-18v448h18a64.07 64.07 0 0 0 64-64V96a64.07 64.07 0 0 0-64-64Z"/>
                        </svg>
                        <div class="name-selection" style={{"margin-left":"-1vw"}}>
                            Jurnal
                        </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/keuangan/neraca' classList={{ active: location.pathname === '/keuangan/neraca' }}>
                    <div class="menu-selection">   
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                      <path d="M2 21v-2h9V7.825q-.65-.225-1.125-.7T9.175 6H6l3 7q0 1.25-1.025 2.125T5.5 16q-1.45 0-2.475-.875T2 13l3-7H3V4h6.175q.3-.875 1.075-1.438T12 2q.975 0 1.75.563T14.825 4H21v2h-2l3 7q0 1.25-1.025 2.125T18.5 16q-1.45 0-2.475-.875T15 13l3-7h-3.175q-.225.65-.7 1.125t-1.125.7V19h9v2H2Zm14.625-8h3.75L18.5 8.65L16.625 13Zm-13 0h3.75L5.5 8.65L3.625 13ZM12 6q.425 0 .713-.288T13 5q0-.425-.288-.713T12 4q-.425 0-.713.288T11 5q0 .425.288.713T12 6Z"/>
                      </svg>  
    
                        <div class="name-selection" style={{"margin-left":"-1vw"}}>
                            Neraca
                        </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/keuangan/labarugi' classList={{ active: location.pathname === '/keuangan/labarugi' }}>
                    <div class="menu-selection">   
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 2048 2048" fill="none">
                      <path d="M1792 896h128v1152h-128V896zM512 1344l128-128v832H512v-704zm-256 256l128-128v576H256v-448zm512-512l128-128v1088H768v-960zm256-128l128 128v959h-128V960zm320 320l64-64v832h-128v-832l64 64zm192-192l128-128v1088h-128v-960zM0 1856l128-128v320H0v-192zM2048 256v512h-128V475l-576 575l-384-384L0 1627v-182l960-959l384 384l485-486h-293V256h512z"/>
                      </svg>  
    
                        <div class="name-selection" style={{"margin-left":"-1vw"}}>
                            Laba Rugi
                        </div>
                    </div>
                </A>
            </div>

        </div>
        <div class="dashboard-title" style={{ "font-family":"Exo","font-size": "20px", "font-weight": "600"}}>
            {titleStore.title_subnavbar}
        </div>
        </div>
  );
};

export default KeuanganNavbar;
