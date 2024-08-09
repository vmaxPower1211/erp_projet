import { A, useLocation } from '@solidjs/router';
import { onMount, type Component } from 'solid-js';
import './pengajuan-navbar-du.css';
import { Icon } from '@iconify-icon/solid';
import { useStore } from '../../../../../store';
import { useNavbarStore } from '../../../../../store/Navbar/NavbarStore';

const PengajuanNavbarDU: Component = () => {
    const [{titleStore}] = useStore();

    const location = useLocation();

    const [, {changeTitleNavbar}] = useNavbarStore();

    onMount(() => {
        changeTitleNavbar("Pengajuan");
    })

  return (
    <div>
      <div class="header font-[Exo]">
            
            <div class="selection">
                <A href='/direktur-keuangan/pengajuan/pengajuan-dashboard' classList={{ active: location.pathname === '/direktur-keuangan/pengajuan/pengajuan-dashboard' }}>
                    <div class="box-menu">
                    <div class="menu-selection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                      <path fill="none" stroke="#8a8a8b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h6v8H4zm0 12h6v4H4zm10-4h6v8h-6zm0-8h6v4h-6z"/>
                    </svg>
                        <div class="name-selection">
                            Dashboard
                        </div>
                    </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/pengajuan/pengajuan_laporan' classList={{ active: location.pathname === '/pengajuan/pengajuan_laporan' }}>
                    <div class="box-menu">
                    <div class="menu-selection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                      <g fill="none" stroke="#8a8a8b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.697M18 14v4h4m-4-7V7a2 2 0 0 0-2-2h-2"/><path d="M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm6 13a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-6-7h4m-4 4h3"/></g>
                    </svg>
                        <div class="name-selection">
                            Report
                        </div>
                    </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/direktur-keuangan/pengajuan/pengajuan-detail' classList={{ active: location.pathname === '/direktur-keuangan/pengajuan/pengajuan-detail' }}>
                    <div class="box-menu">
                    <div class="menu-selection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 48 48">
                      <g fill="none" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M5 19h38v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V19Zm0-9a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v9H5v-9Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m16 31l6 6l12-12"/><path stroke-linecap="round" d="M16 5v8m16-8v8"/></g>
                    </svg>
                        <div class="name-selection">
                            Pengajuan
                        </div>
                    </div>
                    </div>
                </A>
            </div>

        {/* <A href='/pengajuan/pengajuan_dashboard' classList={{ active: location.pathname === '/pengajuan/pengajuan_dashboard' }}>Dashboard</A> */}
        {/* <A href='/pengajuan/pengajuan_laporan' classList={{ active: location.pathname === '/pengajuan/pengajuan_laporan' }}>Laporan</A> */}
      </div>

        <div class="dashboard-title" style={{ "font-family":"Exo","font-size": "20px", "font-weight": "600"}}>
            {titleStore.title_subnavbar}
        </div>

    </div>
  );
};

export default PengajuanNavbarDU;
