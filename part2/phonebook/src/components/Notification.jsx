const Notification = ({ message, type }) => {
    if (message == null) {
        return null
    }

    const notificationColor = type === 'error'? {color: 'red'} : {color: 'green'}

    return (
        <div className="notification" style={notificationColor}>
            {message}
        </div>
    )
}

export default Notification