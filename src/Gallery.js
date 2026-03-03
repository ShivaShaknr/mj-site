import { useState } from "react";

export default function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "'Work Sans', sans-serif" }}>
      <div className="masonry">
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={img.id}
              src={`https://drive.google.com/thumbnail?id=${img.id}&sz=w1000`}
              alt={img.name}
              loading={index === 0 ? "eager" : "lazy"}
              onError={(e) => {
                const fallbackUrl = `https://drive.google.com/uc?id=${img.id}&export=view`;
                if (e.target.src !== fallbackUrl) {
                  e.target.src = fallbackUrl;
                }
              }}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "16px",
                breakInside: "avoid",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                backgroundColor: "#1a1a1a",
              }}
              onClick={() => setSelectedImage(img.id)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>No images found</p>
        )}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={{
              position: "relative",
              width: "90vw",
              height: "75vh",
              animation: "slideUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`https://drive.google.com/thumbnail?id=${selectedImage}&sz=w1000`}
              alt="Expanded"
              onError={(e) => {
                e.target.src = `https://drive.google.com/uc?id=${selectedImage}&export=view`;
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-70px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = `https://drive.google.com/uc?export=download&id=${selectedImage}`;
                  link.download = true;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                style={{
                  backgroundColor: "#d4749c",
                  border: "none",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "'Work Sans', sans-serif",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(212, 116, 156, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(212, 116, 156, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(212, 116, 156, 0.4)";
                }}
              >
                Download
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "2px solid #fff",
                  color: "#fff",
                  padding: "10px 22px",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "'Work Sans', sans-serif",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .masonry {
            column-count: 4;
            column-gap: 16px;
            font-family: 'Work Sans', sans-serif;
          }

          @media (max-width: 1200px) {
            .masonry { column-count: 3; }
          }

          @media (max-width: 768px) {
            .masonry { column-count: 2; }
          }

          @media (max-width: 480px) {
            .masonry { column-count: 1; }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
