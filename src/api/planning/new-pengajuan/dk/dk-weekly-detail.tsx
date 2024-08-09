import { dataIdWeeklyDK } from "../../../../store/Pengajuan/pengajuan-id";

export type resultdata = {
  "pengajuan_id": number,
  "keterangan": string,
  "kebutuhan": string,
  "reference": string,
  "namapengajuan": String,
  "total": number,
  "coa_kd": string,
}
  
  export async function DataDetailWeeklyDK(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/weeklypengajuan/${dataIdWeeklyDK()}`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents, "TESTT");
    return documents.slice(0, documents.length).map(({ pengajuan_id, keterangan, kebutuhan, namapengajuan, total, coa_kd}) => ({
      pengajuan_id, keterangan, kebutuhan, namapengajuan, total, coa_kd
    }));
  }
