export const CoordinatesStyleWrapper = ({title, children}) => {
    return (
        <div className="coordinates">
            <span className="title">{title}</span>
            {children}
        </div>
    )
}