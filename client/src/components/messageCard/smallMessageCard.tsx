import { CardProps, Center, Divider, Heading, HStack, Skeleton, SkeletonText, Text } from "@chakra-ui/react"
import { colorCardLib } from '../../utils'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'

interface ISmallMessageCard extends CardProps  {
    data : Message | MessageForm
}

export default function SmallMessageCard({ data  } : ISmallMessageCard) {
    if (!data) return <SmallMessageCardSkeleton/>

    const { title, message, emoji, color } = data || {}
    const { bgColor, emojiBgColor } = colorCardLib(color)

    return (
        <Card
            size='sm'
            bg={bgColor}
            cursor='pointer'
            _hover={{ boxShadow: 'md' }}
            maxW='400px'
        >
            <CardHeader>
                <HStack>
                    <Center
                        minW='9'
                        minH='9'
                        fontSize='xl'
                        rounded='base'
                        bg={emojiBgColor}
                        children={emoji}
                    />
                    <Heading noOfLines={2} fontSize='sm' fontWeight='medium'>{title}</Heading>
                </HStack>
            </CardHeader>
            <Divider opacity='0.4' borderColor='gray.400' />
            <CardBody>
                <Text noOfLines={3} fontSize='sm' children={message} />
            </CardBody>
        </Card>
    )
}

function SmallMessageCardSkeleton() {
    return (
        <Card size='sm' boxShadow='xs' >
            <CardHeader>
                <HStack>
                    <Skeleton minW='9' minH='9' rounded='base' />
                    <SkeletonText w='full' noOfLines={2} skeletonHeight='3' />/
                </HStack>
            </CardHeader>
            <Divider opacity='0.4' borderColor='gray.400' />
            <CardBody>
                <SkeletonText mt='2' w='full' noOfLines={3} skeletonHeight='3' />
            </CardBody>
        </Card>
    )
}

