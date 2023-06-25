export interface Player
{
    id: string,
    x: number,
    y: number
}

export function createPlayer(id: string, x: number, y: number): Player
{
    return {id, x, y};
}