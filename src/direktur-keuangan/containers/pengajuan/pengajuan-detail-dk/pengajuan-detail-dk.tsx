import { createSignal, type Component, onMount } from 'solid-js';
import { useSubNavbarStore } from '../../../../store/Navbar/SubNavbarStore';
// import './pengajuan_detail.css'
// import { namaPengajuanEvent } from '../../navbars/create/kategori_pengajuan/pengajuan_event/pengajuan-event/nama-pengajuan-event';
import { A } from '@solidjs/router';
import { getNamaPengajuanEvent, getNamaPengajuanMonthly, getNamaPengajuanWeekly } from '../../../../store/Pengajuan/nama-pengajuan';
import TableWeeklyDK from './table-weekly-dk';
import TableMonthlyDK from './table-monthly-dk';
import TableEventDK from './table-event-dk';
import TableDetailPlan from '../../dashboard-dk/planning/table-detail-plan/table-detail-plan';
import TablePengajuanBaru from '../../../../containers/dashboard/plannings/table/table-pengajuan-baru';
import TablePengajuanBaruDK from '../../dashboard-dk/planning/table-detail-plan/table-pengajuan-baru-dk';
import { selectedCategory } from '../../../../store/Pengajuan/pengajuan-id';
import PengajuanNavbarDK from '../pengajuan-navbar-dk';
import './pengajuan-detail-dk.css'

const PengajuanDetailDK: Component = () => {

    const [, { changeSubTitleNavbar }] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Pengajuan Tersimpan");
    })

    const [showWeekly, setShowWeekly] = createSignal(true);

    console.log("halaman")

    return (
        <div>
            <PengajuanNavbarDK/>
            <div class="detail-plan-container">
                {/* <TableDetailPlan/> */}
                
                {selectedCategory() === 'Weekly' && <TableWeeklyDK/>}
                {selectedCategory() === 'Event' && <TableEventDK/>}
                {selectedCategory() === 'Monthly' && <TableMonthlyDK/>}

                {/* {showWeekly() && (<TablePengajuanDetailDK /> || <TablePengajuanDetailDKWeekly /> || <Table_event_detail />)} */}
            </div>

        </div>
    );
};


export default PengajuanDetailDK;