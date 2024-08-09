
export type resultdata = {
    "journal_id" : string,
    "coa_id": string,
    "debit": number,
    "credit": string,
    "info": string,
    "balance": number,
    "keterangan": string,
    "faktur_ts": string
}


export async function DataJournalDetail (query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/journal_detail/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ journal_id, coa_id, debit, credit, info, balance, keterangan, faktur_ts }) => ({
        journal_id, coa_id, debit, credit, info, balance, keterangan, faktur_ts
      }));
  }