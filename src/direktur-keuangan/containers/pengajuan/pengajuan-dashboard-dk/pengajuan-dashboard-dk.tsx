import { onMount, type Component } from 'solid-js';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import AgGridSolid from 'ag-grid-solid';
import { useSubNavbarStore } from '../../../../store/Navbar/SubNavbarStore';
import TablePengajuanBaruDK from '../../dashboard-dk/planning/table-detail-plan/table-pengajuan-baru-dk';
import PengajuanNavbarDK from '../pengajuan-navbar-dk';
import './pengajuan-dashboard-dk.css'

const PengajuanDashboardDK: Component = () => {
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Dashboard");
    })

    return (
        <div>
            <PengajuanNavbarDK/>
            <div class="plan-dashboard">
            <TablePengajuanBaruDK/>

            </div>
        </div>
    );
};


export default PengajuanDashboardDK;