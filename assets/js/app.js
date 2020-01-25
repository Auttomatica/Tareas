//VARIABLES

 const listaTweets = document.getElementById('lista-tweets');  // TOMO EN uNA VARIABLE UN DIV COMPLETO PARA AGREGARLE TWEETS DSP.



 //EVENT LISTENER
 
eventListeners();

function eventListeners(){

    //cuando se envía el tweet
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);   //E.L EN UN FORMULARIO SUBMIT

    //borrar un tweet

    listaTweets.addEventListener('click', borrarTweet);                              // E.L DENTRO DE UN DIV PARA HACER DELEGATION

    //cargar contenido
    document.addEventListener('DOMContentLoaded', localStorageCargado );             // E.L PARA CARGAR EL DOM CON EL CONTENIDO GUARDADO
 }


 // FUNCIONES

 //---------------------------AGREGAR TWEET---------------------
 function agregarTweet(e){
    e.preventDefault();

    const tweet = document.getElementById('tweet').value;
    //Creo el botón borrar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';


    //creo una Lista donde añado el contenido del textarea y agrego esa lista a la variable listaTweets
    const li = document.createElement('li');
    li.innerText = tweet;
    //Añade el boton borrar a la lista
    li.appendChild(botonBorrar);
    //Añade el tweet a la Lista 
    listaTweets.appendChild(li);

    agregarLocalStorage(tweet);
 };

//-----------------------------BORRAR TWEET---------------------------

function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();}

        borrarTweetLocalStorage(e.target.parentElement.innerText);
    
}

function localStorageCargado(){

    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){

        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
    
    
        //creo una Lista donde añado el contenido del textarea y agrego esa lista a la variable listaTweets
        const li = document.createElement('li');
        li.innerText = tweet;
        //Añade el boton borrar a la lista
        li.appendChild(botonBorrar);
        //Añade el tweet a la Lista 
        listaTweets.appendChild(li);
    

    });

}



function agregarLocalStorage(tweet){

    let tweets;

    tweets = obtenerTweetsLocalStorage();
    //añadir el nuevo tweet

    tweets.push(tweet);


    // convertir de string a arreglo para local storage

    localStorage.setItem('tweets', JSON.stringify(tweets));


}

// comrpueba q haya elementos en LS

function obtenerTweetsLocalStorage(){

    let tweets;

    //revisamos valores del local storage

    if(localStorage.getItem('tweets')=== null){
        
        tweets = [];
    } else {

        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;

}

function borrarTweetLocalStorage(tweet){

    let tweets , tweetBorrar;
    // elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){

        if(tweetBorrar === tweet){
            tweets.splice(index,1);
        }
    })

    localStorage.setItem('tweets', JSON.stringify(tweets));

}