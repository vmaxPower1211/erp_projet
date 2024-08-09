
import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-event-details.css'

interface EditEventDetailsProps {
    OnClose: () => void;
    // dataId: number;
    // balance: number; // Tambahkan properti balance

}

const EditEventDetails: Component<EditEventDetailsProps> = (props) => {

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === 'kodeCOA') {
    //         setCoaKd(value);
    //     } else if (name === 'namaCOA') {
    //         setCoaName(value);
    //     } else if (name === 'kategori') {
    //         setCategory(value);
    //     }
    // };

    // const saveChanges = async () => {
    //     try {
    //         const dataToSend = {
    //             id: idValue,
    //             coa_kd: coa_kd(),
    //             coa_name: coa_name(),
    //             category: category(),
    //             balance: props.balance,
    //         };
    
    //         const response = await fetch(`/api/coa/update`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dataToSend),
    //         });
    
    //         if (response.ok) {
    //             // Data berhasil diubah, tampilkan alert
    //             alert('Data berhasil diubah');
    //             props.OnClose();
    //         } else {
    //             // Gagal mengubah data, tampilkan pesan kesalahan dari respons
    //             const errorMessage = await response.text();
    //             alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
    //             console.error('Gagal mengubah data:', errorMessage);
    //         }
    //     } catch (error) {
    //         // Terjadi kesalahan jaringan atau kesalahan lainnya, tampilkan alert dengan pesan kesalahan
    //         alert('Terjadi kesalahan. Silakan coba lagi.');
    //         console.error('Terjadi kesalahan:', error);
    //     }
    // };
    
    

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


        <div class="edit-event-details">
         
                <div class="form-edit-details">
                    <form method="dialog">
                        <div class="head-details">
                            <h2>Edit Data Pengajuan</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="form-pengajuan-details">
                         
                            <p>
                                <label>Kebutuhan*</label>
                                <br />
                                <input
                                type="text"
                                name="namaCOA"
                                />
                            </p>

                            <p>
                                <label>COA*</label>
                                <br />
                                <input
                                type="text"
                                name="kodeCOA" 
                                />
                            </p>

                            <p>
                                <label>Qty*</label>
                                <br />
                                <input
                                type="number"
                                name="kodeCOA" 
                                />
                            </p>

                            <p>
                                <label>Unit*</label>
                                <br />
                                <input
                                type="number"
                                name="kodeCOA" 
                                />
                            </p>

                            <p>
                                <label>Price*</label>
                                <br />
                                <input
                                type="number"
                                name="kodeCOA" 
                                />
                            </p>
                
                        </div>

                        <br />
                        <div class="btn-save-edit-evdetails">
                            <button ><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};


export default EditEventDetails;