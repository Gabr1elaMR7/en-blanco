import React, { useEffect, useState, useRef } from "react";
import styles from "./Estilos/AdminGestion.module.css";

const DashboardComponent = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRefs = useRef([]);
  const [selectedOption, setSelectedOption] = useState("OLTS");

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    iframeRefs.current.forEach((iframe, index) => {
      if (iframe) {
        const src = iframe.src;
        iframe.src = "";
        iframe.src = src; 
      }
    });
  }, [refreshKey]);

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.dashboardContainer}>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">DASHBOARD</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <button
                  class="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  SELECCIONAR
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelection("OLTS")}
                    >
                      OLTS
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelection("VCCAP")}
                    >
                      VCCAP
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelection("REMOTE_PHY")}
                    >
                      REMOTE PHY
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {selectedOption === "VCCAP" && (
        <div className={styles.contentContainer}>
          <h1>VCCAP</h1>
          <iframe
            ref={(iframe) => (iframeRefs.current[0] = iframe)}
            key={`iframe-1-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=31&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="100%"
            height="300"
            frameBorder="0"
          ></iframe>

          <iframe
            ref={(iframe) => (iframeRefs.current[1] = iframe)}
            key={`iframe-2-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=1&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="100%"
            height="300"
            frameBorder="0"
          ></iframe>

          <iframe
            ref={(iframe) => (iframeRefs.current[2] = iframe)}
            key={`iframe-3-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=37&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="80%"
            height="400"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[3] = iframe)}
            key={`iframe-4-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=41&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="20%"
            height="400"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[4] = iframe)}
            key={`iframe-5-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=45&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="80%"
            height="400"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[5] = iframe)}
            key={`iframe-6-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=44&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="20%"
            height="400"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[6] = iframe)}
            key={`iframe-7-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=40&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="20%"
            height="400"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[7] = iframe)}
            key={`iframe-8-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=42&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="60%"
            height="400"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[8] = iframe)}
            key={`iframe-9-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=36&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="20%"
            height="400"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[9] = iframe)}
            key={`iframe-10-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=33&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="50%"
            height="250"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[10] = iframe)}
            key={`iframe-11-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/ddvvkwm5dnchsd/tiempos-de-respuesta-ptps-vccap-harmonic?timezone=browser&var-cos=$__all&refresh=5m&orgId=1&theme=dark&panelId=34&__feature.dashboardSceneSolo&t=${refreshKey}"
            width="50%"
            height="250"
            frameborder="0"
          ></iframe>
        </div>
      )}

      {selectedOption === "OLTS" && (
        <div className={styles.contentContainer}>
          <h1>OLTS</h1>
          <iframe
            ref={(iframe) => (iframeRefs.current[11] = iframe)}
            key={`iframe-11-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/fe8siln9ptybka/kpi-olts?timezone=browser&orgId=1&theme=dark&panelId=6&__feature.dashboardSceneSolo"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[12] = iframe)}
            key={`iframe-12-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/fe8siln9ptybka/kpi-olts?timezone=browser&orgId=1&theme=dark&panelId=1&__feature.dashboardSceneSolo"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[13] = iframe)}
            key={`iframe-13-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/fe8siln9ptybka/kpi-olts?timezone=browser&orgId=1&theme=dark&panelId=2&__feature.dashboardSceneSolo"
            width="50%"
            height="50%"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[14] = iframe)}
            key={`iframe-14-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/fe8siln9ptybka/kpi-olts?timezone=browser&orgId=1&theme=dark&panelId=3&__feature.dashboardSceneSolo"
            width="50%"
            height="50%"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[15] = iframe)}
            key={`iframe-15-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/fe8siln9ptybka/kpi-olts?timezone=browser&showCategory=Panel%20options&orgId=1&theme=dark&panelId=7&__feature.dashboardSceneSolo"
            width="50%"
            height="50%"
            frameborder="0"
          ></iframe>
          <iframe
            ref={(iframe) => (iframeRefs.current[16] = iframe)}
            key={`iframe-16-${refreshKey}`}
            src="http://172.31.33.33:3000/d-solo/fe8siln9ptybka/kpi-olts?timezone=browser&showCategory=Panel%20options&orgId=1&theme=dark&panelId=5&__feature.dashboardSceneSolo"
            width="50%"
            height="50%"
            frameborder="0"
          ></iframe>
        </div>
      )}

      {selectedOption === "REMOTE_PHY" && (
        <div className={styles.contentContainer}>
          <h1>REMOTE PHY</h1>
          <p>Contenido para Remote PHY</p>
          <img
            src={"/imagenes/fondoLoginClaro.png"}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;
