
export type resultpengeluaran = {
    "id": number,
    "account_name": string,
    "email": string,
    "access": string,
    "role": string,
    "username": string,
    "password": string,
    "coa_name": string,
    "coa_kd": string
}


export async function dataaccountmaster(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/account/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultpengeluaran[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ id, account_name, email, access, role, username, password, coa_name, coa_kd }) => ({
        id, account_name, email, access, role, username, password, coa_name, coa_kd
      }));
  }