import { Stack,Box,Image,Button,Text } from "@chakra-ui/react"
import { useContext } from "react"
import { BlockchainContext } from "../context/BlockchainContext"

const Room = ({room}) => {
  const {checkIn,Checkout} = useContext(BlockchainContext)
    return(
        <Box boxSize='lg' mx={2}>
            <Image src={room} mb={10} />
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora hic laboriosam incidunt, beatae eos eum odio est eius saepe inventore veniam quas! Aperiam repudiandae, optio ipsa obcaecati harum ratione numquam! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, minus autem necessitatibus quibusdam porro obcaecati ab eos delectus! Vero, hic?
            </Text>
            <Stack spacing={0} direction={'row'} align={'center'} justify={'center'} mt={5} >
            <Button
              onClick={checkIn}
              m={2}
              colorScheme={'green'}
              bg={'teal.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'teal.700'
              }}>
              Check In
            </Button>
            <Button
              onClick={Checkout}
              m={2}
              colorScheme={'green'}
              bg={'teal.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'teal.700'
              }}>
              Check Out
            </Button>
            </Stack>
        </Box>
    )
}

export default Room