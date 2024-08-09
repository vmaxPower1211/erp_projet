
import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './confirm-all-plan.css'
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { RowData } from '../operasional-tamanhas/operasional-tamanhas';
import { getNamaPengajuanMonthly } from '../../../../../store/Pengajuan/nama-pengajuan';
import { useNavigate } from '@solidjs/router';

interface ConfirmAllPlanProps {
    OnClose: () => void;
    pengajuan: string;
    sumtotal: string;
    date: string;
}

interface AggregatedRowData {
    keterangan: string;
    total: number;
  }

  interface NewRowData {
    pengajuan: {
      id: number;
      entry_ts: string;
      tipepengajuan: string;
      status: string;
      namapengajuan?: string;
      total: number
    };
    details: {
      id: number;
      pengajuan_id: number;
      keterangan: string;
      coa_kd: string;
      kebutuhan: string;
      quantity: number;
      uom: string;
      price: number;
      total: number;
      namapengajuan?: string;
    }[];
  }
  

const ConfirmAllPlan: Component<ConfirmAllPlanProps> = (props) => {
    // const [originalRowData, setOriginalRowData] = createSignal<RowData[]>(
    //     (() => {
    //       const savedData = localStorage.getItem('tableData');
    //       return savedData
    //         ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) as RowData[]
    //         : ([] as RowData[]);
    //     })()
    //   );
  //   const [originalRowData, setOriginalRowData] = createSignal<RowData[]>(
  //     (() => {
  //         const savedData = localStorage.getItem('tableData');
  //         const entry_ts = props.date; // Ambil nilai timestamp dari props

  //         return savedData
  //             ? JSON.parse(savedData).map((row, index) => ({
  //                 ...row,
  //                 // uniqueId: index,
  //                 entry_ts, // Tambahkan properti timestamp ke setiap objek
  //             })) as RowData[]
  //             : ([] as RowData[]);
  //     })()
  // );

  const navigate = useNavigate();

  const [originalRowData, setOriginalRowData] = createSignal<RowData[]>(
    (() => {
      const savedData = localStorage.getItem('tableData');
      const entry_ts = props.date; // Ambil nilai timestamp dari props
      const status = "Waiting";
      const pengajuan_id = 0;

      return savedData
        ? JSON.parse(savedData).map((row) => ({
            ...row,
            // uniqueId: index,
            entry_ts,
            status,
            pengajuan_id
          })) as RowData[]
        : ([] as RowData[]);
    })()
  );
  
  // Fungsi untuk mengonversi originalRowData ke NewRowData
  function convertRowData(originalRowData): NewRowData | null {
    const uniquePengajuan: Record<string, NewRowData> = {};
  
    originalRowData.forEach((rowData) => {
      const key = `${rowData.entry_ts}_${rowData.tipepengajuan}`;
  
      if (!uniquePengajuan[key]) {
        uniquePengajuan[key] = {
          pengajuan: {
            id: rowData.id,
            entry_ts: rowData.entry_ts,
            tipepengajuan: rowData.tipepengajuan,
            status: rowData.status,
            namapengajuan: rowData.namapengajuan,
            total: 0,
          },
          details: [],
        };
      }
  
      uniquePengajuan[key].details.push({
        id: 0,
        pengajuan_id: rowData.pengajuan_id,
        keterangan: rowData.keterangan,
        kebutuhan: rowData.kebutuhan,
        coa_kd: rowData.coa_kd,
        quantity: rowData.quantity,
        uom: rowData.uom,
        price: rowData.price,
        total: 0,
        namapengajuan: rowData.namapengajuan,
      });
  
      // Update the total in the pengajuan object
      // uniquePengajuan[key].pengajuan.total += rowData.total;
    });
  
    const result = Object.values(uniquePengajuan);
    return result.length > 0 ? result[0] : null;
  }
  
  
  
  // Contoh penggunaan dalam konversi data
  const newStructuredData = convertRowData(originalRowData());
  
  console.log("struktur1", newStructuredData)

  



    const [gridApi, setGridApi] = createSignal(null);
    const [aggregatedRowData, setAggregatedRowData] = createSignal<AggregatedRowData[]>([]);

    const onGridReady = (params: any) => {
        setGridApi(() => params.api);
      };


      const calculateAggregates = (data: RowData[]): AggregatedRowData[] => {
        const aggregatedData: { [key: string]: AggregatedRowData } = {};
      
        // Loop through each item in the data
        data.forEach((row) => {
          const keterangan = row.keterangan;
      
          // Check if keterangan already exists in aggregatedData
          if (!aggregatedData[keterangan]) {
            aggregatedData[keterangan] = {
              keterangan,
              total: 0,
            };
          }
      
          // Add value to the total
          aggregatedData[keterangan].total += row.total; // Adjust according to the relevant property
        });
      
        // Convert the aggregate object to an array
        const result = Object.values(aggregatedData);
        return result;
      };

      const transformDataForGrid = (data: AggregatedRowData[]): any[] => {
        // Mengonversi AggregatedRowData ke format yang diharapkan oleh AgGridSolid
        return data.map((row) => ({
          keterangan: row.keterangan,
          total: row.total,
        }));
      };
      
    //   const updatedRowData = calculateAggregates(originalRowData());
    //     setAggregatedRowData(() => updatedRowData);
    const updatedRowData = calculateAggregates(originalRowData());
    setAggregatedRowData(() => updatedRowData);

    // Mengonversi data agar sesuai dengan format AgGridSolid
    const rowDataForGrid = transformDataForGrid(aggregatedRowData());
    
    const gridOptions = {
      domLayout: 'autoHeight' as 'autoHeight',            
      columnDefs: [
            { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
            { field: "keterangan", width: 350},
            { field: "total", headerName:"Total", width: 97},
        ],
        
    };

    console.log("tes", transformDataForGrid(aggregatedRowData()))
    console.log("data all monthly ke BE, ", originalRowData());

    console.log("struktur baru", newStructuredData)


    const sendDataToBackend = async () => {
      console.log("data all monthly ke BE, ", originalRowData());
      console.log("struktur baru", newStructuredData)

      try {
        const response = await fetch('/api/monthlypengajuan/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStructuredData),
        });
    
        if (response.ok) {
          alert('Data berhasil dikirim ke backend');
          console.log('Data berhasil dikirim ke backend');
          props.OnClose();
          navigate('/pengajuan/pengajuan_dashboard')
          localStorage.removeItem('tableData');
          localStorage.removeItem('tableKetMonth');
          localStorage.removeItem('namaPengajuanMonthly');
        } else {
            const errorMessage = await response.text();
            alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
            console.error('Gagal mengubah data:', errorMessage);
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Tambahkan penanganan kesalahan jika diperlukan
      }
    };
    

    return (
        <div class="overlay">


        <div class="confirm-allplan-m">
         
          <div class="monthly-plan-confirmation">
              <form method="dialog">
                  <div class="head-acc" style={{"text-transform":"capitalize"}}>
                      <h2>Apa anda yakin ingin submit data di bawah ini?</h2>
                      <button onClick={props.OnClose}>✕</button>
                  </div>
                  <div class="form-pengajuan">
                      <div>
                          <h1>{getNamaPengajuanMonthly()}</h1>
                          <h2>No : 058/FIN.BC/PDO/VI/2023</h2>
                          <p>{props.date}</p>
                          {/* <p>Aggregated Description: {updatedRowData[updatedRowData.length - 1].aggregatedDescription}</p> */}
                      </div>
                      <div class="ag-theme-alpine z-0" style={{ height: "auto", width: "80vh", margin:"auto"}}>
                          <AgGridSolid 
                              gridOptions={gridOptions} 
                              onGridReady={onGridReady} 
                              rowData={rowDataForGrid} 
                          />
                      </div>
                      <div class="sum-total" style={{display:"flex", "flex-direction":"row", "justify-content":"space-between"}}>
                        <p>TOTAL ESTIMASI</p> <p>{props.sumtotal}</p>
                      </div>
                      </div>

                      <br />
                      <div>
                        <div>
                          <button class="btn-save-edit" onClick={sendDataToBackend}>
                            <Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" />
                          </button>
                        </div>
                      </div>
              </form>
          </div>
        </div>
        </div>
    );
};


export default ConfirmAllPlan;