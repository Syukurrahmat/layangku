import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Create from "./components/create"
import Home from "./components/home"
import MessageList from "./components/messageList"
import NotFound from "./components/notFound"

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
                ],
                errorElement: <NotFound />

            }
        ])} />
    )
}

export default App
