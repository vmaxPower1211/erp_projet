import { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tutup_buku.css';

interface rencana_props {
    class?: string;
}

const Tutup_buku: Component<rencana_props> = (props) => {
    const closeModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        modal.close();
    };

    return (
        <div class={props.class}>
            <div class="btn-tutup-buku">
                <button class="btn" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()} style={{"font-size":"12px", "height":"1rem"}}>+ Tutup Buku</button>
            </div>

            <dialog id="my_modal_3" class="modal" >
                <div class="modal-box">
                    <form method="dialog">
                        <div class="btn-x">
                            <h2>Membuat Tutup Buku<span> (*Tidak boleh kosong)</span></h2>
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                        </div>

                        <div class="isian-form">
                            <br />
                            <p>
                                <label>Membuat Jadwal Tanggal untuk Tutup Buku*</label>
                                <br />
                                <input type="date" required placeholder='h' />
                            </p>

                            <div class="warning-box">
                                <Icon icon="jam:alert" color="black" width="24" height="24" />
                                <p>
                                    Setelah kirim, perubahan di dalam form tidak bisa hapus atau edit
                                </p>
                            </div>

                            <br />
                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Tutup_buku;
