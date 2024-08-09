
export type resultdata = {
    "date" : string,
    "coa": string,
    "keterangan": string,
    "income": string,
    "expense": string,
    "balance": number,
}


export async function DataBigCash (query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/bigcash/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ date, coa, keterangan, income, expense, balance }) => ({
        date, coa, keterangan, income, expense, balance
      }));
  }