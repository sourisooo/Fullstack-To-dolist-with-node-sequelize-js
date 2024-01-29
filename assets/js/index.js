// Ton code JavaScript ici !

let lastparent = '';
let lastmodal = '';
let listoflist = [];


function updateicon(){

let cards = document.querySelectorAll('.icon.is-clickable');

console.log(cards, typeof cards);

let openmodal = cards.forEach( card => {
    
    card.addEventListener('click', () => {

    let modal = document.querySelector('#add-list-modal');

    modal.classList.add('is-active');

    console.log(card.parentElement);

    lastparent = card.parentElement.innerText;

    lastmodal = 'task';



});});


let closebutton = document.querySelectorAll('.delete.close');

let annulerbutton = document.querySelectorAll('.button.close');

// console.log(closebutton);   

let closeModal = closebutton.forEach(e => {

    e.addEventListener('click', () => {

        let modals = document.querySelectorAll('.modal');
    
        // console.log(modals);
    
        modals.forEach(modal => {
    
            modal.classList.remove('is-active');
    
        })
    
    })

});


let annuleModal = annulerbutton.forEach(e => {


    e.addEventListener('click', () => {

        let modals = document.querySelectorAll('.modal');
    
        // console.log(modals);
    
        modals.forEach(modal => {
    
            modal.classList.remove('is-active');
    
        })
        
       })

});

let listbutton = document.querySelector('.button.is-large.is-fullwidth');

// console.log(listbutton);


let openmodalbylist = 
    
    listbutton.addEventListener('click', () => {

    let modal = document.querySelector('#add-list-modal2');

    modal.classList.add('is-active');

    lastparent = modal.parentElement.innerText;

    lastmodal = 'list';

    // console.log(lastmodal);

    // console.log(card.parentElement.innerText=="Perso");


});




}

updateicon();

function listenadding(){

let addbuttons = document.querySelectorAll('.button.is-success')

// console.log(addbuttons);

let addtask = addbuttons.forEach(button => {
    
    button.addEventListener('click', async (click) => {

        click.preventDefault();

        // console.log(click.parentNode);

        // console.log(click.target.form[1].value);

        if(lastmodal==='task'){

        let addtasktemplate = document.querySelector('#task-template');
        
        let parents = document.querySelectorAll('.message.is-info');

        for (parent of parents) (listoflist.push(parent));

        // console.log(listoflist);

        // console.log(parents);

        trueparent = listoflist.filter(parent => parent.children[0].innerText == lastparent)

        // console.log( Object.fromEntries(new FormData(document.querySelector("#add-list-modal form"))));

        // console.log(trueparent);
            // console.log(lastmodal);

      
            
            let newtask = addtasktemplate.content.cloneNode(true);

            newtask.querySelector('[slot="task-name"]').textContent = click.target.form[1].value;

            trueparent[0].appendChild(newtask);

            // let id = Math.random()*10000;

            console.log(trueparent[0].dataset.id);

            let listid = trueparent[0].dataset.id;

            const httpResponse = await fetch(`http://localhost:5000/cards/`, {
                method: "POST",
                body: JSON.stringify({ content:click.target.form[1].value, list_id:listid  }),
                headers: { "Content-Type": "application/json" }
              });
              const body = await httpResponse.json();
        
              console.log(body);


        listoflist = [];
    
        listenremoving();
    
            } 
        
        else {


            let addlisttemplate = document.querySelector('#list-template');

            // console.log(addlisttemplate);

            let newlist = addlisttemplate.content.cloneNode(true);
    
            newlist.querySelector('[slot="list-name"]').textContent = click.target.form[1].value;

            console.log(nblist);

            let id = nblist+1;

            newlist.querySelector('[slot="list-id"]').dataset.id = id;
    
            // Object.fromEntries(new FormData(document.querySelector("#add-list-modal form"))).list_id.textContent = id;

            let parent = document.querySelector('#lists-container')

            // console.log(lastmodal);

            parent.appendChild(newlist);

            const httpResponse = await fetch('http://localhost:5000/lists', {
                method: "POST",
                body: JSON.stringify({ name:click.target.form[1].value, position:id }),
                headers: { "Content-Type": "application/json" }
              });
              const body = await httpResponse.json();
        
            //   console.log(body);


            cards = document.querySelectorAll('.icon.is-clickable');

            // console.log(cards);

            window.location.reload();

              updateicon();

        }


});})

}

listenadding();



function listenremoving(){

let deletebutton = document.querySelectorAll('.icon.has-text-danger');

let deletetask = deletebutton.forEach(button => {

    button.addEventListener('click', async () => {


        console.log(button.parentNode.parentNode.querySelector('[slot="task-name"]').dataset.id);

        // button.parentElement.parentElement.innerHTML = '';
        

        await fetch(`http://localhost:5000/cards/${parseInt(button.parentNode.parentNode.querySelector('[slot="task-name"]').dataset.id)}`, { method: "DELETE"});

        button.parentNode.parentNode.parentNode.removeChild( button.parentNode.parentNode);
    })

    // console.log(button.parentElement.parentElement.innerHTML);
    

});


let deletelistbutton = document.querySelectorAll('.delete')

let deletelist = deletelistbutton.forEach(button => {

    button.addEventListener('click', async () => {

        console.log(button.parentNode.parentNode.dataset.id, typeof button.parentNode.parentNode.dataset.id);

        await fetch(`http://localhost:5000/lists/${parseInt(button.parentNode.parentNode.dataset.id)}`, { method: "DELETE"});

        button.parentNode.parentNode.parentNode.removeChild( button.parentNode.parentNode);
   
       

    })

    // console.log(button.parentNode.parentNode);
    // console.log(button.parentElement.parentElement.innerHTML );
    // console.log(document.querySelectorAll('.message.is-info'));


})};


listenremoving();
