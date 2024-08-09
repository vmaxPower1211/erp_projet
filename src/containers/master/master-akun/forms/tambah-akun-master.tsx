import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount, createEffect } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tambah-akun-master.css'
import { options } from './data_coa';

interface TambahAkunMasterProps {
    OnClose: () => void;
}

interface Option {
    value: string;
    label: string
}

interface SelectedOption {
    value?: string;
    label?: string;
}


const TambahAkunMaster: Component<TambahAkunMasterProps> = (props) => {

    const [formData, setFormData] = createSignal({
        id: 0,
        account_name: '',
        email: '',
        access: '',
        role: [],
        username: '',
        password: ''
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData().email || !formData().access || !formData().role) {
            alert('Mohon isi semua kolom yang dibutuhkan.');
            return; // Menghentikan pengiriman jika ada input yang kosong
        }

        try {

            const DataAccount = {
                id: 0,
                account_name: formData().account_name,
                email: formData().email,
                access: formData().access,
                role: formData().role,
                username: formData().username,
                password: formData().password,
                coa_kd: selectedOption()?.value,
                coa_name: selectedOption()?.label
            };

            console.log("Insert: ", DataAccount);

            const response = await fetch('/api/account/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DataAccount),
            });



            if (response.ok) {
                console.log('Data berhasil diinput');
                alert('Data berhasil ditambah');
                window.location.href = '/master/masterakun';
                window.location.reload();
                props.OnClose();
                setFormData({
                    id: 0,
                    account_name: '',
                    email: '',
                    access: '',
                    role: [],
                    username: '',
                    password: ''
                });
            } else {
                const errorMessage = await response.text();
                alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
                console.error('Gagal mengubah data:', errorMessage);
            }
        } catch (error) {
            console.error('Gagal mengirim permintaan:', error);
        }

    };



    //fungsi untuk dropdown posisi
    const [selectedItems, setSelectedItems] = createSignal<string[]>([]);
    const [isDropdownOpen, setDropdownOpen] = createSignal(false);

    const toggleDropdown = () => {
        setDropdownOpen(isDropdownOpen());
    };

    onMount(() => {
        const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];

        const updateSelectedItems = () => {
            const selectedItemsText = checkboxes
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);
            setSelectedItems(selectedItemsText);
        };

        //   const closeDropdown = () => {
        //     setDropdownOpen(false);
        //   };

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", updateSelectedItems);
        });

        onCleanup(() => {
            checkboxes.forEach((checkbox) => {
                checkbox.removeEventListener("change", updateSelectedItems);
            });
        });

        // Initial update
        updateSelectedItems();

        // Handle closing dropdown when clicking outside
        //   document.addEventListener("click", (event) => {
        //     const target = event.target as HTMLElement; // Cast 'event.target' to HTMLElement
        //     if (!target.closest || !target.closest(".multiselect-container")) {
        //       closeDropdown();
        //     }
        //   });
    });

    // const toggleDropdown = () => {
    //   setDropdownOpen(!isDropdownOpen());
    // };


    // fungsi untuk drop down search COA
    const [inputValue, setInputValue] = createSignal('');
    const [filteredOptions, setFilteredOptions] = createSignal<Option[]>(options());
    const [showDropdown, setShowDropdown] = createSignal(false);
    const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>(null);

    createEffect(() => {
        const inputValueLowerCase = inputValue().toLowerCase();
        const filtered = options().filter((option) => option.label.toLowerCase().includes(inputValueLowerCase) || option.value.toLowerCase().includes(inputValueLowerCase));
        setFilteredOptions(filtered);
    });

    createEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target && !target.closest('.dropdown-container')) {
                setShowDropdown(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        onCleanup(() => {
            window.removeEventListener('click', handleClickOutside);
        });
    });

    const handleInput = (e: Event) => {
        const label = (e.target as HTMLInputElement).value;
        console.log("?", label)
        setInputValue(label);

        const selectedOption = options().find((option) => option.value === label);

        if (selectedOption) {
            setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
        } else {
            setSelectedOption(null);
        }

        setShowDropdown(true);
    };


    const handleOptionSelect = (selectedOption: Option) => {
        // setInputValue(selectedOption.label);
        setInputValue(`${selectedOption.value} ${selectedOption.label}`);
        setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
        setShowDropdown(false);
    };


    return (
        <div class="overlay">

            <div class="tambah-acc-master">
                {/* <div class="btn-tambah-akun">
                <button onClick={() => (document.getElementById('form_modal_1') as HTMLDialogElement).showModal()}><Icon icon="fa:plus" color="white" width="10" height="11" /></button>
            </div> */}

                <div class="tambah-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Tambah Akun <span>(*)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <p>
                                <label>Username*</label>
                                <br />
                                <input type="text" required
                                    value={formData().username}
                                    onInput={(e) => setFormData({ ...formData(), username: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Nama*</label>
                                <br />
                                <input type="text" required
                                    value={formData().account_name}
                                    onInput={(e) => setFormData({ ...formData(), account_name: e.target.value })}
                                />
                            </p>

                            <div>
                                <label>COA</label>
                                <br />
                                <div>
                                    <input
                                        type="text"
                                        value={inputValue()}
                                        onInput={handleInput}
                                        // onKeyDown={handleKeyDown}
                                        class="custom-dropdown-coa"
                                    />
                                    {showDropdown() && (
                                        <div class="dropdown-options-coa">
                                            <div class="options-list">
                                                {filteredOptions().map((option) => (
                                                    <div onClick={() => handleOptionSelect(option)} class="option-label">{option.value} {option.label}</div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {/* <div>Selected Value: {selectedOption() ? selectedOption().value : 'None'}</div> */}
                                    {/* <div>Selected Value: {selectedOption()?.value || 'None'}</div> */}
                                </div>
                            </div>

                            <p>
                                <label>Email*</label>
                                <br />
                                <input type="text" required
                                    value={formData().email}
                                    onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
                                />
                            </p>

                            <div class="options">
                                <p>
                                    <label>Access*</label>
                                    <br />
                                    <select id="access" name="access" required
                                        value={formData().access}
                                        onChange={(e) => setFormData({ ...formData(), access: e.target.value })}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="direktur_keuangan">Direktur Keuangan</option>
                                        <option value="direktur_utama">Direktur Utama</option>
                                    </select>
                                </p>


                                {/* <div style={{ display: 'flex', "flex-direction": "column" }}>
                                    <label>Posisi*</label>
                                    <div>
                                        <button class="drop-posisi" onChange={toggleDropdown}> {selectedItems().length > 0 ? selectedItems().join(", ") : "Pilih posisi"}</button>
                                        <div class="dropdown-content" >
                                            <div class="posisi-opsi">
                                                <label for="customer">Customer</label>
                                                <input type="checkbox" id="customer" value="Customer" />
                                            </div>

                                            <div class="posisi-opsi">
                                                <label for="supplier">Supplier</label>
                                                <input type="checkbox" id="supplier" value="Supplier" />
                                            </div>

                                            <div class="posisi-opsi">
                                                <label for="employee">Employee</label>
                                                <input type="checkbox" id="employee" value="Employee" />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div style={{ display: 'flex', "flex-direction": "column" }}>

                                    <label>Posisi*</label>
                                    <div class="dropdown dropdown-bottom">
                                        <label tabindex="0" class="drop-posisi">
                                            {selectedItems().length > 0 ? selectedItems().join(", ") : ""}
                                        </label>
                                        <ul tabindex="0" class="dropdown-content z-[1] 2 shadow bg-base-100 rounded-box w-44">
                                            <li class="posisi-opsi">
                                                <label >
                                                    <a style={{ display: 'flex' }}>
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
                                                        <p style={{ "margin-left": '20px' }}>Customer</p>
                                                    </a>
                                                </label>
                                            </li>
                                            <li class="posisi-opsi">
                                                <label>
                                                    <a style={{ display: 'flex' }}>
                                                        <input type="checkbox" value="supplier"
                                                            checked={selectedItems().includes("supplier")}
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
                                                        <p style={{ "margin-left": '20px' }}>Supplier</p>
                                                    </a>
                                                </label>
                                            </li>
                                            <li class="posisi-opsi">
                                                <label >
                                                    <a style={{ display: 'flex' }}>
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
                                                        <p style={{ "margin-left": '20px' }}>Employee</p>
                                                    </a>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>

                            <p>
                                <label>Password*</label>
                                <br />
                                <input type="text" required
                                    value={formData().password}
                                    onInput={(e) => setFormData({ ...formData(), password: e.target.value })}
                                />
                            </p>

                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button onClick={handleFormSubmit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default TambahAkunMaster;