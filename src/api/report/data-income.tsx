
export type resultdata = {
    "id": number,
    "pengajuan_id": number,
    "income_ts" : string,
    "entry_by": number,
    "amount": number,
    "nomor_faktur": string,
    "coa_kd": string,
    "keterangan": string,
    "evidence": string
}


export async function DataIncome (query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/income/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ id, pengajuan_id, income_ts, amount, nomor_faktur, coa_kd, keterangan, evidence }) => ({
        id, pengajuan_id, income_ts, amount, nomor_faktur, coa_kd, keterangan, evidence
      }));
  }