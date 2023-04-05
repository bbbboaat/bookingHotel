import Current from "./Current"
import { Stack ,Box , Flex, Center} from "@chakra-ui/react"
import Room from "./Room"
import Deluxe from '../assets/deluxe.jpeg'
import Suite from '../assets/suite.jpeg'
import Superior from '../assets/superior.jpeg'
import RenterForm from "./RenterForm"
import { useContext , useState } from "react"
import { BlockchainContext } from "../context/BlockchainContext"
import ClipLoader from "react-spinners/ClipLoader";

const Booking = () => {
    const { renterExists , currentAccount } = useContext(BlockchainContext)
    let [loading, setLoading] = useState(true);
    
    return (
        <Stack 
        as={Box}
        textAlign={'center'}
        spaceing={{base: 8 , md:14 }}
        py = {{base: 20 , md: 36}}>
        {renterExists == null && currentAccount ? <Center><ClipLoader loading={loading}  size={75}/> </Center> : renterExists ? <Current/> : <RenterForm />}

        <Flex justifyContent={'center'} alignItems={'center'}>
            <Room room={Superior}/>
            <Room room={Deluxe}/>
            <Room room={Suite}/>
        </Flex>
        </Stack>
        
    )
}

export default Booking