import { createSignal, type Component, onMount, createEffect, onCleanup } from 'solid-js';
import './nama-pengajuan-weekly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PengajuanWeekly from '../../../pengajuan-weekly/pengajuan-weekly';
import { getNamaPengajuanWeekly, setNamaPengajuanWeekly } from '../../../../../../../store/Pengajuan/nama-pengajuan';

interface NamaPengajuanWeeklyProps {
    OnClose: () => void;
}

const NamaPengajuanWeekly: Component<NamaPengajuanWeeklyProps> = (props) => {
  const [namaPengajuanWeeklyInput, setNamaPengajuanWeeklyInput] = createSignal("");
  const [isWeeklyExists, setIsWeeklyExists] = createSignal(!!getNamaPengajuanWeekly());
  const [showSubmitMessage, setShowSubmitMessage] = createSignal(false);
  const [PopUp, setPopUp] = createSignal(false);

  const submitForm = () => {
    if (!isWeeklyExists()) {
      setNamaPengajuanWeekly(namaPengajuanWeeklyInput());
      setNamaPengajuanWeeklyInput("");
      setShowSubmitMessage(false);
      // props.OnClose();
      setPopUp(true)
    } else {
      // Jika sudah ada nilai di namaPengajuanWeesetNamaPengajuanWeeklyInput, tampilkan pesan
      setShowSubmitMessage(true);
    }
  };

  return (
    <div class="overlay">
      <div class="nama-pengajuan-1-weekly">
        <div class="keterangan">
          <h2>Weekly <span>(*Tidak boleh kosong)</span></h2>
          <button onClick={props.OnClose}>✕</button>
        </div>
        {!isWeeklyExists() && (
          <div class="nama-pengajuan-weekly">
            <div class="tambah-nama-pengajuan-weekly">
              <label>Nama Pengajuan</label>
              <br />
              <input
                type="text"
                value={namaPengajuanWeeklyInput()}
                onInput={(e) => setNamaPengajuanWeeklyInput(e.target.value)}
              />
              <button onClick={submitForm}>
                Kirim
              </button>
            </div>
          </div>
        )}
        {/* gatau knp tp ini ga muncul */}
        {showSubmitMessage() && (
          <div>
            <p>Terdapat pengajuan "{getNamaPengajuanWeekly()}" yang belum di-submit.</p>
            <button onClick={() => setShowSubmitMessage(false)}>Tutup</button>
          </div>
        )}
      </div>
      {isWeeklyExists() && <PengajuanWeekly OnClose={props.OnClose} pengajuanweekly={getNamaPengajuanWeekly()} />}
      {PopUp() && <PengajuanWeekly OnClose={props.OnClose} pengajuanweekly={getNamaPengajuanWeekly()} />}
    </div>
  );
};

export default NamaPengajuanWeekly;
