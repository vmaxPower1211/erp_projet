import { createSignal, type Component, onMount, createEffect, onCleanup } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { DataMonthlyPengajuan } from '../../../../api/planning/new-pengajuan/new-pengajuan';
import { Icon } from '@iconify-icon/solid';

const TableSortPlan: Component = () => {

  const [RowData, setRowData] = createSignal([{}]);
  const [selectedMonth, setSelectedMonth] = createSignal('');
  const [searchTerm, setSearchTerm] = createSignal('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    console.log("bulan ", selectedMonth())
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("search ", searchTerm());

  };

  // const loadGridData = async () => {
  //   const data_planning = await DataMonthlyPengajuan("data pengajuan baru");
  //   const filteredData = selectedMonth()
  //   ? data_planning
  //       .filter((item) => item.entry_ts.startsWith(selectedMonth()))
  //       .map((item) => ({
  //         ...item,
  //         entry_ts: item.entry_ts.slice(0, 10) // Ambil hanya 10 karakter pertama
  //       }))
  //   : data_planning.map((item) => ({
  //       ...item,
  //       entry_ts: item.entry_ts.slice(0, 10) // Ambil hanya 10 karakter pertama
  //     }));
  //   setRowData(filteredData);
  // };

  const loadGridData = async () => {
    const selectedMonthValue = selectedMonth();
    const searchTermValue = searchTerm();
  
    // ...
  
    console.log("search ", searchTermValue);
    console.log("bulan ", selectedMonthValue);
    const data_planning = await DataMonthlyPengajuan("data pengajuan baru");
  
    let filteredData = data_planning;
  
    if (selectedMonthValue) {
      filteredData = filteredData
        .filter((item) => item.entry_ts.startsWith(selectedMonthValue))
        .map((item) => ({
          ...item,
          entry_ts: item.entry_ts.slice(0, 10),
        }));
    }
  
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(
          (searchTermValue && searchTermValue) ? searchTermValue.toLowerCase() : ''
        )
      )
    );

  
    console.log("Filtered Data:", filteredData);
    console.log("search ", searchTerm());
    console.log("bulan ", selectedMonth())
    setRowData(filteredData);
  };
  
  
  

  onMount(loadGridData);

  // createEffect(() => {
  //   if (selectedMonth() !== "") {
  //     loadGridData();
  //   }
  //   return onCleanup(() => {
  //     // Bersihkan langganan atau sumber daya jika diperlukan
  //   });
  // });

  createEffect(() => {
    loadGridData();
    return onCleanup(() => {
      // Clean up subscriptions or resources if needed
    });
  }, [selectedMonth, searchTerm]);
  
  function getCellStyle(params: { value: string; }) {
    if (params.value === 'Weekly') {
      return { color: '#FF6838' };
    } else if (params.value === 'Monthly') {
      return { color: '#00BA29' };
    } else {
      return { color: '#860089' };
    }
  }

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
    // { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 50 },
    { field: 'id', headerName: 'ID', editable: false, width: 65 },
    { field: 'entry_ts', headerName: 'Tanggal',  width: 130},
    // { field: 'coa_kd', headerName: 'COA', width: 85 },
    { field: 'namapengajuan', headerName: 'Keterangan', width: 269, editable: false},
    { field: 'tipepengajuan', cellStyle: getCellStyle, width: 115,  headerName: 'Kategori', cellClassRules: { 'bold-type': () => true }, },
    // { field: 'category', headerName: 'Jenis', },
    { field: "total", headerName: "Total", width: 95, valueFormatter: (params) => formatRupiah(params.value) },
    { field: 'status', headerName: 'Status', width: 125},
    // { field: 'confirm', headerName: 'Konfirmasi', headerCheckboxSelection: true, checkboxSelection: true, editable: false },
    ],
    pagination: true,
    paginationPageSize: 4,
    rowHeight: 33,
    // sortable: true
    };



  const defaultColDef = {
    // flex: 1,
    sortable: true,
  }

  return (
    <div>
      <div style={{display:"flex", "justify-content":"space-between"}}>
        <div>
            {/* <label for="monthSelect">Pilih Bulan: </label> */}
            <select id="monthSelect" onChange={handleMonthChange}>
            <option value="">Semua Bulan</option>
            <option value="2023-01">Januari</option>
            <option value="2023-02">Februari</option>
            <option value="2023-03">Maret</option>
            <option value="2023-04">April</option>
            <option value="2023-05">Mei</option>
            <option value="2023-06">Juni</option>
            <option value="2023-07">Juli</option>
            <option value="2023-08">Agustus</option>
            <option value="2023-09">September</option>
            <option value="2023-10">Oktober</option>
            <option value="2023-11">November</option>
            <option value="2023-12">Desember</option>

            {/* tambahkan opsi bulan lainnya sesuai kebutuhan */}
            </select>
        </div>
        <div class="rightcp" style={{display:"flex","flex-direction":"row","align-items":"center"}}>
            <input type="text" placeholder="Search.." name="search" 
            value={searchTerm()}
            onInput={handleSearchChange}
            />
            <span class="search-icon">
                <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
            </span>
            <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
        </div>
      </div>

      <div class="ag-theme-alpine" style={{width:'141vh', height:'35vh', "margin-top":"10px","margin-bottom":"30px"}}>
        <AgGridSolid
            // columnDefs={columnDefs}
            rowData={RowData()}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default TableSortPlan;
