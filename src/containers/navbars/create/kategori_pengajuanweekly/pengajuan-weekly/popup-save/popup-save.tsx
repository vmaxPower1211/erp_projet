import type { Component } from 'solid-js';
import './popup-save.css'

interface ConfirmPopUpWeeklyProps {
    OnClose: () => void;
   // dataId: number;
}

const ConfirmPopUpWeekly: Component<ConfirmPopUpWeeklyProps> = (props) => {
  

    const handleSave = async () => {
      const response = await fetch(`/api/coa/${props}`, {
        method: 'SAVE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Data berhasil disimpan');
        alert('Data berhasil disimpan');
        window.location.reload();
        props.OnClose();
        
      } else {
        const errorMessage = await response.text();
        alert(`Gagal menyimpan data. Pesan kesalahan: ${errorMessage}`);
        console.error('Gagal menyimpan data:', errorMessage);
      }
    };

   return (
    <div class="overlay">
      <div class="konfirmasi-simpan">
          <div class="konfirmasi-card-simpan">
              <div>
                  Apa anda yakin mau menyimpan data?
              </div>
              <div style={{display:'flex', width:'25vh', "justify-content":"space-between", margin:'auto'}}>
                  <button onClick={handleSave}>Ya</button>
                  <button class="tidak" onClick={props.OnClose}>Tidak</button>
              </div>
          </div>
      </div>
    </div>

  );
};

export default ConfirmPopUpWeekly;
