import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-akun-teams.css'

interface FormEditTeams {
    OnClose: () => void;
}

const FormEditAkunTeams: Component<FormEditTeams> = (props) => {

    const [formData, setFormData] = createSignal({
        username: '',
        email: '',
        access: '',
        category: '',
        password: '',
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
    

    return (
        <div class="edit-data">
         
                <div class="edit-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Edit Akun <span>(*Required)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <p>
                                <label>ID*</label>
                                <br />
                                <input type="text" required />
                            </p>

                         
                            <p>
                                <label>Kode Akun*</label>
                                <br />
                                <input type="text" required />
                            </p>

                            <p>
                                <label>Nama COA*</label>
                                <br />
                                <input type="text" required />
                            </p>

                            <p>
                                <label>Kategori*</label>
                                <br />
                                <input type="text" required />
                            </p>
                
                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
    );
};


export default FormEditAkunTeams;