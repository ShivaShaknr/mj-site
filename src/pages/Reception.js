import Gallery from "../Gallery";

export default function Reception({ images }) {
  return (
    <div style={styles.container}>
      {images.length > 0 && (
        <Gallery images={images} />
      )}
      {images.length === 0 && (
        <p style={styles.noImages}>No images available for this event</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    paddingTop: "100px",
    fontFamily: "'Work Sans', sans-serif",
    backgroundColor: "#000000",
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
