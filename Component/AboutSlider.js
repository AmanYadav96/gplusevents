import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ReactOwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});

const AboutSlider = ({ events }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
    }, [events]);

    if (!ReactOwlCarousel || !isClient) return null;

    return (
        <div className="carousel" data-ride="carousel" data-pause="hover" data-interval="10000" data-duration="2000">
            <ReactOwlCarousel className="carousel-inner" role="listbox"
                items={1}
                loop={true}
                nav={false}
                margin={10}
                autoplay={true}
                dots={false}
                autoplayTimeout={5000}>
                {events?.gold?.length ? (
                    events.gold.map((event, index) => (
                        <div className='carousel-item active image' key={event.image_url + index}>
                            <Link href={event.event_type === 1 ? `/announcement/${event.slug}` : `/event/${event.slug}`}><Image className='height-auto' src={event.image_url} alt="About" width={459} height={575} /></Link>
                        </div>
                    ))
                ) : (
                    <p>No Featured Events available</p>
                )}
            </ReactOwlCarousel>
        </div>
    );
};

export default AboutSlider;
