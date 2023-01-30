declare type MessageBase = {
    sender: string,
    title: string,
    message: string,
    emoji: string,
    color: string,
}

declare type Message = MessageBase & {
    createdAt : string,
}

declare type MessageForm = MessageBase & {
    isAnonim: boolean,
    receiver: string,
}
interface IMyCustomPicker {
    name: string
    defaultValue: string
    onChange: (value: string) => void
}
