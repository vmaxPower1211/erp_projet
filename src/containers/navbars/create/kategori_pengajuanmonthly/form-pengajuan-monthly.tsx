// import { createSignal, type Component, onCleanup, onMount } from 'solid-js';
// import AgGridSolid from 'ag-grid-solid';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import './operasional-tamanhas.css'
// // import PengajuanMonthly from '../pengajuan-monthly';
// // import { Total3, Total4, Total5, setTotal } from '../../../../../store/Pengajuan/Monthly-satu/pengajuan-m-satu';
// // import { Total2 } from '../../../../../store/Pengajuan/Monthly-satu/pengajuan-m-satu';

// type RowData = {
//     kebutuhan: string;
//     qty: number;
//     unit: string;
//     price: number;
//     total: number;
//     coa: string;
//   };

// const OperasionalTamanhas: Component = () => {
//     const [popUp, setPopUp] = createSignal(false);

//     function handlePopUp(){
//         setPopUp(true);
//     }

//     function ClosePopUp(){
//         setPopUp(false);
//     }

//     const [isOpen, setIsOpen] = createSignal(false);
//     const [selectedOption, setSelectedOption] = createSignal('');
//     const options = [
//         "1-0000", "1-1000", "1-1100", "1-1101", "1-1102",
//         "1-1200", "1-1201", "1-1202", "1-1203", "1-1204",
//         "1-1300", "1-1400", "1-1401", "1-1402", "1-1403", "1-1404",
//         "1-1500", "1-1501", "1-1506",
//         "1-1600", "1-1700",
//         "1-1801", "1-1801", "1-1802", "1-1803",
//         "1-9000", "1-9001", "1-2000", "1-2001", "1-2002", "1-2003",
//         "3-0000", "3-7000", "3-8000", "3-9000", "3-9999",
//         "8-0000",
//         "8-1001"
//       ];  

//     const [gridApi, setGridApi] = createSignal(null);
//     const [rowData, setRowData] = createSignal<RowData[]>(
//         (() => {
//           // Coba ambil data dari localStorage saat komponen diinisialisasi
//           const savedData = localStorage.getItem('tableData');
//           return savedData ? JSON.parse(savedData) : ([] as RowData[]);
//         })()
//       );
      
//     const dropdownRef = (el) => {
//         if (el) {
//         const handleDocumentClick = (e) => {
//             if (!el.contains(e.target)) {
//             setIsOpen(false);
//             }
//         };
//         document.addEventListener('click', handleDocumentClick);
//         onCleanup(() => {
//             document.removeEventListener('click', handleDocumentClick);
//         });
//         }
//     };

      
      
      
//     const [need, setNeed] = createSignal("");
//     const [qty, setQty] = createSignal(0);
//     const [unit, setUnit] = createSignal("");
//     const [price, setPrice] = createSignal(0);
//     const [coa, setCOA] = createSignal("");
  
//     const gridOptions = {
//       columnDefs: [
//         { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 60 },
//         { field: "kebutuhan", headerName: "Kebutuhan", width: 200 },
//         { field: "coa", headerName: "COA", width: 130 },
//         { field: "qty", headerName: "Qty", width: 80 },
//         { field: "unit", headerName: "Unit", width: 100 },
//         { field: "price", headerName: "Price", width: 130 },
//         { field: "total", headerName: "Total", width: 150},
//       ],
//     };
  
//     const onGridReady = (params: any) => {
//       setGridApi(() => params.api);
//     };
  
//     const addRow = () => {
//       if (need() && qty() && unit() && price() ) {
//         const total = qty() * price();
//         const newRow: RowData = {
//           kebutuhan: need(),
//           qty: qty(),
//           unit: unit(),
//           price: price(),
//           total: total,
//           coa: selectedOption(),
//         };
//         setRowData((prevData) => {
//           const newData = [...prevData, newRow];
//           // Simpan data ke localStorage saat menambahkan data baru
//           localStorage.setItem('tableData', JSON.stringify(newData));
//           return newData;
//         });
//         clearInputs();
//       }
//     };
  
//     const clearInputs = () => {
//       setNeed("");
//       setQty(0);
//       setUnit("");
//       setPrice(0);
//       setCOA("");
//     };

//     // const calculateTotal = () => {
//     //     const gridData = rowData();
//     //     let total = 0;
//     //     for (const row of gridData) {
//     //       total += row.total;
//     //     }
//     //     return total;
//     //   };

//     // const calculateTotal = () => {
//     //     const gridData = rowData();
//     //     let Total = 0;
//     //     for (const row of gridData) {
//     //       Total += row.total;
//     //     }
//     //     setTotal(Total); // Simpan total di toko
//     //     return Total;
//     //   };
  
//     // onMount(() => {
//     //   // Bersihkan localStorage saat komponen di-unmount
//     //   onCleanup(() => {
//     //     localStorage.removeItem('tableData');
//     //   });
//     // });

//   return (
//     <div class="operasional-rutin-tamanhas">
//         <div>
//             <h1>Operasional Rutin Tamanhas</h1>
//         </div>
//         <div>
//             dropdown keterangan di sini
//         </div>
//         <div>   
//         <div class="container-data-operasional" style={{display:'flex', "flex-direction":"row"}}>
//             <div>
//             <label>Kebutuhan</label>
//             <br />
//             <input style={{width:"14vw"}}
//             type="text"
//             placeholder="Kebutuhan"
//             value={need()}
//             onInput={(e) => setNeed(e.target.value)}
//             />
//             </div>

//             <div>
//             <label>COA</label>
//             <br />
//                <div class="custom-dropdown-coa" ref={dropdownRef}>
//                 <div class="dropdown-selected" onClick={() => setIsOpen(!isOpen())} style={{"justify-content":"space-between", display:"flex", "flex-direction":"row"}}>
//                     <div>{selectedOption() || ""}</div>
//                     <div>
//                         {isOpen() ? 
//                         <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><g transform="translate(0 15) scale(1 -1)"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></g></svg>
//                         : <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></svg>
//                         }
//                     </div>
//                     {/* {isOpen() ? "▲" : "▼"} */}
//                 </div>
//                 <div>
//                 {isOpen() && (
//                     <div class="dropdown-options-coa">
//                     <div class="options-list" >
//                         {options.map((option, index) => (
//                         <div
//                             class="option"
//                             onClick={() => {
//                             setSelectedOption(option);
//                             setIsOpen(false);
//                             }}
//                         >
//                             {option}
//                         </div>
//                         ))}
//                     </div>
//                     </div>
//                 )}
//                 </div>
//             </div> 
//             </div>

//             <div>
//             <label>Qty</label>
//             <br />
//             <input style={{width:"6vw"}}
//             type="number"
//             placeholder="Qty"
//             value={qty()}
//             onInput={(e) => setQty(Number(e.target.value))}
//             />
//             </div>

//             <div>
//             <label>Unit</label>
//             <br />
//             <input style={{width:"7.5vw"}}
//             type="text"
//             placeholder="Unit"
//             value={unit()}
//             onInput={(e) => setUnit(e.target.value)}
//             />
//             </div>
            
//             <div>
//             <label>Price</label>
//             <br />
//             <input style={{width:"8vw"}}
//             type="number"
//             placeholder="Price"
//             value={price()}
//             onInput={(e) => setPrice(Number(e.target.value))}
//             />
//             </div>

            
//             <div class="tambah-data-1">
//                 <button onClick={addRow}>Tambah</button>
//             </div>
//         </div>
//         <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "130vh" }}>
//             <AgGridSolid 
//                 gridOptions={gridOptions} 
//                 onGridReady={onGridReady} 
//                 rowData={rowData()} 
//             />
//             <div class="detail-total-operasional">
//                 <div>TOTAL</div>
//                 {/* <div>Rp{calculateTotal()}</div> */}
//             </div>
//         </div>
        
//         <div class="btn-simpan-data-operasional">
//             <button onClick={handlePopUp}>Simpan</button>
//         </div>

//         </div>
//         {/* {popUp() && <PengajuanMonthly OnClose={ClosePopUp} 
//         total={calculateTotal()} total2={Total2()} total3={Total3()} total4={Total4()} total5={Total5()}/>} */}
//     </div>
//   );
// };

// export default OperasionalTamanhas;
