export type resultdata = {
    "id": number,
    "kas_ts": Date,
    "dari": string,
    "kepada": string,
    "biaya": number,
    "keterangan": string,
    "status": string,
  }
  
  
  export async function DataArusKas(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/aruskas/`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents, "test");
    return documents.slice(0, documents.length).map(({ id, kas_ts, dari, kepada, biaya, keterangan, status}) => ({
      id, kas_ts, dari, kepada, biaya, keterangan, status
    }));
  }