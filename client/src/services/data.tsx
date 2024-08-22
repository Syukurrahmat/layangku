const APIURL = 'https://api-layangku.vercel.app'

export const Data = {
    async getMessageList(receiver: string, page = 1) {
        return await fetch(APIURL + '/messages?receiver=' + receiver + '&page=' + page)
            .then(e => e.json())
    },

    async createMessage({ color, emoji, isAnonim, message, receiver, sender, title }: MessageForm) {
        return await fetch(APIURL + '/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ color, emoji, message, receiver, sender: isAnonim ? undefined : sender, title })
        }).then(e => e.status)
    }
}