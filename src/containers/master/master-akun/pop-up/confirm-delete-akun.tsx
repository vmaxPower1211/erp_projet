import type { Component } from 'solid-js';
import './confirm-delete-akun.css'

interface ConfirmDeleteAkunProps {
    OnClose: () => void;
    dataId: number;
}

const ConfirmDeleteAkun: Component<ConfirmDeleteAkunProps> = (props) => {
  

    const handleDelete = async () => {
      const response = await fetch(`/api/account/${props.dataId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Data berhasil dihapus');
        alert('Data berhasil dihapus');
        window.location.reload();
        props.OnClose();
      } else {
        const errorMessage = await response.text();
        alert(`Gagal menghapus data. Pesan kesalahan: ${errorMessage}`);
        console.error('Gagal menghapus data:', errorMessage);
      }
    };

   return (
    <div class="overlay">
      <div class="confirm-delete-acc">
          <div class="confirm-card">
              <div>
                  Apa anda yakin mau menghapus data?
              </div>
              <div style={{display:'flex', width:'25vh', "justify-content":"space-between", margin:'auto'}}>
                  <button onClick={handleDelete}>Ya</button>
                  <button class="tidak" onClick={props.OnClose}>Tidak</button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAkun;
