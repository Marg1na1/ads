import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AdvertModel } from '../../models';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import style from './Card.module.scss';

const Card: FC<AdvertModel> = ({ createdAt, price, title, address, seen, id }) => {

    const adDate = new Date(createdAt.split(' ')[0]).toLocaleString('ru');

    const renderSlides = [...new Array(4)].map((_, i) =>
        <SwiperSlide key={i}>
            <img
                src='https://i.ibb.co/w0krBr0/image.webp'
                alt='img'
                className={style['img']}
            />
        </SwiperSlide>)
    return (
        <li className={style['ad']}>
            <article className={style['root']}>
                <Link to={id}>
                    <Swiper
                        slidesPerView={1}
                        className={style['slider']}
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                    >
                        {renderSlides}
                    </Swiper>
                </Link>
                <div className={style['main']}>
                    <div className={style['scrap']}>
                        <p className={style['price']}>{price} ₽</p>
                        <button className={style['like']}>
                            <svg width='20' height='19' viewBox='0 0 20 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M19.4321 9.21218C18.5975 11.5152 12.8243 16.697 10.0421 19C7.60767 16.8889 2.42577 12.206 1.17376 10.3636C-0.391238 8.06056 -0.391267 4.60649 1.17375 2.3033C2.30214 0.642681 4.3037 0.000281163 5.86877 0C7.64008 -0.000318142 10.0421 2.30302 10.0421 2.30302C10.0421 2.30302 13.6938 -1.15134 17.3455 1.15179C20.2456 2.98093 20.4755 6.33341 19.4321 9.21218Z' fill='#C7C7C7' />
                            </svg>
                        </button>
                    </div>
                    <h2 className={style['title']}>{title}</h2>
                    <div className={style['scrap']}>
                        <p className={style['city']}>{address}</p>
                        <p className={style['date']}>{adDate}</p>
                    </div>
                </div>
                {
                    seen && <div className={style['viewed']}>просмотренно</div>
                }
            </article>
        </li>
    );
}

export default Card;