import React from 'react';
import Image from "next/image";
import Link from 'next/link';

const Collaborators = ({ users, usertype }) => {
    return (
        <div className="collaborators-wrapper">
            <div className="collaborators-row">
                {users && users.map((list, index) => (
                    <div className="single-collaborator" key={index}>
                        <div className="collaborator-image">
                            <Link href={usertype === 14 ? `/organisation/${list.slug}` : `/collaborators/${list.slug}`}>
                                <Image src={list.image} height={200} width={200} alt="Collaborator" />
                            </Link>
                        </div>
                        <div className="collaborator-content">
                            <h4 className="collaborator-name">
                                <Link href={usertype === 14 ? `/organisation/${list.slug}` : `/collaborators/${list.slug}`}>
                                    {list?.name.charAt(0).toUpperCase() + list?.name.slice(1)}
                                </Link>
                            </h4>
                            {/* <Image className="collaborator-shape" src="/assets/images/shape/shape-8.png" height={24} width={290} alt="" /> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Collaborators;
