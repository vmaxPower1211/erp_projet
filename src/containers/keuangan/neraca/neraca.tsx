import { onMount, type Component, createSignal } from 'solid-js';
import './neraca.css'
import TableNeraca from './tables/table-neraca';
import { Icon } from '@iconify-icon/solid';
import { A } from '@solidjs/router';
import KeuanganNavbar from '../keuangan-navbar';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';


const Neraca: Component = () => {
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Neraca");
    })
    
    const [RowData, setRowData] = createSignal([{}]);
    const [totalBalance, setTotalBalance] = createSignal(0);
    
  return (

    <div class="neraca">
        <KeuanganNavbar/>
        <div class="box-1">
            <div class="top-1">
                <div class="rightcp">
                    <input type="text" placeholder="Search.." name="search"/>
                        <span class="search-icon">
                        <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                        </span>
                    <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                </div>
            </div>
            <TableNeraca/>
        </div>
    </div>
  );
};

export default Neraca;
