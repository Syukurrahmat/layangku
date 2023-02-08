import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Create from "./page/create"
import Home from "./page/home"
import MessageList from "./page/messages"
import NotFound from "./page/404"

const App = () => (
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

export default App
