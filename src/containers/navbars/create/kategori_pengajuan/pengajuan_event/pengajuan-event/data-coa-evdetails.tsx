import { createSignal } from "solid-js";

export interface Option {
    value: string;
    label: string
  }
  
export interface SelectedOption {
    value?: string;
    label?: string;
  }
  
  const [optionsEvdetails, setOptionsEvdetails] = createSignal<Option[]>([
    { value: '1-1300', label: '1-1300 Piutang Usaha' },
    { value: '1-1400', label: '1-1400 Biaya Dibayar DiMuka' },
    { value: '1-1401', label: '1-1401 By Perawatan diBayar dimuka' },
    { value: '1-1402', label: '1-1402 Biaya lain-lain dibayar dimuka' },
    { value: '1-1403', label: '1-1403 Deposit Telepon' },
    { value: '1-1404', label: '1-1404 Deposit Security' },
    { value: '1-1500', label: '1-1500 Pajak Dibayar Dimuka' },
    { value: '1-1501', label: '1-1501 PPh Pasal 21' },
    { value: '1-1506', label: '1-1506 PPN Masukan' },
    { value: '1-1801', label: '1-1801 Piutang Afiliasi' },
    { value: '1-1802', label: '1-1802 Piutang Daisen' },
    { value: '1-1803', label: '1-1803 Piutang Selangis Hidro' },
    { value: '1-1900', label: '1-1900 Piutang Lain-Lain' },
    { value: '1-1901', label: '1-1901 Piutang Karyawan' },
    { value: '1-2000', label: '1-2000 AKTIVA TETAP' },
    { value: '1-2001', label: '1-2001 Gedung kantor' },
    { value: '1-2002', label: '1-2002 Inventaris Kantor' },
    { value: '1-2003', label: '1-2003 Kendaraan' },
    { value: '1-3000', label: '1-3000 Investasi Jangka Panjang' },
    { value: '3-0000', label: '3-0000 MODAL' },
    { value: '3-7000', label: '3-7000 Modal Salam Disetor' },
    { value: '3-8000', label: '3-8000 Laba ditahan' },
    { value: '3-9000', label: '3-9000 Laba Tahun Berjalan' },
    { value: '3-9999', label: '3-9999 Historical Balancing Account' },
    { value: '4-0000', label: '4-0000 Pendapatan' },
    { value: '4-0001', label: '4-0001 Pendapatan dalam Negeri' },
    { value: '8-0000', label: '8-0000 Pendapatan Lain - Lain' },
    { value: '8-1001', label: '8-1001 Pendapatan Lain di luar usaha' },

    { value: '2-1001', label: '2-1001 Hutang Usaha' },
    { value: '2-2000', label: '2-2000 Hutang Gaji' },
    { value: '2-2001', label: '2-2001 Hutang Gaji' },
    { value: '2-3000', label: '2-3000 Hutang Pajak' },
    { value: '2-3016', label: '2-3016 Hutang PPN' },
    { value: '2-4000', label: '2-4000 Biaya Yang Masih Harus Dibayar' },
    { value: '2-4001', label: '2-4001 Biaya Yang Harus Dibayar' },
    { value: '2-5000', label: '2-5000 Hutang Jangka Pendek' },
    { value: '2-5001', label: '2-5001 Hutang Bank Jangka Pendek' },
    { value: '2-6000', label: '2-6000 Hutang Jangka Panjang' },
    { value: '2-8001', label: '2-8001 Hutang Afiliasi' },
    { value: '2-8002', label: '2-8002 Hutang Daisen' },
    { value: '2-9000', label: '2-9000 Deposit Sewa' },
    { value: '2-9993', label: '2-9993 Hutang Usaha' },
    { value: '5-0000', label: '5-0000 Beban Pendapatan' },
    { value: '5-1010', label: '5-1010 Biaya Proyek' },
    { value: '5-1020', label: '5-1020 Biaya Perjalanan Dinas Proyek' },
    { value: '6-0000', label: '6-0000 Beban Umum Administrasi' },
    { value: '6-1001', label: '6-1001 Gaji' },
    { value: '6-1002', label: '6-1002 Tunjangan Hari Raya' },
    { value: '6-1003', label: '6-1003 Bonus' },
    { value: '6-1004', label: '6-1004 Tunjangan Kesehatan' },
    { value: '6-1005', label: '6-1005 Biaya Office Boy' },
    { value: '6-2003', label: '6-2003 Biaya Perlengkapan Kantor' },
    { value: '6-2004', label: '6-2004 Biaya Alat Tulis Kantor' },
    { value: '6-2005', label: '6-2005 Biaya Pengiriman Dokumen / Pos' },
    { value: '6-2006', label: '6-2006 By Fotocopi, Brosur & Print' },
    { value: '6-2007', label: '6-2007 Biaya Materi' },
    { value: '6-2008', label: '6-2008 Biaya Telephone' },
    { value: '6-2009', label: '6-2009 Biaya Internet' },
    { value: '6-2010', label: '6-2010 Biaya TV Kabel' },
    { value: '9-0000', label: '9-0000 Biaya Lain-Lain' },
    { value: '9-1001', label: '9-1001 Biaya Adm Bank' },

  // Tambahkan opsi lainnya sesuai kebutuhan
]);

export {optionsEvdetails, setOptionsEvdetails}