import React, { useEffect, useState } from "react";
import StoreMenu from './StoreMenu'
import axios from 'axios'

const Menu = () => {
  const [view, setView] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/addcategories');
        setView(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderMenuItems = () => {
    if (showMore) {
      return view.map((ele, index) => (
        <StoreMenu
          key={index}
          id={ele._id}
          cname={ele.cname}
          image={ele.image}
        />
      ));
    } else {
      return view.slice(0, 3).map((ele, index) => (
        <StoreMenu
          key={index}
          id={ele._id}
          cname={ele.cname}
          image={ele.image}
        />
      ));
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {/* product section */}
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3><span className="orange-text">Our</span> Menu</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {renderMenuItems()}
          </div>
          {view.length > 3 && (
            <div className="row">
              <div className="col text-center">
                <button className="btn btn-primary" onClick={toggleShowMore}>
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end product section */}
    </>
  );
};

export default Menu;
