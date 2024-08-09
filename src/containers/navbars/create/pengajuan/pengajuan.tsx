import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './pengajuan.css'

interface TambahPengajuan {
    OnClose: () => void;
}

const Pengajuan: Component<TambahPengajuan> = (props) => {

    const [formData, setFormData] = createSignal({
        id: 0,
        entry_ts: '',
        category: 0,
        planningtype: '',
        description: '',
        amount: 0,
        confirm: null,
        coa_kd: ''
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData().entry_ts || !formData().category || !formData().planningtype) {
            alert('Mohon isi semua kolom yang dibutuhkan.');
            return; // Menghentikan pengiriman jika ada input yang kosong
        }

        try {
            const formattedDate = `${formData().entry_ts}T00:00:00`;

            const DataPengajuan = {
                id: 0,
                entry_ts: formattedDate,
                category: formData().category,
                planningtype: formData().planningtype,
                description: formData().description,
                amount: formData().amount,
                status: 'Waiting',
                confirm: null,
                coa_kd: formData().coa_kd
            };

            console.log("Insert Data Planning: ", DataPengajuan);

            const response = await fetch('/api/planning/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DataPengajuan),
            });



            if (response.ok) {
                console.log('Data berhasil diinput');
                alert('Data berhasil ditambah');
                window.location.href = '/dashboard/plannings/planning';
                window.location.reload();
                props.OnClose();
                setFormData({
                    id: 0,
                    entry_ts: '',
                    category: 0,
                    planningtype: '',
                    description: '',
                    amount: 0,
                    status: 'Waiting',
                    confirm: null,
                    coa_kd: ''
                });
            } else {
                const errorMessage = await response.text();
                alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
                console.error('Gagal mengubah data:', errorMessage);
            }
        } catch (error) {
            console.error('Gagal mengirim permintaan:', error);
        }

    };

    return (
        <div class="overlay">
            <div class="pengajuan-data">
                <div class="pengajuan-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Form Pengajuan </h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-pengajuan">

                            <div style={{ "display": "flex", "justify-content": "space-between" }}>
                                <div>
                                    <label>Tanggal*</label>
                                    <br />
                                    <input type="date" name="entry_ts"
                                        style={{ "border-radius": '5px', height: '3vw' }}
                                        value={formData().entry_ts}
                                        onInput={(e) => setFormData({ ...formData(), entry_ts: e.target.value })}
                                        class="input input-bordered bg-primary-content input-ghost input-xs w-full max-w-xs" />
                                    {/* <span class="iconify bg-primary-content" data-icon="mdi:clipboard-text-clock-outline"></span>
                                    </input> */}
                                    {/* <input type="date" name="trip-start" /> */}
                                </div>

                                <div>
                                    <label>COA*</label>
                                    <br />
                                    <input
                                        type="text"
                                        class="input input-bordered"
                                        name="coa_kd" // Ganti cd_account dengan kodeAkun
                                        value={formData().coa_kd}
                                        onInput={(e) => setFormData({ ...formData(), coa_kd: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label>Keterangan*</label>
                                <br />
                                <textarea class="textarea textarea-bordered"
                                    style={{
                                        "background": '#F8F8F9',
                                        "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                        "width": "78vh", margin: 'auto'
                                    }}
                                    name="description"
                                    value={formData().description}
                                    onInput={(e) => setFormData({ ...formData(), description: e.target.value })}
                                >
                                </textarea>
                            </div>

                            <div style={{ "display": "flex", "justify-content": "space-between" }}>
                                <div>
                                    <label>Kategori*</label>
                                    <br />
                                    <select
                                        name="planning_type"
                                        value={formData().planningtype}
                                        onInput={(e) => setFormData({ ...formData(), planningtype: e.target.value })}
                                    >
                                        <option disabled selected></option>
                                        <option value="Event">Event</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        {/* <option>Etc</option> */}
                                    </select>
                                </div>


                                <div>
                                    <label>Jenis*</label>
                                    <br />
                                    <select
                                        name="category"
                                        value={formData().category.toString()} // Konversi ke string karena tipe data dari `category` adalah number
                                        onInput={(e) => setFormData({ ...formData(), category: parseInt(e.target.value, 10) })} // Konversi ke angka
                                    >
                                        <option disabled selected></option>
                                        <option value="1">Marketing</option>
                                        <option value="2">Project</option>
                                        <option value="3">Rutinitas</option>
                                        <option value="4">Event</option>
                                        <option value="5">DLL</option>
                                    </select>
                                </div>
                            </div>

                            <div >
                                <label>Jumlah*</label>
                                <br />
                                <input
                                    class="input input-bordered"
                                    style={{ "width": "32rem" }}
                                    type="number"
                                    name="amount" // Ganti cd_account dengan kodeAkun
                                    value={formData().amount.toString()} // Konversi ke string karena tipe data dari `amount` adalah number
                                    onInput={(e) => setFormData({ ...formData(), amount: parseFloat(e.target.value) })} // Konversi ke angka dengan parseFloat
                                />
                            </div>


                            {/* <div>
                                <label>Tag</label>
                                <br />
                                <select
                                    style={{ "width": "32rem" }}
                                    name="status"
                                    // value={formData().status}
                                    onInput={(e) => setFormData({ ...formData(), status: e.target.value })}>
                                    <option disabled selected></option>
                                    <option value="VIP">VIP</option>
                                    <option value="Priority">Priority</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Hold">Hold</option>
                                    <option value="Todo">To Do</option>
                                    <option value="WIP">Work In Progress</option>
                                </select>
                            </div> */}



                        </div>

                        <br />
                        <div class="btn-edit-coa">
                            <button onClick={handleFormSubmit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};



export default Pengajuan;



