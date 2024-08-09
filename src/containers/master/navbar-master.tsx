import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import './navbar-master.css'
import MasterCOA from './master-coa/master-coa';
import { useStore } from '../../store';

const NavbarMaster: Component = () => {
    const [{titleStore}] = useStore();

    const location = useLocation();
    
  return (
    <div>
        <div class="header font-[Exo]">
            
            <div class="selection">
            <A href='/master/master' classList={{ active: location.pathname === '/master/master' }}>
                    <div class="box-menu">
                    <div class="menu-selection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                      <path fill="#8a8a8b" fill-rule="evenodd" d="M1.5 14H15v-1H2V0H1v13.5l.5.5zM3 11.5v-8l.5-.5h2l.5.5v8l-.5.5h-2l-.5-.5zm2-.5V4H4v7h1zm6-9.5v10l.5.5h2l.5-.5v-10l-.5-.5h-2l-.5.5zm2 .5v9h-1V2h1zm-6 9.5v-6l.5-.5h2l.5.5v6l-.5.5h-2l-.5-.5zm2-.5V6H8v5h1z" clip-rule="evenodd"/>
                    </svg>
                        <div class="name-selection">
                            Master
                        </div>
                    </div>
                    </div>
                </A>
            </div>

            <div class="selection">
            <A href='/master/mastercoa' classList={{ active: location.pathname === '/master/mastercoa' }}>
                    <div class="box-menu">
                    <div class="menu-selection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 14 14">
                      <g fill="none" stroke="#8a8a8b" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="9" cy="5.5" rx="4.5" ry="2"/><path d="M4.5 5.5v6c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-6"/><path d="M13.5 8.5c0 1.1-2 2-4.5 2s-4.5-.9-4.5-2m4.4-7A6.77 6.77 0 0 0 5 .5C2.51.5.5 1.4.5 2.5c0 .59.58 1.12 1.5 1.5"/><path d="M2 10C1.08 9.62.5 9.09.5 8.5v-6"/><path d="M2 7C1.08 6.62.5 6.09.5 5.5"/></g>
                    </svg>
                        <div class="name-selection">
                            Master COA
                        </div>
                    </div>
                    </div>
                </A>
            </div>

            <div class="selection">
            <A href='/master/masterakun' classList={{ active: location.pathname === '/master/masterakun' }}>
                    <div class="box-menu">
                    <div class="menu-selection">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                      <path fill="#8a8a8b" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-.24C8.42 17.62 10.16 17 12 17s3.58.62 5 1.76V19zm2-1.14C17.2 16.09 14.73 15 12 15s-5.2 1.09-7 2.86V5h14v12.86zM12 13c1.93 0 3.5-1.57 3.5-3.5S13.93 6 12 6S8.5 7.57 8.5 9.5S10.07 13 12 13zm0-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8z"/>
                    </svg>
                        <div class="name-selection">
                            Master Akun
                        </div>
                    </div>
                    </div>
                </A>
            </div>

        {/* <A href='/master/master' classList={{ active: location.pathname === '/master/master' }}>Master</A>
        <A href='/master/mastercoa' classList={{ active: location.pathname === '/master/mastercoa' }}>Master COA</A>
        <A href='/master/masterakun' classList={{ active: location.pathname === '/master/masterakun' }}>Master Akun</A> */}
        </div>
        <div class="dashboard-title" style={{ "font-family":"Exo","font-size": "20px", "font-weight": "600"}}>
            {titleStore.title_subnavbar}
        </div>
    </div>
  );
};

export default NavbarMaster;
