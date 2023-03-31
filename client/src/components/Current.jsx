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
  import { ReactNode } from 'react';
  import { BsPerson } from 'react-icons/bs';
  import { FiServer } from 'react-icons/fi';
  import { GoLocation } from 'react-icons/go';
  import { MdAccountBalanceWallet , MdHotel } from 'react-icons/md';
  import { TbReportMoney } from 'react-icons/tb';
  
  

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
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Our company is expanding, you could be too.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Your Wallet'}
            stat={'5,000'}
            icon={<MdAccountBalanceWallet size={'3em'} />}
          />
          <StatsCard
            title={'BNB Due'}
            stat={'1'}
            icon={<TbReportMoney size={'3em'} />}
          />
          <StatsCard
            title={'length of stay'}
            stat={'7'}
            icon={<MdHotel size={'3em'} />}
          />
          <StatsCard
            title={'Room Status'}
            bgColor={'red.300'}
            // stat={'7'}
            // icon={<MdHotel size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    );
  }