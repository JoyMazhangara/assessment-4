const visionsContainer = document.querySelector('#visions-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/vision`

const visionsCallback = ({ data: visions }) => displayVisions(visions)
const errCallback = err => console.log(err.response.data)

const getAllVisions = () => axios.get(baseURL).then(visionsCallback).catch(errCallback)
const createVision = body => axios.post(baseURL, body).then(visionsCallback).catch(errCallback)
const deleteVision = id => axios.delete(`${baseURL}/${id}`).then(visionsCallback).catch(errCallback)
const updateVision = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(visionsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let countdown = document.querySelector('#countdown')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        countdown: countdown.value, 
        imageURL: imageURL.value
    }

    createVision(bodyObj)

    title.value = ''
    countdown.value = ''
    imageURL.value = ''
}

function createVisionCard(vision) {
    const visionCard = document.createElement('div')
    visionCard.classList.add('house-card')

    visionCard.innerHTML = `<img alt='vision cover image' src=${vision.imageURL} class="vision-cover-image"/>
    <p class="title">${vision.title}</p>
    <div class="btns-container">
        <button onclick="updateVision(${vision.id}, 'minus')">-</button>
        <p class="vision-countdown">$${vision.countdown}</p>
        <button onclick="updateVision(${vision.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteVision(${vision.id})">delete</button>
    `


    visionsContainer.appendChild(visionCard)
}

function displayVisions(arr) {
    visionsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createVisionCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllVisions()