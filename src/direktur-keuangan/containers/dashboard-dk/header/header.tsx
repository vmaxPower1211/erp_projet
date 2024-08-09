import { Component, onMount } from "solid-js";
import { useNavigate, A, Navigate, useLocation } from '@solidjs/router';
import { Icon } from '@iconify-icon/solid';
import './header.css';
import { useStore } from "../../../../store";
import { useNavbarStore } from "../../../../store/Navbar/NavbarStore";


const Header: Component = () => {

    const [{titleStore}] = useStore();

    const location = useLocation();

    return (
        <div style={{display:'flex', "flex-direction":"column"}}>

        <div>
        <div class="header font-[Exo]">
            
            <div class="selection">
                <A href='/dashboard-dk/report_dk' classList={{ active: location.pathname === '/dashboard-dk/report_dk' }}>
                    <div class="box-menu">
                    <div class="menu-selection">
                        <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="34" height="35" viewBox="0 0 24 24" fill="none" stroke="#8A8A8B">
                            <path d="M8 5H6C5.46957 5 4.96086 5.21071 4.58579 5.58579C4.21071 5.96086 4 6.46957 4 7V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H11.697M18 14V18H22M18 11V7C18 6.46957 17.7893 5.96086 17.4142 5.58579C17.0391 5.21071 16.5304 5 16 5H14" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 11H12M8 15H11M8 5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H12C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C14 5.53043 13.7893 6.03914 13.4142 6.41421C13.0391 6.78929 12.5304 7 12 7H10C9.46957 7 8.96086 6.78929 8.58579 6.41421C8.21071 6.03914 8 5.53043 8 5ZM14 18C14 19.0609 14.4214 20.0783 15.1716 20.8284C15.9217 21.5786 16.9391 22 18 22C19.0609 22 20.0783 21.5786 20.8284 20.8284C21.5786 20.0783 22 19.0609 22 18C22 16.9391 21.5786 15.9217 20.8284 15.1716C20.0783 14.4214 19.0609 14 18 14C16.9391 14 15.9217 14.4214 15.1716 15.1716C14.4214 15.9217 14 16.9391 14 18Z" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="name-selection">
                            Report
                        </div>
                    </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/dashboard-dk/planning_dk' classList={{ active: location.pathname === '/dashboard-dk/planning_dk' }}>
                    <div class="menu-selection">                
                        <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 34 27" fill="none">
                            <path d="M15 8.33333C15 11.1 12.7667 13.3333 10 13.3333C7.23333 13.3333 5 11.1 5 8.33333C5 5.56667 7.23333 3.33333 10 3.33333C12.7667 3.33333 15 5.56667 15 8.33333ZM20 26.6667H0V23.3333C0 19.65 4.48333 16.6667 10 16.6667C15.5167 16.6667 20 19.65 20 23.3333M8.33333 8.33333C8.33333 9.25 9.08333 10 10 10C10.9167 10 11.6667 9.25 11.6667 8.33333C11.6667 7.41667 10.9167 6.66667 10 6.66667C9.08333 6.66667 8.33333 7.41667 8.33333 8.33333ZM3.33333 23.3333H16.6667C16.6667 21.5 13.6833 20 10 20C6.31667 20 3.33333 21.5 3.33333 23.3333ZM33.3333 13.3333V16.6667H18.3333V13.3333M33.3333 6.66667V10H18.3333V6.66667M33.3333 0V3.33333H18.3333V0H33.3333Z" fill="#8A8A8B"/>
                            </svg>
                        <div class="name-selection" style={{"margin-left":"-1vw"}}>
                            Planning
                        </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/dashboard-dk/time_tracking_dk' classList={{ active: location.pathname === '/dashboard-dk/time_tracking_dk' }}>
                    <div class="menu-selection" style={{"margin-right": "-1.5vw"}}>                
                        <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 33 34" fill="none">
                            <path d="M16.25 30C19.6978 30 23.0044 28.5952 25.4424 26.0948C27.8804 23.5943 29.25 20.2029 29.25 16.6667C29.25 13.1304 27.8804 9.73906 25.4424 7.23858C23.0044 4.73809 19.6978 3.33333 16.25 3.33333C12.8022 3.33333 9.49559 4.73809 7.05761 7.23858C4.61964 9.73906 3.25 13.1304 3.25 16.6667C3.25 20.2029 4.61964 23.5943 7.05761 26.0948C9.49559 28.5952 12.8022 30 16.25 30ZM16.25 0C18.384 0 20.4971 0.431096 22.4686 1.26867C24.4401 2.10625 26.2315 3.33391 27.7405 4.88155C29.2494 6.4292 30.4464 8.26652 31.263 10.2886C32.0797 12.3107 32.5 14.478 32.5 16.6667C32.5 21.0869 30.788 25.3262 27.7405 28.4518C24.693 31.5774 20.5598 33.3333 16.25 33.3333C7.26375 33.3333 0 25.8333 0 16.6667C0 12.2464 1.71205 8.00716 4.75952 4.88155C7.80698 1.75595 11.9402 0 16.25 0ZM17.0625 8.33333V17.0833L24.375 21.5333L23.1563 23.5833L14.625 18.3333V8.33333H17.0625Z" fill="#7E7F90"/>
                        </svg>
                    <div class="name-selection" style={{"margin-left":"-1.9vw"}}>
                            Time Tracking
                        </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/dashboard-dk/transfer_dana' classList={{ active: location.pathname === '/dashboard-dk/transfer_dana' }}>
                    <div class="menu-selection">                
                        <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 35 35" fill="none">
                            <path d="M17.5 0C7.83594 0 0 7.83594 0 17.5C0 27.1641 7.83594 35 17.5 35C27.1641 35 35 27.1641 35 17.5C35 7.83594 27.1641 0 17.5 0ZM17.5 32.0312C9.47656 32.0312 2.96875 25.5234 2.96875 17.5C2.96875 9.47656 9.47656 2.96875 17.5 2.96875C25.5234 2.96875 32.0312 9.47656 32.0312 17.5C32.0312 25.5234 25.5234 32.0312 17.5 32.0312ZM19.3633 16.5938L18.3711 16.3633V11.1172C19.8555 11.3203 20.7734 12.25 20.9297 13.3906C20.9492 13.5469 21.082 13.6602 21.2383 13.6602H22.9922C23.1758 13.6602 23.3203 13.5 23.3047 13.3164C23.0664 10.8828 21.0625 9.32031 18.3867 9.05078V7.77344C18.3867 7.60156 18.2461 7.46094 18.0742 7.46094H16.9766C16.8047 7.46094 16.6641 7.60156 16.6641 7.77344V9.0625C13.8984 9.33203 11.7344 10.8594 11.7344 13.7109C11.7344 16.3516 13.6797 17.625 15.7227 18.1133L16.6875 18.3594V23.9336C14.9609 23.7031 13.9922 22.7812 13.793 21.5391C13.7695 21.3906 13.6367 21.2812 13.4844 21.2812H11.6797C11.4961 21.2812 11.3516 21.4375 11.3672 21.6211C11.543 23.7695 13.1719 25.7461 16.6484 26V27.2266C16.6484 27.3984 16.7891 27.5391 16.9609 27.5391H18.0703C18.2422 27.5391 18.3828 27.3984 18.3828 27.2227L18.375 25.9844C21.4336 25.7148 23.6211 24.0781 23.6211 21.1406C23.6172 18.4297 21.8945 17.2188 19.3633 16.5938ZM16.6836 15.9609C16.4648 15.8984 16.2812 15.8398 16.0977 15.7656C14.7773 15.2891 14.1641 14.5195 14.1641 13.5273C14.1641 12.1094 15.2383 11.3008 16.6836 11.1172V15.9609ZM18.3711 23.9453V18.7227C18.4922 18.7578 18.6016 18.7852 18.7148 18.8086C20.5625 19.3711 21.1836 20.1523 21.1836 21.3516C21.1836 22.8789 20.0352 23.7969 18.3711 23.9453Z" fill="#7E7F90"/>
                        </svg>
                        <div class="name-selection">
                            Transfer Dana
                        </div>
                    </div>
                </A>
            </div>

            <div class="selection">
                <A href='/dashboard-dk/keuangan_dashboard_dk' classList={{ active: location.pathname === '/dashboard-dk/keuangan_dashboard_dk' }}>
                    <div class="menu-selection">                
                        <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 24" fill="none">
                            <path d="M9 11H21.375V13H9V11ZM9 16H23.625V18H9V16Z" fill="#8A8A8B"/>
                            <path d="M29.75 2V1.5H29.25H2.25H1.75V2V4V4.5H2.25H15.75H29.25H29.75V4V2ZM0.991192 23.0405L0.662789 23.41L0.991191 23.0405C0.668216 22.7534 0.5 22.3775 0.5 22V2C0.5 1.62245 0.668216 1.24658 0.991192 0.959491C1.31609 0.670697 1.7681 0.5 2.25 0.5H29.25C29.7319 0.5 30.1839 0.670697 30.5088 0.95949C30.8318 1.24658 31 1.62245 31 2V22C31 22.3775 30.8318 22.7534 30.5088 23.0405C30.1839 23.3293 29.7319 23.5 29.25 23.5H2.25C1.7681 23.5 1.31609 23.3293 0.991192 23.0405ZM1.75 22V22.5H2.25H29.25H29.75V22V6V5.5H29.25H2.25H1.75V6V22Z" fill="#8A8A8B" />
                        </svg>
                    <div class="name-selection" style={{"margin-left":"-1.2vw"}}>
                            Financial
                        </div>
                    </div>
                </A>
            </div>  
            
        </div>
        </div>

        <div class="dashboard-title" style={{ "font-family":"Exo","font-size": "20px", "font-weight": "600"}}>
            {titleStore.title_subnavbar}
        </div>

        </div>
    )
}

export default Header;