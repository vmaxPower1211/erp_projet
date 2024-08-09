import { Component, onMount } from "solid-js";
import { useNavigate, A, Navigate } from '@solidjs/router';
// import type { Component } from 'solid-js';

import './arus-kas.css'
import Header from '../../header/header';
import { Icon } from '@iconify-icon/solid';
import TableArusKas from './table-arus-kas';
import { useSubNavbarStore } from "../../../store/Navbar/SubNavbarStore";



const ArusKas: Component = () => {
    
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Arus Kas");
    }) 

    return (
        <div class="arus-kas">
                <Header/>
                {/* <div class="card-module">
                    <div style={{"font-family":"Manrope","font-size": "20px","font-weight": "800","margin-top": "2vh", "margin-left": "2vw"}}>
                        Arus Kas
                    </div>
                </div> */}
            <div class="card-arus-kas">
                <div class="nameheader">
                    <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search"/>
                            <span class="search-icon">
                            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                            </span>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                </div>
                    <div class="tableteams">
                        <TableArusKas/>
                    </div>
            </div>
        </div>
    )
}

export default ArusKas;