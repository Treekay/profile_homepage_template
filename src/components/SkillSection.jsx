import "./SkillSection.css";

const SkillCircle = ({ name, value }) => {
  const radius = 64;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.max(0, Math.min(100, value));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="skill-circle-card">
      <div className="skill-circle-wrapper">
        <svg
          className="skill-circle"
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <circle
            className="skill-circle-bg"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            fill="transparent"
          />
          <circle
            className="skill-circle-progress"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            fill="transparent"
          />
        </svg>

        <div className="skill-circle-text">{progress}%</div>
      </div>

      <div className="skill-circle-name">{name}</div>
    </div>
  );
};

const SkillsSection = ({ categories }) => {
  return (
    <section className="skills-section" id="skills">
      {categories.map((category, index) => (
        <div
          key={category.title}
          className={`skills-row ${index % 2 === 1 ? "skills-row-alt" : ""}`}
        >
          <div className="skills-row-inner">
            <h2 className="skills-row-title">{category.title}</h2>

            <div className="skills-grid">
              {category.skills.map((skill) => (
                <SkillCircle
                  key={skill.name}
                  name={skill.name}
                  value={skill.value}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SkillsSection;
