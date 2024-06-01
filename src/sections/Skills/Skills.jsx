import styles from "./Skills.module.css";
import checkMarkIcon from "../../assets/checkmark-dark.svg";
import SkillList from "../../common/SkillList";
import { motion } from "framer-motion";

function Skills() {
  return (
    <motion.section
      id="skills"
      className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: true }}
      transition={{ delay: 0.25, duration: 0.5 }}
    >
      <h1 className="sectionTitle">Skills</h1>
      <motion.div
        className={styles.skillList}
        initial={{ opacity: 0, x: 50 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <SkillList src={checkMarkIcon} skill="HTML" />
        <SkillList src={checkMarkIcon} skill="CSS" />
        <SkillList src={checkMarkIcon} skill="JavaScript" />
        <SkillList src={checkMarkIcon} skill="Node" />
      </motion.div>
      <motion.hr
        initial={{ scale: 0.1 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
      <motion.div
        className={styles.skillList}
        initial={{ opacity: 0, x: -50 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <SkillList src={checkMarkIcon} skill="React" />
        <SkillList src={checkMarkIcon} skill="Tailwind CSS" />
        <SkillList src={checkMarkIcon} skill="TypeScript" />
      </motion.div>
      <motion.hr
        initial={{ scale: 0.1 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.div
        className={styles.skillList}
        initial={{ opacity: 0, x: 50 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <SkillList src={checkMarkIcon} skill="Git" />
        <SkillList src={checkMarkIcon} skill="Bootstrap" />
      </motion.div>
    </motion.section>
  );
}

export default Skills;
