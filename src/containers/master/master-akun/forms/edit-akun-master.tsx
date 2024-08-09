import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-akun-master.css'

interface EditAkunMasterProps {
    OnClose: () => void;
    dataId: number;
    account_name: string;
    role: string[],
    username: string;
    password: string;
}

const EditAkunMaster: Component<EditAkunMasterProps> = (props) => {

    // const { dataId } = props;


    // const [id, setId] = createSignal(dataId); // Inisialisasi dengan nilai default
    const [formData, setFormData] = createSignal({
        email: '',
        access: '',
        category: ''
    });


    const saveChanges = async () => {
        try {
            const dataToSend = {
                id: props.dataId,
                account_name: props.account_name,
                email: formData().email,
                access: formData().access,
                role: props.role,
                username: props.username,
                password: props.password
            };

            console.log(dataToSend);
    
            const response = await fetch(`/api/account/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) {
                // Data berhasil diubah, tampilkan alert
                alert('Data berhasil diubah');
                window.location.reload();
                props.OnClose();
            } else {
                // Gagal mengubah data, tampilkan pesan kesalahan dari respons
                const errorMessage = await response.text();
                alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
                console.error('Gagal mengubah data:', errorMessage);
            }
        } catch (error) {
            // Terjadi kesalahan jaringan atau kesalahan lainnya, tampilkan alert dengan pesan kesalahan
            alert('Terjadi kesalahan. Silakan coba lagi.');
            console.error('Terjadi kesalahan:', error);
        }
    };

    const [selectedItems, setSelectedItems] = createSignal<string[]>([]);


    onMount(() => {
        const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];

        const updateSelectedItems = () => {
            const selectedItemsText = checkboxes
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);
            setSelectedItems(selectedItemsText);
        };

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", updateSelectedItems);
        });

        onCleanup(() => {
            checkboxes.forEach((checkbox) => {
                checkbox.removeEventListener("change", updateSelectedItems);
            });
        });

        updateSelectedItems();

    });

    return (
        <div class="overlay">
            <div class="edit-acc-master">
                <div class="edit-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Edit Akun <span>(*Required)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">
      
                            <p>
                                <label>Email*</label>
                                <br />
                                <input type="text"  
                                value={formData().email}
                                onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Access*</label>
                                <br />
                                    <select id="access" name="access" 
                                    value={formData().access}
                                    onChange={(e) => setFormData({ ...formData(), access: e.target.value })}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="direktur_keuangan">Direktur Keuangan</option>
                                        <option value="direktur_utama">Direktur Utama</option>
                                    </select>  
                            </p>
                            
                            {/* <div class="edit-options">
                            <div style={{ display: 'flex', "flex-direction": "column" }}>
                            <label>Posisi*</label>
                                <div class="dropdown dropdown-bottom">
                                    <label tabindex="0" class="drop-posisi">
                                        {selectedItems().length > 0 ? selectedItems().join(", ") : ""}
                                    </label>
                                    <ul tabindex="0" class="dropdown-content z-[1] 2 shadow bg-base-100 rounded-box w-44">
                                        <li class="posisi-opsi">
                                            <label >
                                                <a style={{display: 'flex'}}>
                                                    <input type="checkbox" value="customer" 
                                                    checked={selectedItems().includes("customer")}
                                                    onChange={(e) => {
                                                        setSelectedItems((prevSelectedItems) => {
                                                            if (e.target.checked) {
                                                                return [...prevSelectedItems, "customer"];
                                                            } else {
                                                                return prevSelectedItems.filter(role => role !== "customer");
                                                            }
                                                        });
                                                
                                                        // Perbarui formData
                                                        setFormData((prevFormData) => {
                                                            return {
                                                                ...prevFormData,
                                                                role: selectedItems(),
                                                            };
                                                        });
                                                    }}
                                                    /> 
                                                    <p style={{"margin-left": '20px'}}>Customer</p>
                                                </a>
                                            </label>
                                        </li>
                                        <li class="posisi-opsi">
                                            <label>
                                                <a style={{display: 'flex'}}>
                                                    <input type="checkbox" value="supplier" 
                                                    onChange={(e) => {
                                                        setSelectedItems((prevSelectedItems) => {
                                                            if (e.target.checked) {
                                                                return [...prevSelectedItems, "supplier"];
                                                            } else {
                                                                return prevSelectedItems.filter(role => role !== "supplier");
                                                            }
                                                        });
                                                
                                                        // Perbarui formData
                                                        setFormData((prevFormData) => {
                                                            return {
                                                                ...prevFormData,
                                                                role: selectedItems(),
                                                            };
                                                        });
                                                    }}
                                                    /> 
                                                    <p style={{"margin-left": '20px'}}>Supplier</p>
                                                </a>
                                            </label>
                                        </li>
                                        <li class="posisi-opsi">
                                            <label >
                                                <a style={{display: 'flex'}}>
                                                    <input type="checkbox" value="employee" 
                                                    checked={selectedItems().includes("employee")}
                                                    onChange={(e) => {
                                                        setSelectedItems((prevSelectedItems) => {
                                                            if (e.target.checked) {
                                                                return [...prevSelectedItems, "employee"];
                                                            } else {
                                                                return prevSelectedItems.filter(role => role !== "employee");
                                                            }
                                                        });
                                                
                                                        // Perbarui formData
                                                        setFormData((prevFormData) => {
                                                            return {
                                                                ...prevFormData,
                                                                role: selectedItems(),
                                                            };
                                                        });
                                                    }}
                                                    /> 
                                                    <p style={{"margin-left": '20px'}}>Employee</p>
                                                </a>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div> */}

        
                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button onClick={saveChanges}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};


export default EditAkunMaster;