import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import EventsHome from "./EventsHome";
import InvitingGroom from "./pages/InvitingGroom";
import Marriage from "./pages/Marriage";
import MarriageCandid from "./pages/MarriageCandid";
import MarriageTraditional from "./pages/MarriageTraditional";
import Reception from "./pages/Reception";
import Outdoor from "./pages/Outdoor";

const API_KEY = "AIzaSyDSBiFjswTBAabCwWcnNQO3U6QHNk7spuA";

const FOLDER_IDS = {
  "inviting-groom": ["1QL6i7Hg1RtCIg0sujMSyzRQk-rDd9JMH"],
  marriage: [
    "1p7Ko5D8AVk4rSszXBZ2Fkce6wzIx5tOt",
    "1UDsdFcEnf0I1jZLO8_z7dA592RnDED8B",
    "1emoTHqnvpXR3yvI7MyT4m4UFFZjE2Mo6",
  ],
  reception: [
    "1haDzc8R7k1Ng5EuFv0cpx6nqUe9W5CPP",
    "1OEMK792g73jwH41Uq981rvoeaF0lIxAw",
    "1QK_-qysJxafc3knArtMzeHqwAmwoqMdn",
    "1z3JZ3vFpGPKSipYt4BoIBqTcpj0UwWk2",
  ],
  outdoor: ["1ovT-SPUrf4CpPa7q9Oo-MKaSMPA6st2T"],
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  // Check localStorage on mount to restore login state
  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    if (savedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Skip fetching images for the home page
    if (activeTab === "home") {
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      try {
        let allFiles = [];
        const folderIdArray = FOLDER_IDS[activeTab] || FOLDER_IDS["reception"];

        console.log(
          `Fetching images from ${folderIdArray.length} folder(s) for tab: ${activeTab}`,
        );

        // Loop through each folder
        for (
          let folderIndex = 0;
          folderIndex < folderIdArray.length;
          folderIndex++
        ) {
          const folderId = folderIdArray[folderIndex];
          console.log(
            `Processing folder ${folderIndex + 1}/${folderIdArray.length}: ${folderId}`,
          );

          let pageToken = null;
          let pageCount = 0;

          try {
            do {
              pageCount++;

              const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=nextPageToken,files(id,name,mimeType,webViewLink,thumbnailLink)&pageSize=50${pageToken ? `&pageToken=${pageToken}` : ""}`;

              const res = await fetch(url);
              const data = await res.json();

              if (data.error) {
                console.error(
                  `API Error for folder ${folderIndex + 1}:`,
                  data.error,
                );
                break;
              }

              if (data.files) {
                console.log(
                  `Folder ${folderIndex + 1}, Page ${pageCount}: Found ${data.files.length} files`,
                );
                allFiles = [...allFiles, ...data.files];
              }

              pageToken = data.nextPageToken;

              // Delay between pagination pages
              if (pageToken) {
                await new Promise((resolve) => setTimeout(resolve, 400));
              }
            } while (pageToken);

            console.log(
              `Completed folder ${folderIndex + 1}/${folderIdArray.length} - Total so far: ${allFiles.length}`,
            );

            // Delay between folders (except after the last one)
            if (folderIndex < folderIdArray.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          } catch (folderError) {
            console.error(
              `Error processing folder ${folderIndex + 1}:`,
              folderError,
            );
          }
        }

        const imageFiles = allFiles.filter((file) =>
          file.mimeType.startsWith("image/"),
        );

        console.log(
          `FINAL: Total images found across all folders: ${imageFiles.length}`,
        );

        setImages(imageFiles);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [activeTab]);

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <EventsHome setActiveTab={setActiveTab} />;
      case "inviting-groom":
        return <InvitingGroom images={images} />;
      case "marriage":
        return <Marriage images={images} />;
      case "marriage-candid":
        return <MarriageCandid images={images} />;
      case "marriage-traditional":
        return <MarriageTraditional images={images} />;
      case "reception":
        return <Reception images={images} />;
      case "outdoor":
        return <Outdoor images={images} />;
      default:
        return <EventsHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <>
          {activeTab !== "home" && (
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontFamily: "'Work Sans', sans-serif",
                backgroundColor: "#000000",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "4px solid #f0f0f0",
                  borderTop: "4px solid #d4749c",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>
          ) : (
            renderPage()
          )}
        </>
      )}
    </div>
  );
}
