import { onMount, type Component } from 'solid-js';
// import 'ag-grid-enterprise';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import AgGridSolid from 'ag-grid-solid';
import { useSubNavbarStore } from '../../../../store/Navbar/SubNavbarStore';
import ChartPlanning from '../../../../containers/dashboard/plannings/chart-planning';
import TablePlanning from '../../../../containers/dashboard/plannings/table/table-planning';
import TableDetailPlan from '../../dashboard/planning/table/table-detail-plan-du';
import './pengajuan-dashboard-du.css';
import NavbarPengajuanDU from '../navbar-pengajuan-du';
import { useNavbarStore } from '../../../../store/Navbar/NavbarStore';
import TablePengajuanBaruDU from '../../dashboard/planning/table/table-pengajuan-baru-du';


const PengajuanDashboardDU: Component = () => {
    const [, {changeTitleNavbar}] = useNavbarStore();

    onMount(() => {
        changeTitleNavbar("Pengajuan");
    })



    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Dashboard");
    })

    return (
        <div>
            <NavbarPengajuanDU />
            <div class="pengajuanDashboard_container1">
                <div class="pengajuanDashboard_container2">
                    <div class="component-1" style={{"justify-content":"space-between"}}>
                        <div>
                            <ChartPlanning />
                        </div>
                        <div>
                            <div style={{display:"flex", "flex-direction":"row", "justify-content":"space-between", "margin-bottom":"5px", height:"auto"}}>
                                <div>
                                    <h1 style={{"padding-top":"5px"}}>Keterangan</h1>
                                </div>
                                <div class="right-cp">
                                    <input type="text" placeholder="Search.." name="search" />
                                    <span class="search-icon">
                                        <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                                    </span>
                                    <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                                </div>
                            </div>
                            <TablePlanning />
                        </div>
                    </div>

                    <div class="rencanaPengajuan-container">
                        <h1>List Rencana Pengajuan</h1>
                        <TablePengajuanBaruDU/>
                        {/* <FormPlanning /> */}
                    </div>

                </div>
            </div>
            
        </div>
    );
};


export default PengajuanDashboardDU;