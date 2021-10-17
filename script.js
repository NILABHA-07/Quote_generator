const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new_quote');
const loader=document.getElementById('loader')


// get quotes from api

let apiQuotes=[]

// show loading

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// hide loading

function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

// show new quotes

function newQuote(){
    loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        authorText.textContent='Unknown';

    }
    else{
        authorText.textContent=quote.author;
    }


    //check the quote length to determine styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();
}
async function getQuote(){
    loading();
        const apiUrl='https://type.fit/api/quotes';
        try {
            const response=await fetch(apiUrl); 
            apiQuotes=await response.json();
            newQuote();
        } catch (error) {
            
        }
}

//tweet

// function tweetQuote(){
//     const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

//     window.open(twitterUrl,'_blank');
// }

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.innerText}" - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
  }
//event listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//onload

getQuote();