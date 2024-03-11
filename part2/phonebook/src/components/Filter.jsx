const Filter = ({value, onChange}) => {
    return (
        <div>
            Search: <input type="text" value={value} onChange={onChange} />
        </div>  
    )
}

export default Filter 