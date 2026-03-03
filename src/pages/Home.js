export default function Home() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Our Wedding Gallery</h2>
      <p>Select a category from the menu to view photos and details.</p>
      <div style={styles.content}>
        <p style={styles.text}>
          🎉 This is the home page where you can browse our wedding memories.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
    minHeight: "500px",
    fontFamily: "'Work Sans', sans-serif",
    backgroundColor: "#000000",
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
  content: {
    marginTop: "30px",
    backgroundColor: "#f8f9fa",
    padding: "30px",
    borderRadius: "8px",
    fontFamily: "'Work Sans', sans-serif",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    fontFamily: "'Work Sans', sans-serif",
  },
};
