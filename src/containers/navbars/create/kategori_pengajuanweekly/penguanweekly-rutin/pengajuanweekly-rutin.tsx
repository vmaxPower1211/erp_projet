import { createSignal, type Component, onMount } from 'solid-js';
import './pengajuanweekly-rutin.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';

interface PengajuanWeeklyRutinProps {
    OnClose: () => void;
    total?: number,
    total2?: number
}

const PengajuanWeeklyRutin: Component<PengajuanWeeklyRutinProps> = (props) => {



    const [Table1, setTable1] = createSignal(false);

    const [Table2, setTable2] = createSignal(false);

    function handleTable1() {
        setTable1(!Table1())
    }

    function handleTable2() {
        setTable2(!Table2())
    }

  const location = useLocation();

  return (
    <div class="overlay">
      
      <div class="pengajuan-weekly-1-rutin">
    <div class="keterangan-rutin">
        <h2>Pengajuan Rutin Details  <span>(*Tidak boleh kosong)</span></h2>
        <button onClick={props.OnClose}>✕</button>
    </div>
    <div class="pengajuan-weekly-rutin">
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Keperluan Rutin Bulanan</th>
                    <th>Nominal Request</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><A href='/pengajuan-weekly/pengajuanweekly-insentif' onClick={props.OnClose}>Insentif week 43</A></td>
                    <td>Rp{props.total}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><A href='/pengajuan-weekly/operasional-rutin-purwokerto'>Token Tamanhas</A></td>
                    <td>Rp{props.total2}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Token Purowkerto week 43</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Transport Alvin</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Gaji David 26-Okt</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Gaji OB Sokaraja 30-Okt</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Gaji Pak Min 1 Nov</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>Iuran Kebersihan Tamanhas 1-Nov</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>Iuran Keamanan Tamanhas 1-Nov</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>Iuran Keamanan Purwokerto 1-Nov</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>11</td>
                    <td>Iuran Keamanan Purwokerto 1-Nov</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>Pettycash 27-Okt</td>
                    <td>Rp</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
  );
};

export default PengajuanWeeklyRutin;
