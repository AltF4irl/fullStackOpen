const Number = ( {person, onClick} ) => 
<li>
    { person.name } {person.number}
    <button onClick={onClick}>Delete</button>
</li>

export default Number