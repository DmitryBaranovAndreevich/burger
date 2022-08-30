interface ITypeResponce<P> {
 readonly ok: boolean;
  json(): Promise<P>;
 readonly status: number;
}

export interface IOptions {
 readonly method: string;
 readonly headers: {
    "Content-Type": string;
    Authorization?: string;
  };
 readonly body?: string;
}

export function checkResponce<P>(res: ITypeResponce<P>) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}
