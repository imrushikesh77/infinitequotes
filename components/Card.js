const React = require('react');
import tweet from '../assets/tweet.png';
import copy from '../assets/copy.png';


const Card = ({content, author}) => {

    const handleCopyClick = () => {
        const textToCopy = `${content} ~${author}`;
    
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log('Text copied to clipboard:', textToCopy);
          })
          .catch((err) => {
            console.error('Unable to copy text to clipboard:', err);
          });
    };

    const handleTweetClick = () => {
        const tweetText = `${content} ~${author}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    
        // Open a new window for the Twitter share intent
        window.open(tweetUrl, '_blank', 'width=550,height=350');
      };

    return (
            <div className='card'>
                <div id='card-content-wrapper'>
                    <h1>{content}</h1>
                    <span>~{author}</span>
                </div>
                <hr/>
                <div className='buttons'>
                    <img onClick={handleTweetClick} src= {tweet} alt='Tweet' className='tweet' />
                    <img onClick={handleCopyClick} src= {copy} alt='Copy' className='copy' />
                </div>
            </div>
    );
}

export default Card;