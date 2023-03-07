import { FC } from 'react';
import { Oval } from 'react-loader-spinner';

const Spinner: FC = () => {
    return (
        <Oval
            height={33}
            width={33}
            color='#ABCFD0'
            wrapperStyle={{ justifyContent: 'center', marginBootom: '450px' }}
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor=' #444f4f'
            strokeWidth={7}
            strokeWidthSecondary={7}

        />
    );
}
export default Spinner;