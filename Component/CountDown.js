import React, { useEffect, useState } from 'react';

const CountDown = () => {

    const [timeLeft, setTimeLeft] = useState({
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const countdownDate = new Date("2024/10/24").getTime();
            const now = new Date().getTime();
            const difference = countdownDate - now;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            setTimeLeft({
                days,
                hours,
                minutes,
                seconds
            });
        };

        const countdownInterval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(countdownInterval);
    }, []);

    return (
        <div className="meeta-countdown countdown item-0">
            <div className="single-countdown">
                <span className="count countdown__time">{timeLeft.days}</span>
                <span className="value countdown__time">Days</span>
            </div>
            <div className="single-countdown">
                <span className="count countdown__time">{timeLeft.hours}</span>
                <span className="value countdown__time">Hours</span>
            </div>
            <div className="single-countdown">
                <span className="count countdown__time">{timeLeft.minutes}</span>
                <span className="value countdown__time">Minutes</span>
            </div>
            <div className="single-countdown">
                <span className="count countdown__time">{timeLeft.seconds}</span>
                <span className="value countdown__time">Seconds</span>
            </div>
        </div>
    )
}

export default CountDown
