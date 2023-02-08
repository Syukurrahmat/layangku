import { Box, Portal } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard } from "swiper"
import { CSSTransition } from 'react-transition-group'
import { HTMLAttributes } from 'react'

import MessageCard, { MessageCardLoadMore } from './messageCard'

import "swiper/css/navigation"
import 'swiper/css'
import '../../styles/cardSlider.css'

interface ICardSlider extends HTMLAttributes<HTMLElement> {
    datas: Message[]
    isOpen: boolean
    onClose: () => void
    initialSlide: number
    isNotYetAllData: boolean
    loadMoreHandler: () => void
}

export default function CardSlider({ datas, isOpen, onClose, initialSlide, isNotYetAllData, loadMoreHandler }: ICardSlider) {
    return (
        <Portal>
            <CSSTransition
                in={isOpen}
                timeout={100}
                classNames="card-slider"
                unmountOnExit
                onEnter={() => document.body.style.overflow = "hidden"}
                onExited={() => document.body.style.overflow = ""}
            >
                <Box
                    w='full' h='100vh'
                    bg='blackAlpha.600'
                    pos='fixed' top='0' left='0'
                    onClick={event => {
                        const target = event.target as Element
                        if (target.classList.contains('swiper-slide')){
                            onClose()
                        }
                    } }
                >
                    <Swiper
                        modules={[Navigation, Keyboard]}
                        navigation={true}
                        initialSlide={initialSlide}
                        keyboard={{ enabled: true }}
                        slidesPerView={1}

                        style={{ height: '100%' }}
                    >
                        {datas?.map((data, i) => (
                            <SwiperSlide key={i} style={{ padding: '10px' }}>
                                <MessageCard className='my-card' data={data} onClose={onClose} />
                            </SwiperSlide>
                        ))}

                        {isNotYetAllData &&
                            <SwiperSlide style={{ padding: '10px' }}>
                                <MessageCardLoadMore
                                    loadMoreHandler={loadMoreHandler}
                                    onClose={onClose}
                                />
                            </SwiperSlide>}
                    </Swiper>
                </Box>
            </CSSTransition>

        </Portal>
    )
}
