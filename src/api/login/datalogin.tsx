
export type resultpengeluaran = {
    "account_id": number,
    "username": string,
    "password": string
}


export async function datalogin(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `http://192.168.100.210:8080/login/query/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultpengeluaran[];
    console.log(documents);
    return documents.slice(0, 10).map(({ account_id, username, password  }) => ({
        account_id, username, password
      }));
  }