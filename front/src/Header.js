import './Header.css'


function Header(){

    return(
        <div className='App-header'>
            
            <h2 className='titulo'>VIAJES DIFERENTES</h2>
            <form className='buscar'>
                <input type="text" placeholder="buscar"/>
                <button className='button'>🔎</button>
            </form>
            <div className='button-login'>
                <button>INICIAR SESION</button>
            </div>
        </div>
    )
}

export default Header