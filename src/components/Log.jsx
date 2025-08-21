export function Logs({logItems}) {
    return(
        <ol id="log">
        {logItems.map((turn, index) => (<li key={`${turn.player}${turn.square.rowIndex}-${turn.square.colIndex}`}>{"Player " + turn.player + " selected " + turn.square.rowIndex + ", " + turn.square.colIndex}</li>))}
        </ol>
    )
}