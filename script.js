const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

let initialLoaded = true // new

// Unsplash API
// let count = 5
let initialCount = 5
const apiKey = 'c7HfEUybGhvlB1dTPLC86X07TRXRDUx3LQvBqx2kkk8'
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`

// new block **********
function updateAPIURLWithNewCount(pinCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${pinCount}`
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        // count = 30
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log(totalImages)
    // Run Function for each object in photosArray
    photosArray.forEach((photo) => {
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        // Create<img> for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// Get the images from the Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
        if (initialLoad) {
            updateAPIURLWithNewCount(30)
            isInitialLoad = false
        }
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }}
)

// On Load
getPhotos()