import  { useState, useEffect } from 'react';

function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
            setBlink(prev => !prev);
        }, 1000); 

        return () => clearInterval(intervalId); 
    }, []);

    const formattedHours = currentTime.getHours() % 12 || 12;
    const formattedMinutes = currentTime.getMinutes().toString().padStart(2, '0');
    const period = currentTime.getHours() < 12 ? 'AM' : 'PM';

    const days = ['Sun', 'Monday', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[currentTime.getDay()];
    const date = currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short'  });

    return (
        <div className={`bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A]  p-3 font-semibold text-sm`}>

            <div className='ml-16'>
                {formattedHours}
                <span className={blink ? 'opacity-0' : 'opacity-100'}>:</span>
                {formattedMinutes} {period}
            </div>
            <div className='ml-1.5'>
                {`${day} | ${date}`}
            </div>
                
               
            </div>
    );
}

export default Clock;
//bakcground : flex items-center p-2 w-100 h-14 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0