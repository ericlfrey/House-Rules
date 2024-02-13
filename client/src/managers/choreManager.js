const _apiUrl = "/api/chore";

export const getChores = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
export const getChoreById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const deleteChore = id => {
  return fetch(`${_apiUrl}/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });
}
