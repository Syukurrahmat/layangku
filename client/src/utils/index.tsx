import { CARD_COLORS } from "../config"

export const formatDate = (dateString: string) => {
    const dt = new Date(dateString)
    const option: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: undefined }

    if (new Date(Date.now()).getFullYear() !== dt.getFullYear()) option.year = 'numeric'

    return dt.toLocaleDateString('id-ID', option)
}

export const colorCardLib = (color = '') => {
    color = color.toLowerCase()
    if (!Object.keys(CARD_COLORS).includes(color)) color = 'white'
    const [bgColor, emojiBgColor] = CARD_COLORS[color]
    return { bgColor, emojiBgColor }
}
export const getRandomItem = (arr : any[]) => arr[Math.floor(Math.random() * arr.length)]
