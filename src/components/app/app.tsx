import React, {useState, useEffect, useMemo} from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {Table} from "../table/table";
import {IColumnType} from "../table/table";
import {IResponseData, ITrainCharacteristics, ITrainData} from "../../utils/types";
import {AppDispatch, RootState, useAppDispatch} from "../../index";
import {GET_TRAIN_DATA, getData, SET_CURRENT_TRAIN, SET_DETAILS_TABLE_VISIBLE} from "../../services/actions";
import {IAction, IStoreState} from "../../services/reducers";
import {ThunkDispatch} from "redux-thunk";
import styles from './app.module.css';
import {get} from "lodash";
import {TableContainer} from "../table-container/table-container";


function App() {

  //const [trainData, setTrainData] = useState<ITrainData[]>([]);

    const { dataRequest, dataRequestFailed, data, characteristicsVisible, currentTrainCharacteristics, currentTrainName }  = useSelector((store : RootState) => store.trains)

    const dispatch = useAppDispatch();

    // function handleDetails(train: IResponseData) {
    //     const table = document.getElementById('main');
    //     const rows = table === null ? null : table.getElementsByTagName('tr');
    //     {rows !== null && Array.from(rows).forEach((row) => row.addEventListener('click', () => {
    //
    //
    //     }))}
    // };

    useEffect(() => {
        (dispatch as ThunkDispatch<IStoreState, unknown, IAction>)(getData());
    }, []);

  const mainTableColumns: IColumnType<IResponseData>[] = [
      {
        key: "name",
        title: "Название",
        width: 200,
      },
    {
      key: "description",
      title: "Описание",
      width: 200,
    }]

    const characteristicsTableColumns: IColumnType<ITrainCharacteristics>[] = [
        {
            key: "engineAmperage",
            title: "Ток двигателя",
            width: 300,
        },
        {
            key: "force",
            title: "Сила тяги",
            width: 300,
        },
        {
            key: "speed",
            title: "Скорость",
            width: 300,
        }]

  return(
    <>
        { dataRequestFailed && <p>Ошибка загрузки данных</p> }
        { dataRequest && <p>Загрузка данных...</p>}
      <div className={styles.tablesContainer}>
          { !dataRequest && data && <TableContainer title={'Поезда'}><Table data={data} columns={mainTableColumns} tableType="main" /></TableContainer>}
          {!dataRequest && characteristicsVisible && <TableContainer title={'Характеристики'} subtitle={currentTrainName}><Table data={currentTrainCharacteristics} columns={characteristicsTableColumns} tableType="details"/></TableContainer>}
      </div>
    </>
  );
}

export default App;
