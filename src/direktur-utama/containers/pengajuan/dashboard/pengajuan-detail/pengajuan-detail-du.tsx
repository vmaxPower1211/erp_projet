import { createSignal, type Component, onMount } from 'solid-js';
// import './pengajuan_detail.css'
// import { namaPengajuanEvent } from '../../navbars/create/kategori_pengajuan/pengajuan_event/pengajuan-event/nama-pengajuan-event';
import { A } from '@solidjs/router';
import { getNamaPengajuanEvent, getNamaPengajuanMonthly, getNamaPengajuanWeekly } from '../../../../../store/Pengajuan/nama-pengajuan';
// import { getNamaPengajuanEvent, getNamaPengajuanMonthly, getNamaPengajuanWeekly } from '../../../../store/Pengajuan/nama-pengajuan';
import TableWeeklyDU from './table-weekly-du';
import TableMonthlyDU from './table-monthly-du';
import TableEventDU from './table-event.du';
import TableDetailPlanDU from '../../../dashboard/planning/table/table-detail-plan-du';
import TablePengajuanBaru from '../../../../../containers/dashboard/plannings/table/table-pengajuan-baru';
import TablePengajuanBaruDU from '../../../dashboard/planning/table/table-pengajuan-baru-du';
import { selectedCategory } from '../../../../../store/Pengajuan/pengajuan-id';
import PengajuanNavbarDU from './pengajuan-navbar-du';
import './pengajuan-detail-du.css'
import { useSubNavbarStore } from '../../../../../store/Navbar/SubNavbarStore';

const PengajuanDetailDU: Component = () => {

    const [, { changeSubTitleNavbar }] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Pengajuan Tersimpan");
    })

    const [showWeekly, setShowWeekly] = createSignal(true);

    console.log("halaman")

    return (
        <div>
            <PengajuanNavbarDU/>
            <div class="detail-plan-container">
                {/* <TableDetailPlan/> */}
                
                {selectedCategory() === 'Weekly' && <TableWeeklyDU/>}
                {selectedCategory() === 'Event' && <TableEventDU/>}
                {selectedCategory() === 'Monthly' && <TableMonthlyDU/>}

                {/* {showWeekly() && (<TablePengajuanDetailDK /> || <TablePengajuanDetailDKWeekly /> || <Table_event_detail />)} */}
            </div>

        </div>
    );
};


export default PengajuanDetailDU;