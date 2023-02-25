interface IWeather {
    [key:string]: {
        data: string;
        temp_max: number;
        temp_min: number;
        description: string;
    };
}