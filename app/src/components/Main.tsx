import {useCalls, useContractFunction, useEtherBalance, useEthers} from "@usedapp/core";
import {formatEther} from "ethers/lib/utils";
import {Contract, utils} from "ethers";

export function Main() {

    // get information from wallet
    const {account, chainId} = useEthers();
    const balance = useEtherBalance(account);

    // call read function on SC
    const cInterface = new utils.Interface(require('../contract/abi.json'));
    const cAddr = '0x74B6485289e55EcEA94dEF49B25ced097beAFF14';
    const contract = new Contract(cAddr, cInterface);

    // calling readonly functions
    const useMultiCalls = (calls: any[]) => {
        const callsResult = useCalls(calls);
        return callsResult.map(result => result ? result.value : null);
    }
    const [owner, name, symbol, balanceOf] = useMultiCalls([
        {contract: contract, method: 'owner', args: []},
        {contract: contract, method: 'name', args: []},
        {contract: contract, method: 'symbol', args: []},
        {contract: contract, method: 'balanceOf', args: [account]},
    ]);

    // call the mint function
    const {
        state: mintState,
        send: mint
    } = useContractFunction(contract, 'safeMint');

    return (
        <div className="section-container">
            <div className="section" id="sec-one">
                <h1 className="section-header">Wallet Details</h1>
                <div className="data-chunks">
                    <div className="data-container">
                        <p>Address</p>
                        <hr/>
                        <p className="addr">{account ?? 'n/v'}</p>
                    </div>
                    <div className="data-container">
                        <p>Chain ID</p>
                        <hr/>
                        <p>{chainId ?? 'n/v'}</p>
                    </div>
                    <div className="data-container">
                        <p>Balance</p>
                        <hr/>
                        <p>{balance ? formatEther(balance).slice(0, 7) + ' Goerli ETH' : 'n/v'}</p>
                    </div>
                </div>
            </div>
            <div className="section" id="sec-two">
                <h1 className="section-header">Contract Details</h1>
                <div className="data-chunks">
                    <div className="data-container">
                        <p>Owner</p>
                        <hr/>
                        <p className="addr">{owner ?? 'fetch error!'}</p>
                    </div>
                    <div className="data-container">
                        <p>Name</p>
                        <hr/>
                        <p>{name ?? 'fetch error'}</p>
                    </div>
                    <div className="data-container">
                        <p>Symbol</p>
                        <hr/>
                        <p>{symbol ?? 'fetch error'}</p>
                    </div>
                    <div className="data-container">
                        <p>Mint Status</p>
                        <hr/>
                        <p>{mintState.status}</p>
                    </div>
                    {
                        account && <div className="data-container">
                            <button
                                className="btn btn-dark"
                                onClick={() => mint(account, '/this-is-my-url')}
                            >
                                Mint 🚀
                            </button>
                        </div>
                    }
                    <div className="data-container">
                        <p>Connected Wallet successful mints</p>
                        <hr/>
                        <p>{Number(balanceOf) ?? 'Fetch error!'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}