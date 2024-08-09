
export type resultdata = {
    "id" : string,
    "journal_ts": string,
    "expense_id": number,
    "income_id": number,
    "faktur_ts": string,
    "keterangan": string
}


export async function DataJournal (query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/journal/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ id, journal_ts, expense_id, income_id, faktur_ts, keterangan }) => ({
        id, journal_ts, expense_id, income_id, faktur_ts, keterangan
      }));
  }