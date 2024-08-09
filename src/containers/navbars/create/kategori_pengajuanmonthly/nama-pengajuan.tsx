import { createSignal, type Component, onMount, createEffect, onCleanup } from 'solid-js';
import './nama-pengajuan.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate, Navigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PengajuanMonthly from './pengajuan-monthly';
import { getNamaPengajuanMonthly, setNamaPengajuanMonthly } from '../../../../store/Pengajuan/nama-pengajuan';

interface NamaPengajuanProps {
    OnClose: () => void;
}

const NamaPengajuan: Component<NamaPengajuanProps> = (props) => {
  const [namaPengajuanInput, setNamaPengajuanInput] = createSignal("");
  const [isMonthlyExists, setIsMonthlyExists] = createSignal(!!getNamaPengajuanMonthly());
  const [showSubmitMessage, setShowSubmitMessage] = createSignal(false);
  const [PopUp, setPopUp] = createSignal(false);

  const submitForm = () => {
    if (!isMonthlyExists()) {
      setNamaPengajuanMonthly(namaPengajuanInput());
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
      <div class="nama-pengajuan-1">
        <div class="keterangan">
          <h2>Monthly <span>(*Tidak boleh kosong)</span></h2>
          <button onClick={props.OnClose}>✕</button>
        </div>
        {!isMonthlyExists() && (
          <div class="nama-pengajuan">
            <div class="tambah-nama-pengajuan">
              <label>Nama Pengajuan</label>
              <br />
              <input
                type="text"
                value={namaPengajuanInput()}
                onInput={(e) => setNamaPengajuanInput(e.target.value)}
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
            <p>Terdapat pengajuan "{getNamaPengajuanMonthly()}" yang belum di-submit.</p>
            <button onClick={() => setShowSubmitMessage(false)}>Tutup</button>
          </div>
        )}
      </div>
      {isMonthlyExists() && <PengajuanMonthly OnClose={props.OnClose} pengajuan={getNamaPengajuanMonthly()} />}
      {PopUp() && <PengajuanMonthly OnClose={props.OnClose} pengajuan={getNamaPengajuanMonthly()} />}
    </div>
  );
};

export default NamaPengajuan;
