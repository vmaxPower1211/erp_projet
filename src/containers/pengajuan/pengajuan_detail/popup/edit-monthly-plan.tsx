import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-monthly-plan.css';

interface EditMonthlyPlanProps {
    OnClose: () => void;
    data: {
        pengajuan_id: number,
        namapengajuan: string,
        keterangan: string,
        kebutuhan: string,
        coa_kd: string,
        quantity: number,
        uom: string,
        price: number,
        total: number
    }
}

const EditMonthlyPlan: Component<EditMonthlyPlanProps> = (props) => {

    const [id, setId] = createSignal(props.data.pengajuan_id);
    const [namaPengajuan, setNamaPengajuan] = createSignal(props.data.namapengajuan);
    const [keterangan, setKeterangan] = createSignal(props.data.keterangan);
    const [kebutuhan, setKebutuhan] = createSignal(props.data.kebutuhan);
    const [coaKd, setCoaKd] = createSignal(props.data.coa_kd);
    const [quantity, setQuantity] = createSignal(props.data.quantity);
    const [uom, setUom] = createSignal(props.data.uom);
    const [price, setPrice] = createSignal(props.data.price);
    const [total, setTotal] = createSignal(props.data.total);

    console.log("tes", id())

    const SendDataEdit = async () => {
        const dataToSend = {
            pengajuan_id: id(),
            namapengajuan: namaPengajuan(),
            keterangan: keterangan(),
            kebutuhan: kebutuhan(),
            coa_kd: coaKd(),
            quantity: quantity(),
            uom: uom(),
            price: price(),
            total: price() * quantity(),
        }

        console.log("edited", dataToSend)

        try {
            const response = await fetch (`/api/monthlypengajuan/detail/${id()}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                alert('Data berhasil diubah!')
            } else {
                const errorMessage = await response.text();
                alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
                console.error('Gagal mengubah data:', errorMessage);            }
        } catch (error) {
            console.log('Gagal: ', error)
        }
    };

    return (
        <div class="overlay">
            <div class="edit-event-plan">
                <div class="form-edit">
                    <form method="dialog">
                        <div class="head-acc">
                            <h2>Edit Data Pengajuan {namaPengajuan()}</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="form-pengajuan">
                            <p>
                                <label>Keterangan*</label>
                                <br />
                                <input
                                    type="text"
                                    name="Keterangan"
                                    value={keterangan()}
                                    // onInput={(e) => setKeterangan(e.currentTarget.value)}
                                    readonly
                                />
                            </p>

                            <p>
                                <label>Kebutuhan*</label>
                                <br />
                                <input
                                    type="text"
                                    name="kebutuhan"
                                    value={kebutuhan()}
                                    onInput={(e) => setKebutuhan(e.currentTarget.value)}
                                />
                            </p>

                            <p>
                                <label>COA*</label>
                                <br />
                                <input
                                    type="text"
                                    name="coaKd"
                                    value={coaKd()}
                                    onInput={(e) => setCoaKd(e.currentTarget.value)}
                                />
                            </p>

                        <div style={{display:"flex", "flex-direction":"row","justify-content":"space-between", width:"29rem"}}>
                            <div>
                                <label>Qty*</label>
                                <br />
                                <input style={{width:"33vh"}}
                                    type="number"
                                    name="quantity"
                                    value={quantity()}
                                    onInput={(e) => setQuantity(parseFloat(e.currentTarget.value))}
                                />
                            </div>

                            <div>
                                <label>UoM*</label>
                                <br />
                                <input style={{width:"33vh"}}
                                    type="text"
                                    name="uom"
                                    value={uom()}
                                    onInput={(e) => setUom(e.currentTarget.value)}
                                />
                            </div>
                        </div>


                            <p>
                                <label>Price*</label>
                                <br />
                                <input
                                    type="number"
                                    name="price"
                                    value={price()}
                                    onInput={(e) => setPrice(parseFloat(e.currentTarget.value))}
                                />
                            </p>
                        </div>

                        <br />
                        <div class="btn-save-edit">
                            <button onClick={SendDataEdit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMonthlyPlan;
