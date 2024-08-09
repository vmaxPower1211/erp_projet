import { createSignal, type Component, onCleanup, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './pengajuanweekly-reimburse.css';
import { Totalll, setTotall3 } from '../../../../../../../store/Pengajuan/Reimburse-satu/weekly-reimburse-satu';
import { Icon } from '@iconify-icon/solid';
// import FormEditWeekly from './forms/form-edit-weeklyinsen'; //
// import ConfirmPopUpReimburse from './popup/confirmpopup'; //
import PengajuanWeekly from '../../../pengajuan-weekly/pengajuan-weekly';
import FormEditReimburse from '../forms/form-edit-weeklyreimburse';
import ConfirmPopUpReimburse from './confirmpopup-reimburse';

type RowData = {
    total: number;
    kebutuhan: string;
    price: number;
    coa: string;
    // aksi: object;
  };

const PengajuanReimburse: Component = () => {
    const [popUp, setPopUp] = createSignal(false);

    function handlePopUp(){
        setPopUp(true);
    }

    function ClosePopUp(){
        setPopUp(false);
    }

    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedOption, setSelectedOption] = createSignal('');
    const options = [
        "1-0000", "1-1000", "1-1100", "1-1101", "1-1102",
        "1-1200", "1-1201", "1-1202", "1-1203", "1-1204",
        "1-1300", "1-1400", "1-1401", "1-1402", "1-1403", "1-1404",
        "1-1500", "1-1501", "1-1506",
        "1-1600", "1-1700",
        "1-1801", "1-1801", "1-1802", "1-1803",
        "1-9000", "1-9001", "1-2000", "1-2001", "1-2002", "1-2003",
        "3-0000", "3-7000", "3-8000", "3-9000", "3-9999",
        "8-0000",
        "8-1001"
      ];  

    const [gridApi, setGridApi] = createSignal(null);
    const [rowData, setRowData] = createSignal<RowData[]>(
        (() => {
          // Coba ambil data dari localStorage saat komponen diinisialisasi
          const savedData = localStorage.getItem('tableData2');
          return savedData ? JSON.parse(savedData) : ([] as RowData[]);
        })()
      );
    
      const dropdownRef = (el) => {
        if (el) {
        const handleDocumentClick = (e) => {
            if (!el.contains(e.target)) {
            setIsOpen(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);
        onCleanup(() => {
            document.removeEventListener('click', handleDocumentClick);
        });
        }
    };

    const [need, setNeed] = createSignal("");
    const [price, setPrice] = createSignal(0);
    const [coa, setCOA] = createSignal("");

    const [isEditPopupReimburseOpen, setisEditPopupReimburseOpen] = createSignal(false);
    const [isDeletePopupReimburseOpen, setisDeletePopupReimburseOpen] = createSignal(false);

  //   const showEditPopupInsen = () => {
  //     // console.log("Kebutuhan:", editedKebutuhan);
  //     // setKebutuhan(editedKebutuhan);
  
  //     // console.log("Price:", editedPrice);
  //     // setPrice(editedPrice);
  
  //     // console.log("Coa:", editedCoa);
  //     // setCOA(editedCoa);
  
  //     setisEditPopupInsenOpen(!isEditPopupInsenOpen());
  // };
  
  function showEditPopupReimburse() {
    setisEditPopupReimburseOpen(!isEditPopupReimburseOpen());
  }

  function showDeletePopupReimburse() {
    setisDeletePopupReimburseOpen(!isDeletePopupReimburseOpen());
  }

  function CloseEditPopUpReimburse() {
    setisEditPopupReimburseOpen(false);
    setConfirmPopUp(false);
  }

  function CloseDeletePopUpReimburse() {
    setisDeletePopupReimburseOpen(false);
    setConfirmPopUp(false);
  }

  const [ConfirmPopUp, setConfirmPopUp] = createSignal(false);
  
    const gridOptions = {
      columnDefs: [
        { field: "kebutuhan", headerName: "Kebutuhan", width: 200 },
        { field: "coa", headerName: "COA", width: 130 },
        { field: "price", headerName: "Price", width: 130 },
        // { field: "total", headerName: "Total", width: 130 },
        {
          field: 'aksi', cellRenderer: (params: any) => {
            // function showEditPopupInsen(id: any, balance: any): void {
            //   throw new Error('Function not implemented.');
            // }
  
            // function showDeletePopupInsen(id: any): void {
            //   throw new Error('Function not implemented.');
            // }
  
            return (
              <div style={{ "margin-top": "1vh", display: "flex", "justify-content": "space-between", width: "9vh" }}>
                <button onClick={showEditPopupReimburse}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                <button onClick={showDeletePopupReimburse}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
              </div>
            );
          }
        }
      ],
    };
  
    const onGridReady = (params: any) => {
      setGridApi(() => params.api);
    };
  
    const addRow = () => {
      if (need() && price() ) {
        const newRow: RowData = {
            kebutuhan: need(),
            price: price(),
            total: 0,
            coa: selectedOption(),
            // aksi: aksi()
        };
        setRowData((prevData) => {
          const newData = [...prevData, newRow];
          // Simpan data ke localStorage saat menambahkan data baru
          localStorage.setItem('tableData2', JSON.stringify(newData));
          return newData;
        });
        clearInputs();
      }
    };
  
    const clearInputs = () => {
      setNeed("");
      setPrice(0);
    };

    const calculateTotal = () => {
        const gridData = rowData();
        let Totall3 = 0;
        for (const row of gridData) {
          Totall3 += row.price;
        }
        setTotall3(Totall3); // Simpan total di toko
        return Totall3;
      };

      const initialKeteranganReimburseOptions = [
        "Transpor + parkir TSO (meeting pak Arson)",
        "Benin CRV 24-Okt",
        "Meeting INAP 24-Okt",
        "Reimburse pak Singgih",
        "Reimburse Rizki",
        "Reimburse Zaki",
        "Reimburse Rendy",
        "Reimburse Nafis",
        "Reimburse Nanda",
        "Reimburse Arif",
        "Reimburse Bagas",
        "Reimburse Ayyas",
        "Reimburse Arya",
        "Reimburse Alfath",
        "Reimburse Grace",
        "Reimburse Garry",
        "Reimburse Maya",
        "Reimburse Ramdan",
      ];
      
      // Fungsi untuk mendapatkan opsi keterangan dari local storage atau nilai default jika tidak ada
      const getKeteranganReimburseOptions = () => {
        const storedOptions = localStorage.getItem('tableKetMonth');
        return storedOptions ? JSON.parse(storedOptions).map((row) => row.keterangan) : initialKeteranganReimburseOptions;
      };
      
      // Inisialisasi sinyal dengan opsi keterangan
      const [keteranganReimburseOptions, setKeteranganOptions] = createSignal<string[]>(getKeteranganReimburseOptions());

  return (
    <div>
        <div>
        
        <div class="dropdown-keterangan-reimburse">
        <label for="keteranganDropdown-reimburse">Keterangan:</label>
        <br />
        {/* Gunakan dropdown di sini */}
        <select
            id="keteranganDropdown-reimburse"
            // value={selectedOption()}
            // onChange={(e) => setSelectedOption(e.target.value)}
            style={{width:"45vh"}}
        >
          <option value="" disabled selected></option>
          {typeof keteranganReimburseOptions() === 'function' ? (
              // Handle the case where keteranganOptions is a function
              // You might want to provide a default value or handle this case differently
              <option value="">Pilih Keterangan</option>
          ) : (
              // Handle the case where keteranganOptions is an array
              keteranganReimburseOptions().map((option) => (
                  <option value={option}>{option}</option>
              ))
          )}
            {/* <option value="" disabled selected>
                Pilih Keterangan
            </option>
            {keteranganOptions().map((option) => (
                <option value={option}>{option}</option>
            ))} */}
        </select>      
      </div>  
            
        <div class="container-reimburse" style={{display:'flex', "flex-direction":"row"}}>
            <div>
            <label>Kebutuhan</label>
            <br />
            <input style={{width:"14vw"}}
            type="text"
            placeholder="Kebutuhan"
            value={need()}
            onInput={(e) => setNeed(e.target.value)}
            />
            </div>

            <div>
            <label>COA</label>
            <br />
               <div class="custom-dropdown-coa-reimburse" ref={dropdownRef}>
                <div class="dropdown-selected-reimburse" onClick={() => setIsOpen(!isOpen())} style={{"justify-content":"space-between", display:"flex", "flex-direction":"row"}}>
                    <div>{selectedOption() || ""}</div>
                    <div>
                        {isOpen() ? 
                        <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><g transform="translate(0 15) scale(1 -1)"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></g></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></svg>
                        }
                    </div>
                    {/* {isOpen() ? "▲" : "▼"} */}
                </div>
                <div>
                {isOpen() && (
                    <div class="dropdown-options-coa-reimburse">
                    <div class="options-list" >
                        {options.map((option, index) => (
                        <div
                            class="option"
                            onClick={() => {
                            setSelectedOption(option);
                            setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </div> 
            </div>
            
            <div>
            <label>Price</label>
            <br />
            <input style={{width:"8vw"}}
            type="number"
            placeholder="Price"
            value={price()}
            onInput={(e) => setPrice(Number(e.target.value))}
            />
            </div>
            
            <div class="tambah-data-weekly-reimburse">
                <button onClick={addRow}>Tambah</button>
            </div>
        </div>
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "126vh" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
            />
            <div class="detail-total-weekly-reimburse">
                <div>TOTAL</div>
                <div>Rp{calculateTotal()}</div>
            </div>
        </div>
        
        <div class="btn-simpan-weekly-reimburse">
            <button onClick={handlePopUp}>Simpan</button>
        </div>

        </div>
        {popUp() && <PengajuanWeekly OnClose={ClosePopUp} total2={Totalll()} total={calculateTotal()}/>}
        {isEditPopupReimburseOpen() && <FormEditReimburse OnClose={CloseEditPopUpReimburse} />}
        {isDeletePopupReimburseOpen() && <ConfirmPopUpReimburse OnClose={CloseDeletePopUpReimburse} />}
    </div>
  );
};

export default PengajuanReimburse;
