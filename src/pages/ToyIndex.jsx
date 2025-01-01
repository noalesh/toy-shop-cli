
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ToyIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const dispatch = useDispatch()

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
            loadToys()
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])




    function onSetFilter(filterBy) {
        dispatch({type: SET_FILTER_BY, filterBy })
    }

    
    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg(`Toy removed`)
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy ' + toyId)
            })
    }


    
    function onAddRandomToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    if (!toys) return <div>Loading...</div>

    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <div>
                <main>
                    <Link to="/toy/edit" className="btn" >Add Toy</Link> 
                    <button className='add-btn' onClick={onAddRandomToy}>Add a Random Toy </button>
                    <h3>Our toys :</h3>
                    {!isLoading
                        ? <ToyList
                            toys={toys}
                            onRemoveToy={onRemoveToy}
                            onEditToy={onEditToy}
                        />
                        : <div>Loading Toys...</div>
                    }
                    <hr />
                </main>
            </div>
        </section>
    )

}