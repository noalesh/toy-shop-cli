
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToyNoId,
    getRandomToy,
    getDefaultFilter,
    getFilterFromSrcParams,
    getEmptyMsgWithId
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {

            console.log("DEBUG - inside query - filterBy is: ", filterBy)
            
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

           /* TODO
           
           if (filterBy.label) {
                const regExp = new RegExp(filterBy.label, 'i')
                toys = toys.filter(toy => doesToyHaveLabel(toy, regExp))
            }*/

            if (filterBy.minPrice) {
                toys = toys.filter(toy => toy.price >= filterBy.minPrice)
            } 
            
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }

           return toys
        })
}

/*
TODO
function doesToyHaveLabel(toy, regExp) {
    // assumptions:
    // labels is an array, the label we are looking for is one label
    for (let i=0; i<toy.labels.length; i++) {
        if (toy.labels[i].match(regExp)) {
            return true
        }
    }
    return false
}

*/

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToyNoId() {
    return {
        name: '',
        price: '',
        labels: '',
        createdAt: '',
        inStock: '',
        msgs: ''
    }
}

function getRandomToy() {
    return {
        id: utilService.makeId(),
        name: utilService.makeLorem(14),
        price: utilService.getRandomIntInclusive(1, 555),
        labels: _getRandomLabels(),
        createdAt: utilService.getRandomIntInclusive(1000000000, 9999999999),
        inStock: utilService.getRandomTrueOrFalse(),
        msgs: []         
    }
}

function getDefaultFilter() {
    return { name: '', maxPrice: '', minPrice: '' }
}

function _getRandomLabels(){
    const optionalLabels = ["dolls", "battery powered", "baby", "toddler", 
        "pre-school", "puzzle", "balls", "sports", "outdoors", "action figures",
        "birthday gifts", "party", "on wheels", "books", "art", "box game", 
        "for individual game", "for multiple players", "hand crafted"]
    const howManyLabels = utilService.getRandomIntInclusive(1, 4)
    const chosenLables = []
    // loop "howManyLabels" times and get a random label
    for (let i=0; i<howManyLabels; i++){
        const random = Math.floor(Math.random() * months.length);
        chosenLables += optionalLabels[random]
    }
    // delete all duplicates and return
    console.log("DEBUG - from toy.service._getRandomLabels result : ")
    return [...new Set(chosenLables)]
}

function getFilterFromSrcParams(searchParams) {
    const name = searchParams.get('name') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
   
    return {
        name,
        minPrice,
        maxPrice
    }

}

function getEmptyMsgWithId() {
    // "by" is an object: {_id: '', fullname: ''}
    return {
        id: utilService.makeId(),
        txt: '',
        by: '',
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            const toy = getRandomToy
            toys.push(toy)
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
        console.log("DEBUG - toys created. toys : ", toys)
    }

}


function _createToy() {
    const newToy = getEmptyToy()
    newToy.id = utilService.makeId()
    return newToy
}