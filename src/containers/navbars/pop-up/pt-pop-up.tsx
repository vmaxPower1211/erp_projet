import { onMount, type Component, onCleanup } from 'solid-js';
import './pt-pop-up.css'

interface PT_PopUpProps {
    isOpen: boolean;
    onClose: () => void;
  }

const PT_PopUp: Component<PT_PopUpProps> = (props) => {
  return (
    <div>
        <div class={`pt-pop-up ${props.isOpen ? "opened" : "closed"}`}>
            <button>PT. astra A</button>
            <button>PT. astra A</button>
            <button>PT. astra A</button>
            <button>PT. astra A</button>
            <button>PT. astra A</button>
            <button>PT. astra A</button>
            <button>PT. astra A</button>
            <button>PT. astra A</button>
        </div>
    </div>
  );
};

export default PT_PopUp;
