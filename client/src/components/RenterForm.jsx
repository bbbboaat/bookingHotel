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

export default function RenterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (values)=> {
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <>
    <Text
            fontFamily={'heading'}
            fontSize={'x-large'}
            fontWeight={600}>
            Welcome <br/> Please enter your first and last name to register.
    </Text>

    <Flex justifyContent={'center'} alignContent={'center'} p={5} mt={10}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.firstname && errors.lastname}>
        <FormLabel htmlFor='firstname'>First Name</FormLabel>
        <Input
          id='firstname'
          placeholder='First Name'
          {...register('firstname', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.firstname && errors.firstname.message}
        </FormErrorMessage>

        <FormLabel mt={5} htmlFor='lastname'>Last Name</FormLabel>
        <Input
          id='lastname'
          placeholder='Last Name'
          {...register('lastname', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.lastname && errors.lastname.message}
        </FormErrorMessage>

      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
    </Flex>
    </>
  )
}