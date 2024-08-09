import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { Icon } from '@iconify-icon/solid';
import Form_approve from '../form_approve/form_approve';
import { dataplanning } from '../../../../../api/planning/dataplanning';
import Formapprove_dk from '../formapprove_data/formapprove_dk';

const TableDetailPlan: Component = () => {
  const [RowData, setRowData] = createSignal([]);
  const [popUpOpen, setPopUpOpen] = createSignal(false);
  const [popupData, setPopupData] = createSignal(null);

  onMount(async () => {
    const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
    console.log("dataplanning", data_planning);
    setRowData(data_planning);
  }
  )

  const handlePopUpApproved = (data) => {
    if (data.status === 'Waiting') {
      setPopupData(data);
      setPopUpOpen(true);
    }
  };

  const ClosePopUp = () => {
    setPopUpOpen(false);
  };

  const confirmCellRenderer = (params: { data: any }) => {
    let check = null;

    if (params.data.status === 'InProgress') {
      check = <Icon icon="ic:round-square" class="icon-disabled" width="21" height="21" />;
    } else if (params.data.status === 'Approved') {
      check = <button class="btn-approved" onClick={handlePopUpApproved}><Icon icon="icomoon-free:checkbox-checked" color="#7bc582" width="16.1" height="16.1" /></button>;
    } else if (params.data.status === 'Rejected') {
      check = <Icon icon="mdi:close-box" class="icon-rejected" width="21.5" height="21.5" />;
    } else if (params.data.status === 'Waiting') {
      check = <Icon icon="ic:round-square" class="icon-disabled" width="21" height="21" />;
    }

    return check;
  };

  const columnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'entry_ts', headerName: 'Tanggal' },
    { field: 'coa_kd', headerName: 'COA' },
    { field: 'description', headerName: 'Keterangan' },
    { field: 'planningtype', headerName: 'Kategori' },
    { field: 'category', headerName: 'Jenis' },
    { field: 'amount', headerName: 'Jumlah' },
    { field: 'status', headerName: 'Status' },
    { field: 'confirm', headerName: 'Konfirmasi', cellRenderer: confirmCellRenderer }

  ];

  const defaultColDef = {
    flex: 1,
    sortable: true,
  }

  const gridOptions = {
    // domLayout: 'autoHeight' as DomLayoutType,
    pagination: true,
    paginationPageSize: 4,
    rowHeight: 40
  }



  return (
    <div>
      <div class="ag-theme-alpine" style={{ width: '140vh', height: '21vw' }}>
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={RowData()}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          onRowClicked={(event) => handlePopUpApproved(event.data)}
        />
        {/* {popUpOpen() && <Formapprove_dk data={popupData()} OnClose={ClosePopUp} />} */}
      </div>
    </div>
  );
};

export default TableDetailPlan;
