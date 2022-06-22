export function checkResponce(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`); 
}