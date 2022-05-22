import queryString from 'query-string';

export const withQuery = (url: string, query: any) => {
    return queryString.stringifyUrl({ url, query }, { arrayFormat: 'comma' })
}

export const guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
