import type { Component } from 'solid-js';
import './bar-time.css'
import { Icon } from '@iconify-icon/solid';
// DivDetail.tsx
import { createSignal } from 'solid-js';

interface DivDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

function BarTime(props: DivDetailProps) {
  const [isVisible, setIsVisible] = createSignal(props.isOpen);

  const handleClose = () => {
    setIsVisible(false);
    props.onClose();
  };

  return (
    <>
      {isVisible() && (
        <div class="time-tracking">
          <div class="card-bar">
            <div style={{ "margin-right": '1vw' }}>
              <progress class="progress progress-success w-60 h-7" value="100" max="100"></progress>
              <div style={{ "font-weight": '600' }}>Transmit Request/Planning</div>
              <div style={{ "font-weight": '600' }}>For Approval</div>
            </div>
            <div>
              <progress class="progress progress-success w-60 h-7" value="100" max="100"></progress>
              <div style={{ "font-weight": '600' }}>Approval By</div>
              <div style={{ "font-weight": '600' }}>Direktur Keuangan</div>
            </div>
            <div style={{ "margin-left": '1vw' }}>
              <progress class="progress progress-success w-60 h-7" value="0" max="100"></progress>
              <div style={{ "font-weight": '600' }}>Approval By</div>
              <div style={{ "font-weight": '600' }}>Direktur Utama</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BarTime;
