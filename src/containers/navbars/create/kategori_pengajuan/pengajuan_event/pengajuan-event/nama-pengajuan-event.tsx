import { createSignal, type Component, onMount, createEffect, onCleanup } from 'solid-js';
import './nama-pengajuan-event.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PengajuanEvent from './pengajuan-event';
import { getNamaPengajuanEvent, getNamaPengajuanMonthly, setNamaPengajuanEvent } from '../../../../../../store/Pengajuan/nama-pengajuan';

interface NamaPengajuanEventProps {
    OnClose: () => void;
}

const NamaPengajuanEvent: Component<NamaPengajuanEventProps> = (props) => {
  const [namaPengajuanInput, setNamaPengajuanInput] = createSignal("");
  const [isMonthlyExists, setIsMonthlyExists] = createSignal(!!getNamaPengajuanEvent());
  const [showSubmitMessage, setShowSubmitMessage] = createSignal(false);
  const [PopUp, setPopUp] = createSignal(false);

  const submitForm = () => {
    if (!isMonthlyExists()) {
      setNamaPengajuanEvent(namaPengajuanInput());
      setNamaPengajuanInput("");
      setShowSubmitMessage(false);
      // props.OnClose();
      setPopUp(true)
    } else {
      // Jika sudah ada nilai di namaPengajuanMonthly, tampilkan pesan
      setShowSubmitMessage(true);
    }
  };



  return (
    <div class="overlay">
      
      <div class="nama-pengajuan-1-event">
        <div class="keterangan-event">
            <h2>Event  <span>(*Tidak boleh kosong)</span></h2>
            <button onClick={props.OnClose}>✕</button>
        </div>
        {!isMonthlyExists() && (

        <div class="nama-pengajuan-event" >
                <div class="tambah-nama-pengajuan-event">
                    <label>Nama Pengajuan</label>
                    <br />
                    <input type="text" 
                    value={namaPengajuanInput()}
                    onInput={(e) => setNamaPengajuanInput(e.target.value)}
                    />
                    <button onClick={submitForm}>Kirim</button>
                </div>
        </div>
        )}

    </div>
    {isMonthlyExists() && <PengajuanEvent OnClose={props.OnClose}/>}
    {PopUp() && <PengajuanEvent OnClose={props.OnClose}/>}

    </div>
  );
};

export default NamaPengajuanEvent;
