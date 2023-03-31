import Current from "./Current"
import { Stack ,Box , Flex} from "@chakra-ui/react"
import Room from "./Room"
import Deluxe from '../assets/deluxe.jpeg'
import Suite from '../assets/suite.jpeg'
import Superior from '../assets/superior.jpeg'

const Booking = () => {
    return (
        <Stack 
        as={Box}
        textAlign={'center'}
        spaceing={{base: 8 , md:14 }}
        py = {{base: 20 , md: 36}}>
        <Current/>
        <Flex justifyContent={'center'} alignItems={'center'}>
            <Room room={Superior}/>
            <Room room={Deluxe}/>
            <Room room={Suite}/>
        </Flex>
        </Stack>
        
    )
}

export default Booking