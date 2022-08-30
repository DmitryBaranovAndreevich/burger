interface ITypeResponce<P> {
  ok: boolean;
  json() : Promise<P>;
  status: number;
} 

export interface IOptions {
   method : string;
   headers: {
    'Content-Type': string;
    Authorization? : string;
   }
   body?: string
}


export function checkResponce<P> (res : ITypeResponce<P>) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}
