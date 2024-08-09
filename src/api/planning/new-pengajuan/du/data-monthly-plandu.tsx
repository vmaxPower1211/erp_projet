import { dataIdMonthlyDK } from "../../../../store/Pengajuan/pengajuan-id";

export type resultdata = {
  "pengajuan_id": number,
  "keterangan": string,
  "kebutuhan": string,
  "quantity": number,
  "uom": string,
  "coa_kd": string,
  "price": number,
  "total": number,
  "unit": string,
  "notes": string,
  "reference": string,
  "namapengajuan": String,
  "approved": string
}
  
  export async function DataDetailMonthlyDK(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/monthlypengajuan/${dataIdMonthlyDK()}`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents, "TESTT detail");
    return documents.slice(0, documents.length).map(({ pengajuan_id, keterangan, kebutuhan, quantity, uom, price, total, unit, notes, reference, namapengajuan, coa_kd, approved}) => ({
      pengajuan_id, keterangan, kebutuhan, quantity, uom, price, total, unit, notes, reference, namapengajuan, coa_kd, approved
    }));
  }
