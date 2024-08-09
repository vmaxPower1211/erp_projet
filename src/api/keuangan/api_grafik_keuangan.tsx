export type resultkeuangan = {
    "Bulan": string,
    "profitloss": number,
    "journal": number,
    "balance": number
}


export async function api_grafik_keuangan(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    

    const response = await fetch(
        'http://localhost:3000/json/keuangan/keuangan.json'
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultkeuangan[];
    console.log(documents);
    return documents.slice(0, 10).map(({ Bulan, profitloss, journal, balance }) => ({
        Bulan, profitloss, journal, balance
      }));
  }