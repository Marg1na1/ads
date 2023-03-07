import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { getAd, setAdvert } from '../../redux/slices/adSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { RootState, useAppDispatch } from '../../redux/store';
import style from './AdvertPage.module.scss';

const AdvertPage: FC = () => {

    const dispatch = useAppDispatch();

    const { id = '' } = useParams();

    const ad = useSelector((state: RootState) => state.adSlice.advert);
    const satus = useSelector((state: RootState) => state.adSlice.statuses);

    useEffect(() => {
        if (!ad) {
            dispatch(getAd(id))
        }
        return () => {
            dispatch(setAdvert(null))
        }
    }, [])

    const renderSlides = [...new Array(5)].map((_, i) =>
        <SwiperSlide key={i}>
            <img
                src='https://i.ibb.co/w0krBr0/image.webp'
                alt='img'
                className={style['img']}
            />
        </SwiperSlide>)

    const adDate = new Date(ad ? ad.createdAt.split(' ')[0] : '').toLocaleString('ru');

    if (satus === 'PENDING') {
        return <Spinner />
    } else if (satus === 'REJECTED') {
        return <>ошибка</>
    } else {
        return (
            <section className='container'>
                <article className={style['root']}>
                    <div className={style['crumb']}>
                        <h1 className={style['title']}>{ad?.title}</h1>
                        {
                            ad?.seen && <div className={style['seen']}>Просмотренно</div>
                        }
                    </div>
                    <Swiper
                        slidesPerView={4}
                        className={style['slider']}
                        pagination={{ clickable: true }}
                        loop={true}
                    >
                        {renderSlides}
                    </Swiper>
                    <div className={style['about']}>{ad?.about}</div>
                    <div className={style['crumb']}>
                        <div className={style['price']}>{ad?.price} ₽</div>
                        <button className={style['like']}>
                            <svg width='20' height='19' viewBox='0 0 20 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M19.4321 9.21218C18.5975 11.5152 12.8243 16.697 10.0421 19C7.60767 16.8889 2.42577 12.206 1.17376 10.3636C-0.391238 8.06056 -0.391267 4.60649 1.17375 2.3033C2.30214 0.642681 4.3037 0.000281163 5.86877 0C7.64008 -0.000318142 10.0421 2.30302 10.0421 2.30302C10.0421 2.30302 13.6938 -1.15134 17.3455 1.15179C20.2456 2.98093 20.4755 6.33341 19.4321 9.21218Z' fill='#C7C7C7' />
                            </svg>
                        </button>
                    </div>
                    <div className={style['crumb']}>
                        <div className={style['city']}>{ad?.address}</div>
                        <div className={style['date']}>{adDate}</div>
                    </div>
                </article>
            </section>
        );
    }
}

export default AdvertPage;

