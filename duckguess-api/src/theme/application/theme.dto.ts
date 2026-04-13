export interface IHintDto {
    id: string;
    text: string;
    guessId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IGuessDto {
    id: string;
    answer: string;
    themeId: string;
    hints: IHintDto[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IThemeDto {
    id: string;
    value: string;
    guesses: IGuessDto[];
}
