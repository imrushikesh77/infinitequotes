const React = require('react');
const { useState, useEffect } = React;
const reactDOM = require('react-dom/client');
const Card = require('./components/Card').default;
const Shimmar = require("./components/Shimmar").default;
const getQuotes = require('./fetchAPI');

const InfiniteScroll = require('react-infinite-scroller');

const App = () => {
    const [quotes, setQuotes] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getQuotes(page)
            .then(data => {
                setQuotes(data);
                setPage(prevPage => prevPage+1)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const fetchMoreData = async() => {
      const newData = await getQuotes(page);
      setPage(prevPage => prevPage+1);
        setQuotes(prevQuotes => [...prevQuotes, ...newData]);
        setHasMore(newData.length > 0);
    }

    return (
        quotes.length === 0 ?
        <div className='container'>
            <Shimmar/>
            <Shimmar/>
            <Shimmar/>
            <Shimmar/>
            <Shimmar/>
            <Shimmar/>
            <Shimmar/>
        </div>
         : (
          <InfiniteScroll 
            pageStart={0} 
            loadMore={fetchMoreData}
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
            >
            <div className='container'>
              {quotes.map((quote, index) => (
                <Card key={index} content={quote.content} author={quote.author} />
              ))}
            </div>
          </InfiniteScroll>
        )
      );
};

const root = reactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
