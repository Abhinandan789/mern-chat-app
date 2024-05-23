import { useEffect, useState } from 'react';

const DeviceDetection = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 700) { // Threshold for phones
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    useEffect(() => {
        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isSmallScreen) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-5 text-center w-full  shadow-md  backdrop-filter backdrop-blur-sm">
                <p className="w-50 color-#050b10 text-l text-center font-bold">
                    Whoa, small screen {<img className='w-4 inline-block' src="/smartphone.png" alt="phone-icon" />} <br />  This feature works best on tablets or laptops with bigger screens. You can still access it here, but things might be a bit cramped <br /> (You can {<img className='w-5 -mt-2 inline-block' src="/rotate.png" alt="tilt-phn-gif" />} or turn on desktop layout on your browser)
                </p>
            </div>
        );
    }

    return children;
};

export default DeviceDetection;
