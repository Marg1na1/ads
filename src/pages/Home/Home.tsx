import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../components/Card';
import { getAds, setCurrentPage } from '../../redux/slices/adsSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import AdSkeleton from '../../skeletons/AdSkeleton/AdSkeleton';
import style from './Home.module.scss';

const Home: FC = () => {

    const dispatch = useAppDispatch()

    const ads = useSelector((state: RootState) => state.adsSlice.adverts)
    const paginate = useSelector((state: RootState) => state.adsSlice.paginate)
    const status = useSelector((state: RootState) => state.adsSlice.statuses)

    useEffect(() => {
        if (paginate.page * 10 > ads.length) {
            dispatch(getAds(paginate.page))
        }
    }, [paginate.page])

    const renderSkeleton = [...new Array(12)].map((_, i) => <AdSkeleton key={i} />)
    const renderCards = ads.map((obj, i) => <Card {...obj} key={i} />)

    const getMoreAds = () => {
        dispatch(setCurrentPage(paginate.page + 1))
    }

    return (
        <section className='container'>
            <ul className={style['grid']}>
                {
                    status === 'PENDING' ? renderSkeleton : renderCards
                }
            </ul>
            {
                (paginate.pages && paginate.pages > paginate.page) && <button className={style['more']} onClick={getMoreAds}>Показать еще</button>
            }
        </section>
    );
}

export default Home;