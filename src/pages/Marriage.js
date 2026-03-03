import Gallery from "../Gallery";

export default function Marriage({ images }) {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Marriage</div>
      {images.length > 0 && <Gallery images={images} />}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Work Sans', sans-serif",
    backgroundColor: "#000000",
    paddingTop: "100px",
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
