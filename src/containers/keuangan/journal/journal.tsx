import type { Component } from 'solid-js';
import './journal.css'
import { Icon } from '@iconify-icon/solid';
import KeuanganNavbar from '../keuangan-navbar';
import TableJournal from './table-journal';


const Journal: Component = () => {
  return (

    <div class="journal">
        <KeuanganNavbar/>
        <div class="box-1">
            <div class="top-1">
                <h1>Journal</h1>
                <div class="rightcp">
                    <input type="text" placeholder="Search.." name="search"/>
                        <span class="search-icon">
                        <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                        </span>
                    <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                </div>
            </div>

            <div>
            <div class="journal-label">
                <p>Journal</p> <p>27/09/2023 </p> <p>Created on 26/09/2023 10:52:49</p>
            </div>
                <TableJournal/>
            </div>
        </div>
    </div>
  );
};

export default Journal;
