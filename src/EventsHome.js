import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function EventsHome({ setActiveTab }) {
  const [thumbnails] = useState({
    "inviting-groom": "/engament.JPG",
    marriage: "/marriage.JPG",
    reception: "/reception.JPG",
    outdoor: "/outdoor-.JPG",
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const events = [
    {
      id: "inviting-groom",
      title: "Engagement Ceremony",
      emoji: "💍",
      color: "#d4749c",
    },
    {
      id: "marriage",
      title: "Marriage",
      emoji: "💒",
      color: "#c65a85",
    },
    {
      id: "reception",
      title: "Reception",
      emoji: "🎉",
      color: "#b84570",
    },
    {
      id: "outdoor",
      title: "Outdoor",
      emoji: "🌳",
      color: "#a0305b",
    },
  ];

  const handleEventClick = (eventId) => {
    setActiveTab(eventId);
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          
          .events-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 40px;
            margin-bottom: 60px;
          }

          @media (max-width: 1400px) {
            .events-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 30px;
            }
          }

          @media (max-width: 1200px) {
            .events-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 25px;
            }
          }

          @media (max-width: 992px) {
            .events-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
            }
          }

          @media (max-width: 768px) {
            .events-grid {
              grid-template-columns: 1fr;
              gap: 20px;
              padding: 0 16px;
            }

            .event-card {
              max-width: 100%;
            }
          }

          @media (max-width: 480px) {
            .events-grid {
              grid-template-columns: 1fr;
              gap: 15px;
              padding: 0 12px;
            }

            .event-header h1 {
              font-size: 28px !important;
            }

            .event-header p {
              font-size: 14px !important;
            }

            .event-card {
              max-width: 100%;
            }

            .thumbnail {
              height: 150px !important;
            }

            .placeholder-image {
              height: 150px !important;
              font-size: 60px !important;
            }
          }
        `}
      </style>
      <Navbar activeTab="home" setActiveTab={setActiveTab} />
      <div style={styles.content}>
        <div
          style={{
            ...styles.eventsGrid,
            gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(4, 1fr)",
          }}
          className="events-grid"
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={styles.eventCard}
              className="event-card"
              onClick={() => handleEventClick(event.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 50px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.15)";
              }}
            >
              {/* Folder Tab */}
              <div
                style={{ ...styles.folderTab, backgroundColor: event.color }}
              >
                {event.title}
              </div>

              {/* Folder Body */}
              <div
                style={{ ...styles.folderBody, borderTopColor: event.color }}
              >
                {/* Thumbnail */}
                {thumbnails[event.id] ? (
                  <img
                    src={thumbnails[event.id]}
                    alt={event.title}
                    style={styles.thumbnail}
                    className="thumbnail"
                  />
                ) : (
                  <div
                    style={{ ...styles.placeholderImage, color: event.color }}
                    className="placeholder-image"
                  >
                    {event.emoji}
                  </div>
                )}

                {/* Folder Info */}
                <div style={styles.folderInfo}>
                  <h3 style={{ ...styles.eventTitle, color: event.color }}>
                    {event.title}
                  </h3>
                  <p style={styles.eventDescription}>Click to view all</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    fontFamily: "'Work Sans', sans-serif",
  },
  content: {
    padding: "40px 20px",
    paddingTop: "120px",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  title: {
    margin: "0",
    color: "#ffffff",
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  subtitle: {
    margin: "0",
    color: "#999",
    fontSize: "18px",
    fontWeight: "400",
  },
  eventsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "40px",
    marginBottom: "60px",
    width: "100%",
  },
  eventCard: {
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    maxWidth: "100%",
  },
  folderTab: {
    padding: "14px 12px",
    borderRadius: "8px 8px 0 0",
    fontWeight: "700",
    color: "#ffffff",
    fontSize: "12px",
    textTransform: "capitalize",
    letterSpacing: "0px",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    lineHeight: "1.3",
  },
  folderTabText: {
    display: "block",
    wordWrap: "break-word",
    whiteSpace: "normal",
    overflow: "visible",
  },
  folderBody: {
    borderTop: "4px solid",
    padding: "16px",
    backgroundColor: "#1a1a1a",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  thumbnail: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "2px solid rgba(255, 255, 255, 0.1)",
  },
  placeholderImage: {
    width: "100%",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "80px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "6px",
    border: "2px solid rgba(255, 255, 255, 0.1)",
  },
  folderInfo: {
    paddingTop: "8px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  eventTitle: {
    margin: "8px 0 4px 0",
    fontSize: "16px",
    fontWeight: "600",
  },
  eventDescription: {
    margin: "0",
    color: "#999",
    fontSize: "12px",
    fontWeight: "400",
  },
};
