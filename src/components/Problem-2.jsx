import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const SCROLL_THRESHOLD = 200;

const Problem2 = () => {
  const [modalAIsOpen, setModalAIsOpen] = useState(false);
  const [modalBIsOpen, setModalBIsOpen] = useState(false);
  const [modalCIsOpen, setModalCIsOpen] = useState(false);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const openModalA = () => {
    setModalAIsOpen(true);
    setModalBIsOpen(false);
    setModalCIsOpen(false);
    setCurrentPage(1);
    fetchContacts();
    // Update the URL
    window.history.pushState({}, null, "/modalA");
  };

  const openModalB = () => {
    setModalAIsOpen(false);
    setModalBIsOpen(true);
    setModalCIsOpen(false);
    setCurrentPage(1);
    fetchUSContacts();
    // Update the URL
    window.history.pushState({}, null, "/modalB");
  };

  const openModalC = () => {
    setModalAIsOpen(false);
    setModalBIsOpen(false);
    setModalCIsOpen(true);
  };

  const closeModalA = () => {
    setModalAIsOpen(false);
    // Restore the URL
    window.history.pushState({}, null, "/");
  };

  const closeModalB = () => {
    setModalBIsOpen(false);
    // Restore the URL
    window.history.pushState({}, null, "/");
  };

  const closeModalC = () => setModalCIsOpen(false);

  const handleCheckboxChange = () => setOnlyEvenChecked(!onlyEvenChecked);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Delayed search after a small delay
    setTimeout(() => fetchContacts(), 300);
  };

  const fetchContacts = () => {
    axios
      .get("https://contact.mediusware.com/api/contacts", {
        params: {
          country: onlyEvenChecked ? undefined : "US",
          page: currentPage,
          search: searchQuery,
        },
      })
      .then((response) => {
        setFilteredContacts((prevContacts) => [
          ...prevContacts,
          ...response.data,
        ]);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  const fetchUSContacts = () => {
    axios
      .get("https://contact.mediusware.com/api/contacts", {
        params: {
          country: "US",
          page: currentPage,
          search: searchQuery,
        },
      })
      .then((response) => {
        setFilteredContacts((prevContacts) => [
          ...prevContacts,
          ...response.data,
        ]);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error("Error fetching US contacts:", error));
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + windowHeight) < SCROLL_THRESHOLD) {
      fetchContacts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
            style={{ backgroundColor: "#46139f" }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
            style={{ backgroundColor: "#ff7f50" }}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      <Modal isOpen={modalAIsOpen} onRequestClose={closeModalA}>
        <h2>Modal A</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={openModalC}
            style={{ cursor: "pointer" }}
          >
            {contact.name}
          </div>
        ))}
        <div>
          <label>
            <input
              type="checkbox"
              checked={onlyEvenChecked}
              onChange={handleCheckboxChange}
            />
            Only even
          </label>
        </div>
        <div>
          <button onClick={openModalA} style={{ backgroundColor: "#46139f" }}>
            Modal Button A
          </button>
          <button onClick={openModalB} style={{ backgroundColor: "#ff7f50" }}>
            Modal Button B
          </button>
          <button onClick={closeModalA} style={{ backgroundColor: "#46139f" }}>
            Close
          </button>
        </div>
      </Modal>

      {/* Modal B */}
      <Modal isOpen={modalBIsOpen} onRequestClose={closeModalB}>
        <h2>Modal B</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={openModalC}
            style={{ cursor: "pointer" }}
          >
            {contact.name}
          </div>
        ))}
        <div>
          <label>
            <input
              type="checkbox"
              checked={onlyEvenChecked}
              onChange={handleCheckboxChange}
            />
            Only even
          </label>
        </div>
        <div>
          <button onClick={openModalA} style={{ backgroundColor: "#46139f" }}>
            Modal Button A
          </button>
          <button onClick={openModalB} style={{ backgroundColor: "#ff7f50" }}>
            Modal Button B
          </button>
          <button onClick={closeModalB} style={{ backgroundColor: "#46139f" }}>
            Close
          </button>
        </div>
      </Modal>

      {/* Modal C */}
      <Modal isOpen={modalCIsOpen} onRequestClose={closeModalC}>
        <h2>Modal C</h2>
        {/* Display contact details */}
        {/* ... */}
        <div>
          <button
            onClick={closeModalC}
            style={{
              backgroundColor: "#46139f",
              color: "white",
              border: "1px solid #46139f",
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Problem2;
