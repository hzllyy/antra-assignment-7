export default function Buttons( {status, children} ) {
    return (
        <>
            { status === 'pending' ? 
                (<div className="btn__div">
                    <button className="edit__btn"></button>
                    <button className="del__btn"></button>
                    <button className="toggle__btn"></button>
                </div>) :
                (<div className="completed__div">
                    <button className="toggle__btn"></button>
                    {children}
                    <div className="btn__div">
                        <button className="edit__btn"></button>
                        <button className="del__btn"></button>
                    </div>
                </div>)
            }
        </>
    )
}