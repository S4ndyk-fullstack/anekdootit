import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [selected, setSelected] = useState(0)
    const mostVotes = () => {
        let mostVotedIndex = 0;
        let mostVotes = 0;
        for(let i = 0; i < anecdotes.length; i++) {
            if(mostVotes < votes[i]) {
                mostVotes = votes[i];
                mostVotedIndex = i;
            }
        }
        return mostVotedIndex
    } 
    const setNewAnecdote = () => {
        let next = selected;
        while(next === selected) next = Math.floor(Math.random() * anecdotes.length)
        console.log("Random number = ", next);
        setSelected(next) 
    }

    const vote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
        console.log(selected, " now has ", votes[selected], " votes")
    }

    return (
        <div>
            <Header title="Anecdote of the day" />
            <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
            <button onClick={() => vote()} >vote</button>
            <button onClick={() => setNewAnecdote()} >next</button>
            <Header title="Anecdote with most votes" />
            <Anecdote text={anecdotes[mostVotes()]} votes={votes[mostVotes()]} />
        </div>
    )
}

const Header = ({title}) => <h1>{title}</h1>

const Anecdote = ({ text, votes }) => {
    if (votes < 1) return (
        <div>
            <p>{text}</p>
            <p>has no votes</p>
        </div>
    )
    return (
        <div>
            <p>{text}</p>
            <p>has {votes} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));