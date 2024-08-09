
export type resultpengeluaran = {
    "id": number,
    "coa_kd": string,
    "coa_name": string,
    "category": string,
    "balance": number
}


export async function datacoamaster(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/coa/`, {mode: 'no-cors'}
    );
    // http://localhost:8001
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultpengeluaran[];
    console.log(documents);

    return documents.slice(0, documents.length).map(({ id, coa_kd, coa_name, category, balance  }) => ({
        id, coa_kd, coa_name, category, balance
      }));
  }