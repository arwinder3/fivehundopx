// FIXME: Move this to a configuration file
const consumerKey = "DPyWDtBSKXRlcypnjmU7IumXWk76GZwSPKRVDe3k";

export function getPhotos(feature, page) {
    return fetch(`https://api.500px.com/v1/photos?feature=${feature}&consumer_key=${consumerKey}&page=${page}`)
        .then(response => response.json());
}
