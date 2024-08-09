import { Router, Routes, Route, Navigate, hashIntegration } from '@solidjs/router';
import { AsyncResource } from 'async_hooks';
import { Component, lazy } from 'solid-js';
import { useStore } from '../store';


import OperasionalTamanhas from '../containers/navbars/create/kategori_pengajuanmonthly/operasional-tamanhas/operasional-tamanhas';
import PengajuanWeeklyRutin from '../containers/navbars/create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-rutin';
import PengajuanWeeklyInsentif from '../containers/navbars/create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-insentif/pengajuanweekly-insentif';
import PengajuanReimburse from '../containers/navbars/create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-reimburse/popup/pengajuanweekly-reimburse';

import KickOffMeeting from '../containers/navbars/create/kategori_pengajuan/kickoff-meeting/kickoff-meeting';
import PengajuanEventDetails from '../containers/navbars/create/kategori_pengajuan/pengajuan_event/pengajuan-event/pengajuan-event-detail';
import PengajuanDetailDK from '../direktur-keuangan/containers/pengajuan/pengajuan-detail-dk/pengajuan-detail-dk';
import PengajuanDashboardDK from '../direktur-keuangan/containers/pengajuan/pengajuan-dashboard-dk/pengajuan-dashboard-dk';
import PengajuanDetailDU from '../direktur-utama/containers/pengajuan/dashboard/pengajuan-detail/pengajuan-detail-du';

interface UserData {
    id: number;
    account_name: string;
    access: string;
    email: string;
  }


//============= path untuk direktur utama ============= //

// const Du = lazy(() => import('../containers/master/master/master'));

const ReportDU = lazy(() => import('../direktur-utama/containers/dashboard/report/report-du'));
const PlanningDU = lazy(() => import('../direktur-utama/containers/dashboard/planning/planning-du'));
const TimeTrackingDU = lazy(() => import('../direktur-utama/containers/dashboard/time-tracking/time-tracking-du'));
const KasApproval = lazy(() => import('../direktur-utama/containers/dashboard/kas-approval/kas-approval'));
const KeuanganDU = lazy(() => import('../direktur-utama/containers/dashboard/keuangan/keuangan-du'));
const Transfer_danaDU = lazy(() => import('../direktur-utama/containers/dashboard/transfer-dana/transfer_danaDU'));

const PengajuanDashboardDU = lazy(() => import('../direktur-utama/containers/pengajuan/dashboard/pengajuan-dashboard-du'));
const PengajuanReportDU = lazy(() => import('../direktur-utama/containers/pengajuan/report/pengajuan-report-du'));

//============= path untuk direktur keuangan ============= //
const Report_dk = lazy(() => import('../direktur-keuangan/containers/dashboard-dk/report/report_dk'));
const Planning_dk = lazy(() => import('../direktur-keuangan/containers/dashboard-dk/planning/planning_dk'));
const Time_tracking_dk = lazy(() => import('../direktur-keuangan/containers/dashboard-dk/time_tracking/time_tracking_dk'));
const Form_approve = lazy(() => import('../direktur-keuangan/containers/dashboard-dk/planning/form_approve/form_approve'));
const Transfer_dana = lazy(() => import('../direktur-keuangan/containers/dashboard-dk/transfer_dana/transfer_dana'));
const Keuangan_dashboard_dk = lazy(() => import('../direktur-keuangan/containers/dashboard-dk/keuangan_dk/keuangan_dashboard_dk'));
const Form_transfer = lazy(() => import('../direktur-keuangan/containers/dashboard-dk/transfer_dana/form_transfer'));


//============= path untuk admin ============= //

const Master = lazy(() => import('../containers/master/master/master'));
const MasterCOA = lazy(() => import('../containers/master/master-coa/master-coa'));
const MasterAkun = lazy(() => import('../containers/master/master-akun/master-akun'));

const Plan = lazy(() => import('../containers/dashboard/plannings/plan'));
// const Confirm_role = lazy(() => import('../containers/confirm_role/confirm_role'));
const Admin = lazy(() => import('../containers/dashboard/teams/teams'));
const Login = lazy(() => import('../containers/login/login'));
const Planning = lazy(() => import('../containers/dashboard/plannings/planning'));
const TimeTracking = lazy(() => import('../containers/dashboard/time-tracking/time-tracking'));
const Keuangan_dashboard = lazy(() => import('../containers/dashboard/accounting/keuangan_dashboard'));
const ArusKas = lazy(() => import('../containers/dashboard/arus-kas/arus-kas'));
const Report = lazy(() => import('../containers/dashboard/report/report'));
const Header = lazy(() => import('../containers/header/header'));

const Pengajuan_dashboard = lazy(() => import('../containers/pengajuan/pengajuan_dashboard/pengajuan_dashboard'));
const Pengajuan_laporan = lazy(() => import('../containers/pengajuan/pengajuan_laporan/pengajuan_laporan'));
const PengajuanDetail = lazy(() => import('../containers/pengajuan/pengajuan_detail/pengajuan_detail'));

const Kas_besar = lazy(() => import('../containers/report/kas_besar/kas_besar'));
const Semua_laporan = lazy(() => import('../containers/report/semua_laporan'));
const Pemasukan = lazy(() => import('../containers/report/pemasukan/pemasukan'));
const Pengeluaran = lazy(() => import('../containers/report/pengeluaran/pengeluaran'));


const Grafik_keuangan = lazy(() => import('../containers/keuangan/grafik-keuangan/grafik_keuangan'));
const KeuanganModul_dashboard = lazy(() => import('../containers/keuangan/dashboard/keuanganModul_dashboard'));
const Neraca = lazy(() => import('../containers/keuangan/neraca/neraca'));
const LabaRugi = lazy(() => import('../containers/keuangan/laba-rugi/laba-rugi'));
const Journal = lazy(() => import('../containers/keuangan/journal/journal'));
const JournalDetail = lazy(() => import('../containers/keuangan/journal-detail/journal-detail'));

const Tabel_kontak = lazy(() => import('../containers/kontak/tabel_kontak'));

const RouteData: Component = () => {
    const [{ sessionStore }] = useStore();

    const userDataString = sessionStore.sessionData as unknown as string; // Ensure sessionData is a string
    const userData = JSON.parse(userDataString) as UserData; // Parse the JSON string to an object
    const userAccess = userData.access;

    const getPath = ({ navigate, location }) => {
        if (userData.access === 'direktur_utama') {
            return "/direktur-utama/dashboard/report";
        } else if (userData.access === 'direktur_keuangan') {
            return "/dashboard-dk/report_dk";
        } else if (userData.access === 'admin') {
            return "/dashboard/report";
        } else {
            return "/dashboard/report";
        }
    }

    return (


        <Routes>

            <Route path="/" element={<Navigate href={getPath} />} />
            <Route path="/" element={<Navigate href={getPath} />} />
            <Route path="/login" component={Login} />
            {/* <Route path="/confirm_role" component={Confirm_role} /> */}

            <Route path="/dashboard-du">
                <Route path="/report" component={ReportDU} />

            </Route>

            <Route path="/dashboard-dk">
                <Route path="/report_dk" component={Report_dk} />
                <Route path="/planning_dk" component={Planning_dk} />
                <Route path="/form_approve" component={Form_approve} />
                <Route path="/time_tracking_dk" component={Time_tracking_dk} />
                <Route path="/keuangan_dashboard_dk" component={Keuangan_dashboard_dk} />
                <Route path="/transfer_dana" component={Transfer_dana} />
                <Route path="/form_transfer" component={Form_transfer} />
            </Route>

            <Route path="/direktur-keuangan/pengajuan">
                <Route path="/pengajuan-dashboard" component={PengajuanDashboardDK} />
                <Route path="/pengajuan-detail" component={PengajuanDetailDK} />

            </Route>

            <Route path="/master">
                <Route path="/master" component={Master} />
                <Route path="/mastercoa" component={MasterCOA} />
                <Route path="/masterakun" component={MasterAkun} />
            </Route>

            <Route path="/dashboard">
                <Route path="/plan" component={Plan} />
                <Route path="/admin" component={Admin} />
                <Route path="/planning" component={Planning} />
                <Route path="/time-tracking" component={TimeTracking} />
                <Route path="/report" component={Report} />
                <Route path="/keuangan_dashboard" component={Keuangan_dashboard} />
                <Route path="/header" component={Header} />
                <Route path="/arus-kas" component={ArusKas} />
                <Route path="/" component={ArusKas} />                
            </Route>

            <Route path="/report">
                <Route path="/semua_laporan" component={Semua_laporan} />
                <Route path="/kas_besar" component={Kas_besar} />
                <Route path="/pemasukan" component={Pemasukan} />
                <Route path="/pengeluaran" component={Pengeluaran} />
            </Route>

            <Route path="/pengajuan">
                <Route path="/pengajuan_dashboard" component={Pengajuan_dashboard} />
                <Route path="/pengajuan_laporan" component={Pengajuan_laporan} />
                <Route path="/pengajuan_detail" component={PengajuanDetail} />
            </Route>

            <Route path="/keuangan">
                <Route path="/grafik-keuangan" component={Grafik_keuangan} />
                <Route path="/keuanganModul_dashboard" component={KeuanganModul_dashboard} />
                <Route path="/neraca" component={Neraca} />
                <Route path="/labarugi" component={LabaRugi} />
                <Route path="/journal" component={Journal} />
                <Route path="/journaldetail" component={JournalDetail} />
            </Route>

            <Route path="/kontak">
                <Route path="/tabel_kontak" component={Tabel_kontak} />
            </Route>


            <Route path="/direktur-utama/dashboard">
                <Route path="/report" component={ReportDU} />
                <Route path="/planning" component={PlanningDU}/>
                <Route path="/time-tracking" component={TimeTrackingDU}/>
                <Route path="/kas-approval" component={KasApproval}/>
                <Route path="/keuangan" component={KeuanganDU}/>
                <Route path="/transfer_danaDU" component={Transfer_danaDU}/>
            </Route>

            <Route path="/direktur-utama/pengajuan">
                 <Route path="/dashboard" component={PengajuanDashboardDU} />
                 <Route path="/report" component={PengajuanReportDU} />
                 <Route path="/pengajuan-detail-du" component={PengajuanDetailDU} />
            </Route>


            <Route path="/pengajuan-weekly">
                {/* <Route path="/pengajuanweekly-rutin" component={PengajuanWeeklyRutin} /> */}
                <Route path="/pengajuanweekly-insentif" component={PengajuanWeeklyInsentif} />
                {/* <Route path="/pengajuan-reimburse" component={PengajuanReimburse} /> */}
                <Route path="/masterakun" component={MasterAkun} />
            </Route>

            <Route path="/pengajuan-monthly">
                <Route path="/operasional-rutin-tamanhas" component={OperasionalTamanhas} />
            </Route>

            <Route path="/pengajuan-event">
                <Route path="/pengajuan-event-detail" component={PengajuanEventDetails} />
            </Route>
        </Routes>
    )
}

export default RouteData;