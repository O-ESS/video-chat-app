const endPoint = "https://prod-in2.100ms.live/hmsapi/omar.app.100ms.live/";


export default async function GetToken( role) {
    const response = await fetch(`${endPoint}api/token`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: `${Date.now()}`, 
        role: role, 
        room_id: "63e6395fda7e7ca812840c47"
      }),
    });
  
    const { token } = await response.json();
  
    return token;
  }