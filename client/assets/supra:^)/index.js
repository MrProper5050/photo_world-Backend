let $users = document.querySelector('#users')
let findAll_Btn = document.querySelector('.findAll')
let findBy_Btn = document.querySelector('.findBy')


function renderUsersList(users) {
    $users.innerHTML = ''
    for (const user of users) {
        let date = new Date(user.createdAt)
        date = `${date.getFullYear()}_${date.getMonth()}_${date.getDay()}(${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`
        console.log(date)
        $users.innerHTML += `
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



findAll_Btn.addEventListener('click',(e)=>{
    // POST getAllUsers

    let usersList = []

    e = e || window.event
    e.preventDefault()

    fetch('/api/user', {

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

    

})

findBy_Btn.addEventListener('click',(e)=>{
    // POST getUserBy
    e = e || window.event
    e.preventDefault()
})


