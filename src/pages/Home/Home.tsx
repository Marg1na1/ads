import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../components/Card';
import { Spinner } from '../../components/Spinner';
import { getAds, setCurrentPage } from '../../redux/slices/adsSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { AdSkeleton } from '../../skeletons/AdSkeleton';
import style from './Home.module.scss';

const Home: FC = () => {

    const dispatch = useAppDispatch();

    const ads = useSelector((state: RootState) => state.adsSlice.adverts);
    const paginate = useSelector((state: RootState) => state.adsSlice.paginate);
    const status = useSelector((state: RootState) => state.adsSlice.statuses);

    useEffect(() => {
        if (paginate.page * 10 > ads.length) {
            dispatch(getAds(paginate.page))
        } 
    }, [paginate.page])

    const renderSkeleton = [...new Array(20)].map((_, i) => <AdSkeleton key={i} />);
    const renderCards = ads.map((obj, i) => <Card {...obj} key={i} />);

    const getMoreAds = () => {
        dispatch(setCurrentPage(paginate.page + 1))
    }

    const getBtnStatuses = () => {
        if (status === 'PENDING') {
            return <Spinner />
        } else if (paginate.pages && paginate.pages > paginate.page) {
            return <button className={style['more']} onClick={getMoreAds}>Показать еще</button>
        } else if (status === 'REJECTED') {
            return (
                <div className={style['reject']}>
                    <p className={style['reject-message']}>Ошибка при загрузке</p>
                    <button className={style['reject-btn']} onClick={getMoreAds}>Повторить попытку</button>
                </div>
            )
        }
        else {
            null
        }
    }

    if (status === 'FULFILLED' && ads.length <= 0) {
        return (
            <section className='container'>
                <div className={style['empty']}>
                    <div className={style['empty__container']}>
                        <h1 className={style['empty-title']}>ОБЪЯВЛЕНИЙ НЕ НАЙДЕНО</h1>
                        <p className={style['empty-descr']}>Простите, по&nbsp;вашему запросу товаров сейчас нет. Задайте запрос по-другому или измените характеристики</p>
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section className='container'>
                <ul className={style['grid']}>
                    {
                        ads.length > 9 ? renderCards : status === 'PENDING' ? renderSkeleton : renderCards
                    }
                </ul>
                {getBtnStatuses()}
            </section>
        );
    }
}

export default Home;