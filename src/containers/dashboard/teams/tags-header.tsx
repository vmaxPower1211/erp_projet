// CustomHeader.js
import { createSignal } from 'solid-js';

function TagsHeader(props) {
  const [selectAll, setSelectAll] = createSignal(false);

  const onSelectAll = () => {
    setSelectAll(!selectAll());
    // Tambahkan logika ketika checkbox "Select All" di klik di sini
  };

  return (
    <div class="custom-header">
      <label>
        <input type="checkbox" checked={selectAll()} onClick={onSelectAll} />
        Select All
      </label>
    </div>
  );
}

export default TagsHeader;
