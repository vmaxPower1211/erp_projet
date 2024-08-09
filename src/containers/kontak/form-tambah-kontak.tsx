import { createSignal, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form-tambah-kontak.css'

interface FormTambahKontakProps {
    OnClose: () => void;
}

const FormTambahKontak: Component<FormTambahKontakProps> = (props) => {

    const [formData, setFormData] = createSignal({
        nama: '',
        nama_perusahaan: '',
        alamat: '',
        email: '',
        no_hp: '',
        npwp: '',
        saldo: 0
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData().nama || !formData().nama_perusahaan || !formData().email) {
            alert('Mohon isi semua kolom yang dibutuhkan.');
            return; // Menghentikan pengiriman jika ada input yang kosong
          }

        console.log("data kontak: ",formData())
    
        const response = await fetch('/api/contact/', {
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
            nama: '',
            nama_perusahaan: '',
            alamat: '',
            email: '',
            no_hp: '',
            npwp: '',
            saldo: 0
          });
        } else {
            const errorMessage = await response.text();
            alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
            console.error('Gagal mengubah data:', errorMessage);
        }
      };

    return (

        <div class="overlay">
        <div class="tambah-kontak">
 
                <div class="modal-tambah-kontak">
                    <form method="dialog">
                        <div class="headrencana">
                            <h2>Tambah COA Master <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isian-form">
                         
                            <p>
                                <label>Nama*</label>
                                <br />
                                <input type="text" required 
                                value={formData().nama} 
                                onInput={(e) => setFormData({ ...formData(), nama: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Nama Perusahaan*</label>
                                <br />
                                <input type="text" required
                                value={formData().nama_perusahaan} 
                                onInput={(e) => setFormData({ ...formData(), nama_perusahaan: e.target.value })} 
                                />
                            </p>

                            <p>
                                <label>Alamat*</label>
                                <br />
                                <input type="text" required 
                                value={formData().alamat} 
                                onInput={(e) => setFormData({ ...formData(), alamat: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Email*</label>
                                <br />
                                <input type="text" required 
                                value={formData().email} 
                                onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>No HP*</label>
                                <br />
                                <input type="text" required 
                                value={formData().no_hp} 
                                onInput={(e) => setFormData({ ...formData(), no_hp: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>NPWP*</label>
                                <br />
                                <input type="text" required 
                                value={formData().npwp} 
                                onInput={(e) => setFormData({ ...formData(), npwp: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Saldo*</label>
                                <br />
                                <input type="number" required 
                                 value={formData().saldo !== 0 ? formData().saldo.toString() : ''} // Render an empty string for 0 value
                                 onInput={(e) => {
                                     const newSaldo = parseFloat(e.target.value);
                                     if (!isNaN(newSaldo)) {
                                         setFormData({ ...formData(), saldo: newSaldo });
                                     } else {
                                         // Handle invalid input here (e.g., show an error message)
                                     }
                                 }}
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

export default FormTambahKontak;
