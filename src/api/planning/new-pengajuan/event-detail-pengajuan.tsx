import { dataIdEvent } from "../../../store/Pengajuan/pengajuan-id";

export type resultdata = {
  "id": number,
  "pengajuan_id": number,
  "keterangan": string,
  "kebutuhan": string,
  "quantity": number,
  "uom": string,
  "price": number,
  "total": number,
  "unit": string,
  "notes": string,
  "reference": string,
  "namapengajuan": String,
  "coa_kd": String
}
  
  export async function DataDetailEvent(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/eventpengajuan/${dataIdEvent()}`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents, "TESTT");
    return documents.slice(0, documents.length).map(({ id, pengajuan_id, keterangan, kebutuhan, quantity, uom, price, total, unit, notes, reference, namapengajuan, coa_kd}) => ({
      id, pengajuan_id, keterangan, kebutuhan, quantity, uom, price, total, unit, notes, reference, namapengajuan, coa_kd
    }));
  }
