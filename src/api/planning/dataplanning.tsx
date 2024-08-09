export type resultplanning = {
  "id": number,
  "entry_ts": Date,
  "category": number,
  "planningtype": string, // kategori
  "description": string, // keterangan
  "amount": number,
  "status": string,
  "confirm": boolean,
  // "coa_kd": string
}


export async function dataplanning(query: string) {
  if (query.trim() === "") return [];
  // /?q=${encodeURI(query)}


  const response = await fetch(
    `/api/planning/`
  );

  const results = await response.json();
  // console.log("response ", results)
  const documents = results as resultplanning[];
  console.log(documents, "test");
  return documents.slice(0, documents.length).map(({ id, entry_ts, category, planningtype, description, amount, status, confirm}) => ({
    id, entry_ts, category, planningtype, description, amount, status, confirm
  }));
}