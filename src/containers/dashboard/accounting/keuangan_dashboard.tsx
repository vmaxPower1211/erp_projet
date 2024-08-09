import { onMount, type Component } from 'solid-js';
import './keuangan_dashboard.css';
import Grafik_keuangan_dashboard from './grafik_keuangan_dashboard';
import { Icon } from '@iconify-icon/solid';
import Header from '../../header/header';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const Keuangan_dashboard: Component = () => {
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Keuangan");
    }) 
    
    return (
        <div class="grafik_keuangan_dashboard">
            <Header />
            {/* div untuk memberikan judul keuangan dashboard */}
            {/* <div class="card-module">
                <div style={{ "font-family":"Manrope", "font-size": "20px", "font-weight": "800", "margin-top": "2vh", "margin-left": "2vw" }}>
                    Keuangan
                </div>
            </div> */}

            <div class="grafik_keuangan_dashboard2">
                {/* div untuk container top table pada semua laporan */}
                <div class="keuanganDashboard-top-table">
                    <div class="search-container">
                        <div class="search-input">
                            <input
                                type="text"
                                class="form-control"
                                id="filter-text-box"
                                placeholder="Search..."
                            />
                            <span class="search-icon">
                                <Icon icon="ic:baseline-search" color="gray" width="16" height="16" />
                            </span>
                        </div>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                </div>

                {/* div untuk card chart total pada keuangan dashboard */}
                <div class="all-report-card" style={{
                    "display": "flex",
                    "justify-content": "center", "margin-top": "1rem"
                }}>
                    <div class="report-case1 stats shadow">
                        <div class="report-card">
                            <div class="card-font stat-title">Journal</div>
                            <div>
                                <div class="report-jumlah-1 stat-value">BGN 28,051.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="report-case2 stats shadow">
                        <div class="report-card">
                            <div class="card-font stat-title">Balance</div>
                            <div>
                                <div class="report-jumlah-2 stat-value">BGN 28,051.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="report-case3 stats shadow">
                        <div class="report-card">
                            <div class="card-font stat-title">Profit Loss</div>
                            <div>
                                <div class="report-jumlah-3 stat-value">BGN 28,051.00</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* div untuk card chart total pada keuangan dashboard */}
                <div class="card-chart">
                    <div class="total" style={{ "display": "flex" }}>
                        <div>
                            <div class="card-font-4 stat-title">Total</div>
                            <div>
                                <div class="report-jumlah-4 stat-value">5.987,37</div>
                            </div>
                            <div class="card-font-4 stat-title">BGN</div>
                        </div>
                        {/* <div class="total-icon" style={{"float":"right","background-color":"red"}}>
                            <Icon icon="fluent:info-24-filled" color="#bdbdbd" width="24" height="24" style={{"float":"right"}}/>
                        </div> */}
                    </div>

                    <div class="grafik-keuangan-dashboard-container">
                        <Grafik_keuangan_dashboard />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Keuangan_dashboard;
