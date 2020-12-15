const { default: Auth } = require("./user/Auth");


function Menu() {
    return (
        <div>
            <Auth />
        </div>
    )
}

export default Menu