import { createSignal, type Component, onMount } from 'solid-js';
import './master.css'
import TableListCOA from './table-list-coa';
import TableListAkun from './table-list-akun';
import { Icon } from '@iconify-icon/solid';
import { A, useLocation } from '@solidjs/router';
import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
import NavbarMaster from '../navbar-master';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';


const Master: Component = () => {

    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Master");
    })


    const [Table1, setTable1] = createSignal(false);

    const [Table2, setTable2] = createSignal(false);

    function handleTable1() {
        setTable1(!Table1())
    }

    function handleTable2() {
        setTable2(!Table2())
    }

  const location = useLocation();

  return (
    <div>
      <NavbarMaster/>

        <div class="master">
            <div class="content">
                <div class="content-1">
                    <div class="list-coa" onClick={handleTable1}>
                        <p style={{"font-family":"Exo"}}>List COA</p>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                    {Table1() && <TableListCOA/>}
                </div>
                <div class="content-2"  onClick={handleTable2}>
                    <div class="list-akun">
                        <p style={{"font-family":"Exo"}}>List Akun</p>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                    {Table2() && <TableListAkun/>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Master;
