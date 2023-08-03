import React, {useEffect, } from 'react';
import {  useSelector } from 'react-redux'
import {Table} from "../table/table";
import {IColumnType} from "../table/table";
import {IResponseData, ITrainCharacteristics} from "../../utils/types";
import { RootState, useAppDispatch} from "../../index";
import { getData} from "../../services/actions";
import {IAction, IStoreState} from "../../services/reducers";
import {ThunkDispatch} from "redux-thunk";
import styles from './app.module.css';
import {TableContainer} from "../table-container/table-container";
import {Button} from "../button/button";


function App() {

    const { dataRequest, dataRequestFailed, data, characteristicsVisible, currentTrainCharacteristics, currentTrainName }  = useSelector((store : RootState) => store.trains)
    const dispatch = useAppDispatch();

    useEffect(() => {
        (dispatch as ThunkDispatch<IStoreState, unknown, IAction>)(getData());
    }, [dispatch]);

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
      <div className={styles.tablesContainer}>
          { dataRequestFailed && <p>Ошибка загрузки данных</p> }
          { dataRequest && <p>Загрузка данных...</p>}

          { !dataRequest && data &&
              <TableContainer title={'Поезда'}>
                  <Table data={data} columns={mainTableColumns} tableType="main" />
              </TableContainer>
          }

          { !dataRequest && characteristicsVisible &&
              <TableContainer title={'Характеристики'} subtitle={currentTrainName}>
                  <Table data={currentTrainCharacteristics} columns={characteristicsTableColumns} tableType="details"/>
                  <Button />
              </TableContainer>
          }
      </div>
  );
}

export default App;
