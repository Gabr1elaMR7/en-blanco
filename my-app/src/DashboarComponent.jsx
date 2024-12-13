import React, { useEffect, useState, useRef } from "react";
import styles from "./Estilos/AdminGestion.module.css";

const DashboardComponent = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    iframeRefs.current.forEach((iframe) => {
      iframe.contentWindow.location.reload();
    });
  }, [refreshKey]);

  return (
    <div className={styles.dashboardContainer}>
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
  );
};

export default DashboardComponent;
