import { onMount, type Component } from 'solid-js';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import AgGridSolid from 'ag-grid-solid';

import './pengajuan_dashboard.css';
import Pengajuan_navbar from '../pengajuan_navbar';
import ChartPlanning from '../../dashboard/plannings/chart-planning';
import TablePlanning from '../../dashboard/plannings/table/table-planning';
// import TableDetailPlan from '../../dashboard/plannings/table/table-detail-plan';
import TablePengajuanBaru from '../../dashboard/plannings/table/table-pengajuan-baru';
// import FormPlanning from '../../dashboard/plannings/form/form-planning';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
import TableSortPlan from '../../dashboard/plannings/table/table-sort-planning';
import Table_pengajuan_ModulPengajuan from '../table_pengajuan_ModulPengajuan';

const Pengajuan_dashboard: Component = () => {
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Dashboard");
    })

    return (
        <div>
            <Pengajuan_navbar />
            <div class="pengajuanDashboard_container1">
                <div class="pengajuanDashboard_container2">
                    <div class="rencanaPengajuan-container">
                        <h1>List Rencana Pengajuan</h1>
                        <Table_pengajuan_ModulPengajuan />
                        {/* <TableDetailPlan /> */}
                        {/* <FormPlanning /> */}
                    </div>

                </div>
            </div>
            
        </div>
    );
};


export default Pengajuan_dashboard;