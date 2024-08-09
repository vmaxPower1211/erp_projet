import { A, useLocation } from '@solidjs/router';
import { onMount, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-coa.css'
import TabelCOAMaster from './table-coa-master';
import FormTambahCOA from './forms/form-tambah-coa';
import NavbarMaster from '../navbar-master';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const MasterCOA: Component = () => {
  const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

  onMount(() => {
      changeSubTitleNavbar("Master COA");
  })
  
  return (
    <div>
      <NavbarMaster/>
        <div class="master-coa">
        <div class="nameheader">
            <div class="rightcp">
              <input type="text" placeholder="Search.." name="search" />
                <span class="search-icon">
                  <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                </span>
                  <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
            </div>
          <h1 style={{"font-family":"Exo"}}>COA Master</h1>
          <TabelCOAMaster/>
        </div>
    </div>
    </div>
  );
};

export default MasterCOA;
