document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect( 'http://127.0.0.1:5000/')
    // add left channel to dom
    socket.on('message', data => { 
        if (typeof data.msg !== 'undefined'){
            
            let ro= `<div class="left">${data.msg}</div>`
            var divv = document.getElementById("leftholder");
            divv.innerHTML += ro + '\n';
        }
        console.log(data);
    });

    socket.on('connect', () => {
        socket.emit( 'myevent', {
            data: 'User Connected'});
    });
    if(localStorage.getItem('channel')){
    localStorage.removeItem('channel');}
    channel = document.querySelector('#channel').innerHTML;
    localStorage.setItem('channel', channel);

   

    document.getElementById("msgform").addEventListener("submit", (e) => {
        e.preventDefault()
        const message = document.getElementById('message').value;
        const userName = localStorage.getItem('name');
        socket.emit('myevent',{message:message, userName:userName} );
    
});

    socket.on('my response', data => {
        if ( typeof data.userName !== 'undefined'){
            
            let roww = '<div class="msg_bbl"><b style="color: #000">'+data.userName+'</b> '+data.message+'</div>'
           
            var div = document.getElementById("messageholder");
            div.innerHTML += roww + '\n';
        }
         
        
    });


    document.querySelector('#leave').onclick= () => {
        channel = document.querySelector('#channel').innerHTML;
        
        leaveChannel(channel);
    };
    const username = localStorage.getItem('name');
    // leave room
    function leaveChannel(channel) {
        socket.emit('leave', {'username': username, 'channel': channel});

    }
});

