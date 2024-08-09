import { dataIdWeekly } from "../../../store/Pengajuan/pengajuan-id";

export type resultdata = {
  "id": number,
  "pengajuan_id": number,
  "keterangan": string,
  "kebutuhan": string,
  "reference": string,
  "namapengajuan": String,
  "total": number,
  "coa_kd": string,
}
  
  export async function DataDetailWeekly(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/weeklypengajuan/${dataIdWeekly()}`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents, "TESTT");
    return documents.slice(0, documents.length).map(({ id, pengajuan_id, keterangan, kebutuhan, namapengajuan, total, coa_kd}) => ({
      id, pengajuan_id, keterangan, kebutuhan, namapengajuan, total, coa_kd
    }));
  }
