import { createSignal, type Component, onMount } from 'solid-js';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
import Pengajuan_navbar from '../pengajuan_navbar';
import './pengajuan_detail.css'
// import { namaPengajuanEvent } from '../../navbars/create/kategori_pengajuan/pengajuan_event/pengajuan-event/nama-pengajuan-event';
import { A } from '@solidjs/router';
import { getNamaPengajuanEvent, getNamaPengajuanMonthly, getNamaPengajuanWeekly, resetNamaPengajuanEvent, resetNamaPengajuanMonthly, resetNamaPengajuanWeekly } from '../../../store/Pengajuan/nama-pengajuan';
import TablePengajuanDetail from './table-monthly-detail';
import Table_event_detail from './table_event_detail';
import TablePengajuanDetailWeekly from './table-weekly';
import { selectedCategory } from '../../../store/Pengajuan/pengajuan-id';
import { Icon } from '@iconify-icon/solid';
import Admin from '../../dashboard/teams/teams';


const PengajuanDetail: Component = () => {

    const [, { changeSubTitleNavbar }] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Pengajuan Tersimpan");
    })

    const [showWeekly, setShowWeekly] = createSignal(true);

    function hapusEventDetail(){
        resetNamaPengajuanEvent();
        localStorage.removeItem('tableDataEventDetails');
        localStorage.removeItem('tableKetPengajuanEvent');
    };

    function hapusWeeklyDetail(){
        resetNamaPengajuanWeekly();
        localStorage.removeItem('tableDataWeekly');
        localStorage.removeItem('tableKetWeekly');
    };

    function hapusMonthlyDetail(){
        resetNamaPengajuanMonthly();
        localStorage.removeItem('tableData');
        localStorage.removeItem('tableKetMonth');
    };

    const [popUpConfirm, setPopUpConfirm] = createSignal(false)
    const [categoryDelete, setCategoryDelete] = createSignal('');

    function handlePopUpConfirm(category: string){
        setPopUpConfirm(true);
        setCategoryDelete(category);
        // if(category === 'Monthly'){
        //     setCategoryDelete(category);
        // } else if(category === 'Event'){
        //     setCategoryDelete(category);
        // } else if(category === 'Weekly'){
        //     setCategoryDelete(category);
        // }
    }

    function deletePlan(){
        console.log(`dlt ${categoryDelete()}`)
        if(categoryDelete() === 'Monthly'){
            hapusMonthlyDetail();
        } else if(categoryDelete() === 'Event'){
            hapusEventDetail();
        } else if(categoryDelete() === 'Weekly'){
            hapusWeeklyDetail();
        }
        setPopUpConfirm(false);
    }

    function closePopUpConfirm(){
        setPopUpConfirm(false)
    }

    return (
        <div>
            <Pengajuan_navbar />
            <div class="pengajuan-detail-container">
            <table>
                <thead>
                    <tr>
                        <th style={{width:"30vh"}}>Jenis Pengajuan</th>
                        <th style={{width:"fit-content"}}>Nama Pengajuan</th>
                        <th style={{width:"10vh"}}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Pengajuan Event</td>
                    <td><A href="/pengajuan-event/pengajuan-event-detail">{getNamaPengajuanEvent()}</A></td>
                    <td><Icon icon="bi:trash-fill" onClick={() => handlePopUpConfirm('Event')} /></td>
                    </tr>
                    <tr>
                    <td>Pengajuan Weekly</td>
                    <td><A href="/pengajuan-weekly/pengajuanweekly-insentif">{getNamaPengajuanWeekly()}</A></td>
                    <td><Icon icon="bi:trash-fill" onClick={() => handlePopUpConfirm('Weekly')} /></td>
                    </tr>
                    <tr>
                    <td>Pengajuan Monthly</td>
                    <td><A href="/pengajuan-monthly/operasional-rutin-tamanhas">{getNamaPengajuanMonthly()}</A></td>
                    <td><Icon icon="bi:trash-fill" onClick={() => handlePopUpConfirm('Monthly')} /></td>
                    </tr>
                </tbody>
            </table>


                    {/* <div>
                        <h1>Pengajuan Event:</h1>
                        <A href="/pengajuan-event/pengajuan-event-detail">
                        <p>{getNamaPengajuanEvent()}</p>
                        </A>
                    </div>

                    <div>
                        <h1>Pengajuan Weekly:</h1>
                        <A href="/pengajuan-weekly/pengajuanweekly-insentif">
                        <p>{getNamaPengajuanWeekly()}</p>
                        </A>
                    </div>

                    <div>
                        <h1>Pengajuan Monthly:</h1>
                        <A href="/pengajuan-monthly/operasional-rutin-tamanhas">
                        <p>{getNamaPengajuanMonthly()}</p>
                        </A>
                    </div> */}

                {selectedCategory() === 'Weekly' && <TablePengajuanDetailWeekly />}
                {selectedCategory() === 'Event' && <Table_event_detail />}
                {selectedCategory() === 'Monthly' && <TablePengajuanDetail />}

                {/* {showWeekly() && (<TablePengajuanDetail /> || <TablePengajuanDetailWeekly /> || <Table_event_detail />)} */}
            </div>
                {popUpConfirm() && 
                <div class='overlay'>
                <div class="absolute">
                <div class="confirm-edit-detail" style={{"text-align":"center"}}>
                    Apakah anda yakin ingin menghapus data dari {categoryDelete()}?
                    <div class="btn-confirm-edit-detail" style={{"margin-top":"10px"}}>
                        <button class="btn-iya-tidak iya" onClick={closePopUpConfirm}>Tidak</button>
                        <button class="btn-iya-tidak tidak" onClick={deletePlan}>Ya</button>
                    </div>
                </div>
                </div>
                </div>
                }
        </div>
    );
};


export default PengajuanDetail;