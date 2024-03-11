import Number from './Number'

const People  = ({list}) => {
    return (
        <ul>
            {list.map(prs => <Number key={prs.id} person={prs} />)}
        </ul>
    )
}

export default People
