import { Button, ChakraProvider, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react';
import add_abi from './abis/add_abi.json'
import Web3 from 'web3'

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState(0);
  const [account, setAccount] = useState(null)
  const [web3, setWeb3] = useState(null)

  const useWeb3 = async () => {
    const [address] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    setAccount(address)
    const web3 = new Web3(window.ethereum)
    setWeb3(web3)
    console.log(web3);
  }

  const handleInput1 = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2 = (e) => {
    setInput2(e.target.value);
  };

  const handleAdd = async () => {
    const CA = '0x717F7Da4523EC8BD7Bd79565d9c4f9414114CD60'
    const ABI = add_abi
    const deployed = new web3.eth.Contract(ABI, CA)
    const data = deployed.methods.add(input1, input2).encodeABI()
    const txObject = {
      from: account,
      to: CA,
      data,
    }
    await web3.eth.sendTransaction(txObject)

    const getAmount = await deployed.methods.add(input1, input2).call()
    setResult(getAmount)
  }

  // const result_num = async () => {
  //   const CA = '0x354Ffa4F63848243AcA67480280953206EF66c31'
  //   const ABI = add_abi
  //   const deployed = new web3.eth.Contract(ABI, CA)
  //   // let BN = web3.utils.toWei('1')
  //   const data = deployed.methods.add(input1, input2).call()
  //   const txObject = {
  //     from: account,
  //     to: CA,
  //     data,
  //   }
  //   await web3.eth.sendTransaction(txObject)
  //   // const getAmount = await deployed.methods
  //   //   .getAmount().call()
  //   // const A = web3.utils.fromWei(getAmount)
  //   setResult()
  // }


  return (
    <ChakraProvider>
      <Flex width="1000px" height="300px" justifyContent="center" alignItems="center">
        <Input width="150px" border="2px solid black" backgroundColor="white" value={input1} onChange={handleInput1} />
        <Button backgroundColor="green">+</Button>
        <Input width="150px" border="2px solid black" backgroundColor="white" value={input2} onChange={handleInput2} />
        <Button backgroundColor="black" color="white" onClick={handleAdd}>=</Button>
        <Button backgroundColor="silver">Result: {result}</Button>
        <Button backgroundColor="orange" onClick={useWeb3}>지갑연결</Button>
      </Flex>
      <Flex width="1000px" justifyContent="center" alignItems="center">Connecting Wallet : {account}</Flex>
    </ChakraProvider>
  );
}

export default App;

// shell task awkward dinner link nose hope wife soon cute seat curtain