
export type resultdata = {
    "nama" : string,
    "nama_perusahaan": string,
    "alamat": string,
    "email": string,
    "no_hp": string,
    "npwp": string,
    "saldo": number
}


export async function datacontact(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/contact/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ nama, nama_perusahaan, alamat, email, no_hp, npwp, saldo }) => ({
        nama, nama_perusahaan, alamat, email, no_hp, npwp, saldo
      }));
  }