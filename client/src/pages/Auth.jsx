import { useState } from 'react';
import Img from '../assets/undraw_like_dislike_re_dwcj.svg';
import AuthForm from '../components/AuthForm';
import Logo from '../components/Logo';
import Error from '../components/Error';

export default function Auth() {
    
    const [isUserCreatingAcc, setIsUserCreatingAcc] = useState(false);
    
    const [showErr, setShowErr] = useState(false);

    const [errMessage, setErrMessage] = useState('');

    const showErrComponent = (state, message) => {

        setErrMessage(message);
        setShowErr(state);

        // DOCS: if false, do not set state back to true lol.
        if (state) {
            setTimeout(() => {
            setShowErr(false);
        }, 5000);
        }
    }

    return (
        <div className='bg-my-cream'>
            
            <nav className='
            w-full
			bg-my-dark-blue
			text-my-cream
			flex flex-col justify-center items-center
			h-16
			border-b-2 border-my-cream-tone
			shadow-lg
            px-4
            relative
			sm:justify-between sm:flex-row sm:border-none
            '>
                <Logo />
            </nav>

            {showErr && <Error message={errMessage} toggleErr={showErrComponent} top={100} />}

            {/* page */}
            <div className='
            text-my-dark-blue
            flex flex-col justify-start items-center
            pt-4
            min-h-[91vh]
            md:flex-row md:justify-center
            '>
                <div className='
                flex flex-col justify-evenly items-center gap-8
                w-full
                mb-8 md:m-0'
                >
                    <div className='max-md:text-center'>
                        <span className=''>Got an opinion? Share it here.</span>

                        <h1 className='text-2xl md:text-4xl'>
                            {isUserCreatingAcc ? 'Create an account.' : 'Sign in.'}
                        </h1>
                    </div>

                    <img src={Img} alt='girl voting' className='w-min h-28 md:h-[300px]' />
                </div>

                <AuthForm isUserCreatingAcc={isUserCreatingAcc} setIsUserCreatingAcc={setIsUserCreatingAcc} showErrComponent={showErrComponent} setErrMessage={setErrMessage} />
            </div>
        </div>
    )
}