const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
    headers: {
      authorization: '595c608c-4483-4ea9-931e-424f6a71b8b5',
      'Content-Type': 'application/json'
    }
} 

function check(promise) {
    return promise.then(res => {
        if (res.ok) {
            return res.json();
        }
          return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function get(url, config) {
    return check(fetch(`${config.baseUrl}/${url}`, {
        headers: config.headers
      }));
}

function send(url, globalConfig, config) {
    return check(fetch(`${globalConfig.baseUrl}/${url}`, {
        headers: globalConfig.headers,
        method: config.method,
        body: config.body
      }));
}

export function getInitialCards () {
    return get("cards", config); 
}

export function getProfile() {
    return get("users/me", config);
}

export function editProfile(name, about) {
    return send("users/me", config, {
        method: "PATCH",
        body: JSON.stringify({
            name: name,
            about: about
          })
    });
}

export function addCard(name, link) {
    return send("cards", config, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            link: link
        })
    });
}

export function deleteCard(id) {
    return send(`cards/${id}`, config, {
        method: "DELETE"
    })
}

export function likeCard(id) {
    return send(`cards/likes/${id}`, config, {
        method: "PUT"
    })
}

export function unlikeCard(id) {
    return send(`cards/likes/${id}`, config, {
        method: "DELETE"
    })
}

export function editAvatar(link) {
    return send("users/me/avatar", config, {
        method: "PATCH",
        body: JSON.stringify({
            avatar: link
        })
    });
}