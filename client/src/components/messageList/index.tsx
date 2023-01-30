import { useDisclosure, Button, Container, Divider, Grid, GridItem, Center } from "@chakra-ui/react"
import { useRef } from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Data } from "../../services/data"
import CardSlider from '../cardSlider'
import HeadingWithIcon from "../headingWithIcon"
import SmallMessageCard from "../messageCard/smallMessageCard"

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
                subtitle={totalCount ? `${totalCount} Pesan untukmu ditemukan` : 'Mencari pesan untukmu'}
            />
            <Divider my='6' />

            <Grid gap='4' pb='10' templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                {messagesList.map((data, i) => (
                    <SmallMessageCard
                        as={GridItem}
                        data={data}
                        key={i}
                        onClick={() => openCardSlider(i)}
                    />
                ))}
            </Grid>
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