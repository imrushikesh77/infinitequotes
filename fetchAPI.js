const options = {
    method: 'GET', 
    headers: {
        Accept: 'application/json'
    },
};

const getQuotes = async (page) => {
    const url = `https://api.quotable.io/quotes?skip=${(page-1)*20}&sortBy=content`; 
    try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
    } catch (error) {
    console.error(error);
    }
}

module.exports = getQuotes;