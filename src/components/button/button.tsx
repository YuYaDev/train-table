import styles from './button.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../index";



export function Button(): JSX.Element {

    const { currentTrainCharacteristics, buttonActive }  = useSelector((store : RootState) => store.trains)

    function handleDataSubmit() {
        console.log("Speed:")
        const speedArr = currentTrainCharacteristics.map((item ) => item.speed)
        speedArr.sort((a,b) => a-b).map((item) => console.log(item))
    }
    return (
        <button className={buttonActive ? styles.button : styles.buttonInactive} onClick={() => handleDataSubmit()}>
            Отправить данные
        </button>
    );
}