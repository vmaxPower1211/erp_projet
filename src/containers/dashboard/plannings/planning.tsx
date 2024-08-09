import { onMount, type Component } from 'solid-js';
import './planning.css';
import TablePlanning from './table/table-planning';
import ChartPlanning from './chart-planning';
import TablePengajuanBaru from './table/table-pengajuan-baru';
import { Icon } from '@iconify-icon/solid';
// import FormConfirm
import { A } from '@solidjs/router';
import Header from '../../header/header';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
import TableSortPlan from './table/table-sort-planning';

const Planning: Component = () => {
    const [, { changeSubTitleNavbar }] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Planning");
    })

    return (
        <div class="plan">
            <Header />
            {/* <div class="card-module">
                <div style={{ "font-family":"Exo", "font-size": "20px", "font-weight": "800", "margin-top": "2vh", "margin-left": "2vw" }}>
                    Planning
                </div>
            </div> */}
            {/* <A href="/master/master">
            <button style={{"background-color":"aqua"}}>ke master</button>
        </A> */}


            <div class="box-1" style={{ "justify-content": "center" }}>
                <div>
                    <h1>List Rencana Pengajuan</h1>
                    <TablePengajuanBaru />
                </div>

            </div>
        </div>
    );
};

export default Planning;
