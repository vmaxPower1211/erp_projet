import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form_transfer.css';

interface EditPopUpProps {
    OnClose: () => void;
    id?: number;
    evidence?: string;
}

const Form_transferAdmin: Component<EditPopUpProps> = (props) => {

    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
    const [imageUrl, setImageUrl] = createSignal<string | null>(null);
    const [evidence, setEvidence] = createSignal<string | null>(null);

    const fetchData = async () => {

        try {
            const response = await fetch(`/api/pengajuan/${props.evidence}`); // Update the API endpoint with the correct ID
            const result = await response.json();
            console.log("ini result", result);
            return result.evidence; // Adjust this based on your API response structure
        } catch (error) {
            console.error('Error fetching evidence data:', error);
            return error;
        }
    };


    onMount(async () => {
        const evidenceData = await fetchData(); // Call your function to fetch evidence data
        console.log('ini bisa', evidenceData);
        setEvidence(evidenceData);
    });




    return (
        <div class="overlay">
            <div class="form-transfer-container">
                <div class="transfer-form">
                    <div class="form">
                        <div class="headakun">
                            <h2>Bukti Transfer</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="input-form-transfer">
                            <div>
                                <label>Bukti*</label>
                                <div class="container-bukti" style={{ "display": "flex", "justify-content": "center", "align-items": "center" }}>
                                    {evidence() !== null ? (
                                        <img src={`/api/pengajuan/${props.evidence}`} alt="Selected Image" />
                                    ) : (
                                        <span>No evidence available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Form_transferAdmin;


