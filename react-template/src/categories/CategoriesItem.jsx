import React from 'react';

const CategoriesItem = () => {

    return (
                    <a href={''} className="card">
                        <div className="card-image">
                            <img className="img-responsive" src="/img/mm1-item.jpg"
                                 alt="OS X El Capitan" />
                        </div>
                        <div className="card-header">
                            <div className="card-title h5">Шоколад для себя</div>
                            <div className="card-subtitle text-gray">Горький и молочный</div>
                        </div>

                    </a>
                )
};

export default CategoriesItem;
