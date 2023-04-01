const { ethers } = require("ethers");
require ("dotenv").config();

function init() {
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.public.zkevm-test.net/");
  const contractAddress = "0x3aC587078b344a3d27e56632dFf236F1Aff04D56";
  const abi = [
    {
        "type":"constructor",
        "stateMutability":"nonpayable",
        "inputs":[
            {
                "type":"string",
                "name":"_username",
                "internalType":"string"
            }
        ]
    },
    {
        "type":"event",
        "name":"NewSubmission",
        "inputs":[
            {
                "type":"address",
                "name":"sender",
                "internalType":"address",
                "indexed":false
            },
            {
                "type":"string",
                "name":"message",
                "internalType":"string",
                "indexed":false
            }
        ],
        "anonymous":false
    },
    {
        "type":"function",
        "stateMutability":"view",
        "outputs":[
            {
                "type":"string",
                "name":"",
                "internalType":"string"
            }],
            "name":"getCurrentSubmission"
            ,"inputs":[]
        },
  {
    "type":"function",
    "stateMutability":"nonpayable",
    "outputs":[],
    "name":"submitUsername",
    "inputs":
  [
    {
        "type":"string",
        "name":"_username",
        "internalType":"string"
    }
    ]
}
];
const contract = new ethers.Contract(contractAddress, abi, provider);
return { contract, provider };

};

async function getCurrentSubmission(contract){
    const currentSubmission = await contract.getCurrentSubmission();
    return currentSubmission;
};

async function submitUsername(contract, signer, username){
    const tx = await contract.connect(signer).submitUsername(username);
    return tx.wait();
    return tx.hash;
};

async function main() {
    try {
        const { provider, contract } = init();
        const beforeSubmission = await getCurrentSubmission(contract);
        console.log(`Before : ${beforeSubmission}`);
        const privateKey = process.env.PRIVATE_KEY;
        const signer = new ethers.Wallet(privateKey, provider);
        const username = "izzarzn";
        const txHash = await submitUsername(contract, signer, username);
        console.log( `Submitted Username: ${username} at ${txHash}`);
        const afterSubmission = await getCurrentSubmission(contract);
        console.log(`After : ${afterSubmission}`);
    } catch (error) {
        console.log(error);
    };
}; 

main();

