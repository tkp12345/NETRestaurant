export default class httpRequest{
    constructor(baseURL , authController){
        this.baseURL = baseURL;
        this.authController = authController;
    }
//http 요청 설정
async fetch(url, options) {
    console.log('http 요청정보 url,options', url,options)
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }
    console.log('data:',data)
    return data;
  }
}
