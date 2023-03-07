import { FC } from 'react'
import ContentLoader from 'react-content-loader'

const AdSkeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={224}
        height={364}
        viewBox='0 0 224 364'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <rect x='0' y='0' rx='15' ry='15' width='224' height='260' />
        <rect x='0' y='245' rx='0' ry='0' width='224' height='15' />
        <rect x='12' y='270' rx='8' ry='8' width='166' height='25' />
        <rect x='187' y='270' rx='8' ry='8' width='25' height='25' />
        <rect x='12' y='305' rx='8' ry='8' width='200' height='16' />
        <rect x='12' y='330' rx='8' ry='8' width='200' height='14' />
    </ContentLoader>
)

export default AdSkeleton