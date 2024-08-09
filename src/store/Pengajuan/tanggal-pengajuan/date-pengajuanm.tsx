import { createStore } from 'solid-js/store';
import { RowData } from '../../../containers/navbars/create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-insentif/pengajuanweekly-insentif';

interface Store {
  rowData1: RowData[];
  setRowData1: (data: RowData[]) => void;
}

// const store: Store = createStore({
//     rowData1: [] as RowData[], // Nilai awal
//     setRowData1: (data: RowData[]) => store.rowData1 = data,
//   });


// export default store;
