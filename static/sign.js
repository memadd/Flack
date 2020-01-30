document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('name'))
        {localStorage.setItem('name', null);}

    document.querySelector('#name').innerHTML = localStorage.getItem('name');   
    const myform = document.getElementById("signform");
    myform.addEventListener("submit", () =>{
        let name = document.getElementById('displayname').value;
        localStorage.setItem('name', name);    
        document.querySelector('#name').innerHTML = name;
        console.log(name);
    });
  
});