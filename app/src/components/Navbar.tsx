import {useEthers} from "@usedapp/core";

export function Navbar() {

    const {account, activateBrowserWallet, deactivate} = useEthers();

    const handleConnect = () => {
        if (account) {
            deactivate();
        } else {
            activateBrowserWallet();
        }
    }

    return (
        <nav className="nav">
            <h1>Smart Contracts on the Frontend</h1>
            <button className="btn btn-dark" onClick={() => handleConnect()}>
                {
                    account ? 'Deactivate' : 'Connect'
                }
            </button>
        </nav>
    )
}