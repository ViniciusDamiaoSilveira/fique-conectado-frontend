import { createHashRouter } from "react-router-dom";

const router = createHashRouter([
    {
        element: <div> Hello World</div>,
        path: '/'
    }
])

export default router