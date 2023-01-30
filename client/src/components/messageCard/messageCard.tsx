import { Button, HStack, Center, Heading, Box, Text, Divider, Card, CardHeader, CardBody, CardFooter, Skeleton, SkeletonText, Spacer, CardProps } from '@chakra-ui/react'
import { IconFloatLeft } from '@tabler/icons'
import { colorCardLib, formatDate } from '../../utils'

interface IMessageCard extends CardProps {
    data: Message
    onClose: () => void
}

export default function MessageCard({ data, onClose, ...props }: IMessageCard) {
    if (!data) return <MessageCardSkeleton />

    const { title, sender, createdAt, message, emoji, color } = data
    const { bgColor, emojiBgColor } = colorCardLib(color)
 
    return (
        <Card className='my-card' bg={bgColor} maxW='md' size='md' mx='auto' my='16' {...props}>
            <CardHeader as={HStack} spacing='4'>
                <Center
                    minW='12'
                    minH='12'
                    fontSize='3xl'
                    rounded='base'
                    bg={emojiBgColor}
                    children={emoji} />
                <Box>
                    <Heading noOfLines={2} fontSize='lg' children={title} />
                    <Text fontSize='sm' fontWeight='normal' textTransform='capitalize' children={'Oleh : ' + (sender || 'Anonim')} />
                </Box>
            </CardHeader>
            <Divider opacity='0.4' borderColor='gray.400' />
            <CardBody
                maxH='calc(100vh - 18.5rem)'
                overflow='auto'
                children={message}
            />
            <CardFooter as={HStack} >
                <Text flexGrow='1' fontSize='sm' fontStyle='italic' children={'Dibuat pada ' + formatDate(createdAt)} />
                <Spacer />
                <Button colorScheme='blue' size='sm' onClick={onClose} children={'Tutup'} />
                <HStack className='download-property' display='none' color='blue.600'>
                    <IconFloatLeft />
                    <Text fontSize='md' fontWeight='bold'>LayangKu</Text>
                </HStack>

            </CardFooter>
        </Card>
    )
}

interface IMessageCardLoadMore {
    loadMoreHandler: () => void
    onClose: () => void
}

export function MessageCardLoadMore({ loadMoreHandler, onClose }: IMessageCardLoadMore) {
    return (
        <Card bg='white' maxW='md' size='md' mx='auto' my='16'>
            <CardBody as={Center} pt='103px' pb='50px' flexDir='column'>
                <Text>Masih Banyak Pesan yang belum kamu Baca</Text>
                <Button
                    mt='4'
                    colorScheme='blue'
                    children='Tampilkan Lebih Banyak'
                    onClick={loadMoreHandler}
                />
            </CardBody>
            <CardFooter as={HStack}>
                <Spacer />
                <Button size='sm' onClick={onClose} children={'Tutup'} />
            </CardFooter>
        </Card>
    )
}

function MessageCardSkeleton() {
    return (
        <Card bg='white' maxW='md' size='md' mx='auto' my='16'>
            <CardHeader as={HStack} spacing='4'>
                <Skeleton minW='12' minH='12' rounded='base' />
                <Box w='full'>
                    <SkeletonText noOfLines={2} skeletonHeight='4' />
                    <SkeletonText w='120px' noOfLines={1} mt='2' skeletonHeight='4' />
                </Box>
            </CardHeader>
            <Divider opacity='0.4' borderColor='gray.400' />
            <CardBody>
                <SkeletonText w='full' noOfLines={4} skeletonHeight='4' />
            </CardBody>
            <CardFooter as={HStack} h='72px'>
                <SkeletonText w='120px' noOfLines={1} skeletonHeight='4' />
            </CardFooter>
        </Card>
    )
}