import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import './navbar-pengajuan-du.css';
import { Icon } from '@iconify-icon/solid';
import { useStore } from '../../../store';

const NavbarPengajuanDU: Component = () => {
    const [{titleStore}] = useStore();

    const location = useLocation();

  return (
    <div>
      <div class="header font-[Exo]">
            
            <div class="selection">
                <A href='/direktur-utama/pengajuan/dashboard' classList={{ active: location.pathname === '/direktur-utama/pengajuan/dashboard' }}>
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
                <A href='/direktur-utama/pengajuan/report' classList={{ active: location.pathname === '/direktur-utama/pengajuan/report' }}>
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

      </div>

        <div class="dashboard-title" style={{ "font-family":"Exo","font-size": "20px", "font-weight": "600"}}>
            {titleStore.title_subnavbar}
        </div>

    </div>
  );
};

export default NavbarPengajuanDU;
