import { createSignal, type Component, onMount, createEffect } from 'solid-js';
import './pengajuan-monthly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { DataMonthlyPlanning } from '../../../../api/planning/data-monthly-plan';
import ConfirmAllPlan from './popup/confirm-all-plan';
import { getNamaPengajuanMonthly } from '../../../../store/Pengajuan/nama-pengajuan';
import { RowData as RowDataMonth } from './operasional-tamanhas/operasional-tamanhas'; './operasional-tamanhas/operasional-tamanhas';
export interface PengajuanMonthlyProps {
    OnClose?: () => void;
    pengajuan?: string,
}

type RowData = {
    keterangan: string;
    totalplan?: number;
  };

const PengajuanMonthly: Component<PengajuanMonthlyProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [gridApi, setGridApi] = createSignal(null);
    const [rowData, setRowData] = createSignal<RowData[]>(
        (() => {
          // Coba ambil data dari localStorage saat komponen diinisialisasi
          const savedData = localStorage.getItem('tableKetMonth'); //nama untuk nyimpen data tabel keterangan
          return savedData ? JSON.parse(savedData) : ([] as RowData[]);
        })()
      );

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
        localStorage.setItem('tableKetMonth', JSON.stringify(updatedRowData));
    
        // Filter tableData untuk menghapus baris dengan keterangan yang sesuai
        const updatedTableData = tableData().filter(item => item.keterangan !== keteranganToRemove);
    
        // Perbarui tableData dengan data yang telah diperbarui
        setTableData(updatedTableData);
    
        // Simpan data yang telah diperbarui ke localStorage (jika diperlukan)
        localStorage.setItem('tableData', JSON.stringify(updatedTableData));
      }
    }
    
    //UNTUK EDIT DATA
    //dideklarasi buat dipake di onCellValueChanged
    const [tableData, setTableData] = createSignal<RowDataMonth[]>(
      (() => {
        // Coba ambil data dari localStorage saat komponen diinisialisasi
        const savedData = localStorage.getItem('tableData'); //nama untuk nyimpen data tabel keterangan
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
      localStorage.setItem('tableKetMonth', JSON.stringify(updatedRowData));
    
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
      localStorage.setItem('tableData', JSON.stringify(updatedTableData));
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
          navigate('/pengajuan-monthly/operasional-rutin-tamanhas');
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
            { field: "keterangan", editable: true, width: 269},
            { field: "totalplan", headerName:"Total", width:  100, valueFormatter: (params) => formatRupiah(params.value)},
            { field: "aksi", headerName:"", width: 80, 
            cellRenderer: (params: any) => {
                return (
                  <div style={{  display: "flex", "justify-content": "space-between", width: "7vh" }}>
                    <button onClick={() => isEditing() ? handleDone(params) : toggleEdit(params)}>
                      <Icon icon={isEditing() ? 'pajamas:todo-done' : 'iconamoon:edit'} color="#40444b" width="18" height="18" />
                    </button>
                    <button onClick={() => clearKeterangan(params.data.keterangan)}>
                      <Icon icon="mdi:delete" color="#40444b" width="18" height="18" />
                    </button>
                  </div>
                );
              },
            },
          ],
          onCellValueChanged: undefined, // Ditetapkan secara dinamis di createEffect
        };

    const onGridReady = (params: any) => {
        setGridApi(() => params.api);
      };

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
        localStorage.setItem('tableKetMonth', JSON.stringify(newData));
        // calculateAllTotal();
        
        return newData;
        });
        clearInputs();
    }};

    const clearInputs = () => {
        setKeterangan("")
    };

    // gantiin kode untuk merged Data yang ini ya Ca !!!!!!!!!!!!!!!!!!
    // Ambil data dari localStorage 
    const tableData2 = JSON.parse(localStorage.getItem('tableData')) || [];
    const initialRowData = JSON.parse(localStorage.getItem('tableKetMonth')) || [];

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


  //     // COPY YANG INI YA CAAAAA !!!!!! kode buat merge data ini izin jadiin komen dulu aja
  // const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
  // const tableKetMonth = JSON.parse(localStorage.getItem('tableKetMonth')) || [];

  // const calculateTotalByKeterangan1 = (data) => {
  //   const result = {};
  //   data.forEach((row) => {
  //     const keterangan = row.keterangan;
  //     result[keterangan] = (result[keterangan] || 0) + row.total;
  //   });
  //   return result;
  // };
  
  // const totalByKeterangan = calculateTotalByKeterangan1(tableData);
  
  // const mergedData = tableKetMonth.map((row) => ({
  //   ...row,
  //   totalplan: totalByKeterangan[row.keterangan] || 0,
  // }));

  // const allTotal1 = () => {
  //   const totalPlanArray = mergedData.map((row) => row.totalplan || 0);
  //   const total = totalPlanArray.reduce((acc, currentValue) => acc + currentValue, 0);
  //   return `Rp${total}`;
  // };


  // kode untuk nampilin input tambah keterangan
  const [tambahKeterangan, setTambahKeterangan] = createSignal(false);

  function showTambahKeterangan(){
      setTambahKeterangan(true);
  };

  function closeTambahKeterangan(){
      setTambahKeterangan(false);
  };


  //Untuk button simpan
  const simpanPengajuan = (event: any) => {
    props.OnClose();
    navigate('/pengajuan/pengajuan_detail');
  };

  //Untuk PopUp Submit
  const [popUpConfirm, setPopUpConfirm] = createSignal(false);

  const [timestamp, setTimestamp] = createSignal("");

  function showPopUpConfirm() {
    // console.log("Closing current popup");
    // props.OnClose();
  
    // const isConfirmed = window.confirm("Are you sure you want to proceed?");
    // console.log("Confirmation result:", isConfirmed);
  
    // if (isConfirmed == true) {
    //   console.log("Setting popUpConfirm to true");
    //   setPopUpConfirm(true);
    // }
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
  }
  

  function closePopUpConfirm(){
    setPopUpConfirm(false);
  };


  // function hapusnama(){
  //   localStorage.removeItem('namaPengajuanMonthly'); // Menghapus nilai dari penyimpanan lokal
  // }

  return (
    <div class="overlay">
      
      <div class="pengajuan-monthly-1">
        <div class="keterangan">
            <h2>Monthly  <span>(*Tidak boleh kosong)</span></h2>
            <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="pengajuan-monthly" >
            <div>
              {/* <button onClick={hapusnama}>hapus</button> */}
                <div class="judul-pengajuan">
                    <h1>Form Pengajuan</h1>
                    <p>{getNamaPengajuanMonthly()}</p>
                    </div>
                    {tambahKeterangan() && 
                    <div class="tambah-keterangan-group">
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
                            <button class="btn-tambah" onClick={addRow1}>Tambah</button>
                        </div>
                        <div>
                            <button class="btn-cancel" onClick={closeTambahKeterangan}>Selesai</button>
                        </div>
                    </div>
                    }

                
                <div class="btn-show-keterangan">
                    {!tambahKeterangan() && 
                    <button onClick={showTambahKeterangan}><Icon icon="fa-solid:plus" width="11" class="mr-2"/>Keterangan</button>
                    }
                </div>
                </div>
                  <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "80vh", margin:"auto" }}>
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
                  <div class="bottom-btn">
                  <div >
                      <button class="submit-btn" onClick={showPopUpConfirm}>Submit</button>
                  </div>
                  <div>
                      <button class="simpan-btn" onClick={simpanPengajuan}>Simpan</button>
                  </div>
                </div>
                </div>

        </div>
        {popUpConfirm() && <ConfirmAllPlan OnClose={closePopUpConfirm} pengajuan={props.pengajuan} sumtotal={allTotal1()} date={timestamp()}/>}
    </div>
  );
};

export default PengajuanMonthly;


    // ...

// onMount(async () => {
//     try {
//       const backendData = await DataMonthlyPlanning("data monthplan");
//       console.log("monthplan: ", backendData);
//       setBackendData(backendData);
  
//       // Get keterangan values from local storage
//       const savedData = localStorage.getItem('tableKetMonth');
//       const localData = savedData ? JSON.parse(savedData) : [];
  
//       // Calculate aggregated data based on keterangan from local storage and backend data
//       const aggregatedData = localData.map((localItem) => {
//         const total = backendData
//           .filter((backendItem) => backendItem.keterangan === localItem.keterangan)
//           .reduce((sum, item) => sum + item.total, 0);
  
//         return { keterangan: localItem.keterangan, totalplan: total };
//       });
  
//       setRowData(aggregatedData);
//     } catch (error) {
//       console.error('Error fetching data from backend:', error);
//     }
//   });
  
  // ...

  // const addRow = () => {
  //   if (keterangan()) {
  //     const total = calculateTotalByKeterangan(keterangan(), backendData);
  
  //     const newRow: RowData = {
  //       keterangan: keterangan(),
  //       totalplan: total
  //     };
  
  //     setRowData((prevData) => {
  //       const newData = [...prevData, newRow];
  //       // Simpan data ke localStorage saat menambahkan data baru
  //       localStorage.setItem('tableKetMonth', JSON.stringify(newData));
  //       // calculateAllTotal();
  //       return newData;
  //     });
  
  //     setAllTotal((prevTotal) => prevTotal + total);
  
  //     clearInputs();
  //   }
  // };
  // createEffect(() => {
  //   calculateAllTotal();
  // });

  

    //   const calculateTotalByKeterangan = (keterangan, backendData) => {
    //     const filteredData = backendData.filter(item => item.keterangan === keterangan);
    //     const total = filteredData.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    //     return total;
    //   };
      
      
    //   const addRow = () => {
    //     if (keterangan()) {
    //         const total = calculateTotalByKeterangan(keterangan(), backendData());

    //       const newRow: RowData = {
    //         keterangan: keterangan(),
    //         totalplan: total
    //       };
      
    //       setRowData((prevData) => {
    //         const newData = [...prevData, newRow];
    //         // Simpan data ke localStorage saat menambahkan data baru
    //         localStorage.setItem('tableKetMonth', JSON.stringify(newData));
    //         return newData;
    //       });

    //       setAllTotal((prevTotal) => prevTotal + total);

    //       clearInputs();
    //     }
    //   };

    

    // const calculateTotalByKeterangan = (keterangan, backendData) => {
    //   const filteredData = backendData.filter(item => item.keterangan === keterangan);
    //   const total = filteredData.reduce((accumulator, currentValue) => accumulator + currentValue.total2, 0);
    //   return total;
    // };

    