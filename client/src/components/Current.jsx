import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactNode , useContext} from 'react';

  import { MdAccountBalanceWallet , MdHotel } from 'react-icons/md';
  import { TbReportMoney } from 'react-icons/tb';
import { BlockchainContext } from '../context/BlockchainContext';
  import AddCredit from './AddToWallet';
  import PayForm from './payForm';

  

  function StatsCard(props) {
    const { title, stat, icon, bgColor } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}
          backgroundColor={bgColor}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function Current() {
    const {renterBalance , due , totalDuration , renter} = useContext(BlockchainContext)
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Your Wallet'}
            stat={renterBalance}
            icon={<MdAccountBalanceWallet size={'3em'} />}
          />
          <StatsCard
            title={'BNB Due'}
            stat={due}
            icon={<TbReportMoney size={'3em'} />}
          />
          <StatsCard
            title={'length of stay'}
            stat={totalDuration + ' '}
            icon={<MdHotel size={'3em'} />}
          />
          <StatsCard
            title={'Room Status'}
            bgColor={renter && renter.active ? 'green.300' : 'red.300'}
            // stat={'7'}
            // icon={<MdHotel size={'3em'} />}
          />
        </SimpleGrid>
        <Flex justifyContent={'center'} alignItems={'center'}>
          <AddCredit/>
          <PayForm/>
        </Flex>
      </Box>
    );
  }