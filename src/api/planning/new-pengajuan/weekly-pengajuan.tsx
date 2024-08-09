export type resultdata = {
    "id": number,
    "entry_ts": Date,
    "namapengajuan": string,
    "tipepengajuan": string,
    "total": number,
    "coa_kd": string,
    "status": string,
  }
  
  
  export async function DataWeeklyPengajuan(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/weeklypengajuan/`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents, "test");
    return documents.slice(0, documents.length).map(({ id, entry_ts, namapengajuan, tipepengajuan, total, coa_kd, status}) => ({
      id, entry_ts, namapengajuan, tipepengajuan, total, coa_kd, status
    }));
  }