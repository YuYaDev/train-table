// Тип данных для основной таблицы с поездами
export interface ITrainData {
    name: string;
    description: string;
}
// Тип данных для таблицы с характеристиками
export interface ITrainCharacteristics {
    engineAmperage: number;
    force: number;
    speed: number;
}

// Тип для данных от API
export interface IResponseData extends ITrainData {
    characteristics: ITrainCharacteristics[]
}

