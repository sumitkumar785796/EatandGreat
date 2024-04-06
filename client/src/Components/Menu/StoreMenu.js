import React from 'react'
import { NavLink } from 'react-router-dom';
const StoreMenu = ({id,cname,image}) => {
    return (
        <>
            <div className="col-lg-4 col-md-6 text-center">
                <div className="single-product-item">
                    <div className="product-image">
                        <NavLink to={`/SingleMenu/${id}`} ><img src={image} alt={cname} style={{width:'30vw', height:'25vh'}}/></NavLink>
                    </div>
                    <h3>{cname}</h3>
                </div>
            </div>
        </>
    )
}

export default StoreMenu