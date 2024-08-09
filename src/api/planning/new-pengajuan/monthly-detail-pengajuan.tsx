import { dataIdMonthly } from "../../../store/Pengajuan/pengajuan-id";

export type resultMonthlyDetail = {
  "id": number,
  "pengajuan_id": number,
  "keterangan": string,
  "kebutuhan": string,
  "quantity": number,
  "uom": string,
  "coa_kd": string,
  "price": number,
  "total": number,
  "unit": string,
  "namapengajuan": String,
  "approved": string
}
  
  export async function DataDetailMonthly(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/monthlypengajuan/${dataIdMonthly()}`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultMonthlyDetail[];
    console.log(documents, "TESTT detail");
    return documents.slice(0, documents.length).map(({ id, pengajuan_id, keterangan, kebutuhan, quantity, uom, price, total, unit, namapengajuan, coa_kd, approved}) => ({
      id, pengajuan_id, keterangan, kebutuhan, quantity, uom, price, total, unit, namapengajuan, coa_kd, approved
    }));
  }
