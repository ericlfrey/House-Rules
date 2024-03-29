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

export const createChore = (chore) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chore),
  }).then((res) => res.json());
};

export const completeChore = payload => {
  return fetch(`${_apiUrl}/${payload.choreId}/complete?userId=${payload.userId}`, {
    method: 'POST',
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });
}
export const assignChore = payload => {
  return fetch(`${_apiUrl}/${payload.choreId}/assign?userId=${payload.userId}`, {
    method: 'POST',
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });
}
export const unassignChore = payload => {
  return fetch(`${_apiUrl}/${payload.choreId}/unassign?userId=${payload.userId}`, {
    method: 'POST',
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });
}
