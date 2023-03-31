import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Flex
} from '@chakra-ui/react'

export default function AddCredit() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (values)=> {
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <Flex justifyContent={'center'} alignContent={'center'} p={5} mt={10}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Text
            fontFamily={'heading'}
            fontSize={'x-large'}
            fontWeight={600}
            mb={4}>
                Add Credit 
        </Text>
      <FormControl isInvalid={errors.credit}>
        <Input
          id='credit'
          type="number"
          step="any"
          placeholder='Credit'
          {...register('credit', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.credit && errors.credit.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
    </Flex>
  )
}