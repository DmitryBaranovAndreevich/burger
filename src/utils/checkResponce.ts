export interface IOptions {
 readonly method: string;
 readonly headers: {
    "Content-Type": string;
    Authorization?: string;
  };
 readonly body?: string;
}

export function checkResponce(res: Response) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}
