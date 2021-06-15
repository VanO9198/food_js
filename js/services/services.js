async function postData(url, body) {
    let response = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await response.json();
}

async function getData(url) {
    let res = await fetch(url);
    if (!res.ok) {
        console.log(new Error('что то пошло не так'));
    } else {
        return await res.json();
    }
}


export {postData};
export {getData};