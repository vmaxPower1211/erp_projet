// import type { Component } from 'solid-js';
// import { Icon } from '@iconify-icon/solid';
// import './form-planning.css';

// interface EditPopUpProps {
//     OnClose: () => void;
// }
// const FormPlanning: Component<EditPopUpProps> = (props) => {

//     return (
//         <div class="form-plan">
//             {/* <div class="btn-tambah-rencana">
//                 <button onClick={() => (document.getElementById('form_modal_1') as HTMLDialogElement).showModal()}><Icon icon="fa:plus" color="white" width="10" height="11" /></button>
//             </div> */}

//             <dialog id="form_modal_1" class="modal">
//                 <div class="modal-form">
//                     <form method="dialog">
//                         <div class="headrencana">
//                             <h2>Tambah Rencana <span>(*Tidak boleh kosong)</span></h2>
//                             <button onClick={props.OnClose}>✕</button>
//                         </div>

//                         <div class="isian-form">

//                             <p>
//                                 <label>Tanggal*</label>
//                                 <br />
//                                 <input type="date" required />
//                             </p>

                         
//                             <div class="deskripsi">
//                                 <p>
//                                     <label>Keterangan*</label>
//                                     <br />
//                                     <textarea name="deskripsi" id="" cols="60" rows="3" class="border-1 border-radius-4"></textarea>
//                                 </p>
//                             </div>

//                             <div class="bt-periode">
//                                 <p>
//                                     <label for="kategori">Kategori*</label>
//                                     <br />
//                                     <select id="kategori" name="kategori" required>
//                                         <option value="trip">Marketing</option>
//                                         <option value="meeting">Projek</option>
//                                         <option value="requisite">Rutinitas</option>
//                                         <option value="meeting">Event</option>
//                                         <option value="requisite">DLL</option>
//                                     </select>
//                                 </p>

//                                 <br />
//                                 <p>
//                                     <label for="jenis">Jenis*</label>
//                                     <br />
//                                     <select id="jenis" name="jenis" required>
//                                         <option value="weekly">Weekly</option>
//                                         <option value="monthly">Monthly</option>
//                                         <option value="yearly">Yearly</option>
//                                     </select>
//                                 </p>

//                             </div>

//                             <p>
//                                 <label>Jumlah*</label>
//                                 <br />
//                                 <input type="number" name="harga" id="harga" min="0" step="1" required />
//                             </p>

                
//                         </div>

//                         <br />
//                         <div class="btn-kirim">
//                             <button><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
//                         </div>
//                     </form>
//                 </div>
//             </dialog>
//         </div>
//     );
// };


// export default FormPlanning;