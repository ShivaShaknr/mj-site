import { useState, useRef, useEffect } from "react";

export default function Navbar({ activeTab, setActiveTab }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navbarRef = useRef(null);

  const menuItems = [
    { id: "inviting-groom", label: "Engagement" },
    { id: "marriage", label: "Marriage" },
    { id: "reception", label: "Reception" },
    { id: "outdoor", label: "Outdoor" },
  ];

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setOpenMenu(openMenu === item.id ? null : item.id);
    } else {
      setActiveTab(item.id);
      setOpenMenu(null);
      setMobileMenuOpen(false);
    }
  };

  const handleSubmenuClick = (itemId) => {
    setActiveTab(itemId);
    setOpenMenu(null);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.navbarWrapper} ref={navbarRef}>
      <nav
        style={{
          ...styles.navbar,
          width: isMobile ? "95%" : "60%",
          padding: isMobile ? "12px 16px" : "16px 40px",
        }}
      >
        <div style={styles.logoContainer}>
          <img src="/MJ.png" alt="MJ Logo" style={styles.logo} />
        </div>

        {/* Desktop Menu */}
        <div
          style={{
            ...styles.menuContainer,
            display: isMobile ? "none" : "flex",
          }}
        >
          {menuItems.map((item) => (
            <div key={item.id} style={styles.menuItemWrapper}>
              <button
                onClick={() => handleMenuClick(item)}
                style={{
                  ...styles.menuButton,
                  ...(activeTab === item.id ? styles.menuButtonActive : {}),
                  ...(item.submenu && openMenu === item.id
                    ? styles.menuButtonOpen
                    : {}),
                }}
              >
                {item.label}
              </button>

              {item.submenu && openMenu === item.id && (
                <div style={styles.submenu}>
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      onClick={() => handleSubmenuClick(subitem.id)}
                      style={{
                        ...styles.submenuButton,
                        ...(activeTab === subitem.id
                          ? styles.submenuButtonActive
                          : {}),
                      }}
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            ...styles.hamburgerButton,
            display: isMobile ? "flex" : "none",
          }}
        >
          <div
            style={{
              ...styles.hamburgerLine,
              ...(mobileMenuOpen ? styles.hamburgerLine1Active : {}),
            }}
          ></div>
          <div
            style={{
              ...styles.hamburgerLine,
              ...(mobileMenuOpen ? styles.hamburgerLine2Active : {}),
            }}
          ></div>
          <div
            style={{
              ...styles.hamburgerLine,
              ...(mobileMenuOpen ? styles.hamburgerLine3Active : {}),
            }}
          ></div>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && isMobile && (
        <div
          style={{
            ...styles.mobileMenuOverlay,
            display: "block",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              ...styles.mobileMenu,
              animation: "slideInTop 0.4s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={styles.closeButton}
            >
              ✕
            </button>

            {/* Mobile Menu Items */}
            <div style={styles.mobileMenuContent}>
              {menuItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    style={{
                      ...styles.mobileMenuButton,
                      ...(activeTab === item.id
                        ? styles.mobileMenuButtonActive
                        : {}),
                    }}
                  >
                    {item.label}
                  </button>

                  {item.submenu && openMenu === item.id && (
                    <div style={styles.mobileSubmenu}>
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.id}
                          onClick={() => handleSubmenuClick(subitem.id)}
                          style={{
                            ...styles.mobileSubmenuButton,
                            ...(activeTab === subitem.id
                              ? styles.mobileSubmenuButtonActive
                              : {}),
                          }}
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  navbarWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    padding: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    backgroundColor: "rgba(26, 26, 26, 0.7)",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    marginBottom: "0",
    fontFamily: "'Work Sans', sans-serif",
    width: "60%",
    borderRadius: "40px",
    marginTop: "1rem",
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    height: "40px",
    width: "auto",
  },
  menuContainer: {
    display: "flex",
    gap: "40px",
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  menuItemWrapper: {
    position: "relative",
  },
  menuButton: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "none",
    padding: "8px 0",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    borderBottom: "2px solid transparent",
    fontFamily: "'Work Sans', sans-serif",
    whiteSpace: "nowrap",
  },
  menuButtonActive: {
    borderBottomColor: "#d4749c",
    color: "#d4749c",
  },
  menuButtonOpen: {
    color: "#d4749c",
  },
  submenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "rgba(26, 26, 26, 0.95)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "8px 0",
    marginTop: "8px",
    minWidth: "150px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
  },
  submenuButton: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    fontFamily: "'Work Sans', sans-serif",
    textAlign: "left",
    borderBottom: "2px solid transparent",
  },
  submenuButtonActive: {
    backgroundColor: "rgba(212, 116, 156, 0.2)",
    color: "#d4749c",
    borderBottomColor: "#d4749c",
  },

  /* Hamburger Menu Styles */
  hamburgerButton: {
    display: "none",
    flexDirection: "column",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    gap: "6px",
  },
  hamburgerLine: {
    width: "24px",
    height: "3px",
    backgroundColor: "#ffffff",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },
  hamburgerLine1Active: {
    transform: "rotate(45deg) translateY(12px)",
  },
  hamburgerLine2Active: {
    opacity: "0",
  },
  hamburgerLine3Active: {
    transform: "rotate(-45deg) translateY(-9px)",
  },

  /* Mobile Menu Overlay */
  mobileMenuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "none",
    zIndex: 900,
  },

  /* Mobile Menu Drawer */
  mobileMenu: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    maxWidth: "90%",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    paddingTop: "30px",
    paddingBottom: "40px",
    marginTop: "1rem",
    overflowY: "auto",
    zIndex: 1001,
    borderRadius: "40px",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },

  closeButton: {
    alignment: "flex-start",
    alignSelf: "flex-end",
    marginRight: "20px",
    marginBottom: "20px",
    marginTop: "-20px",
    backgroundColor: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "28px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  mobileMenuContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    flex: 1,
    width: "100%",
    paddingLeft: "0",
    paddingRight: "0",
    alignItems: "center",
    gap: "10px",
  },

  mobileMenuButton: {
    backgroundColor: "transparent",
    color: "#b0b0b0",
    border: "none",
    padding: "14px 32px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    fontFamily: "'Work Sans', sans-serif",
    textAlign: "center",
    borderBottom: "2px solid transparent",
    width: "auto",
  },

  mobileMenuButtonActive: {
    color: "#d4749c",
    borderBottomColor: "#d4749c",
    backgroundColor: "transparent",
  },

  mobileSubmenu: {
    backgroundColor: "transparent",
    borderLeft: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },

  mobileSubmenuButton: {
    backgroundColor: "transparent",
    color: "#8a8a8a",
    border: "none",
    padding: "12px 28px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "400",
    transition: "all 0.3s ease",
    fontFamily: "'Work Sans', sans-serif",
    textAlign: "center",
    borderBottom: "2px solid transparent",
    width: "auto",
  },

  mobileSubmenuButtonActive: {
    color: "#5ba4d1",
    borderBottomColor: "#5ba4d1",
    backgroundColor: "transparent",
  },

  ctaButton: {
    backgroundColor: "#ffffff",
    color: "#0a0a0a",
    border: "none",
    padding: "14px 40px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "'Work Sans', sans-serif",
    marginTop: "30px",
    transition: "all 0.3s ease",
    marginBottom: "10px",
  },
};

// Inject animation styles
if (typeof document !== "undefined") {
  const styleId = "navbar-animations";
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement("style");
    styleSheet.id = styleId;
    styleSheet.innerHTML = `
      @keyframes slideInTop {
        from {
          transform: translateX(-50%) translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideOutTop {
        from {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        to {
          transform: translateX(-50%) translateY(-100%);
          opacity: 0;
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
}
