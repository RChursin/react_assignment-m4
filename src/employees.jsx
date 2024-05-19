let sally = 'Sally Smith'
let mark = 'Mark Martin'
let holly = 'Holly Unlikely'
let amol = 'Amol Shookup'
let roman = 'Roman Martin'
let jacob = 'Jacob Martin'
const element = (
    <ul style={{'color':'blue', 'fontSize': '24px'}}>
        <li>{sally}</li>
        <li>{mark}</li>
        <li>{holly}</li>
        <li>{amol}</li>
        <li>{roman}</li>
        <li>{jacob}</li>
    </ul>
)
ReactDOM.render(element, document.getElementById('content'))