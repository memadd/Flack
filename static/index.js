document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect( 'http://127.0.0.1:5000/')
    if (!localStorage.getItem('name'))
        {localStorage.setItem('name', null);}
    else{
        name = localStorage.getItem('name');
        document.querySelector('#name').innerHTML = name;
    } 
    if (!localStorage.getItem('channel'))
    {localStorage.setItem('channel', null);}
    else{
    channel = localStorage.getItem('channel');
    socket.emit('channel', {channel:channel});
    }   

    socket.on('redirect', destination=>{
        window.location.href = destination;
    });

});