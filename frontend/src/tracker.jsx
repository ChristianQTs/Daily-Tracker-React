import { useEffect, useState } from 'react'
const base_url = import.meta.env.VITE_API_URL || 'http://localhost:5173'

export function TrackerPage() {
    const [activities, setActivities] = useState([])
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState('all')


    const addActivity = async() => {
        if (!input.trim()) return
        const res = await fetch(`${base_url}/acts`, {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({name:input})
        })
        const newAct = await res.json()
        if (res.ok){
            //create new array with the new activity at the end and adding the other ones before it (...activities):
            const newActivities = [...activities, newAct]
            setActivities(newActivities)
            setInput('')
        }
    }

    const deleteActivity = async(id) => {
        const res = await fetch(`${base_url}/acts/${id}`, {
            method:'DELETE'
        })
        if(res.ok){
            //filter out the activity whose id matches the request
            const newActivities = activities.filter(a => a.id !== id)
            setActivities(newActivities)
        }
    }

    const toggleActivity = async(id) => {
        const res = await fetch(`${base_url}/acts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok){
            //reverse the 'done' attribute of the activity whose id matches the request
            const newActivities = activities.map(a => a.id === id ? { ...a, done: !a.done } : a)
            setActivities(newActivities)
        }
    }
    useEffect(() => {
        async function getActs() {
            const res = await fetch(`${base_url}/acts`, {
                headers: { 'Content-Type': 'application/json' }
            })
            const {acts} = await res.json()
            console.log(acts)
            if (res.ok) {
                setActivities(acts)
            }
        }
        getActs()
    },[])

    const completed = (activities.filter(a => a.done)).length

    const filteredActvities = filter === 'pending' ? activities.filter(a => !a.done) : filter === 'completed' ? activities.filter(a => a.done) : activities

   

    return (
        <div>

            <h2>Completed: {completed}/{activities.length }</h2>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addActivity() }} />
            <button onClick={addActivity}>Add</button>
            <br />
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('pending')}>Pending </button>
            <button onClick={() => setFilter('completed')}>Completed </button>

            {activities.length != 0 ? <h2>{filter === 'completed' ? "Completed " : filter === 'pending' ? "Pending " : "All "}activities: </h2> : <></>}
            <ul>
                
                {
                    filteredActvities.map(a => {
                        return (
                            <li key={a.id}>
                                <span style={{ textDecoration: a.done ? 'line-through' : 'none' }}>{a.name}</span>
                                <button onClick={() => toggleActivity(a.id)}>{a.done ? 'X' : 'V'}</button>
                                <button onClick={() => deleteActivity(a.id)}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}
