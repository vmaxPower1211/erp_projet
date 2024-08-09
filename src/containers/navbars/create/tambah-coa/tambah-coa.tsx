import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tambah-coa.css'
interface TambahCoaProps {
    OnClose: () => void;

}

const TambahCoaCreate: Component<TambahCoaProps> = (props) => {

    const [coa_kd, setCoaKd] = createSignal('');
    const [coa_name, setCoaName] = createSignal('');
    const [category, setCategory] = createSignal('');

    // Mengatur nilai id saat baris di tabel diklik atau data dimuat dari backend

    // Kemudian, Anda dapat mengakses nilai id seperti ini:

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'kodeCOA') {
            setCoaKd(value);
        } else if (name === 'namaCOA') {
            setCoaName(value);
        } else if (name === 'kategori') {
            setCategory(value);
        }
    };

    const saveChanges = async () => {
        try {
            const dataToSend = {
                coa_kd: coa_kd(),
                coa_name: coa_name(),
                category: category(),
            };
    
            const response = await fetch(`/api/coa/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) {
                // Data berhasil diubah, tampilkan alert
                alert('Data berhasil diubah');
                props.OnClose();
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
    
    

    // onMount(async () => {
    //     try {
    //         const response = await fetch('/api/coa', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setFormData(data);
    //         } else {
    //             console.error('Gagal mengambil data yang akan diedit');
    //         }
    //     } catch (error) {
    //         console.error('Terjadi kesalahan:', error);
    //     }
    // });

    return (
        <div class="overlay">


        <div class="tambah-coa-data">
         
                <div class="tambah-coa-form">
                    <form method="dialog">
                        <div class="headakun">
                        <h2>Tambah COA <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-tambah-coa">
                         
                            <p>
                                <label>Kode COA*</label>
                                <br />
                                <input
                                type="text"
                                name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                value={coa_kd()}
                                onChange={handleInputChange}
                                />

                            </p>

                            <p>
                                <label>Nama COA*</label>
                                <br />
                                <input
                                type="text"
                                name="namaCOA" // Ganti cd_account dengan kodeAkun
                                value={coa_name()}
                                onChange={handleInputChange}
                                />
                            </p>

                            <p>
                                <label>Kategori*</label>
                                <br />
                                <input
                                type="text"
                                name="kategori" // Ganti cd_account dengan kodeAkun
                                value={category()}
                                onChange={handleInputChange}
                                />
                            </p>
                
                        </div>

                        <br />
                        <div class="btn-edit-coa">
                            <button onClick={saveChanges}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};


export default TambahCoaCreate;



