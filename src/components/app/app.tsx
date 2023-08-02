import React, {useState, useEffect, useMemo} from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {Table} from "../table/table";
import {IColumnType} from "../table/table";
import {IResponseData, ITrainData} from "../../utils/types";
import {AppDispatch, RootState, useAppDispatch} from "../../index";
import {GET_TRAIN_DATA, getData} from "../../services/actions";
import {IAction, IStoreState} from "../../services/reducers";
import {ThunkDispatch} from "redux-thunk";



function App() {

  const [trainData, setTrainData] = useState<ITrainData[]>([]);

    const { dataRequest, dataRequestFailed, data }  = useSelector((store : RootState) => store.trains)

    const dispatch = useAppDispatch();

    useEffect(() => {
        (dispatch as ThunkDispatch<IStoreState, unknown, IAction>)(getData());
    }, []);

     useMemo(() => {
      let result = data.reduce((acc, train_item) => {
        acc.push({name: train_item.name, description: train_item.description})
        return acc;
      }, [] as ITrainData[]);
      setTrainData(result);
    }, [data]);

    console.log(trainData);

  const columns: IColumnType<ITrainData>[] = [
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

  return(
    <>
        { dataRequestFailed && <p>Ошибка загрузки данных</p> }
        { dataRequest && <p>Загрузка данных...</p>}
      { !dataRequest && trainData.length === 20  && <Table data={trainData} columns={columns} />}
    </>
  );
}

export default App;
