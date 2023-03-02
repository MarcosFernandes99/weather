interface IWeather {
    [key:string]: {
        data: string;
        temp_max: number;
        temp_min: number;
        description: number;
    };
}

interface IAction {
    type: string,
    payload: any,
}

interface IState {
    modal?: {
        isOpen: string
    }
}