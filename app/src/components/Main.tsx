import {useCalls, useContractFunction, useEtherBalance, useEthers} from "@usedapp/core";
import {formatEther} from "ethers/lib/utils";
import {Contract, utils} from "ethers";

export function Main() {

    // this is the wallet section
    const {account, chainId} = useEthers();
    const balance = useEtherBalance(account);

    // create our contract instance
    const cInterface = new utils.Interface(require('../contract/abi.json'));
    const cAddr = '0x54ab7e76e90892b27a65Bd01FBa39232B83bD568';
    const contract = new Contract(cAddr, cInterface);

    // custom hook for multi calls
    const useMultiCalls = (calls: any[]) => {
        const callResult = useCalls(calls);
        return callResult.map(callResult => callResult ? callResult.value : null);
    }

    const [owner, name, symbol, balanceOf] = useMultiCalls([
            {contract, method: 'owner', args: []},
            {contract, method: 'name', args: []},
            {contract, method: 'symbol', args: []},
            {contract, method: 'balanceOf', args: [account]},
        ]
    )

    const {state, send: mint} = useContractFunction(contract, 'safeMint');

    return (
        <div className="section-container">
            <div className="section" id="sec-one">
                <h1 className="section-header">Wallet Details</h1>
                <div className="data-chunks">
                    <div className="data-container">
                        <p>Address</p>
                        <hr/>
                        <p className='addr'>{account ?? 'n/v'}</p>
                    </div>
                    <div className="data-container">
                        <p>Chain ID</p>
                        <hr/>
                        <p>{chainId ?? 'n/v'}</p>
                    </div>
                    <div className="data-container">
                        <p>Balance</p>
                        <hr/>
                        <p>{balance ? formatEther(balance).slice(0, 7) + ' ETH' : 'n/v'}</p>
                    </div>
                </div>
            </div>
            <div className="section" id="sec-two">
                <h1 className="section-header">Contract Details</h1>
                <div className="data-chunks">
                    <div className="data-container">
                        <p>Owner</p>
                        <hr/>
                        <p className="addr">{owner ?? 'fetch error'}</p>
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
                        <p>{state.status}</p>
                    </div>
                    {
                        account && <div className="data-container">
                            <button className="btn btn-dark" onClick={() => mint(account, '/this-is-my-link-to-it')}>Mint 🚀</button>
                        </div>
                    }
                    <div className="data-container">
                        <p>Amount minted: </p>
                        <hr/>
                        <p>{Number(balanceOf) ?? 'fetch error'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}