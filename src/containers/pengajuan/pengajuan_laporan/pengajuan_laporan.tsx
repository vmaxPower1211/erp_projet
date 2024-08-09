import { createSignal, type Component, onMount } from 'solid-js';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import AgGridSolid from 'ag-grid-solid';

import './pengajuan_laporan.css';
import Pengajuan_navbar from '../pengajuan_navbar';
import TableTime from '../../dashboard/time-tracking/table-time';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';


const Pengajuan_laporan: Component = () => {

    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Report");
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
        setSelectedRow(() => ({ id: node.data.NO, status: data.Status }));
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
            case "In Process":
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
        <div>
            <Pengajuan_navbar />
            <div class="pengajuanLaporan_container">
                <div class="nameheader">
                    <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search" />
                        <span class="search-icon">
                            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                        </span>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                </div>
                <div>
                    <TableTime onRowClicked={handleRowClick} />
                </div>
                <div class="card-bar">
                    {showText() && <p>Klik barisan untuk melihat tracker</p>}
                    {showSteps() && selectedRow()?.status && getStatusSteps(selectedRow()?.status)}
                </div>
            </div>
        </div>
    );
};


export default Pengajuan_laporan;