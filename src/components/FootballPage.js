/*import React, { useState } from "react";
import "./FootballPage.css"; // Custom CSS for styling

const FootballPage = () => {
  const [vipTickets, setVipTickets] = useState(0);
  const [normalTickets, setNormalTickets] = useState(0);

  const VIP_PRICE = 1000;
  const NORMAL_PRICE = 500;

  const handleBuyNow = () => {
    const totalPrice = vipTickets * VIP_PRICE + normalTickets * NORMAL_PRICE;
    alert(`You have purchased:
        ${vipTickets} VIP Tickets
        ${normalTickets} Normal Tickets
        Total Price: Rs${totalPrice}`);
  };

  return (
    <div className="football-page">
      <h1>Football Match</h1>
      <div className="poster-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/4a/Nepal_Super_League_logo.png" // Replace with the actual poster URL
          alt="Football Match"
          className="poster"
        />
      </div>
      <div className="ticket-options">
        <div className="ticket">
          <h2>VIP Ticket</h2>
          <p>Price: Rs{VIP_PRICE}</p>
          <div className="ticket-counter">
            <button onClick={() => setVipTickets((prev) => Math.max(prev - 1, 0))}>
              -
            </button>
            <span>{vipTickets}</span>
            <button onClick={() => setVipTickets((prev) => prev + 1)}>+</button>
          </div>
        </div>
        <div className="ticket">
          <h2>Normal Seat</h2>
          <p>Price: Rs{NORMAL_PRICE}</p>
          <div className="ticket-counter">
            <button onClick={() => setNormalTickets((prev) => Math.max(prev - 1, 0))}>
              -
            </button>
            <span>{normalTickets}</span>
            <button onClick={() => setNormalTickets((prev) => prev + 1)}>+</button>
          </div>
        </div>
      </div>
      <div className="total-price">
        <h3>
          Total Price: Rs{vipTickets * VIP_PRICE + normalTickets * NORMAL_PRICE}
        </h3>
      </div>
      <button className="buy-now" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default FootballPage;


import React, { useState } from "react";
import "./FootballPage.css";

const FootballPage = () => {
  const [vipTickets, setVipTickets] = useState(0);
  const [normalTickets, setNormalTickets] = useState(0);
  const [showTicketOptions, setShowTicketOptions] = useState(false);
  const [selectedPosterIndex, setSelectedPosterIndex] = useState(null); // Track which poster's tickets are being purchased

  const vipPrice = 1000; // VIP ticket price
  const normalPrice = 500; // Normal ticket price
  const posters = [
    {
      url: "https://example.com/football-poster1.jpg", // Replace with actual poster URL
      title: "Football Match 1",
    },
    {
      url: "https://example.com/football-poster2.jpg", // Replace with actual poster URL
      title: "Football Match 2",
    },
    {
      url: "https://example.com/football-poster3.jpg", // Replace with actual poster URL
      title: "Football Match 3",
    },
    {
      url: "https://example.com/football-poster4.jpg", // Replace with actual poster URL
      title: "Football Match 4",
    },
  ];

  const totalPrice = vipTickets * vipPrice + normalTickets * normalPrice;

  const handlePurchase = () => {
    alert(`You have purchased:
    ${vipTickets} VIP Tickets
    ${normalTickets} Normal Tickets
    Total Price: ₹${totalPrice}`);
    setShowTicketOptions(false); // Hide ticket options after purchase
    setVipTickets(0); // Reset ticket counts
    setNormalTickets(0);
  };

  return (
    <div className="football-page">
      <h1>Football Event</h1>
      <div className="posters-container">
        {posters.map((poster, index) => (
          <div key={index} className="poster-container">
            <img
              src={poster.url}
              alt={poster.title}
              className="event-poster"
            />
            <h2>{poster.title}</h2>
            <button
              className="buy-tickets-button"
              onClick={() => {
                setSelectedPosterIndex(index); // Set the current poster being clicked
                setShowTicketOptions(true); // Show ticket options
              }}
            >
              Buy Tickets
            </button>
            {showTicketOptions && selectedPosterIndex === index && (
              <div className="ticket-options">
                <div className="ticket-type">
                  <h3>VIP Tickets</h3>
                  <p>Price: ₹{vipPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={vipTickets}
                    onChange={(e) => setVipTickets(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="ticket-type">
                  <h3>Normal Tickets</h3>
                  <p>Price: ₹{normalPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={normalTickets}
                    onChange={(e) => setNormalTickets(parseInt(e.target.value) || 0)}
                  />
                </div>
                <h2>Total Price: ₹{totalPrice}</h2>
                <button onClick={handlePurchase} className="purchase-button">
                  Purchase Tickets
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootballPage;




import React, { useState } from "react";
import "./FootballPage.css";

const FootballPage = () => {
  const [ticketData, setTicketData] = useState(
    Array(4).fill({ vipTickets: 0, normalTickets: 0, showTicketOptions: false })
  ); // State for each poster

  const vipPrice = 1000; // VIP ticket price
  const normalPrice = 500; // Normal ticket price
  const posters = [
    {
      url: "https://example.com/football-poster1.jpg", // Replace with actual poster URL
      title: "Football Match 1",
    },
    {
      url: "https://example.com/football-poster2.jpg", // Replace with actual poster URL
      title: "Football Match 2",
    },
    {
      url: "https://example.com/football-poster3.jpg", // Replace with actual poster URL
      title: "Football Match 3",
    },
    {
      url: "https://example.com/football-poster4.jpg", // Replace with actual poster URL
      title: "Football Match 4",
    },
  ];

  const handlePurchase = (index) => {
    const { vipTickets, normalTickets } = ticketData[index];
    const totalPrice = vipTickets * vipPrice + normalTickets * normalPrice;

    if (vipTickets > 0 || normalTickets > 0) {
      alert(`You have purchased:
      ${vipTickets} VIP Tickets
      ${normalTickets} Normal Tickets
      Total Price: ₹${totalPrice}`);
    } else {
      alert("Please select at least one ticket to purchase.");
    }

    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, vipTickets: 0, normalTickets: 0, showTicketOptions: false }
          : data
      )
    );
  };

  const handleBuyTicketsClick = (index) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, showTicketOptions: !data.showTicketOptions }
          : { ...data, showTicketOptions: false }
      )
    );
  };

  const handleInputChange = (index, type, value) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index ? { ...data, [type]: parseInt(value) || 0 } : data
      )
    );
  };

  return (
    <div className="football-page">
      <h1>Football Event</h1>
      <div className="posters-container">
        {posters.map((poster, index) => (
          <div key={index} className="poster-container">
            <img
              src={poster.url}
              alt={poster.title}
              className="event-poster"
            />
            <h2>{poster.title}</h2>
            <button
              className="buy-tickets-button"
              onClick={() => handleBuyTicketsClick(index)}
            >
              Buy Tickets
            </button>
            {ticketData[index].showTicketOptions && (
              <div className="ticket-options">
                <div className="ticket-type">
                  <h3>VIP Tickets</h3>
                  <p>Price: ₹{vipPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].vipTickets}
                    onChange={(e) =>
                      handleInputChange(index, "vipTickets", e.target.value)
                    }
                  />
                </div>
                <div className="ticket-type">
                  <h3>Normal Tickets</h3>
                  <p>Price: ₹{normalPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].normalTickets}
                    onChange={(e) =>
                      handleInputChange(index, "normalTickets", e.target.value)
                    }
                  />
                </div>
                <h2>
                  Total Price: ₹
                  {ticketData[index].vipTickets * vipPrice +
                    ticketData[index].normalTickets * normalPrice}
                </h2>
                <button
                  onClick={() => handlePurchase(index)}
                  className="purchase-button"
                >
                  Purchase Tickets
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootballPage;


import React, { useState } from "react";
import "./FootballPage.css";

const FootballPage = () => {
  const [ticketData, setTicketData] = useState(
    Array(4).fill({ vipTickets: 0, normalTickets: 0, showTicketOptions: false })
  );

  const vipPrice = 1000; // VIP ticket price
  const normalPrice = 500; // Normal ticket price
  const posters = [
    {
      url: "https://upload.wikimedia.org/wikipedia/en/0/02/2022_SAFF_Women%27s_Championship_Logo.png", // Replace with actual poster URL
      title: "Nepal Vs Bangladesh",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/en/4/4a/Nepal_Super_League_logo.png", // Replace with actual poster URL
      title: "Dhading Fc Vs Kathmandu Razyars Fc",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-BqfZbme3tbBBcfpBUadDdlCHwM-kmuWmQA&s", // Replace with actual poster URL
      title: "Chitwan Fc Vs Lalitpur Fc",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/en/5/53/2017_SAFF_U-15_Women%27s_Championship_logo.png", // Replace with actual poster URL
      title: "SriLanka Vs Maldives",
    },
  ];

  const handlePurchase = (index) => {
    const { vipTickets, normalTickets } = ticketData[index];
    const totalPrice = vipTickets * vipPrice + normalTickets * normalPrice;

    if (vipTickets > 0 || normalTickets > 0) {
      alert(`You have purchased:
      ${vipTickets} VIP Tickets
      ${normalTickets} Normal Tickets
      Total Price: Rs${totalPrice}`);
    } else {
      alert("Please select at least one ticket to purchase.");
    }

    // Reset the ticket options for the selected poster
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, vipTickets: 0, normalTickets: 0, showTicketOptions: false }
          : data
      )
    );
  };

  const handleBuyTicketsClick = (index) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, showTicketOptions: !data.showTicketOptions }
          : { ...data, showTicketOptions: false }
      )
    );
  };

  const handleInputChange = (index, type, value) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index ? { ...data, [type]: parseInt(value) || 0 } : data
      )
    );
  };

  return (
    <div className="football-page">
      <h1>Football Event</h1>
      <div className="posters-container">
        {posters.map((poster, index) => (
          <div key={index} className="poster-container">
            <img
              src={poster.url}
              alt={poster.title}
              className="event-poster"
            />
            <h2>{poster.title}</h2>
            <button
              className="buy-tickets-button"
              onClick={() => handleBuyTicketsClick(index)}
            >
              Buy Tickets
            </button>
            {ticketData[index].showTicketOptions && (
              <div className="ticket-options">
                <div className="ticket-type">
                  <h3>VIP Tickets</h3>
                  <p>Price: Rs{vipPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].vipTickets}
                    onChange={(e) =>
                      handleInputChange(index, "vipTickets", e.target.value)
                    }
                  />
                </div>
                <div className="ticket-type">
                  <h3>Normal Tickets</h3>
                  <p>Price: Rs{normalPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].normalTickets}
                    onChange={(e) =>
                      handleInputChange(index, "normalTickets", e.target.value)
                    }
                  />
                </div>
                <h2>
                  Total Price: Rs
                  {ticketData[index].vipTickets * vipPrice +
                    ticketData[index].normalTickets * normalPrice}
                </h2>
                <button
                  onClick={() => handlePurchase(index)}
                  className="purchase-button"
                >
                  Purchase Tickets
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootballPage;
*/



import React, { useState } from "react";
import "./FootballPage.css";

const FootballPage = () => {
  const [ticketData, setTicketData] = useState(
    Array(4).fill({ vipTickets: 0, normalTickets: 0, showTicketOptions: false })
  );

  const vipPrice = 1200; // VIP ticket price
  const normalPrice = 600; // Normal ticket price
  const posters = [
    {
      url: "https://upload.wikimedia.org/wikipedia/en/0/02/2022_SAFF_Women%27s_Championship_Logo.png", // Replace with actual poster URL
      title: "Nepal Vs Bangladesh",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/en/4/4a/Nepal_Super_League_logo.png", // Replace with actual poster URL
      title: "Dhading Fc Vs Kathmandu Fc",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-BqfZbme3tbBBcfpBUadDdlCHwM-kmuWmQA&s", // Replace with actual poster URL
      title: "Chitwan Fc Vs Lalitpur Fc",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/en/5/53/2017_SAFF_U-15_Women%27s_Championship_logo.png", // Replace with actual poster URL
      title: "SriLanka Vs Maldives",
    },
  ];
  const handlePurchase = (index) => {
    const { vipTickets, normalTickets } = ticketData[index];
    const totalPrice = vipTickets * vipPrice + normalTickets * normalPrice;

    if (vipTickets > 0 || normalTickets > 0) {
      alert(`You have purchased:
      ${vipTickets} VIP Tickets
      ${normalTickets} Normal Tickets
      Total Price: Rs${totalPrice}`);
    } else {
      alert("Please select at least one ticket to purchase.");
    }

    // Reset the ticket options for the selected poster
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, vipTickets: 0, normalTickets: 0, showTicketOptions: false }
          : data
      )
    );
  };

  const handleBuyTicketsClick = (index) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, showTicketOptions: !data.showTicketOptions }
          : { ...data, showTicketOptions: false }
      )
    );
  };

  const handleInputChange = (index, type, value) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index ? { ...data, [type]: parseInt(value) || 0 } : data
      )
    );
  };

  return (
    <div className="football-page">
      <h1>Football Event</h1>
      <div className="posters-container">
        {posters.map((poster, index) => (
          <div key={index} className="poster-container">
            <img
              src={poster.url}
              alt={poster.title}
              className="event-poster"
            />
            <h2>{poster.title}</h2>
            <button
              className="buy-tickets-button"
              onClick={() => handleBuyTicketsClick(index)}
            >
              Buy Tickets
            </button>
            {ticketData[index].showTicketOptions && (
              <div className="ticket-options">
                <div className="ticket-type">
                  <h3>VIP Tickets</h3>
                  <p>Price: Rs{vipPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].vipTickets}
                    onChange={(e) =>
                      handleInputChange(index, "vipTickets", e.target.value)
                    }
                  />
                </div>
                <div className="ticket-type">
                  <h3>Normal Tickets</h3>
                  <p>Price: Rs{normalPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].normalTickets}
                    onChange={(e) =>
                      handleInputChange(index, "normalTickets", e.target.value)
                    }
                  />
                </div>
                <h2>
                  Total Price: Rs
                  {ticketData[index].vipTickets * vipPrice +
                    ticketData[index].normalTickets * normalPrice}
                </h2>
                <button
                  onClick={() => handlePurchase(index)}
                  className="purchase-button"
                >
                  Purchase Tickets
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootballPage;




