import { A, useLocation } from '@solidjs/router';
import { onMount, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-akun.css'
import TableAkunMaster from './table-master-akun';
import NavbarMaster from '../navbar-master';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const MasterAkun: Component = () => {
  const location = useLocation();

  const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Master Akun");
    })

  return (
    <div>
      <NavbarMaster/>
        <div class="master-akun">
        <div class="nameheader">
            <div class="rightcp">
              <input type="text" placeholder="Search.." name="search" />
                <span class="search-icon">
                  <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                </span>
                  <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
            </div>
          <h1 style={{"font-family":"Exo"}}>Akun Master</h1>
          <TableAkunMaster/>
        </div>
    </div>
    </div>
  );
};

export default MasterAkun;
