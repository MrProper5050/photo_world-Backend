let $content     = document.querySelector('#content')
let $controllers = document.querySelector('#controllers')
let findAll_Btn  = document.querySelector('.findAll')
let findBy_Btn   = document.querySelector('.findBy')
let create_Btn   = document.querySelector('.create')
let delete_Btn   = document.querySelector('.delete')


function getAllUsers() {
    let usersList = []
  

    fetch('/admin/users', {

        method:'POST',
        headers:{'Content-Type':'application/json'},

    })
    .then(response => response.json())
    .then(success => {
        usersList = success
        console.log(usersList)
        renderUsersList(usersList)
    })
    .catch(error => console.log("ERROR:",error))
}

function renderUsersList(users) {
    if(users.message) return $content.innerHTML = users.message
    $content.innerHTML = ''
    for (const user of users) {
        let date = new Date(user.createdAt)
        date = `${date.getUTCFullYear()}_${date.getUTCMonth()}_${date.getUTCDay()}(${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`
        console.log(date)
        $content.innerHTML += `
        <div class="user">
            <section>
            <h3>Id:</h3> <p>${user.id}</p>
            </section>
            <section>
            <h3>Name:</h3>  <p>${user.name}</p>
            </section>
            <section>
            <h3>Password:</h3>  <p>${user.password}</p>
            </section>
            <section>
            <h3>RegistatedAt:</h3>  <p>${date}</p>
            </section>
            <section>
            <h3>Role:</h3>  <p>${user.role}</p>
            </section>
            <section class="finally">
            <a href="/profile/${user.id}">Profile page </a>
            </section>
        </div>
        `
    }
    
}


window.onload = function (e) {
    getAllUsers()
}

findAll_Btn.addEventListener('click',(e)=>{
    // POST getAllUsers
    e = e || window.event
    e.preventDefault()
    if(document.querySelector('.findBy__input')){
        document.querySelector('.findBy__input').remove()
    }
    getAllUsers()

})

findBy_Btn.addEventListener('click',(e)=>{
    // POST getUserBy
    e = e || window.event
    e.preventDefault()
    if(document.querySelector('.findBy__input')){
        document.querySelector('.findBy__input').remove()
    }
    $content.innerHTML = '' 
    $content.insertAdjacentHTML('beforebegin',`
    <div class="findBy__input">
        <select>
            <option value="id">id</option>
            <option value="name">name</option>
            <option value="role">role</option>
        </select>
        <input type="text" placeholder="value"/>
        <button>find</button>
    </div>

    `) 
   
    
    
    
    const findBy__input  = document.querySelector('.findBy__input>input')
    const findBy__select  = document.querySelector('.findBy__input>select')
    const findBy__button = document.querySelector('.findBy__input>button')
    findBy__button.addEventListener('click', (e)=>{
        e.preventDefault()

        const inputValue = findBy__input.value
        const selectValue = findBy__select.value
        const requestObject = {by:selectValue, value:inputValue}
        console.log(requestObject)

        // send value to server
        fetch('/admin/users/getBy', {

            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(requestObject)
    
        })
        .then(response => response.json())
        .then(usersList => {
            console.log(usersList)
            renderUsersList(usersList)
            
        })
        .catch(error => {
            console.log("ERROR:",error)

        })

    })
    

})

create_Btn.addEventListener('click',(e)=>{
    e = e || window.event
    e.preventDefault()

    if(document.querySelector('.findBy__input')){
        document.querySelector('.findBy__input').remove()
    }
    $content.innerHTML = '' 
    $content.innerHTML = `
        <div class="create__inputs">
            <input type="text" id="name" placeholder="name"/>
            <input type="text" id="password" placeholder="password"/>
            <select id="role">
                <option>common</option>
                <option>admin</option>
            </select>
            <button>Create</button>
            <p id="server_message"></p>
        </div>

    `
    document.querySelector('.create__inputs>button').addEventListener('click', (e)=>{
        e.preventDefault()
        const name = document.querySelector('#name').value
        const password = document.querySelector('#password').value
        const role = document.querySelector('#role').value
        const requestObject = {name, password, role}
        console.log(requestObject)
        fetch('/admin/users/reg', {

            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(requestObject)
    
        })
        .then(response => response.json())
        .then(success => {
            console.log(success)
            document.querySelector('#server_message').innerHTML = success.message
            
        })
        .catch(error => {
            console.log("ERROR:",error)

        })


    })

    
})

delete_Btn.addEventListener('click',(e)=>{
    e = e || window.event
    e.preventDefault()

    if(document.querySelector('.findBy__input')){
        document.querySelector('.findBy__input').remove()
    }
    $content.innerHTML = '' 
    $content.innerHTML = `
        <div class="delete__inputs">
            <input type="text" id="id" placeholder="id"/>
            <button>Delete</button>
            <p id="server_message"></p>
        </div>

    `
    document.querySelector('.delete__inputs>button').addEventListener('click', (e)=>{
        e.preventDefault()
        const id = document.querySelector('#id').value.trim()
        const requestObject = {id}

        fetch('/admin/users/remove', {

            method:'Delete',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(requestObject)
    
        })
        .then(response => response.json())
        .then(success => {
            console.log(success)
            document.querySelector('#server_message').innerHTML = success.message
            
        })
        .catch(error => {
            console.log("ERROR:",error)

        })


    })

    
})