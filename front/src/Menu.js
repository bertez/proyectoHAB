const { default: Auth } = require("./Auth");


function Menu() {
    return (
        <div>
            <h2>Menu</h2>
            <Auth />
        </div>
    )
}

export default Menu