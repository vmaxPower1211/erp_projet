import { createSignal, type Component, onCleanup, onMount, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './operasional-tamanhas.css'
import PengajuanMonthly from '../pengajuan-monthly';
import { Total, Total3, Total4, Total5, setTotal } from '../../../../../store/Pengajuan/Monthly-satu/pengajuan-m-satu';
import { Total2 } from '../../../../../store/Pengajuan/Monthly-satu/pengajuan-m-satu';
import { Icon } from '@iconify-icon/solid';
import ComfirmDeletePlan from './popup/confirm-delete-plan';
import { options } from './data-coa';
import { getNamaPengajuanMonthly } from '../../../../../store/Pengajuan/nama-pengajuan';

export interface Option {
  value: string;
  label: string
}

export interface SelectedOption {
  value?: string;
  label?: string;
}

export type RowData = { //sesuain ke row data lain (samain field BE) ganti columnDefsnya juga gini fieldnya
  namapengajuan: string;
  tipepengajuan: string
  id?: number;
  uom: string;
  keterangan: string;
  kebutuhan: string;
  quantity: number;
  price: number;
  total: number;
  coa_kd: string;
  aksi?: object;
};

const calculateTotalByKeterangan = (data) => {
  const totals = {};

  for (const row of data) {
    const keterangan = row.keterangan;

    if (!totals[keterangan]) {
      totals[keterangan] = 0;
    }

    totals[keterangan] += row.total;
  }

  return totals;
};

export { calculateTotalByKeterangan };

const OperasionalTamanhas: Component = () => {
  const [gridApi, setGridApi] = createSignal(null);
  const [rowData, setRowData] = createSignal<RowData[]>(
    (() => {
      const savedData = localStorage.getItem('tableData');
      return savedData
        ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) // Add a uniqueId property
        : ([] as RowData[]);
    })()
  );


  const [need, setNeed] = createSignal("");
  const [qty, setQty] = createSignal(0);
  const [uom, setuom] = createSignal("");
  const [price, setPrice] = createSignal(0);
  const [coa, setCOA] = createSignal("");


  const [popUp, setPopUp] = createSignal(false);

  function handlePopUp() {
    setPopUp(true);
  }
  // const [EditPopUp, setEditPopUp] = createSignal(false);
  // const [DeletePopUp, setDeletePopUp] = createSignal(false);

  // function showEditPopUp(row: RowData){
  //   setSelectedRow(row);
  //   setEditPopUp(true);
  // }

  // function showDeletePopUp(){
  //   setDeletePopUp(true);
  // }

  function closePopUp() {
    // setEditPopUp(false);
    // setDeletePopUp(false);
    setPopUp(false);
  }

  const handleCellValueChanged = (params) => {
    const { data } = params;
    // Update local storage
    localStorage.setItem('tableData', JSON.stringify(rowData()));

    // Recalculate total if 'qty' or 'price' is changed
    if (params.colDef.field === 'quantity' || params.colDef.field === 'price') {
      const newTotal = data.quantity * data.price;
      const updatedRow = { ...data, total: newTotal };
      console.log("ini apa", updatedRow)
      setRowData((prevData) => {
        const newData = prevData.map((row) =>
          areRowsEqual(row, data) ? { ...row, ...updatedRow } : row
        );
        localStorage.setItem('tableData', JSON.stringify(newData));
        return newData;
      });
    }
  };

  const deleteRow = (index: number) => {
    setRowData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      // Update localStorage after removing the row
      localStorage.setItem('tableData', JSON.stringify(newData));
      return newData;
    });
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

  // Fungsi utilitas untuk membandingkan dua objek row
  const areRowsEqual = (row1, row2) => {
    // Implementasikan logika perbandingan berdasarkan properti yang sesuai
    return row1.uniqueId === row2.uniqueId;
  };

  const gridOptions = {
    columnDefs: [
      { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 61 },
      // { field: "uniqueId" },
      { field: "keterangan", editable: true, width: 162 },
      { field: "kebutuhan", headerName: "Kebutuhan", editable: true, width: 200 },
      { field: "coa_kd", headerName: "COA", editable: true, width: 100 },
      { field: "quantity", headerName: "Qty", editable: true, width: 80 },
      { field: "uom", headerName: "UoM", editable: true, width: 100 },
      { field: "price", headerName: "Price", editable: true, width: 95, valueFormatter: (params) => formatRupiah(params.value) },
      { field: "total", headerName: "Total", width: 95, valueFormatter: (params) => formatRupiah(params.value) },
      {
        field: 'aksi', width: 80, cellRenderer: (params: any) => {
          const rowIndex = params.rowIndex;
          const row = params.data; // Mendapatkan data baris dari params.data

          return (
            <div>
              <button onClick={() => deleteRow(rowIndex)}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
            </div>
          );
        }
      }
    ],
    onCellValueChanged: handleCellValueChanged,
  };

  const onGridReady = (params: any) => {
    setGridApi(() => params.api);
  };

  const addRow = () => {
    if (need() && qty() && uom() && price()) {
      let total = qty() * price();
      const newRow: RowData = {
        id: 0,
        tipepengajuan: "Monthly",
        namapengajuan: getNamaPengajuanMonthly(),
        keterangan: keterangan(),
        kebutuhan: need(),
        quantity: qty(),
        uom: uom(),
        price: price(),
        total: total,
        // coa: selectedOption(),
        coa_kd: selectedOption()?.value,
      };
      setRowData((prevData) => {
        const newData = [...prevData, newRow];
        // Simpan data ke localStorage saat menambahkan data baru
        localStorage.setItem('tableData', JSON.stringify(newData));
        return newData;
      });

      clearInputs();
    }
  };

  const clearInputs = () => {
    setNeed("");
    setQty(0);
    setuom("");
    setPrice(0);
    setCOA("");
  };

  // const calculateTotal = () => {
  //     const gridData = rowData();
  //     let total = 0;
  //     for (const row of gridData) {
  //       total += row.total;
  //     }
  //     return total;
  //   };
  createEffect(() => {
    const gridData = rowData();
    let Total = 0;
    for (const row of gridData) {
      Total += row.total;
    }

    const formattedTotal = formatRupiah(Total);
    setTotal(formattedTotal); // Simpan total di toko dalam format Rupiah
  });

  // onMount(() => {
  //   // Bersihkan localStorage saat komponen di-unmount
  //   onCleanup(() => {
  //     localStorage.removeItem('tableData');
  //   });
  // });

  // kode dropdown keterangan

  const [keterangan, setKeterangan] = createSignal('');
  const [timestamp, setTimestamp] = createSignal('');

  const [keteranganOptions, setKeteranganOptions] = createSignal<string[]>(
    localStorage.getItem('tableKetMonth')
      ? JSON.parse(localStorage.getItem('tableKetMonth')!).map((row: any) => row.keterangan)
      : []
  );


  // kode untuk buat dropdown search COA
  const [inputValue, setInputValue] = createSignal('');

  const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>(null);

  const [filteredOptions, setFilteredOptions] = createSignal<Option[]>(options());
  const [showDropdown, setShowDropdown] = createSignal(false);

  createEffect(() => {
    const inputValueLowerCase = inputValue().toLowerCase();
    const filtered = options().filter((option) => option.label.toLowerCase().includes(inputValueLowerCase) || option.value.toLowerCase().includes(inputValueLowerCase));
    setFilteredOptions(filtered);
  });

  createEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    onCleanup(() => {
      window.removeEventListener('click', handleClickOutside);
    });
  });

  const handleInput = (e: Event) => {
    const label = (e.target as HTMLInputElement).value;
    console.log("?", label)
    setInputValue(label);

    const selectedOption = options().find((option) => option.value === label);

    if (selectedOption) {
      setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
    } else {
      setSelectedOption(null);
    }

    setShowDropdown(true);
  };


  const handleOptionSelect = (selectedOption: Option) => {
    // setInputValue(selectedOption.label);
    setInputValue(`${selectedOption.value} ${selectedOption.label}`);
    setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
    setShowDropdown(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const currentIndex = filteredOptions().findIndex((option) => option === (selectedOption() ?? { value: '', label: '' }));
      const nextIndex =
        currentIndex === -1
          ? 0
          : e.key === 'ArrowDown'
            ? (currentIndex + 1) % filteredOptions().length
            : (currentIndex - 1 + filteredOptions().length) % filteredOptions().length;

      setSelectedOption(filteredOptions()[nextIndex]);
    } else if (e.key === 'Enter' && selectedOption()) {
      handleOptionSelect(selectedOption() as Option);
    }
  };

  //


  return (
    <div class="operasional-rutin-tamanhas">
      <div>
        <h1>Form Tambah Pengajuan Monthly: {getNamaPengajuanMonthly()}</h1>
        {/* ganti ke get itu dari store ya, pokoknya untuk nampilin nama pengajuan pake ini */}
      </div>
      <div class="dropdown-keterangan">
        <label for="keteranganDropdown">Keterangan:</label>
        <br />
        {/* Gunakan dropdown di sini */}
        <select
          id="keteranganDropdown"
          style={{ width: "45vh" }}
          value={keterangan()}
          onInput={(e) => setKeterangan(e.target.value)}
        >
          <option value="" disabled selected></option>
          {typeof keteranganOptions() === 'function' ? (
            // Handle the case where keteranganOptions is a function
            // You might want to provide a default value or handle this case differently
            <option value="">Default Option</option>
          ) : (
            // Handle the case where keteranganOptions is an array
            keteranganOptions().map((option) => (
              <option value={option}>{option}</option>
            ))
          )}
        </select>
      </div>

      <div>
        <div class="container-data-operasional" style={{ display: 'flex', "flex-direction": "row" }}>
          <div>
            <label>Kebutuhan</label>
            <br />
            <input style={{ width: "14vw" }}
              type="text"
              placeholder="Kebutuhan"
              value={need()}
              onInput={(e) => setNeed(e.target.value)}
            />
          </div>

          <div>
            <label>COA</label>
            <br />
            <div>
              <input
                type="text"
                placeholder="COA.."
                value={inputValue()}
                onInput={handleInput}
                // onKeyDown={handleKeyDown}
                class="custom-dropdown-coa"
              />
              {showDropdown() && (
                <div class="dropdown-options-coa">
                  <div class="options-list">
                    {filteredOptions().map((option) => (
                      <div onClick={() => handleOptionSelect(option)} class="option-label">{option.value} {option.label}</div>
                    ))}
                  </div>
                </div>
              )}
              {/* <div>Selected Value: {selectedOption() ? selectedOption().value : 'None'}</div> */}
              {/* <div>Selected Value: {selectedOption()?.value || 'None'}</div> */}
            </div>
          </div>

          <div>
            <label>Qty</label>
            <br />
            <input style={{ width: "6vw" }}
              type="number"
              placeholder="Qty"
              value={qty()}
              onInput={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div>
            <label>UoM</label>
            <br />
            <input style={{ width: "7.5vw" }}
              type="text"
              placeholder="UoM"
              value={uom()}
              onInput={(e) => setuom(e.target.value)}
            />
          </div>

          <div>
            <label>Price</label>
            <br />
            <input style={{ width: "8vw" }}
              type="number"
              placeholder="Price"
              value={price()}
              onInput={(e) => setPrice(Number(e.target.value))}
            />
          </div>


          <div class="tambah-data-1">
            <button onClick={addRow}>Tambah</button>
          </div>
        </div>
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "150vh" }}>
          <AgGridSolid
            gridOptions={gridOptions}
            onGridReady={onGridReady}
            rowData={rowData()}
          />
          <div class="detail-total-operasional">
            <div>TOTAL</div>
            <div>{Total()}</div>
          </div>
        </div>

        <div class="btn-simpan-data-operasional">
          <button onClick={handlePopUp}>Simpan</button>
        </div>

      </div>
      {popUp() && <PengajuanMonthly OnClose={closePopUp} />}
      {/* {EditPopUp() && <EditMonthlyPlan OnClose={closePopUp}  rowData={selectedRow()} handleEdit={handleEdit}/>} */}
      {/* {DeletePopUp() && <ComfirmDeletePlan OnClose={closePopUp}/>} */}
    </div>
  );
};

export default OperasionalTamanhas;
