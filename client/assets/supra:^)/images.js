let $content     = document.querySelector('#content')
let $controllers = document.querySelector('#controllers')
let findAll_Btn  = document.querySelector('.findAll')
let delete_Btn   = document.querySelector('.delete')

function getAllImages() {
    let imagesList = []
  

    fetch('/admin/images', {

        method:'POST',
        headers:{'Content-Type':'application/json'},

    })
    .then(response => response.json())
    .then(success => {
        imagesList = success
        console.log(imagesList)
        renderImagesList(imagesList)
    })
    .catch(error => console.log("ERROR:",error))
}
function renderImagesList(images) {
    if(images.message) return $content.innerHTML = images.message
    $content.innerHTML = ''
    for (const image of images) {
        let date = new Date(image.createdAt)
        date = `${date.getUTCFullYear()}_${date.getUTCMonth()}_${date.getUTCDay()}(${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`
        console.log(date)
        $content.innerHTML += `
        <div class="image">
            <section>
            <h3>${image.name}</h3>
            </section>
            <section>
                <img src="/assets/uploads/${image.name}"/>
            </section>
        </div>
        `
    }
    
}
window.onload = function (e) {
    getAllImages()
}

findAll_Btn.addEventListener('click',(e)=>{
    // POST getAllUsers
    e = e || window.event
    e.preventDefault()
    if(document.querySelector('.findBy__input')){
        document.querySelector('.findBy__input').remove()
    }
    getAllImages()

})

delete_Btn.addEventListener('click',(e)=>{
    e = e || window.event
    e.preventDefault()

   
    $content.innerHTML = '' 
    $content.innerHTML = `
        <div class="delete__inputs">
            <input type="text" id="id" placeholder="image name"/>
            <button>Delete</button>
            <p id="server_message"></p>
        </div>

    `
    document.querySelector('.delete__inputs>button').addEventListener('click', (e)=>{
        e.preventDefault()
        const name = document.querySelector('#id').value.trim()
        

        fetch('/admin/images/remove/'+name, {

            method:'Delete',
            headers:{'Content-Type':'application/json'}
    
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