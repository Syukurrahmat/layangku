import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Create from "./components/create"
import Home from "./components/home"
import MessageList from "./components/messageList"

function App() {
    return (
        <RouterProvider router={createBrowserRouter([
            {
                path: '/',
                element: <Home />,
                children: [
                    {
                        path: '/messages/:receiver',
                        element: <MessageList />
                    },
                    {
                        path: '/create',
                        element: <Create />
                    }
                ]
            }
        ])} />
    )
}

export default App
