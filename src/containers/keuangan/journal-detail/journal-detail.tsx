import { onMount, type Component, createSignal } from 'solid-js';
import './journal-detail.css'
import { Icon } from '@iconify-icon/solid';
import KeuanganNavbar from '../keuangan-navbar';
import TableJournalDetail from './table-journal-detail';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const JournalDetail: Component = () => {
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();
    
    onMount(() => {
        changeSubTitleNavbar("Journal Detail");
    })
    
    const [RowData, setRowData] = createSignal([{}]);
    const [totalBalance, setTotalBalance] = createSignal(0);
    
  return (

    <div class="journal-detail">
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
            <div class="top-label">
                <p>Journal Detail</p> <p>27/09/2023 </p> <p>Created on 26/09/2023 10:52:49</p>
            </div>
            <div>
                <TableJournalDetail/>
            </div>
        </div>
    </div>
  );
};

export default JournalDetail;
