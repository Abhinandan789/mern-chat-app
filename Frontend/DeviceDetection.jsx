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
        handleResize(); // Check on component mount
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isSmallScreen) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-red-100 text-red-700">
                {/* <div ><iframe src="https://giphy.com/embed/EdB2g3VFDoKs57oe1w" className="h-30 w-30"></iframe></div> */}
                <p className="text-sm text-center font-bold">
                    Hey there, phone magician! We see you trying to make this app work on that tiny screen, but its like trying to fit a rock concert on a postage stamp.  For the full experience, check it out on a tablet or laptop.  Of course, if youre feeling like a phone maestro, you can try desktop mode in your browser and see if you can conduct the symphony of features!
                </p>
            </div>
        );
    }

    return children;
};

export default DeviceDetection;
