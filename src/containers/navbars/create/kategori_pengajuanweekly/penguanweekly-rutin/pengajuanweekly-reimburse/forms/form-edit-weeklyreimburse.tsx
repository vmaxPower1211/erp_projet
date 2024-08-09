import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form-edit-weeklyreimburse.css'

interface FormEditReimburseProps {
    OnClose: () => void; // Tambahkan properti balance
}

const FormEditReimburse: Component<FormEditReimburseProps> = (props) => {

    // const [formData, setFormData] = createSignal({
    //     coa_kd: '',
    //     coa_name: '',
    //     category: ''
    // });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };
   // const { dataId } = props;

    const [keterangan, setKeterangan] = createSignal('');
    const [kebutuhan, setKebutuhan] = createSignal('');
    const [coa_kd, setCoaKd] = createSignal('');
    const [price, setPrice] = createSignal('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'keterangan') {
            setKeterangan(value);
        } else if (name === 'kebutuhan') {
            setKebutuhan(value);
        } else if (name === 'kodeCOA') {
            setCoaKd(value);
        } else if (name === 'price') {
            setPrice(value);
        }
    };

    const saveChanges = async () => {
        try {
            const dataToSend = {
                keterangan: keterangan(),
                kebutuhan: kebutuhan(),
                coa_kd: coa_kd(),
                price: price(),
               // price: props.price,
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


        <div class="data-edit">
         
                <div class="form-edit">
                    <form method="dialog">
                        <div class="akunhead">
                            <h2>Edit Weekly Reimburse</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="form-1">
                            <p>
                                <label>Keterangan *</label>
                                <br />
                                <input
                                type="text"
                                name="keterangan" // Ganti cd_account dengan kodeAkun
                                value={keterangan()}
                                onChange={handleInputChange}
                                />

                            </p>

                            <p>
                                <label>Kebutuhan*</label>
                                <br />
                                <input
                                type="text"
                                name="kebutuhan" // Ganti cd_account dengan kodeAkun
                                value={kebutuhan()}
                                onChange={handleInputChange}
                                />

                            </p>

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
                                <label>Price *</label>
                                <br />
                                <input
                                type="text"
                                name="price" // Ganti cd_account dengan kodeAkun
                                value={price()}
                                onChange={handleInputChange}
                                />
                            </p>

                
                        </div>

                        <br />
                        <div class="btn-edit-reimburse">
                            <button onClick={saveChanges}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};


export default FormEditReimburse;