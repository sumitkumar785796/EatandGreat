import React, { useEffect, useCallback, useState } from "react";
import NavBar from "../Partitals/NavBar";
import Footer from "../Partitals/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleMenuStore from "./SingleMenuStore";

const SingleMenu = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams("");
  const [view, setView] = useState({});
  const [viewSingle, setViewSingle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/addcategories/${id}`);
      const userData = res.data.data;
      setView(userData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [getData, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/product`);
        const filteredData = res.data.data.filter(
          (ele) => ele.categories.cname === view.cname
        );
        setViewSingle(filteredData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [view.cname]);

  // Get current items based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = viewSingle.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Disable previous button if currentPage is 1
  const isPreviousDisabled = currentPage === 1;

  // Calculate total number of pages
  const totalPages = Math.ceil(viewSingle.length / itemsPerPage);

  // Disable next button if currentPage is equal to totalPages
  const isNextDisabled = currentPage === totalPages;

  // Previous button onClick handler
  const handlePreviousClick = () => {
    if (!isPreviousDisabled) {
      paginate(currentPage - 1);
    }
  };

  // Next button onClick handler
  const handleNextClick = () => {
    if (!isNextDisabled) {
      paginate(currentPage + 1);
    }
  };

  return (
    <>
      <NavBar />
      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <h1>{view.cname}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}
      <div className="latest-news pt-150 pb-150">
        {loading ? (
          
            <img
              src="https://res.cloudinary.com/dw2zdqu4n/image/upload/v1709731860/samples/rffdkqsltukb9q8lrlit.gif"
              alt="loading"
              style={{ display: "block", margin: "auto" }}
            />
        ) : (
          <div className="container">
            <div className="row">{/* Section title */}</div>
            <div className="row">
              {/* Display items for the current page */}
              {currentItems &&
                currentItems.map((ele, index) => (
                  <SingleMenuStore
                    key={index}
                    id={ele._id}
                    itemname={ele.itemname}
                    desc={ele.desc}
                    price={ele.price}
                    image={ele.image}
                    qty={ele.qty}
                  />
                ))}
            </div>
            <div className="row">
              {/* Pagination */}
              <div className="col-lg-12 text-center">
                <div className="pagination-wrap">
                  <ul>
                    <li>
                      <a
                        onClick={handlePreviousClick}
                        href="#"
                        className={isPreviousDisabled ? "disabled" : ""}
                      >
                        Prev
                      </a>
                    </li>
                    {viewSingle &&
                      viewSingle.length > 0 &&
                      Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index}>
                          <a
                            onClick={() => paginate(index + 1)}
                            className={
                              currentPage === index + 1 ? "active" : ""
                            }
                            href="#"
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                    <li>
                      <a
                        onClick={handleNextClick}
                        href="#"
                        className={isNextDisabled ? "disabled" : ""}
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleMenu;
