import Gallery from "../Gallery";

export default function MarriageTraditional({ images }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💒 Marriage - Traditional Moments</h2>
      <p style={styles.subtitle}>
        Formal and traditional moments from the marriage ceremony
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
    textAlign: "center",
    marginBottom: "10px",
    color: "#2c3e50",
    fontFamily: "'Work Sans', sans-serif",
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
