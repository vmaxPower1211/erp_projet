import { createSignal, type Component, onMount } from 'solid-js';
import './planning_dk.css';
import TablePlanning from './table-detail-plan/table-planning';
import ChartPlanning from './chart-planning';
// import TableDetailPlan from './table-detail-plan/table-detail-plan';
import TablePengajuanBaru from '../../../../containers/dashboard/plannings/table/table-pengajuan-baru';
import { Icon } from '@iconify-icon/solid';
import { A } from '@solidjs/router';
import Header from '../header/header';
import { useSubNavbarStore } from '../../../../store/Navbar/SubNavbarStore';
import TableDetailPlan from './table-detail-plan/table-detail-plan';
import TablePengajuanBaruDK from './table-detail-plan/table-pengajuan-baru-dk';

const Planning_dk: Component = () => {

    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("List Planning");
    })
    
    return (
        <div class="plan">
            <Header />
            {/* <A href="/master/master">
            <button style={{"background-color":"aqua"}}>ke master</button>
        </A> */}


            <div class="box-1">

                <div class="component-1">
                    <ChartPlanning />
                    <div class="tabel-keterangan">
                        <div class="rightcp">
                            <input type="text" placeholder="Search.." name="search" />
                            <span class="search-icon">
                                <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                            </span>
                            <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                        </div>
                        <br />
                        <h1>Keterangan</h1>
                        <TablePlanning />
                    </div>
                </div>

                <div>
                    <h1>List Rencana Pengajuan</h1>
                    <TableDetailPlan />
                    <TablePengajuanBaruDK />
                </div>

            </div>
        </div>
    );
};

export default Planning_dk;
