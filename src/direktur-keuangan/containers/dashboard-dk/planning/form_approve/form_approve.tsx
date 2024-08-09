import { onCleanup, type Component, createSignal } from 'solid-js';
import './form_approve.css';
import { Icon } from '@iconify-icon/solid';

interface EditPopUpProps {
    OnClose: () => void;
    data: {
        id: number,
        entry_ts: string,
        description: string,
        planningtype: string,
        category: number,
        amount: number,
        coa_kd: string,
        // Tambahkan properti lain yang sesuai
    };
    // updateStatusButton: (data: object, status: string) => void;
}

const Form_approve: Component<EditPopUpProps> = (props) => {

    const [status, setStatus] = createSignal('');
    const [timestamp, setTimestamp] = createSignal('');


    const handleInputChange = (e) => {
        const { value } = e.target;
        setStatus(value);
        if (value === 'InProgress' || value === 'Rejected') {
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

    const categoryValueMap = {
        "Marketing": 1,
        "Project": 2,
        "Rutinitas": 3,
        "Event": 4
    };

    // Fungsi bantuan untuk mendapatkan nilai dari category string
    function getCategoryValue(category) {
        return categoryValueMap[category] || 0; // Nilai default jika tidak ada pemetaan
    }

    // Menggunakan fungsi getCategoryValue untuk mendapatkan nilai
    const category = props.data.category;
    const categoryValue = getCategoryValue(category);


    const updateStatus = async () => {
        const updateStatusToSend = {
            id: props.data.id,
            entry_ts: timestamp(),
            coa_kd: props.data.coa_kd,
            description: props.data.description,
            planningtype: props.data.planningtype,
            category: categoryValue,
            amount: props.data.amount,
            status: status()
        }
        console.log("test", updateStatusToSend);

        try {
            const response = await fetch(`/api/planning/${(props.data.id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: props.data.id,
                    entry_ts: timestamp(),
                    coa_kd: props.data.coa_kd,
                    description: props.data.description,
                    planningtype: props.data.planningtype,
                    category: categoryValue,
                    amount: props.data.amount,
                    status: status()
                }),
            });

            if (response.ok) {
                // Data berhasil diubah, tampilkan alert
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
                            <h2>Draft Pengajuan</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <label>Tanggal</label>
                            <br />
                            <input type="text" value={props.data.entry_ts} readonly />


                            <p>
                                <label>Keterangan</label>
                                <br />
                                <textarea class="textarea textarea-bordered"
                                    style={{
                                        "background": '#F8F8F9',
                                        "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                        "width": "78vh", "height": "12vh", margin: 'auto'
                                    }}
                                    value={props.data.description}
                                    readonly
                                >
                                </textarea>
                            </p>

                            <div style={{ "display": "flex", "justify-content": "space-between", "padding-right": "10px" }}>
                                <div>
                                    <label>Kategori</label>
                                    <br />
                                    <input type="text"
                                        value={props.data.planningtype}
                                        readonly style={{ "width": "13rem" }} />
                                </div>

                                <div>
                                    <label>Jenis</label>
                                    <br />
                                    <input type="text"
                                        value={props.data.category}
                                        readonly style={{ "width": "13rem" }} />
                                </div>

                            </div>

                            <p>
                                <label>Jumlah</label>
                                <br />
                                <input type="number"
                                    value={props.data.amount}
                                    readonly />
                            </p>

                            <p>
                                <label>Tag*</label>
                                <br />
                                <input type="text" readonly />
                            </p>

                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button value='InProgress' style={{
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

export default Form_approve;
