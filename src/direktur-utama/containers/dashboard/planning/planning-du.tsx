import { onMount, type Component } from 'solid-js';
import './planning-du.css';
// import TablePlanning from './table/table-planning';
// import ChartPlanning from './chart-planning';
// import TableDetailPlan from './table/table-detail-plan';
import { Icon } from '@iconify-icon/solid';
import { useSubNavbarStore } from '../../../../store/Navbar/SubNavbarStore';
import DashboardDU from '../dashboard-du';
import ChartPlanning from '../../../../containers/dashboard/plannings/chart-planning';
import TablePlanning from '../../../../containers/dashboard/plannings/table/table-planning';
import TableDetailPlan from '../../../../direktur-utama/containers/dashboard/planning/table/table-detail-plan-du';
import TablePengajuanBaruDU from './table/table-pengajuan-baru-du';
import TableDetailPlanDU from '../../../../direktur-utama/containers/dashboard/planning/table/table-detail-plan-du';
// import FormPlanning from './form/form-planning';
// import { A } from '@solidjs/router';
// import Header from '../../header/header';
// import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const PlanningDU: Component = () => {
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Planning");
    })
    
    return (
        <div class="plan-du">
            <DashboardDU />
            {/* <div class="card-module">
                <div style={{ "font-family":"Exo", "font-size": "20px", "font-weight": "800", "margin-top": "2vh", "margin-left": "2vw" }}>
                    Planning
                </div>
            </div> */}
            {/* <A href="/master/master">
            <button style={{"background-color":"aqua"}}>ke master</button>
        </A> */}


            <div class="box-1">

                <div class="component-1">
                    <div>
                        <ChartPlanning />
                    </div>
                    <div>
                        <div style={{display:"flex", "flex-direction":"row", "justify-content":"space-between", "margin-bottom":"5px", height:"auto"}}>
                            <div>
                                <h1 style={{"padding-top":"5px"}}>Keterangan</h1>
                            </div>
                            <div class="rightcp">
                                <input type="text" placeholder="Search.." name="search" />
                                <span class="search-icon">
                                    <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                                </span>
                                <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                            </div>
                        </div>
                        <TablePlanning />
                    </div>
                    {/* <div class="tabel-keterangan">
                        <div class="rightcp">
                            <input type="text" placeholder="Search.." name="search" />
                            <span class="search-icon">
                                <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                            </span>
                            <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                        </div>
                        <div>
                            <h1>Keterangan</h1>
                            <TablePlanning />
                        </div>
                    </div> */}
                </div>

                <div>
                    <h1>List Rencana Pengajuan</h1>
                    <TableDetailPlanDU />
                    <TablePengajuanBaruDU />
                </div>

            </div>
        </div>
    );
};

export default PlanningDU;
