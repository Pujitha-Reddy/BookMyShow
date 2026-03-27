
import React, { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showBookingHistory, setShowBookingHistory] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  const seatPrice = 20;

  const movies = [
    {
      id: 1,
      name: "Project Hail Mary",
      rating: "PG-13",
      runtime: "2 hr 36 min",
      genre: "Action, Adventure, Science Fiction",
      language: "English",
      poster: "/posters/project-hail-mary.jpg",
      showtimes: ["10:00 AM", "1:30 PM", "6:00 PM", "9:30 PM"]
    },
    {
      id: 2,
      name: "They Will Kill You",
      rating: "R",
      runtime: "1 hr 34 min",
      genre: "Horror",
      language: "English",
      poster: "/posters/they.jpg",
      showtimes: ["11:00 AM", "2:00 PM", "7:00 PM"]
    },
    {
      id: 3,
      name: "Hoppers",
      rating: "PG",
      runtime: "1 hr 45 min",
      genre: "Kids Comedy",
      language: "Spanish, English",
      poster: "/posters/hoppers.jpg",
      showtimes: ["9:30 AM", "12:15 PM", "4:30 PM", "8:15 PM"]
    },
    {
      id: 4,
      name: "Avatar: Fire and Ash",
      rating: "PG-13",
      runtime: "3 hr 18 min",
      genre: "Thriller, Action, Adventure",
      language: "Telugu, English",
      poster: "/posters/avatar.jpg",
      showtimes: ["10:45 AM", "3:00 PM", "8:00 PM"]
    },
    {
      id: 5,
      name: "Dhurandhar The Revenge",
      rating: "NR",
      runtime: "3 hr 55 min",
      genre: "Action, Thriller",
      language: "Telugu, Hindi, English",
      poster: "/posters/dhurandhar.jpg",
      showtimes: ["11:30 AM", "4:00 PM", "9:00 PM"]
    },
    {
      id: 6,
      name: "Bersharma",
      rating: "NR",
      runtime: "1 hr 40 min",
      genre: "Action",
      language: "English, Arabic",
      poster: "/posters/bersharma.jpg",
      showtimes: ["10:15 AM", "1:00 PM", "6:30 PM"]
    },
    {
      id: 7,
      name: "Aadu 3",
      rating: "NR",
      runtime: "2 hr 46 min",
      genre: "Foreign",
      language: "Malayalam",
      poster: "/posters/aadu3.jpg",
      showtimes: ["9:00 AM", "1:45 PM", "7:15 PM"]
    },
    {
      id: 8,
      name: "Reminders of Him",
      rating: "PG-13",
      runtime: "1 hr 54 min",
      genre: "Love, Romance",
      language: "English",
      poster: "/posters/remindersofhim.jpg",
      showtimes: ["10:30 AM", "2:30 PM", "7:30 PM"]
    },
    {
      id: 9,
      name: "Crime 101",
      rating: "R",
      runtime: "2 hr 20 min",
      genre: "Crime",
      language: "English",
      poster: "/posters/crime101.jpg",
      showtimes: ["12:00 PM", "4:15 PM", "8:45 PM"]
    },
    {
      id: 10,
      name: "Solo Mio",
      rating: "PG",
      runtime: "1 hr 37 min",
      genre: "Comedy, Romance",
      language: "English, Spanish",
      poster: "/posters/solomio.jpg",
      showtimes: ["9:45 AM", "12:45 PM", "6:00 PM"]
    }
  ];

  const rows = ["A", "B", "C", "D", "E"];
  const cols = [1, 2, 3, 4, 5, 6];

  const bookedSeats = ["A2", "A5", "B3", "C4", "D1", "E6"];

  const filteredMovies = movies.filter((movie) => {
    const text = `${movie.name} ${movie.genre} ${movie.language}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedTime("");
    setShowSeats(false);
    setSelectedSeats([]);
    setBookingConfirmed(false);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setShowBookingHistory(false);
  };

  const confirmBooking = () => {
    if (
      selectedSeats.length === 0 ||
      !customerName.trim() ||
      !customerEmail.trim() ||
      !customerPhone.trim()
    ) {
      return;
    }

    const newBooking = {
      id: Date.now(),
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      movie: selectedMovie.name,
      time: selectedTime,
      seats: selectedSeats,
      total: total
    };


    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setBookingConfirmed(true);
  };

  const cancelBooking = (id) => {
  const updatedBookings = bookings.filter((booking) => booking.id !== id);
  setBookings(updatedBookings);
  localStorage.setItem("bookings", JSON.stringify(updatedBookings));
};

  const total = selectedSeats.length * seatPrice;

  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    },
    header: {
      backgroundColor: "#d81f26",
      color: "white",
      padding: "16px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    },
    brand: { margin: 0 },
    headerRight: {
      display: "flex",
      gap: "12px",
      alignItems: "center"
    },
    search: {
      padding: "10px 12px",
      width: "280px",
      borderRadius: "6px",
      border: "none",
      outline: "none"
    },
    headerButton: {
      backgroundColor: "white",
      color: "#d81f26",
      border: "none",
      padding: "10px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    container: { padding: "30px" },
    movieGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "24px",
      marginTop: "24px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
    },
    poster: {
      width: "100%",
      height: "320px",
      objectFit: "cover",
      backgroundColor: "#ddd"
    },
    cardBody: { padding: "16px" },
    button: {
      backgroundColor: "#d81f26",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px"
    },
    secondaryButton: {
      backgroundColor: "#e0e0e0",
      color: "#222",
      border: "none",
      padding: "10px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "16px",
      marginRight: "10px"
    },
    panel: {
      backgroundColor: "white",
      maxWidth: "900px",
      margin: "0 auto",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
    },
    successPanel: {
      backgroundColor: "white",
      maxWidth: "700px",
      margin: "0 auto",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
      textAlign: "center"
    },
    bookingHistoryCard: {
      backgroundColor: "white",
      marginBottom: "16px",
      padding: "18px",
      borderRadius: "10px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
    },
    timeButton: (active) => ({
      backgroundColor: active ? "#d81f26" : "white",
      color: active ? "white" : "#d81f26",
      border: "1px solid #d81f26",
      padding: "10px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "10px",
      marginBottom: "10px"
    }),
    seatButton: (selected, booked) => ({
      width: "48px",
      height: "40px",
      margin: "6px",
      borderRadius: "6px",
      cursor: booked ? "not-allowed" : "pointer",
      border: "1px solid #999",
      backgroundColor: booked ? "#999" : selected ? "#d81f26" : "white",
      color: booked || selected ? "white" : "black"
    }),
    screen: {
      margin: "20px auto 30px",
      width: "320px",
      textAlign: "center",
      padding: "10px",
      backgroundColor: "#ddd",
      borderRadius: "20px"
    },
    summaryBox: {
      marginTop: "24px",
      padding: "18px",
      backgroundColor: "#fafafa",
      borderRadius: "10px",
      border: "1px solid #eee"
    },
    legend: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px",
      alignItems: "center"
    },
    legendBox: (color) => ({
      width: "18px",
      height: "18px",
      backgroundColor: color,
      display: "inline-block",
      borderRadius: "4px",
      marginRight: "6px"
    }),
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box"
    },
    successIcon: {
      fontSize: "48px",
      marginBottom: "10px"
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.brand}>BookMyShow</h1>

        <div style={styles.headerRight}>
          {!selectedMovie && !showBookingHistory && (
            <input
              type="text"
              placeholder="Search by movie, genre, language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.search}
            />
          )}

          <button
            style={styles.headerButton}
            onClick={() => {
              resetBooking();
              setShowBookingHistory(true);
            }}
          >
            My Bookings
          </button>

          {showBookingHistory && (
            <button
              style={styles.headerButton}
              onClick={() => setShowBookingHistory(false)}
            >
              Home
            </button>
          )}
        </div>
      </header>

      <div style={styles.container}>
        {showBookingHistory ? (
          <>
            <h2>My Bookings</h2>

            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} style={styles.bookingHistoryCard}>
                  <p><strong>Name:</strong> {booking.name}</p>
                  <p><strong>Email:</strong> {booking.email}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                  <p><strong>Movie:</strong> {booking.movie}</p>
                  <p><strong>Showtime:</strong> {booking.time}</p>
                  <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
                  <p><strong>Total:</strong> ${booking.total}</p>
                  <button
                  style={styles.button}
                  onClick={() => cancelBooking(booking.id)}>
                    Cancel Booking
                  </button>
                </div>
              ))
            )}
          </>
        ) : !selectedMovie ? (
          <>
            <h2>Now Showing</h2>

            <div style={styles.movieGrid}>
              {filteredMovies.map((movie) => (
                <div key={movie.id} style={styles.card}>
                  <img src={movie.poster} alt={movie.name} style={styles.poster} />

                  <div style={styles.cardBody}>
                    <h3>{movie.name}</h3>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                    <p><strong>Runtime:</strong> {movie.runtime}</p>
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Language:</strong> {movie.language}</p>

                    <button
                      style={styles.button}
                      onClick={() => {
                        setSelectedMovie(movie);
                        setSelectedTime("");
                        setShowSeats(false);
                        setSelectedSeats([]);
                        setBookingConfirmed(false);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : bookingConfirmed ? (
          <div style={styles.successPanel}>
  <div style={{ fontSize: "50px" }}>🎟️</div>
  <h2>Booking Confirmed</h2>

  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      borderRadius: "12px",
      background: "#fff",
      border: "2px dashed #d81f26",
      textAlign: "left"
    }}
  >
    <h3 style={{ color: "#d81f26" }}>{selectedMovie.name}</h3>

    <p><strong>Name:</strong> {customerName}</p>
    <p><strong>Email:</strong> {customerEmail}</p>
    <p><strong>Phone:</strong> {customerPhone}</p>

    <hr />

    <p><strong>Showtime:</strong> {selectedTime}</p>
    <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
    <p><strong>Total Paid:</strong> ₹{total}</p>

    <div
      style={{
        marginTop: "20px",
        textAlign: "center",
        fontFamily: "monospace",
        letterSpacing: "4px"
      }}
    >
      ||||| || ||||| ||||
    </div>
  </div>

  <button style={styles.button} onClick={resetBooking}>
    Book Another Show
  </button>
</div>
        ) : (
          <div style={styles.panel}>
            <button style={styles.secondaryButton} onClick={resetBooking}>
              Back to Movies
            </button>

            <h2>{selectedMovie.name}</h2>
            <p><strong>Rating:</strong> {selectedMovie.rating}</p>
            <p><strong>Runtime:</strong> {selectedMovie.runtime}</p>
            <p><strong>Genre:</strong> {selectedMovie.genre}</p>
            <p><strong>Language:</strong> {selectedMovie.language}</p>

            {!selectedTime ? (
              <>
                <h3>Select Showtime</h3>
                <div>
                  {selectedMovie.showtimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      style={styles.timeButton(selectedTime === time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            ) : !showSeats ? (
              <>
                <h3>Booking Summary</h3>
                <p><strong>Movie:</strong> {selectedMovie.name}</p>
                <p><strong>Showtime:</strong> {selectedTime}</p>

                <button style={styles.button} onClick={() => setShowSeats(true)}>
                  Continue to Seat Selection
                </button>
              </>
            ) : (
              <>
                <h3>Select Seats</h3>

                <div style={styles.legend}>
                  <div><span style={styles.legendBox("white")}></span> Available</div>
                  <div><span style={styles.legendBox("#d81f26")}></span> Selected</div>
                  <div><span style={styles.legendBox("#999")}></span> Booked</div>
                </div>

                <div style={styles.screen}>SCREEN</div>

                {rows.map((row) => (
                  <div key={row}>
                    {cols.map((col) => {
                      const seat = row + col;
                      const isBooked = bookedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);

                      return (
                        <button
                          key={seat}
                          onClick={() => toggleSeat(seat)}
                          style={styles.seatButton(isSelected, isBooked)}
                          disabled={isBooked}
                        >
                          {seat}
                        </button>
                      );
                    })}
                  </div>
                ))}

                <div style={styles.summaryBox}>
                  <h3>Customer Details</h3>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={styles.input}
                  />

                  <h3>Final Summary</h3>
                  <p><strong>Movie:</strong> {selectedMovie.name}</p>
                  <p><strong>Showtime:</strong> {selectedTime}</p>
                  <p>
                    <strong>Seats:</strong>{" "}
                    {selectedSeats.length ? selectedSeats.join(", ") : "None selected"}
                  </p>
                  <p><strong>Total:</strong> ${total}</p>

                  <button
                    style={{
                      ...styles.button,
                      opacity:
                        selectedSeats.length === 0 ||
                        !customerName.trim() ||
                        !customerEmail.trim() ||
                        !customerPhone.trim()
                          ? 0.6
                          : 1,
                      cursor:
                        selectedSeats.length === 0 ||
                        !customerName.trim() ||
                        !customerEmail.trim() ||
                        !customerPhone.trim()
                          ? "not-allowed"
                          : "pointer"
                    }}
                    disabled={
                      selectedSeats.length === 0 ||
                      !customerName.trim() ||
                      !customerEmail.trim() ||
                      !customerPhone.trim()
                    }
                    onClick={confirmBooking}
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;