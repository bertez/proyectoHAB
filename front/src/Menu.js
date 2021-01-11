const { default: CreateExperience } = require("./routes/CreateExperience");
const { default: Experiencias } = require("./routes/Experiencias");
const { default: Auth } = require("./user/Auth");


function Menu() {
    return (
        <div className="menu">
            <Experiencias/>
            <CreateExperience/>
        </div>
    )
}

export default Menu