import React from 'react';

const PageHeader = (props) => {
    return (
        <div className="section page-banner-section">
            <div className="shape-2"></div>
            <div className="container">
                <div className="page-banner-wrap">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-banner text-center">
                                <div className="title">{props.title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PageHeader;
