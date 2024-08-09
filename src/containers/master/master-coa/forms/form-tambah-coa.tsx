import { createSignal, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form-tambah-coa.css'

interface FormTambahCOAProps {
    OnClose: () => void;
}

const FormTambahCOA: Component<FormTambahCOAProps> = (props) => {

    const [formData, setFormData] = createSignal({
        id: 0,
        coa_kd: '',
        coa_name: '',
        category: '',
        balance: 0,
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData().coa_kd || !formData().coa_name || !formData().category) {
            alert('Mohon isi semua kolom yang dibutuhkan.');
            return; // Menghentikan pengiriman jika ada input yang kosong
          }
    
        const response = await fetch('/api/coa/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData()),
        });
    
        if (response.ok) {
          console.log('Data berhasil diinput'); // Tampilkan pesan sukses
          alert('Data berhasil ditambah');
          window.location.href='/master/mastercoa';
          window.location.reload();
          props.OnClose()
          setFormData({
            id: 0,
            coa_kd: '',
            coa_name: '',
            category: '',
            balance: 0,
          });
        } else {
            const errorMessage = await response.text();
            alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
            console.error('Gagal mengubah data:', errorMessage);
        }
      };

    return (

        <div class="overlay">
        <div class="form-coa">
 
                <div class="modal-form-coa">
                    <form method="dialog">
                        <div class="headrencana">
                            <h2>Tambah COA Master <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isian-form">
                         
                            <p>
                                <label>Kode Akun*</label>
                                <br />
                                <input type="text" required 
                                value={formData().coa_kd} 
                                onInput={(e) => setFormData({ ...formData(), coa_kd: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Nama COA*</label>
                                <br />
                                <input type="text" required
                                value={formData().coa_name} 
                                onInput={(e) => setFormData({ ...formData(), coa_name: e.target.value })} 
                                />
                            </p>

                            <p>
                                <label>Kategori*</label>
                                <br />
                                <input type="text" required 
                                value={formData().category} 
                                onInput={(e) => setFormData({ ...formData(), category: e.target.value })}
                                />
                            </p>
                
                        </div>

                        <br />
                        <div class="btn-kirim">
                            <button onClick={handleSubmit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};


export default FormTambahCOA;