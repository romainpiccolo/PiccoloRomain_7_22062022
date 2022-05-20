import styles from './timer.module.css';
import clock from '../../assets/clock_icon.svg';

type TimerProps = {
    duration: number;
};

function Timer({ duration }: TimerProps) {
    return (
        <div className={styles.timer}>
            <img src={clock} alt="clock icon" />
            <span>{duration} min</span>
        </div>
    );
}

export default Timer;
