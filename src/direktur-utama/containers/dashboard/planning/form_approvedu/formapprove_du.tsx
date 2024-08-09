import { onCleanup, type Component, createSignal } from 'solid-js';
import './formapprove_du.css';
import { Icon } from '@iconify-icon/solid';

interface EditPopUpProps {
    OnClose: () => void;
    params: {
        // status: any;
        id: number,
        entry_ts: string,
        namapengajuan: string,
        alasan: string,
        planningtype: string,
        tipepengajuan: string,
        total: number,
        // coa_kd: string,
        // Tambahkan properti lain yang sesuai
    };
    // updateStatusButton:a (data: object, status: string) => void;
}

const Formapprove_du: Component<EditPopUpProps> = (props) => {
    
    const [status, setStatus] = createSignal('');
    const [timestamp, setTimestamp] = createSignal('');
    const [alasan, setAlasan] = createSignal('');


    const handleInputChange = (e) => {
        const { value } = e.target;
        setStatus(value)
        if (value === 'Approved' || value === 'Rejected') {
            // Menggunakan timestamp saat ini dalam format ISO 8601

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 11);

            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;

            const timestamp = `${formattedDate}${formattedTime}`;

            console.log("tanggal dan waktu: ", timestamp);
            setTimestamp(timestamp);
        }

        updateStatus();
    };
    console.log("ini apa", props.params.namapengajuan)

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
    

    // const categoryValueMap = {
    //     "Marketing": 1,
    //     "Project": 2,
    //     "Rutinitas": 3,
    //     "Event": 4
    // };

    // // Fungsi bantuan untuk mendapatkan nilai dari category string
    // function getCategoryValue(category) {
    //     return categoryValueMap[category] || 0; // Nilai default jika tidak ada pemetaan
    // }

    // // Menggunakan fungsi getCategoryValue untuk mendapatkan nilai
    // const category = props.data.category;
    // const categoryValue = getCategoryValue(category);

    console.log("coba aja", alasan())

    const updateStatus = async () => {
        const updateStatusToSend = {
            id: props.params.id,
            entry_ts: timestamp(),
            alasan: props.params.alasan,
            // coa_kd: props.params.coa_kd,
            //namapengajuan: props.params.namapengajuan,
            planningtype: props.params.planningtype,
            tipepengajuan: props.params.tipepengajuan,
           // category: categoryValue,
            total: props.params.total,
            status: (props.params.planningtype === 'Event' || 'Monthly') ? 'inProgress' : 'Approved',
        }

        const updatePengajuan = new FormData();
        updatePengajuan.append('id', props.params.id.toString());
        updatePengajuan.append('entry_ts', timestamp().toString());
        updatePengajuan.append('namapengajuan', props.params.namapengajuan.toString());
        updatePengajuan.append('tipepengajuan', props.params.tipepengajuan.toString());
        updatePengajuan.append('total', props.params.total.toString());
        updatePengajuan.append('status', status());
        // updatePengajuan.append('status', status().toString());
        updatePengajuan.append('alasan', alasan());
        
        console.log("test", updateStatusToSend);

        try {
            const response = await fetch(`/api/pengajuan/${(props.params.id)}`, {
                method: 'PUT',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: updatePengajuan,
            });

            // const response2 = await fetch(`/api/approval/`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(dataToSend),
            // });

            if (response.ok) {
                // params berhasil diubah, tampilkan alert
                alert('Data berhasil diubah');
                props.OnClose();
                window.location.reload();
            } else {
                // Gagal mengubah data, tampilkan pesan kesalahan dari respons
                const errorMessage = await response.text();
                alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
                console.error('Gagal mengubah data:', errorMessage);
            }
        } catch (error) {
            // Terjadi kesalahan jaringan atau kesalahan lainnya, tampilkan alert dengan pesan kesalahan
            alert('Terjadi kesalahan. Silakan coba lagi.');
            console.error('Terjadi kesalahan:', error);
        }
    };



    return (
        <div class="overlay">
            <div class="form-confirm">
                <div class="modal-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Pengajuan Direktur Utama</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <label>Tanggal</label>
                            <br />
                            <input type="text" value={props.params.entry_ts} readonly />
                            
                            <br />
                            <label>Nama Pengajuan</label>
                            <br />
                            <input type="text" value={props.params.namapengajuan} readonly />

                            <p>
                                
                                <label>Alasan</label>
                                <br />
                                <textarea class="textarea textarea-bordered"
                                    style={{
                                        "background": '#F8F8F9',
                                        "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                        "width": "78vh", "height": "12vh", margin: 'auto'
                                    }}
                                    
                                    value={alasan()}
                                    onInput={(e) => setAlasan(e.currentTarget.value)}
                                    
                                >
                                </textarea>
                            </p>

                            <div style={{ "display": "flex", "justify-content": "space-between", "padding-right": "10px"}}>
                                <div>
                                    <label>Kategori</label>
                                    <br />
                                    <input type="text"
                                        value={props.params.tipepengajuan}
                                        readonly style={{ "width": "13rem" }} />
                                </div>
                    

                                <p>
                                    <label>Jumlah</label>
                                    <br />
                                    <input
                                        type="text"
                                        value={formatRupiah(props.params.total)}
                                        readOnly
                                        style={{ "width": "13rem" }}
                                    />
                                </p>

                            {/* <p>
                                <label>Tag*</label>
                                <br />
                                <input type="text" readonly />
                            </p> */}

                        </div>
                        </div>

                        <br />
                        <br />
                        <div class="btn-add-acc">
                            <button value='Approved' style={{
                                "background-color": "rgba(132, 103, 255, 0.80)",
                                "border-radius": "5px",
                                "width": "7rem",
                                "height": "2rem",
                                "margin-right": "30px"
                            }} onClick={handleInputChange}>Approved</button>
                            <button value='Rejected' style={{
                                "background-color": "#F56D59",
                                "border-radius": "5px",
                                "width": "7rem",
                                "height": "2rem"
                            }} onClick={handleInputChange}>Rejected</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Formapprove_du;
