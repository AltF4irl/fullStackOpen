import Number from './Number'

const People  = ({list, onClick}) => {
    return (
        <ul>
            {list.map(prs => <Number 
            key={prs.id} 
            person={prs} 
            onClick={() => onClick(prs.id)}
            />)}
        </ul>
    )
}

export default People
