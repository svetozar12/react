interface makeUrlInterface {
    id?: number,
    server?: string,
    //query?: string,
}


/*
 * util function that generates a url string from a base url and a query object
 */
export function makeUrl(path: string, params?: makeUrlInterface) {
    /*
    const queryString = query != null ? Object.keys(query!)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query![key].toString())}`)
        .join('&') : '';

     if (queryString) {
        pathlist.push(`?${queryString}`);
    }
     */
    params = params || {};

    const serverUrl = params.server || process.env.REACT_APP_API_SERVER;
    const pathlist = [serverUrl, 'api', 'v2', path];

    if (params.id) {
        pathlist.push(params.id.toString());
    }

    pathlist.push('');
    return pathlist.join('/');
}

/*
 * util function that generates the needed headers
 */
export function makeHeader(token?: string) {
    token = token || process.env.REACT_APP_API_KEY;

    return {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
    };
}