import React from 'react'
import Image from "next/image";
import Link from 'next/link';
const OurSpeakers = () => {
  return (
    <>
      <div className="row gy-5 meeta-speakers-row">
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-1.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">Mike Fermalin</Link></h4>
                <p className="speaker-designation">Lead Speaker</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-2.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">Harnold Min</Link></h4>
                <p className="speaker-designation">Lead Speaker</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-3.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">Joakim Ken</Link></h4>
                <p className="speaker-designation">Developer</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-4.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">Andrew Inon</Link></h4>
                <p className="speaker-designation">Developer</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-5.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">kin Joan</Link></h4>
                <p className="speaker-designation">Developer</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-6.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">Aronic Kenan</Link></h4>
                <p className="speaker-designation">Developer</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-7.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">Kinda Mona</Link></h4>
                <p className="speaker-designation">Developer</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="single-speaker">
            <div className="speaker-image">
              <Link href="/promoter"><Image src="/assets/images/speaker-8.jpg" height={200} width={200} alt="Speaker" /></Link>
            </div>
            <div className="speaker-content">
              <div className="speaker-content-box">
                <h4 className="speaker-name"><Link href="/promoter">Mike Fermalin</Link></h4>
                <p className="speaker-designation">Developer</p>
              </div>
              <Image className="speaker-shape-1" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" />
              <div className="speaker-shape-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default OurSpeakers;
