import React, { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import "./ProjectSection.css";

const ProjectSection = ({
  id,
  title,
  period,
  organization,
  description,
  image,
  buttonText = "More",
  buttonLink = "#",
  nextSectionId,
  index = 0,
}) => {
  const [bgStyle, setBgStyle] = useState({
    background: "linear-gradient(120deg, #a9a198 0%, #d8d0c5 100%)",
  });

  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();

    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = async () => {
      try {
        const color = await fac.getColorAsync(img);
        const [r, g, b] = color.value;

        // calc brightness
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        let baseR = r;
        let baseG = g;
        let baseB = b;

        // if too bright, darken it to ensure text contrast
        if (brightness > 200) {
          const factor = 0.6;
          baseR = r * factor;
          baseG = g * factor;
          baseB = b * factor;
        }

        // ensure minimum darkness for better contrast
        const minDark = 40;
        baseR = Math.max(baseR, minDark);
        baseG = Math.max(baseG, minDark);
        baseB = Math.max(baseB, minDark);

        // create a gradient with the base color
        const darkColor = `rgb(${baseR * 0.7}, ${baseG * 0.7}, ${baseB * 0.7})`;
        const lightColor = `rgb(${baseR * 1.1}, ${baseG * 1.1}, ${baseB * 1.1})`;

        setBgStyle({
          background: `linear-gradient(120deg, ${darkColor}, ${lightColor})`,
        });
      } catch (error) {
        console.error("failed to get color:", error);
      }
    };

    img.onerror = (error) => {
      console.error("failed to load image:", error);
    };

    return () => {
      fac.destroy();
    };
  }, [image]);

  const handleScrollDown = () => {
    if (!nextSectionId) return;
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isReverse = index % 2 === 1;

  return (
    <section className="project-section" id={id} style={bgStyle}>
      <div className={`project-inner ${isReverse ? "reverse" : ""}`}>
        <div className="project-left">
          <h2 className="project-title">{title}</h2>

          <div className="project-meta">
            {period && <p className="project-period">{period}</p>}
            {organization && (
              <p className="project-organization">{organization}</p>
            )}
          </div>

          <div className="project-description">
            {Array.isArray(description) ? (
              description.map((item, i) => (
                <p key={i} className="project-desc-item">
                  {item}
                </p>
              ))
            ) : (
              <p className="project-desc-item">{description}</p>
            )}
          </div>

          <a
            className="project-button"
            href={buttonLink}
            target={buttonLink.startsWith("http") ? "_blank" : "_self"}
            rel={buttonLink.startsWith("http") ? "noreferrer" : undefined}
          >
            {buttonText}
          </a>
        </div>

        <div className="project-right">
          <img src={image} alt={title} className="project-image" />
        </div>
      </div>

      {nextSectionId && (
        <button
          className="project-scroll-down-btn"
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
        >
          <span className="project-arrow">↓</span>
        </button>
      )}
    </section>
  );
};

export default ProjectSection;
