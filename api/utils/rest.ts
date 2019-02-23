import superagent from 'superagent';

export class Rest {
    static get<T>(url: string, accessToken: string): Promise<T> {
        return superagent
            .get(url)
            .set("Authorization", `bearer ${accessToken}`)
            .set("Accept", "application/json")
            .then(res => res.body).catch(err => {
            console.log(err);
            throw err;
        });
    }
}
