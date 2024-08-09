import { createSignal, type Component, onMount } from 'solid-js';
import { useNavigate, A, Navigate } from '@solidjs/router';
// import type { Component } from 'solid-js';

import './transfer_dana.css';
import Header from "../header/header";
import { Icon } from '@iconify-icon/solid';
import Tabel_transfer_dana from "./tabel_transfer_dana";
import { useSubNavbarStore } from "../../../../store/Navbar/SubNavbarStore";
import Bar_time from "../time_tracking/bar_time";
import Tabel_kas_approval_td from "./tabel_kas_approval_td";
import Table_time from "../time_tracking/table_time";


const Arus_kas: Component = () => {

    const [, { changeSubTitleNavbar }] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Transfer Dana");
    })

    const [selectedRow, setSelectedRow] = createSignal<{ id: any; status: any; } | null>(null);

    const [showText, setShowText] = createSignal(true);

    const [showSteps, setShowSteps] = createSignal(false);


    function handleSteps() {
        setShowSteps(!showSteps());
    }

    // const handleRowClick = (event: { data: any; node: any; }) => {
    //   const { data, node } = event;
    //   setSelectedRow(() => ({ id: node.data.number, status: data.approved_by }));
    //   setShowText(false);
    // };

    const handleRowClick = (event: { data: any; node: any; }) => {
        const { data, node } = event;
        setSelectedRow(() => ({ id: node.data.planning_id, status: data.status }));
        setShowText(!showText());
        handleSteps();
    };

    const getStatusSteps = (status: any) => {
        switch (status) {
            case "Waiting":
                return (
                    <div class="step-status">
                        <div class="step-bar">
                            <div class="bar success"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                        <div class="step-bar">
                            <div class="step-label">Transmit Request/Planning For Status</div>
                            <div class="step-label">Approval by Direktur Keuangan</div>
                            <div class="step-label">Approval by Direktur Utama</div>
                        </div>
                    </div>
                );
            case "Approved":
                return (
                    <div class="step-status">
                        <div class="step-bar">
                            <div class="bar success"></div>
                            <div class="bar success"></div>
                            <div class="bar success"></div>
                        </div>
                        <div class="step-bar">
                            <div class="step-label">Transmit Request/Planning For Status</div>
                            <div class="step-label">Approval by Direktur Keuangan</div>
                            <div class="step-label">Approval by Direktur Utama</div>
                        </div>
                    </div>
                );
            case "Rejected":
                return (
                    <div class="step-status">
                        <div class="step-bar">
                            <div class="bar reject"></div>
                            <div class="bar reject"></div>
                            <div class="bar reject"></div>
                        </div>
                        <div class="step-bar">
                            <div class="step-label">Transmit Request/Planning For Status</div>
                            <div class="step-label">Approval by Direktur Keuangan</div>
                            <div class="step-label">Approval by Direktur Utama</div>
                        </div>
                    </div>
                );
            case "InProgress":
                return (
                    <div class="step-status">
                        <div class="step-bar">
                            <div class="bar success"></div>
                            <div class="bar success"></div>
                            <div class="bar"></div>
                        </div>
                        <div class="step-bar">
                            <div class="step-label">Transmit Request/Planning For Status</div>
                            <div class="step-label">Approval by Direktur Keuangan</div>
                            <div class="step-label">Approval by Direktur Utama</div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div class="arus-kas">
            <Header />
            {/* <div class="card-module">
                    <div style={{"font-family":"Manrope","font-size": "20px","font-weight": "800","margin-top": "2vh", "margin-left": "2vw"}}>
                        Arus Kas
                    </div>
                </div> */}
            <div class="card-arus-kas">
                <div class="nameheader">
                    <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search" />
                        <span class="search-icon">
                            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                        </span>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                </div>
                <div class="tableteams">
                    <h3 style={{ "margin-left": "2.5rem" }}>Transfer Dana Weekly</h3>
                    <Tabel_transfer_dana />
                </div>

                <div class="approval-td" style={{ "margin-top": "2rem" }}>
                    <p style={{ "font-size": "20px", "margin-left": "4rem", "margin-bottom": "0.5rem", "font-weight": "600" }}>Kas Approval</p>
                    <Tabel_kas_approval_td />
                </div>

                <div class="time-tracker-td" style={{ "margin-top": "2rem" }}>
                    <p style={{ "font-size": "20px", "margin-left": "4rem", "margin-bottom": "0.5rem", "font-weight": "600" }}>Approval Tracker</p>
                    <div>
                        <Table_time onRowClicked={handleRowClick} />
                    </div>
                    <div class="card-bar">
                        {showText() && <p>Klik barisan untuk melihat tracker</p>}
                        {showSteps() && selectedRow()?.status && getStatusSteps(selectedRow()?.status)}
                    </div>
                </div>
            </div>


            {/* <div class="time-tracking-td">
                <div class="table-time-td">
                    <Table_time />
                </div>

                <div class="bar-time-td">
                    <Bar_time />
                </div>
            </div> */}
        </div>
    )
}

export default Arus_kas;