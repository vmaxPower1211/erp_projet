import { Component, createSignal, onMount } from "solid-js";
import { useNavigate, A, Navigate } from '@solidjs/router';

import './kas-approval.css'
import { Icon } from '@iconify-icon/solid';
import { useSubNavbarStore } from "../../../../store/Navbar/SubNavbarStore";
import DashboardDU from "../dashboard-du";
import TableKasApproved from "./table/table-kas-approved";
import TableDaftarKas from "./table/table-daftar-kas";
import TableTracker from "./table/table-tracker";



const KasApproval: Component = () => {
    
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Kas Approval");
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
            <DashboardDU/>
                {/* <div class="card-module">
                    <div style={{"font-family":"Manrope","font-size": "20px","font-weight": "800","margin-top": "2vh", "margin-left": "2vw"}}>
                        Arus Kas
                    </div>
                </div> */}
                
            <div class="card-arus-kas">
                <div style={{display:'flex', "flex-direction":"column", "gap":"11vh"}}>
                    <div>
                        <div class="nameheader">
                        <h1>Kas Approved</h1>
                            <div class="rightcp">
                                <input type="text" placeholder="Search.." name="search"/>
                                    <span class="search-icon">
                                    <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                                    </span>
                                <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                            </div>
                        </div>

                        <div>
                            <TableKasApproved/>
                        </div>
                    </div>

                    <div>
                        <h1>Daftar Kas</h1>
                        <TableDaftarKas/>
                    </div>

                    <div>
                        <h1>Approval Tracker</h1>
                        <TableTracker onRowClicked={handleRowClick} />
                        <div class="card-bar">
                        {showText() && <p>Klik barisan untuk melihat tracker</p>}
                        {showSteps() && selectedRow()?.status && getStatusSteps(selectedRow()?.status)}
                    </div>
                    </div>
                </div>
                
            </div>    
        </div>
    )
}

export default KasApproval;