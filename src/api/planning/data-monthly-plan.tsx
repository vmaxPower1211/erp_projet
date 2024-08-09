export type resultplanning = {
    "price": number,
    "total": number,
    "entry_ts": string,
    "quantity": number,
    "tipepengajuan": string,
    "kebutuhan": string,
    "uom": string,
    "coa_kd": string,
    "id": number,
    "keterangan": string
  }
  
  
  export async function DataMonthlyPlanning(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/monthlypengajuan/`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultplanning[];
    console.log(documents, "test");
    return documents.slice(0, documents.length).map(({ price, total, entry_ts, quantity, tipepengajuan, kebutuhan, uom,coa_kd, id, keterangan}) => ({
      price, total, entry_ts, quantity, tipepengajuan, kebutuhan, uom,coa_kd, id, keterangan
    }));
  }