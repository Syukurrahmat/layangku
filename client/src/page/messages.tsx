import { useDisclosure, Button, Container, Divider, Center, SimpleGrid, Text, Image } from "@chakra-ui/react"
import { useRef, useEffect, useState } from "react"

import { useParams } from "react-router"

import { Data } from "../services/data"
import CardSlider from "../components/core/cardSlider"
import HeadingWithIcon from "../components/core/headingWithIcon"
import SmallMessageCard from "../components/core/smallMessageCard"

import noMessagesImage from '../image/no-messages.png'

type MessageListData = {
    receiver: string,
    meta: {
        page: number,
        perPage: number,
        pageCount: number,
        totalCount: number,
    },
    datas: Message[]
}

export default function MessageList() {
    const { receiver } = useParams()
    const cardSlider = useDisclosure()
    const ref = useRef<HTMLInputElement>(null)

    const [messagesList, setMessagesList] = useState<Message[]>([])
    const [initialIndexSlider, setInitialIndexSlider] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [dataInfo, setDataInfo] = useState({
        page: 0,
        perPage: 0,
        pageCount: 0,
        totalCount: 0,
    })

    const { page, pageCount, totalCount } = dataInfo

    const isNotYetAllData = page < pageCount

    const appendMessagesList = (page: number, initial: boolean = false) => {
        setIsLoaded(false)
        setMessagesList(e => (initial ? [] : e).concat(Array(3).fill(null)))

        if (!receiver) return

        Data.getMessageList(receiver, page).then((data: MessageListData) => {
            const { datas, meta } = data

            setMessagesList(e => (initial ? [] : e.slice(0, -3)).concat(datas))
            setDataInfo(meta)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
        appendMessagesList(1, true)

    }, [receiver])


    const openCardSlider = (index: number) => {
        setInitialIndexSlider(index)
        cardSlider.onOpen()
    }

    const loadMoreHandler = () => appendMessagesList(page + 1)

    return (
        <Container maxW='container.lg' minH='100vh' py='6' ref={ref}>
            <HeadingWithIcon
                icon='📫'
                title={`Pesan untukmu "${receiver}"`}
                subtitle={!isLoaded ?
                    'Mencari pesan untukmu' :
                    totalCount ?
                        `${totalCount} Pesan untukmu ditemukan` :
                        'Belum ada pesan untukmu'
                }
            />
            <Divider my='6' />
            {Boolean(messagesList.length) ?
                <SimpleGrid gap='4' pb='10' minChildWidth='250px'>
                    {messagesList.map((data, i) => (
                        <SmallMessageCard
                            key={i}
                            data={data}
                            onClick={() => {
                                openCardSlider(i)
                                console.log('djdjdjd')
                            }}
                        />
                    ))}
                </SimpleGrid>
                :
                <Center flexDirection='column' pt='12'>
                    <Image src={noMessagesImage} alt='pesan kosong' w='150px' />
                    <Text mt='4' fontSize='xl' textAlign='center' fontWeight='medium'>Yahh, Belum ada pesan untukmu</Text>
                </Center>
            }

            {isLoaded && isNotYetAllData &&
                <Center >
                    <Button
                        colorScheme='blue'
                        children='Temukan Lebih Banyak'
                        onClick={loadMoreHandler}
                    />
                </Center>
            }
            <CardSlider
                initialSlide={initialIndexSlider}
                isOpen={cardSlider.isOpen}
                onClose={cardSlider.onClose}
                datas={messagesList}
                isNotYetAllData={isNotYetAllData}
                loadMoreHandler={loadMoreHandler}
            />
        </Container>
    )
}