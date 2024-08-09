import { createSignal, type Component, onMount, createEffect } from 'solid-js';
import './pengajuan-event.css';
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ConfirmAllEvent from '../popup-event/confirm-all-event';
import { getNamaPengajuanEvent } from '../../../../../../store/Pengajuan/nama-pengajuan';
// import { DataMonthlyPlanning } from '../../../../api/planning/data-monthly-plan';
import { RowData as RowDataEvent } from './pengajuan-event-detail';
export interface PengajuanEventProps {
  OnClose?: () => void;
  total?: number,
  total2?: number,
  total3?: number,
  total4?: number,
  total5?: number
  pengajuanevent?: string,
}

type RowData = {
  keterangan: string;
  totalplan?: number;
};

const PengajuanEvent: Component<PengajuanEventProps> = (props) => {

  const [gridApi, setGridApi] = createSignal(null);
  const [rowData, setRowData] = createSignal<RowData[]>(
    (() => {
      // Coba ambil data dari localStorage saat komponen diinisialisasi
      const savedData = localStorage.getItem('tableKetPengajuanEvent');
      return savedData ? JSON.parse(savedData) : ([] as RowData[]);
    })()
  );



  const [pageKeterangan, setPageKeterangan] = createSignal(false);

  function showPageKeterangan() {
    setPageKeterangan(true);
  };
  const [showTambahNamaPengajuan, setShowTambahNamaPengajuan] = createSignal(true);



  const submitForm = () => {
    // Perform form submission logic here
    // ...

    // After successful submission, hide the "tambah-nama-pengajuan" div
    setPageKeterangan(true);
    setShowTambahNamaPengajuan(false);

  };

  const [keterangan, setKeterangan] = createSignal("");
  const [allTotal, setAllTotal] = createSignal(0);


  function clearKeterangan(keteranganToRemove) {
    // Tampilkan konfirmasi dan simpan hasilnya dalam variabel
    const userConfirmed = window.confirm(`Apa anda yakin ingin menghapus seluruh data dalam pengajuan dengan keterangan '${keteranganToRemove}'?`);

    // Jika pengguna menekan "OK", lanjutkan dengan penghapusan data
    if (userConfirmed) {
      // Filter rowData untuk menghapus baris dengan keterangan yang sesuai
      const updatedRowData = rowData().filter(item => item.keterangan !== keteranganToRemove);

      // Perbarui rowData dengan data yang telah diperbarui
      setRowData(updatedRowData);

      // Simpan data yang telah diperbarui ke localStorage
      localStorage.setItem('tableKetPengajuanEvent', JSON.stringify(updatedRowData));

      // Filter tableData untuk menghapus baris dengan keterangan yang sesuai
      const updatedTableData = tableData().filter(item => item.keterangan !== keteranganToRemove);

      // Perbarui tableData dengan data yang telah diperbarui
      setTableData(updatedTableData);

      // Simpan data yang telah diperbarui ke localStorage (jika diperlukan)
      localStorage.setItem('tableDataEventDetails', JSON.stringify(updatedTableData));
    }
  }

  //UNTUK EDIT DATA
  //dideklarasi buat dipake di onCellValueChanged
  const [tableData, setTableData] = createSignal<RowDataEvent[]>(
    (() => {
      // Coba ambil data dari localStorage saat komponen diinisialisasi
      const savedData = localStorage.getItem('tableDataEventDetails'); //nama untuk nyimpen data tabel keterangan
      return savedData ? JSON.parse(savedData) : ([] as RowData[]);
    })()
  );

  const onCellValueChanged = (params) => {
    // Mendapatkan data baris yang berubah
    const editedRow = params.data;

    // Mendapatkan indeks baris yang berubah
    const rowIndex = rowData().findIndex((row) => row.keterangan === editedRow.keterangan);

    // Perbarui rowData dengan data yang telah berubah
    const updatedRowData = [...rowData()];
    updatedRowData[rowIndex] = editedRow;
    setRowData(updatedRowData);

    console.log("params ",)
    // Simpan data yang telah berubah ke localStorage
    localStorage.setItem('tableKetPengajuanEvent', JSON.stringify(updatedRowData));

    // Perbarui tableData dengan keterangan yang diubah

    console.log("prev ket !! ", previousKet());
    console.log("ket params, ", params.data.keterangan);
    const updatedTableData = tableData().map((data) => {
      if (data.keterangan === previousKet()) {
        return {
          ...data,
          // Perbarui keterangan
          keterangan: params.data.keterangan,
        };
      }
      return data;
    });


    // Perbarui tableData
    setTableData(updatedTableData);

    // Simpan data tableData yang telah berubah ke localStorage (jika diperlukan)
    localStorage.setItem('tableDataEventDetails', JSON.stringify(updatedTableData));
  };

  // untuk edit data
  const [isEditing, setIsEditing] = createSignal(false);
  const [shouldNavigate, setShouldNavigate] = createSignal(false);
  const [previousKet, setPreviousKet] = createSignal('');

  const clearEdit = () => {
    setIsEditing(false);
    // Log nilai isEditing saat clearEdit
    console.log('isEditing cleared:', isEditing);
    // Tambahan logika atau pembaruan lain yang mungkin diperlukan saat menonaktifkan mode edit
  };

  const toggleEdit = (params) => {
    // Toggle mode edit
    setIsEditing(!isEditing());
    // Log nilai isEditing saat toggleEdit
    console.log('isEditing toggled to:', isEditing);
    console.log('ini apa ', params.data.keterangan);
    setPreviousKet(params.data.keterangan);
  };

  createEffect(() => {
    // Efek ini akan memonitor perubahan isEditing dan memperbarui onCellValueChanged
    gridOptions.onCellValueChanged = isEditing() ? onCellValueChanged : undefined;
  });

  const handleDone = (params: any) => {
    // Pemanggilan ini mungkin memerlukan penyesuaian sesuai kebutuhan Anda
    clearEdit();

    // Logika tambahan jika navigasi harus dihindari
    if (!shouldNavigate) {
      // Atur kondisi agar navigasi dihindari pada klik berikutnya
      setShouldNavigate(true);
      return;
    }
  };


  const onCellClicked = (event: any) => {
    if (!isEditing()) {
      // Jika tidak dalam mode edit, navigasi ke halaman lain
      if (shouldNavigate) {
        navigate('/pengajuan-event/pengajuan-event-detail');
        props.OnClose();
      }
    }
    // Reset kondisi agar navigasi dapat dilakukan pada klik berikutnya
    setShouldNavigate(false);
  };

  const formatRupiah = (value) => {
    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      return value;
    }

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(numericValue);
  };

  const gridOptions = {
    columnDefs: [
      { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
      { field: "keterangan", editable: true, width: 250 },
      { field: "totalplan", headerName: "Total", width: 97, valueFormatter: (params) => formatRupiah(params.value) },
      {
        field: "aksi", headerName: "", width: 80,
        cellRenderer: (params: any) => {
          return (
            <div style={{ display: "flex", "justify-content": "space-between", width: "7vh" }}>
              <button onClick={() => isEditing() ? handleDone(params) : toggleEdit(params)}>
                <Icon icon={isEditing() ? 'pajamas:todo-done' : 'iconamoon:edit'} color="#40444b" width="18" height="18" />
              </button>
              <button onClick={() => clearKeterangan(params.data.keterangan)}>
                <Icon icon="mdi:delete" color="#40444b" width="18" height="18" />
              </button>
            </div>
          );
        }
      }
    ],
    onCellValueChanged: undefined, // Ditetapkan secara dinamis di createEffect

  };

  const onGridReady = (params: any) => {
    setGridApi(() => params.api);
  };

  const navigate = useNavigate();

  const addRow1 = () => {
    if (keterangan()) {
      // const total = qty() * price();
      const newRow: RowData = {
        keterangan: keterangan(),
        totalplan: 0,
      };
      setRowData((prevData) => {
        const newData = [...prevData, newRow];
        // Simpan data ke localStorage saat menambahkan data baru
        localStorage.setItem('tableKetPengajuanEvent', JSON.stringify(newData));
        // calculateAllTotal();

        return newData;
      });
      clearInputs();
    }
  };



  // gantiin kode untuk merged Data yang ini ya Ca !!!!!!!!!!!!!!!!!!
  // Ambil data dari localStorage 
  const tableData2 = JSON.parse(localStorage.getItem('tableDataEventDetails')) || [];
  const initialRowData = JSON.parse(localStorage.getItem('tableKetPengajuanEvent')) || [];

  // Buat objek untuk menyimpan total berdasarkan keterangan
  const totalByKeterangan = {};

  // Hitung total dari tableData berdasarkan keterangan
  tableData2.forEach((row) => {
    const { keterangan, total } = row;
    totalByKeterangan[keterangan] = (totalByKeterangan[keterangan] || 0) + total;
  });

  // Perbarui totalplan langsung pada data initialRowData
  const updatedRowData = initialRowData.map((row) => {
    const { keterangan } = row;
    return { ...row, totalplan: totalByKeterangan[keterangan] || 0 };
  });

  // Perbarui state rowData
  setRowData(updatedRowData);

  const allTotal1 = () => {
    const totalPlanArray = updatedRowData.map((row) => row.totalplan || 0);
    const total = totalPlanArray.reduce((acc, currentValue) => acc + currentValue, 0);
    return formatRupiah(total);
  };

  const clearInputs = () => {
    setKeterangan("")
  };


  const [tambahKeterangan, setTambahKeterangan] = createSignal(false);

  function showTambahKeterangan() {
    setTambahKeterangan(true);
  };

  function closeTambahKeterangan() {
    setTambahKeterangan(false);
  };

  const location = useLocation();

  const [popUpConfirm, setPopUpConfirm] = createSignal(false);
  const [timestamp, setTimestamp] = createSignal("");

  function showPopUpConfirm() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 11);

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const timestamp = `${formattedDate}${formattedTime}`;

    console.log("tanggal dan waktu: ", timestamp);
    setTimestamp(timestamp);

    setPopUpConfirm(true);
    console.log("jalan")
  }


  function closePopUpConfirm() {
    setPopUpConfirm(false);
  };

  const simpanPengajuan = (event: any) => {
    props.OnClose();
    navigate('/pengajuan/pengajuan_detail');
  };

  function hapusnama() {
    localStorage.removeItem('namaPengajuanEvent'); // Menghapus nilai dari penyimpanan lokal
  }

  return (
    <div class="overlay">

      <div class="pengajuan-event-1">
        <div class="keterangan">
          <h2>Event  <span>(*Tidak boleh kosong)</span></h2>
          <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="pengajuan-event" >
          <div>
            {/* <button onClick={hapusnama}>hapus</button> */}
            <div class="judul-pengajuan-event">
              <h1>Form Pengajuan</h1>
              <p>{getNamaPengajuanEvent()}</p>
            </div>
            {tambahKeterangan() &&
              <div class="tambah-keterangan-group-event">
                <div>
                  <br />
                  <input
                    type="text"
                    placeholder="Keterangan"
                    value={keterangan()}
                    onInput={(e) => setKeterangan(e.target.value)}
                  />
                </div>
                <div>
                  <button class="btn-tambah-event" onClick={addRow1}>Tambah</button>
                </div>
                <div>
                  <button class="btn-cancel-event" onClick={closeTambahKeterangan}>Selesai</button>
                </div>
              </div>
            }


            <div class="btn-show-keterangan-event">
              {!tambahKeterangan() &&
                <button onClick={showTambahKeterangan}><Icon icon="fa-solid:plus" width="11" class="mr-2" />Keterangan</button>
              }
            </div>
          </div>
          <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "80vh", margin: "auto" }}>
            <AgGridSolid
              gridOptions={gridOptions}
              onGridReady={onGridReady}
              rowData={rowData()}
              onCellClicked={onCellClicked}
            />
            <div class="detail-total-operasional">
              <div>TOTAL</div>
              <div>{allTotal1()}</div>
            </div>
          </div>
          <div class="submit-btn-event">
            <div >
              <button class="submit-btn" onClick={showPopUpConfirm}>Submit</button>
            </div>
            <div>
              <button class="simpan-btn" onClick={simpanPengajuan}>Simpan</button>
            </div>
          </div>
        </div>

      </div>
      {popUpConfirm() && <ConfirmAllEvent OnClose={closePopUpConfirm} sumtotal={allTotal1()} date={timestamp()} />}
    </div>
  );
};

export default PengajuanEvent;
