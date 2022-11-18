import classes from './AnimatedBackground.module.css';

const AnimatedBackground = () => {
  return (
    <div className={classes.area}>
      <ul className={classes.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default AnimatedBackground;
