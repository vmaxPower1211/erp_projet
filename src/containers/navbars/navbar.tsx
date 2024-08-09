import { Component, JSX, createSignal, onMount } from "solid-js";
import PT_PopUp from "./pop-up/pt-pop-up";
import './navbar.css';
import { A, useLocation } from '@solidjs/router';
import { Menu, useContextMenu, Item, Separator, Submenu } from 'solid-contextmenu';
import 'solid-contextmenu/dist/style.css';
import PengeluaranCreate from './create/pengeluaran/pengeluaran';
import PemasukanCreate from './create/pemasukan/pemasukan';
import PengajuanCreate from './create/pengajuan/pengajuan';
import TambahCoaCreate from './create/tambah-coa/tambah-coa';
import TambahAkunCreate from './create/tambah-akun/tambah-akun';
import LogoutPopUp from "./pop-up/logout-pop-up";
import { useStore } from "../../store";
import TambahAkunMaster from "../master/master-akun/forms/tambah-akun-master";
import FormTambahCOA from "../master/master-coa/forms/form-tambah-coa";
import Pengajuan from './create/pengajuan/pengajuan';
import PengajuanEvent from "./create/kategori_pengajuan/pengajuan_event/pengajuan-event/pengajuan-event";
import { TotalE1 } from "../../store/Pengajuan/Event/event-total-store";
import PengajuanMonthly from "./create/kategori_pengajuanmonthly/pengajuan-monthly";
import { Total, Total3, Total4, Total5 } from "../../store/Pengajuan/Monthly-satu/pengajuan-m-satu";
import { Total2 } from "../../store/Pengajuan/Monthly-satu/pengajuan-m-satu";
import PengajuanWeekly from "./create/kategori_pengajuanweekly/pengajuan-weekly/pengajuan-weekly";
import PengajuanWeeklyInsentif from "./create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-insentif/pengajuanweekly-insentif";
import NamaPengajuan from "./create/kategori_pengajuanmonthly/nama-pengajuan";
import NamaPengajuanWeekly from "./create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-insentif/popup/nama-pengajuan-weekly";
import NamaPengajuanEvent from "./create/kategori_pengajuan/pengajuan_event/pengajuan-event/nama-pengajuan-event";

interface NavbarProps {
  children: JSX.Element
}



const Navbar: Component<NavbarProps> = (props) => {

  const [{ navbarStore }] = useStore();

  const [popUpPT, setpopUpPT] = createSignal(false);

  const [popUpLogout, setpopUpLogout] = createSignal(false);

  function handlepopUpPT() {
    setpopUpPT(!popUpPT());
  }

  const [pengeluaranPopup, setPengeluaranPopup] = createSignal(false);
  const [pemasukanPopup, setPemasukanPopup] = createSignal(false);
  const [pengajuanPopup1, setPengajuanPopup1] = createSignal(false);
  const [pengajuanPopup2, setPengajuanPopup2] = createSignal(false);
  const [pengajuanPopup3, setPengajuanPopup3] = createSignal(false);
  const [tambahAkunPopup, setTambahAkunPopup] = createSignal(false);
  const [tambahCoaPopup, setTambahCoaPopup] = createSignal(false);

  const showPengeluaranPopup = () => {
    setPengeluaranPopup(!pengeluaranPopup());
  };
  const showPemasukanPopup = () => {
    setPemasukanPopup(!pemasukanPopup());
  };
  const showPengajuan1Popup = () => {
    setPengajuanPopup1(!pengajuanPopup1());
  };
  const showPengajuan2Popup = () => {
    setPengajuanPopup2(!pengajuanPopup2());
  };
  const showPengajuan3Popup = () => {
    setPengajuanPopup3(!pengajuanPopup3());
  };
  const showTambahAkunPopup = () => {
    setTambahAkunPopup(!tambahAkunPopup());
  };
  const showTambahCoaPopup = () => {
    setTambahCoaPopup(!tambahCoaPopup());
  };

  function ClosePopUp() {
    setTambahAkunPopup(false);
    setTambahCoaPopup(false);
    setPengajuanPopup1(false);
    setPengajuanPopup2(false);
    setPengajuanPopup3(false);

    setPemasukanPopup(false);
    setPengeluaranPopup(false);
  }

  function handleLogOut() {
    setpopUpLogout(!popUpLogout());
  }

  const location = useLocation();

  // Contoh dengan JavaScript
  const notifCount = document.querySelector('.notification-count');

  // Fungsi untuk menyembunyikan notifikasi
  function hideNotification() {
    notifCount.classList.add('hidden');
  }

  // Fungsi untuk menampilkan notifikasi
  function showNotification() {
    notifCount.classList.remove('hidden');
  }



  return (
    <div>
      <div
        class="z-1  bg-white absolute flex flex-row justify-between pr-12 w-full items-center"
      >
        <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] w-5 h-5 absolute top-12 left-[1116px]" />
        <div class="z-1 w-[227px] h-full bg-[#f7f7f7] fixed top-0 left-20 flex flex-col gap-4 items-start pl-4 py-27">

          <A href="/master/master" classList={{ active: location.pathname.startsWith('/master') }}>
            <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center p-0.5 gap-8 w-48 items-center hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
              <div class="flex flex-row gap-2.7 w-3/5 items-center">
                <img
                  src="https://file.rendit.io/n/XxDPo7KbyfNGiflc38gM.svg"
                  class="w-6 shrink-0"
                />
                <div class="font-['Inter'] font-bold text-black/42 ">
                  Master
                </div>
              </div>
              <img
                src="https://file.rendit.io/n/cskiYUMZe9YQ7CIv3wiM.svg"
                id="Radixiconscaretdown5"
                class="mt-1 w-6 shrink-0"
              />
            </div>
          </A>

          <A href="/dashboard/report" classList={{ active: location.pathname.startsWith('/dashboard') }}>
            <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center gap-8 w-48 items-center hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
              <div class="flex flex-row gap-3 w-3/5 items-center">
                <img
                  src="https://file.rendit.io/n/phvOR3utndnvwetYe4BM.svg"
                  class="w-6 shrink-0"
                />
                <div class="font-['Inter'] font-bold text-black/42 mt-px">
                  Dashboard
                </div>
              </div>
              <img
                src="https://file.rendit.io/n/cskiYUMZe9YQ7CIv3wiM.svg"
                id="Radixiconscaretdown4"
                class="w-6 shrink-0 my-1"
              />
            </div>
          </A>

          <A href="/pengajuan/pengajuan_dashboard" classList={{ active: location.pathname.startsWith('/pengajuan') }}>
            <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center gap-8 w-48 items-center hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
              <div class="flex flex-row gap-4 w-3/5 items-center">
                <img
                  src="https://file.rendit.io/n/h8cBAvKlGb8aqqxR1I9z.svg"
                  class=" w-5 shrink-0"
                />
                <div class="font-['Inter'] font-bold text-black/42">
                  Pengajuan
                </div>
              </div>
              <img
                src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
                id="Radixiconscaretdown"
                class="self-start w-6 shrink-0 my-1"
              />
            </div>
          </A>

          <A href="/keuangan/keuanganModul_dashboard" classList={{ active: location.pathname.startsWith('/keuangan') }}>
            <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center gap-8 w-48 items-center hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
              <div class="flex flex-row gap-4.5 w-3/5 items-center">
                <img
                  src="https://file.rendit.io/n/K14vRo6zZFSYrAFWgSk5.svg"
                  class=" w-4.5 shrink-0"
                />
                <div class="font-['Inter'] font-bold text-black/42">
                  Keuangan
                </div>
              </div>
              <img
                src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
                id="Radixiconscaretdown2"
                class="self-start w-6 shrink-0 my-1"
              />
            </div>
            {/* <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center gap-8 w-48 items-center hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
                <div class="flex flex-row gap-4 w-3/5 items-center">
                  <img
                      src="https://file.rendit.io/n/K14vRo6zZFSYrAFWgSk5.svg"
                      class="w-4"
                    />
                  <div class="font-['Inter'] font-bold text-black/42">
                    Keuangan
                  </div>
                </div>
                <img
                  src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
                  id="Radixiconscaretdown2"
                  class="w-6 shrink-0"
                />
              </div> */}
          </A>

          <A href="/report/semua_laporan" classList={{ active: location.pathname.startsWith('/report') }}>
            {/* <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center ml-px pt-1 gap-8 w-48 items-start hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
                <div class="flex flex-row w-24 shrink-0 items-start mt-px mb-1">
                  <img
                    src="https://file.rendit.io/n/b0a3emC0YfSakhwnz7gH.svg"
                    id="Tablerreport"
                    class="w-6 shrink-0"
                  />
                  <div class="font-['Inter'] font-bold text-black/42 mt-px">
                    Report
                  </div>
                </div>
                <img
                  src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
                  id="Radixiconscaretdown3"
                  class="w-6 shrink-0"
                />
              </div> */}
            <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center gap-8 w-48 items-center hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
              <div class="flex flex-row gap-4 w-3/5 items-center">
                <img
                  src="https://file.rendit.io/n/b0a3emC0YfSakhwnz7gH.svg"
                  id="Tablerreport"
                  class=" w-5 shrink-0"
                />
                <div class="font-['Inter'] font-bold text-black/42">
                  Report
                </div>
              </div>
              <img
                src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
                id="Radixiconscaretdown"
                class="self-start w-6 shrink-0 my-1"
              />
            </div>
          </A>

          <A href="/kontak/tabel_kontak" classList={{ active: location.pathname.startsWith('/kontak') }}>
            <div class="sidebars bg-#F7F7F7 rounded-[5px] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center gap-8 w-48 items-center hover:bg-#e1e1e1b2" style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);">
              <div class="flex flex-row gap-4 w-3/5 shrink-0 items-center">
                <img
                  src="https://file.rendit.io/n/RPwE1JFYLgOmgr7ppOEa.svg"
                  id="Icroundcontactpage"
                  class="my-auto w-5 shrink-0"
                />
                <div class="font-['Inter'] font-bold text-black/42">Kontak</div>
              </div>
              <img
                src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
                id="Radixiconscaretdown1"
                class="self-start w-6 shrink-0 my-1"
              />
            </div>
          </A>

        </div>


        <div class="z-1 w-full h-20 bg-[#f7f7f7] fixed top-0 left-1 flex flex-row justify-between items-end pb-4 pl-[113px] pr-24">
          <div class="flex flex-row justify-between gap-32 items-start">
            <div class="flex flex-row mb-2 gap-2 items-start">
              <div class="text-4xl font-['Exo_2'] font-bold text-[#6e49e9] mb-px italic" style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
                ERP
                <div id="ERP" class="contents">
                  {" "}
                </div>
              </div>
              <div class="text-2xl font-['Exo_2'] font-bold text-[#9f9f9f] self-end italic">
                TUS
              </div>
            </div>
            <div class="text-3xl font-['Inter'] font-bold text-[#a892f2] mt-2">
              {navbarStore.title_navbar}
            </div>
          </div>

          <div class="flex flex-row mb-px gap-12 items-start">
            {/* <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] flex flex-col items-start">
                <div class="bg-[#f56d59] flex flex-col justify-center w-32 h-10 shrink-0 items-center rounded-[23px]">
                  <div class="text-xl font-['Inter'] font-bold text-white">
                    + Create
                  </div>
                </div>
              </div> */}
            {/* <div>
                <button 
              onClick={handlePengeluaranPT}>
              <PengeluaranCreate isOpen={pengeluaranPT()} onClose={handlePengeluaranPT}/>
              Create
                </button>
              </div> */}
            {/* <div class="dropdown dropdown-left"> */}

            {/* animation = scale | fade | flip | slide */}
            {/* <Menu id={MENU_ID} animation="scale" theme="light" >
                <Item>⚡ Beautiful</Item>
                <Item>😊 Easy use</Item>
                <Submenu label="▶️ submenu">
                  <Item>👋 Hello</Item>
                  <Item>😀 Hello</Item>
                  <Item>🤝 你好</Item>
                </Submenu>
              </Menu>
                <label tabindex="0" class="btn m-1 bg-[#f56d59] text-white"
                      onClick={(e) => {
                        console.log("klik kan")
                        show(e, { props: 1 });
                      }}
                      >+ Create
                      </label> */}

            {/* <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Master</a></li>
                  <li><a>Pengajuan</a></li>
                  <li><a>Pemasukan</a></li>
                  <li><a>Pengeluaran</a></li>
                </ul> */}
            {/* </div> */}

            <div class="dropdown dropdown-left">
              <label tabindex="0" class="btn m-auto bg-[#f56d59] text-white rounded-10 capitalize ">+ Create</label>
              <ul tabindex="0" class="dropdown-content z-[1] menu left-23 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <details>
                    <summary>Master</summary>
                    <ul>
                      <li onClick={() => showTambahAkunPopup()}>
                        <a>Tambah Akun</a>
                      </li>
                      <li onClick={() => showTambahCoaPopup()}>
                        <a>Tambah Coa</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Pengajuan</summary>
                    <ul>
                      <li onClick={() => showPengajuan1Popup()}>
                        <a>Event</a>
                      </li>
                      <li onClick={() => showPengajuan2Popup()}>
                        <a>Weekly</a>
                      </li>
                      <li onClick={() => showPengajuan3Popup()}>
                        <a>Monthly</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li onClick={() => showPemasukanPopup()}>
                  <a>Pemasukan</a>
                </li>
                <li onClick={() => showPengeluaranPopup()}>
                  <a>
                    Pengeluaran
                  </a>
                </li>
              </ul>
            </div>

            <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] flex flex-col w-64 shrink-0 rounded-[20px] m-auto">
              <input type="date" class="shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] bg-white flex flex-row gap-0 h-10 pl-5 pr-5 border-none items-center font-['Inter'] text-[#909090] rounded-[20px]">
                <img
                    src="https://file.rendit.io/n/JR4Z8I7HectTAgV0sox6.svg"
                    id="Uimcalender1"
                    class="w-5 shrink-0 "
                  />
                <div class="text-sm font-['Inter'] text-[#909090] mx-auto mb-1 items-center">
                    09.25.2023 - 10.01.2023
                  </div>
              </input>
              {/* <div class="shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] bg-white flex flex-row justify-end gap-0 h-10 shrink-0 items-start pt-3 px-5 rounded-[20px]">
                  <img
                    src="https://file.rendit.io/n/JR4Z8I7HectTAgV0sox6.svg"
                    id="Uimcalender1"
                    class="w-5 shrink-0 "
                  />
                  <div class="text-sm font-['Inter'] text-[#909090] mx-auto mb-1 items-center">
                    09.25.2023 - 10.01.2023
                  </div>
                </div> */}
            </div>

          </div>

          <div class="selection">
            <A href='/navbar/notification' classList={{ active: location.pathname === '/navbar/notification' }}>
              <div class="notifications-selection" style={{"margin-left":"2rem"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19v-2h2v-7q0-2.075 1.25-3.688T10.5 4.2v-.7q0-.625.438-1.063T12 2q.625 0 1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2H4Zm8 3q-.825 0-1.413-.588T10 20h4q0 .825-.588 1.413T12 22Z" />
                </svg>
              </div>
              <span class="notifications-count">2</span>
            </A>
          </div>

        </div>

        <div class="z-1 bg-[#ebebeb] self-start fixed flex flex-col justify-between mb-[147px] w-20 shrink-0 h-full items-start pt-5 pb-[270px] pl-3"
          style={{ "padding-bottom": "6vh" }}>
          <div
            id="Ellipse"
            class="bg-[url(https://file.rendit.io/n/uDD9S64MFEoBlI4Pt9yw.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col ml-1 w-12 items-start p-1 cursor-pointer"
            onClick={handlepopUpPT}>
            <PT_PopUp isOpen={popUpPT()} onClose={handlepopUpPT} />
            <img
              src="https://file.rendit.io/n/hlAlQ9Tuj0B7xjGjoFd1.svg"
              id="Mdiinternet"
              class="w-10"
            />
          </div>
          <div>
            <img
              src="https://file.rendit.io/n/W6GYZbOZRXaNodBHmwjY.svg"
              class="ml-3 w-8 cursor-pointer fixed bottom-10 left-3"
              onClick={handleLogOut} />
          </div>
          {popUpLogout() && <LogoutPopUp />}
        </div>

        <div class="w-full ml-82 mt-25 ">
          {props.children}
          {/* <div class="w-[1450px] h-[687px] bg-[#efefef] absolute top-20 left-px flex flex-col gap-4 items-start pt-3 pb-[177px] px-4 rounded-lg mt-[110px] ml-[350px]">
              <div class="text-lg font-['Manrope'] font-bold text-[#414141] ml-2">
                Navbar Master
              </div>
              <div class="shadow-[0px_3px_2px_0px_rgba(0,_0,_0,_0.01),_0px_7px_5px_0px_rgba(0,_0,_0,_0.01),_0px_13px_10px_0px_rgba(0,_0,_0,_0.01),_0px_22px_18px_0px_rgba(0,_0,_0,_0.01),_0px_42px_33px_0px_rgba(0,_0,_0,_0.01),_0px_100px_80px_0px_rgba(0,_0,_0,_0.02)] self-stretch flex flex-col justify-between mr-1 gap-2">
                
              </div>
            </div>
            <div class="bg-[#f5f5f5] flex flex-row mr-px gap-20 h-20 shrink-0 items-center px-24 rounded-lg mt-[110px] ml-[350px] w-[1450px]">
              <div
                id="Master"
                class="text-lg font-['Inter'] font-bold text-[#8a8a8b] mr-2"
              >
                Master{" "}
              </div>
              <div class="text-lg font-['Inter'] font-bold text-[rgba(132,_103,_255,_0.8)]">
                Master Navbar
              </div>
              <div class="text-xl font-['Inter'] font-bold text-[#949494]">
                Master Akun
              </div>
            </div> */}
        </div>
        {tambahCoaPopup() && (<FormTambahCOA OnClose={ClosePopUp} />)}
        {tambahAkunPopup() && (<TambahAkunMaster OnClose={ClosePopUp} />)}
        {/* {pengajuanPopup1() && (<NamaPengajuanEvent OnClose={ClosePopUp} totalE1={TotalE1()} />)} */}
        {pengajuanPopup1() && (<NamaPengajuanEvent OnClose={ClosePopUp} />)}
        {pengajuanPopup2() && (<NamaPengajuanWeekly OnClose={ClosePopUp} />)}
        {/* {pengajuanPopup3() && (<PengajuanMonthly OnClose={ClosePopUp}  */}
        {/* total={Total()} total2={Total2()} total3={Total3()} total4={Total4()} total5={Total5()}/>)} */}
        {pengajuanPopup3() && (<NamaPengajuan OnClose={ClosePopUp} />)}
        {pemasukanPopup() && (<PemasukanCreate OnClose={ClosePopUp} />)}
        {pengeluaranPopup() && (<PengeluaranCreate OnClose={ClosePopUp} />)}

      </div>
    </div>

  );
};



export default Navbar;