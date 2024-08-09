import type { Component } from 'solid-js';
import './confirmpopup.css'

interface ConfirmPopUpWeeklyInsenProps {
    OnClose: () => void;
   // dataId: number;
}

const ConfirmPopUpWeeklyInsen: Component<ConfirmPopUpWeeklyInsenProps> = (props) => {
  

    const handleDelete = async () => {
      const response = await fetch(`/api/coa/${props}`, {
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
      <div class="konfirmasi-delete">
          <div class="konfirmasi-card">
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

export default ConfirmPopUpWeeklyInsen;
