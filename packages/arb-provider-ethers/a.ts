import { L1Bridge } from './src/lib/l1bridge'
import { EthMessage } from './src/lib/message'
import { L2Batch, L2ContractTransaction, L2Message, L2Transaction } from './src/lib/message'
import { ArbProvider } from './src/lib/provider'
import { BigNumberish, BigNumber } from 'ethers/utils'
import { ContractTransaction, ethers, Wallet } from 'ethers'
import { TransactionResponse } from 'ethers/providers'
import { Buffer } from 'buffer'

const pk = ''
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/3582010d3cc14ab183653e5861d0c118")
const signer = new Wallet(pk, provider)
const addr = '0xFe4493Ce82FeE8dcF1A4EA59026509237fC4CF75' // signer.address
const chainID = 0x65836E99e013
const arbChainAddress = '0xc68DCee7b8cA57F41D1A417103CB65836E99e013'
//                                                     ^^^^^^^^^^^^ chainID = low-order 48 bits
const arbProvider = new ArbProvider("https://kovan4.arbitrum.io/rpc", provider, arbChainAddress)

// // call inc()
// async function main() {
//     const l2tx = new L2Transaction(
//         '10000000', // gas
//         '0', // gas price
//         '1', // seq
//         '0x360dBaaCcAad6B7a79a6BecAe7682718573c2b51', // dest
//         '0', // payment
//         '0x371303c0', // calldata
//     )
//     console.log('messageID', l2tx.messageID(addr, chainID))
    
//     const l1 = new L1Bridge(signer, arbChainAddress)
//     const tx = await l1.sendL2Message(
//         l2tx,
//         addr, // from
//     )
//     console.log(tx)
//     console.log(await tx.wait())
// }

import { decode as RLPDecode, Decoded as RLPDecoded } from 'rlp'
import { GlobalInboxFactory, TypedEventDescription, TypedFunctionDescription } from './src/lib/abi'


// // call inc() in a batch
// async function main() {

// // console.log(L2Batch.fromData(
// // "0x81a500000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000360dbaaccaad6b7a79a6becae7682718573c2b510000000000000000000000000000000000000000000000000000000000000000371303c081a500000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000360dbaaccaad6b7a79a6becae7682718573c2b510000000000000000000000000000000000000000000000000000000000000000371303c0"

// // ))
// //         return


//     const sub1 = new L2Transaction(
//         '10000000', // gas
//         '0', // gas price
//         '7', // seq
//         '0x360dBaaCcAad6B7a79a6BecAe7682718573c2b51', // dest
//         '0', // payment
//         '0x371303c0', // calldata
//     )
//     console.log('sub1', sub1.messageID(addr, chainID))
//     const sub2 = new L2Transaction(
//         '10000000', // gas
//         '0', // gas price
//         '8', // seq
//         '0x360dBaaCcAad6B7a79a6BecAe7682718573c2b51', // dest
//         '0', // payment
//         '0x371303c0', // calldata
//     )
//     console.log('sub2', sub2.messageID(addr, chainID))
//     const l2tx = new L2Batch([
//         new L2Message(sub1),
//         new L2Message(sub2),
//     ])

//     // const l1 = new L1Bridge(signer, arbChainAddress)

//     // const globalInbox = await l1.globalInbox()
//     // const tx = await globalInbox.sendL2Message(
//     //     arbChainAddress,
//     //     new L2Message(l2tx).asData(),
//     // )
//     // console.log(tx)
//     // const receipt = await tx.wait()
//     // console.log(receipt)
//     const receipt = {
        
//         to: '0x603B563e088859CB752e983AAD9E47BA1A6120C9',
//   from: '0xFe4493Ce82FeE8dcF1A4EA59026509237fC4CF75',
//   contractAddress: "0xsadf",
//   transactionIndex: 0,
//   logs:   [ { transactionIndex: 0,
//        blockNumber: 31286,
//        transactionHash:
//         '0xd17a6917549cba10afc36168f530f73ba8f6e21f12980995aea7e891190ac293',
//        address: '0x603B563e088859CB752e983AAD9E47BA1A6120C9',
//        topics: ["0x35e48d636f39df5c5ca2278452d6d89bf9f07c2ff15f46d08aa402c46638b882", "0x000000000000000000000000c68dcee7b8ca57f41d1a417103cb65836e99e013", "0x0000000000000000000000000000000000000000000000000000000000000003", "0x000000000000000000000000fe4493ce82fee8dcf1a4ea59026509237fc4cf75"],
//        data:
//         '0x000000000000000000000000000000000000000000000000000000000000000f0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000014f0381a500000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007000000000000000000000000360dbaaccaad6b7a79a6becae7682718573c2b510000000000000000000000000000000000000000000000000000000000000000371303c081a500000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000360dbaaccaad6b7a79a6becae7682718573c2b510000000000000000000000000000000000000000000000000000000000000000371303c00000000000000000000000000000000000',
//        logIndex: 0,
//        blockHash:
//         '0xbd4737fee1d9f73c5d4dff0515f44c62327500a87b5a0cbf9e8c3560cf0d8a00',
//        transactionLogIndex: 0 } ],
//   blockNumber: 31286,
//   confirmations: 1,
//   status: 1,
//   byzantium: true,
//    }

// }


// !!!Do not use this method!!! because the ChainHelperL2 is not atomic
// call ChainHelperL2.deposit(address pool, address erc20, address user, uint256 amount)
// to register the previous InboxL1.depositERC20.
// async function main() {
    // const l2tx = new L2ContractTransaction(
    //     '1000000', // gas
    //     '0', // gas price
    //     '0x03D18F1eD14E82B7A94c4f185e7c08633892B532', // dest
    //     '0', // payment
    //     '0x0284c3f50000000000000000000000002422757825e5155d69cc3764275f702897f9a5af0000000000000000000000002422757825e5155d69cc3764275f702897f9a5af0000000000000000000000002422757825e5155d69cc3764275f702897f9a5af0000000000000000000000000000000000000000000000000000000000001234', // calldata
    // )
    // console.log('encode', Buffer.from(l2tx.asData()).toString('hex'))
// }

// get messageID with inbox seq (failed)
// async function main() {
    // const res = await arbProvider.getMessageResult('0xd17a6917549cba10afc36168f530f73ba8f6e21f12980995aea7e891190ac293')
    // console.log(res)

    
    // console.log(getMessageIDForSubType1(chainID, "19"))

    // console.log(getMessageIDForSubType1(chainID, 0x9))
    // console.log(getMessageIDForSubType3(chainID, 0x9, 0))
    // console.log(getMessageIDForSubType1(chainID, 0x8))
    // console.log(getMessageIDForSubType3(chainID, 0x8, 0))
    
// }

function getMessageIDForSubType1(chainID: number, inboxSeqNum: string): string {
    return ethers.utils.solidityKeccak256(
        ['uint256', 'uint256'],
        [
            chainID,
            inboxSeqNum,
        ]
    )
}

// function getMessageIDForSubType3(chainID: number, inboxSeqNum: string, kInBatch: number): string {
//     const batchMessageID = ethers.utils.solidityKeccak256(
//         ['uint256', 'uint256'],
//         [
//             chainID,
//             inboxSeqNum,
//         ]
//     )
//     return ethers.utils.solidityKeccak256(
//         ['bytes32', 'uint256'],
//         [
//             batchMessageID,
//             kInBatch,
//         ]
//     )
// }

// function buf2hex(buffer: Uint8Array) {
//     return Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');
// }

main()
