// namaPengajuanEventStore.ts
import { createStore } from 'solid-js/store';

interface StoreNamaPengajuan {
  namaPengajuanEvent: string;
  namaPengajuanWeekly: string;
  namaPengajuanMonthly: string;
}

// Coba memulihkan nilai dari localStorage saat aplikasi dimuat
const initialStoreValue: StoreNamaPengajuan = {
  namaPengajuanEvent: localStorage.getItem('namaPengajuanEvent') || '',
  namaPengajuanWeekly: localStorage.getItem('namaPengajuanWeekly') || '',
  namaPengajuanMonthly: localStorage.getItem('namaPengajuanMonthly') || '',
};

const [namaPengajuanStore, setNamaPengajuanStore] = createStore<StoreNamaPengajuan>(initialStoreValue);

export const setNamaPengajuanEvent = (value: string) => {
  setNamaPengajuanStore('namaPengajuanEvent', value);
  localStorage.setItem('namaPengajuanEvent', value); // Menyimpan nilai ke penyimpanan lokal
};

export const setNamaPengajuanWeekly = (value: string) => {
  setNamaPengajuanStore('namaPengajuanWeekly', value);
  localStorage.setItem('namaPengajuanWeekly', value); // Menyimpan nilai ke penyimpanan lokal
};

export const setNamaPengajuanMonthly = (value: string) => {
  setNamaPengajuanStore('namaPengajuanMonthly', value);
  localStorage.setItem('namaPengajuanMonthly', value); // Menyimpan nilai ke penyimpanan lokal
};

export const getNamaPengajuanEvent = () => namaPengajuanStore.namaPengajuanEvent;
export const getNamaPengajuanWeekly = () => namaPengajuanStore.namaPengajuanWeekly;
export const getNamaPengajuanMonthly = () => namaPengajuanStore.namaPengajuanMonthly;

export const resetNamaPengajuanEvent = () => {
  setNamaPengajuanStore('namaPengajuanEvent', '');
  localStorage.removeItem('namaPengajuanEvent'); // Menghapus nilai dari penyimpanan lokal
};

export const resetNamaPengajuanWeekly = () => {
  setNamaPengajuanStore('namaPengajuanWeekly', '');
  localStorage.removeItem('namaPengajuanWeekly'); // Menghapus nilai dari penyimpanan lokal
};

export const resetNamaPengajuanMonthly = () => {
  setNamaPengajuanStore('namaPengajuanMonthly', '');
  localStorage.removeItem('namaPengajuanMonthly'); // Menghapus nilai dari penyimpanan lokal
};

export default namaPengajuanStore;
