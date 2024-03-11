const PersonForm = ({onSubmit, nameValue, nameChange, numberValue, numberChange, }) => {
    return (
        <form onSubmit={onSubmit}>
        <div>
          Name: <input value={nameValue} onChange={nameChange} />
        </div>
        <div>
          Number: <input type="number" value={numberValue} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm