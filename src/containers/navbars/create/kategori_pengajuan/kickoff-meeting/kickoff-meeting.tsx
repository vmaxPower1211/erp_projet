import { createSignal, type Component, onCleanup, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './kickoff-meeting.css'
import { setTotalE1 } from '../../../../../store/Pengajuan/Event/event-total-store';
import PengajuanEvent from '../pengajuan_event/pengajuan-event/pengajuan-event';

type RowData = {
    deskripsi: string;
    qty: number;
    unit: number;
    uom: string;
    price: number;
    total: number;
    coa: string;
    notes: string;
    ref: string;
  };

const KickOffMeeting: Component = () => {
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
          const savedData = localStorage.getItem('tableEvent1');
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

      
      
      
    const [desc, setDesc] = createSignal("");
    const [coa, setCOA] = createSignal("");
    const [qty, setQty] = createSignal(0);
    const [unit, setUnit] = createSignal(0);
    const [uom, setUoM] = createSignal("");
    const [price, setPrice] = createSignal(0);
    const [notes, setNotes] = createSignal("");
    const [ref, setRef] = createSignal("");
  
    const gridOptions = {
      columnDefs: [
        { valueGetter: 'node.rowIndex + 1', headerName: 'No', width:55},
        { field: "deskripsi", headerName: "Deskripsi", width: 180 },
        { field: "coa", headerName: "COA", width: 90 },
        { field: "qty", headerName: "Qty", width: 70 },
        { field: "unit", headerName: "Unit", width: 70 },
        { field: "uom", headerName: "UoM", width: 75 },
        // { field: "unit", headerName: "Unit", width: 120 },
        { field: "price", headerName: "Unit Price", width: 100 },
        { field: "total", headerName: "Sub Total", width: 100},
        { field: "notes", width: 130 },
        { field: "ref", headerName:"Reference", width: 158 },
    ],
    };
  
    const onGridReady = (params: any) => {
      setGridApi(() => params.api);
    };
  
    const addRow = () => {
      if (desc() && price() ) {
        const total = qty() * unit() * price();
        const newRow: RowData = {
          deskripsi: desc(),
          qty: qty(),
          unit: unit(),
          uom: uom(),
          price: price(),
          total: total,
          coa: selectedOption(),
          notes: notes(),
          ref: ref(),
        };
        setRowData((prevData) => {
          const newData = [...prevData, newRow];
          // Simpan data ke localStorage saat menambahkan data baru
          localStorage.setItem('tableEvent1', JSON.stringify(newData));
          return newData;
        });
        clearInputs();
      }
    };
  
    const clearInputs = () => {
      setDesc("");
      setQty(0);
      setUnit(0);
      setUoM("");
      setPrice(0);
      setCOA("");
      setNotes("");
      setRef("")
    };

    // const calculateTotal = () => {
    //     const gridData = rowData();
    //     let total = 0;
    //     for (const row of gridData) {
    //       total += row.total;
    //     }
    //     return total;
    //   };

    const calculateTotal = () => {
        const gridData = rowData();
        let TotalE1 = 0;
        for (const row of gridData) {
          TotalE1 += row.total;
        }
        setTotalE1(TotalE1); // Simpan total di toko
        return TotalE1;
      };
  
    // onMount(() => {
    //   // Bersihkan localStorage saat komponen di-unmount
    //   onCleanup(() => {
    //     localStorage.removeItem('tableData');
    //   });
    // });

  return (
    <div>
      <div style={{"margin-bottom":"20px", "font-size":"24px", "font-weight":"700"}}>
        <h1>Kick Off Meeting</h1>
      </div>
        <div>
            
        <div class="container-kickoff-meeting" style={{display:'flex', "flex-direction":"row"}}>
            <div>
            <label>Deskripsi</label>
            <br />
            <input style={{width:"14vw"}}
            type="text"
            // placeholder=""
            value={desc()}
            onInput={(e) => setDesc(e.target.value)}
            />
            </div>

            <div>
            <label>COA</label>
            <br />
               <div class="custom-dropdown-coa"  onClick={() => setIsOpen(!isOpen())} ref={dropdownRef}>
                <div class="dropdown-selected" style={{"justify-content":"space-between", display:"flex", "flex-direction":"row"}}>
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
                    <div class="dropdown-options-coa">
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
            <label>Qty</label>
            <br />
            <input style={{width:"5vw"}}
            type="number"
            placeholder="Qty"
            value={qty()}
            onInput={(e) => setQty(Number(e.target.value))}
            />
            </div>

            <div>
            <label>Unit</label>
            <br />
            <input style={{width:"5vw"}}
            type="text"
            placeholder="Unit"
            value={unit()}
            onInput={(e) => setUnit(Number(e.target.value))}
            />
            </div>

            <div>
            <label>UoM</label>
            <br />
            <input style={{width:"6vw"}}
            type="text"
            // placeholder="Unit"
            value={uom()}
            onInput={(e) => setUoM(e.target.value)}
            />
            </div>
            
            <div>
            <label>Price</label>
            <br />
            <input style={{width:"7vw"}}
            type="number"
            placeholder="Price"
            value={price()}
            onInput={(e) => setPrice(Number(e.target.value))}
            />
            </div>

            <div>
            <label>Notes</label>
            <br />
            <input style={{width:"8vw"}}
            type="text"
            // placeholder="Notes"
            value={notes()}
            onInput={(e) => setNotes(e.target.value)}
            />
            </div>

            <div>
            <label>References</label>
            <br />
            <input style={{width:"8vw"}}
            type="text"
            // placeholder="Notes"
            value={ref()}
            onInput={(e) => setRef(e.target.value)}
            />
            </div>

            
            <div class="tambah-data-1">
                <button onClick={addRow}>Tambah</button>
            </div>
        </div>
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "156vh" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
            />
            <div class="detail-total-kickoff-meeting">
                <div>TOTAL</div>
                <div>Rp{calculateTotal()}</div>
            </div>
        </div>
        
        <div class="btn-simpan-kickoff-meeting">
            <button onClick={handlePopUp}>Simpan</button>
        </div>

        </div>
        {popUp() && <PengajuanEvent OnClose={ClosePopUp} />}
    </div>
  );
};

export default KickOffMeeting;
