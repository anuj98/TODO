export interface ITaskDetail {
    id: number;
    title: string;
    date: Date;
    isFavorite: boolean;
    isCompleted: boolean;
}

export const taskDetails: ITaskDetail[] = [{
    id: 1,
    title: 'foo',
    date: new Date('03/12/2023'),
    isFavorite: true,
    isCompleted: false,
},
{
    id: 2,
    title: 'foo1',
    date: new Date('02/07/2022'),
    isFavorite: false,
    isCompleted: false,
},
{
    id: 3,
    title: 'foo2',
    date: new Date('07/10/2022'),
    isFavorite: false,
    isCompleted: true,
}]