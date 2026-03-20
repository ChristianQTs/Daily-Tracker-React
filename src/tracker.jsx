import { useState } from 'react'

export function TrackerPage() {
    const [activities, setActivities] = useState([])
    const [input, setInput] = useState('')

    const addActivity = () => {
        if(!input.trim()) return
        //create new array with the new activity at the end and adding the other ones before it (...activities):
        const newActivities = [...activities, { name: input, id: Date.now(), done: false }]
        setActivities(newActivities)
        setInput('')
    }

    const deleteActivity = (id) => {
        //filter out the activity whose id matches the request
        const newActivities = activities.filter(a => a.id !== id)
        setActivities(newActivities)
    }

    const toggleActivity = (id) => {
        //reverse the 'done' attribute of the activity whose id matches the request
        const newActivities = activities.map(a => a.id === id ? { ...a, done: !a.done } : a)
        setActivities(newActivities)
    }

    const completed = (activities.filter(a => a.done)).length


    return (
        <div>

            <h2>Completed: {completed}/{activities.length }</h2>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addActivity() }} />
            <button onClick={addActivity}>Add</button>
            
            <ul>
                {
                    activities.map(a => {
                        return (
                            <li key={a.id }>
                                <span style={{ textDecoration: a.done ? 'line-through' : 'none' }}>{a.name}</span>
                                <button onClick={() => toggleActivity(a.id)}>{a.done ? 'X' : 'V'}</button>
                                <button onClick={() => deleteActivity(a.id) }>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}
