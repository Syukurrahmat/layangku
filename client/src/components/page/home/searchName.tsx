import { Box, Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"

const SearchName = () => {
    const { receiver } = useParams()
    const [value, setValue] = useState(receiver || '')

    const navigate = useNavigate()

    return (
        <Box bg='white' rounded='base' p='4' mt='8'>
            <Text fontSize='sm' children={'Tulis namamu tuk temukan pesan'} />
            <InputGroup
                as='form'
                onSubmit={event => {
                    event.preventDefault()
                    navigate('/messages/' + value)
                }}
                mt='2'
            >
                <Input
                    size='lg'
                    placeholder='misal: Agus'
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    fontWeight='medium'
                    pr='100'
                />

                <InputRightElement color='gray.500' h='full' w='max-content' mr='2' >
                    <Button type='submit' colorScheme='blue' size='sm' children={'Temukan'} />
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}

export default SearchName