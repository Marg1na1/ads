import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdvertPage } from './pages/AdvertPage'
import { Home } from './pages/Home'

const App: FC = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path='/:id' element={<AdvertPage />} />
            <Route path='*' element={<div>не туда</div>} />
        </Routes>
    )
}

export default App
