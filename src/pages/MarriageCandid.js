import Gallery from "../Gallery";

export default function MarriageCandid({ images }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📸 Marriage - Candid Moments</h2>
      <p style={styles.subtitle}>
        Unposed and authentic moments from the marriage ceremony
      </p>
      {images.length > 0 ? (
        <Gallery images={images} />
      ) : (
        <p style={styles.noImages}>No images available for this event</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Work Sans', sans-serif",
  },
  title: {
    marginTop: "20px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#ffffff",
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "28px",
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
    fontFamily: "'Work Sans', sans-serif",
  },
  noImages: {
    textAlign: "center",
    padding: "40px",
    color: "#999",
    fontFamily: "'Work Sans', sans-serif",
  },
};
