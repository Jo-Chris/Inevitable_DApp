import {useEthers} from "@usedapp/core";

export function Navbar() {

    const {account, deactivate, activateBrowserWallet} = useEthers();

    const handleConnection = () => {
        if (account) {
            deactivate();
        } else {
            activateBrowserWallet();
        }
    }

    return (
        <nav className="nav">
            <h1>Smart Contracts on the Frontend</h1>
            <button className="btn btn-dark" onClick={() => handleConnection()}>
                {
                    account ? 'Deconnect' : 'Connect now!'
                }
            </button>
        </nav>
    )
}