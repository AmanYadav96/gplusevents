// !function(s){"use strict";s(".switch").on("click",function(){s("body").hasClass("light")?(s("body").removeClass("light"),s(".switch").removeClass("switched")):(s("body").addClass("light"),s(".switch").addClass("switched"))}),s(document).ready(function(){var e=document.querySelector(".progress-wrap path"),t=e.getTotalLength();e.style.transition=e.style.WebkitTransition="none",e.style.strokeDasharray=t+" "+t,e.style.strokeDashoffset=t,e.getBoundingClientRect(),e.style.transition=e.style.WebkitTransition="stroke-dashoffset 10ms linear";var o=function(){var o=s(window).scrollTop(),r=s(document).height()-s(window).height(),i=t-o*t/r;e.style.strokeDashoffset=i};o(),s(window).scroll(o);jQuery(window).on("scroll",function(){jQuery(this).scrollTop()>50?jQuery(".progress-wrap").addClass("active-progress"):jQuery(".progress-wrap").removeClass("active-progress")}),jQuery(".progress-wrap").on("click",function(s){return s.preventDefault(),jQuery("html, body").animate({scrollTop:0},550),!1})})}(jQuery);
import { useState, useEffect } from 'react';

function BackToTop() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / documentHeight) * 310;
            setScrollProgress(progress);
        };

        handleScroll(); // Initial progress calculation
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`progress-wrap ${scrollProgress > 1 ? "active-progress" : ""}`} onClick={scrollTop}>
            <svg className="progress-circle svg-content" width="100%" height="100%" viewBox='-1 -1 102 102'>
                <path
                    fill="none"
                    stroke="#007bff"
                    strokeWidth="2"
                    strokeDasharray="314 314"
                    strokeDashoffset={scrollProgress}
                    strokeLinecap="round"
                    d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"

                />
            </svg>

        </div>
    );
}

export default BackToTop;
