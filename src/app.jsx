import xs from 'xstream'
import {div, p, input, label, br, hr, h1, h2, pre} from '@cycle/dom'

export function App (sources) {
  let username$ = sources.DOM.select('#username').events('input').map(e => e.target.value).startWith("")
  let email$ = sources.DOM.select('#email').events('input').map(e => e.target.value).startWith("")
  
  const vtree$ = xs.combine(username$,email$)
  .map((username$,email$) => {
      return div([
        h1('REGISTRATION FORM'),
        div('.form-element',  [
            label({ htmlFor:'username'}, 'Username:'),
            br(),
            input('#username', {type:'text', autocomplete:'off'})
          ]),
        div('.form-element',  [
            label({ htmlFor:'email'}, 'Email:'),
            br(),
            input('#email', {type:'email', autocomplete:'off'})
          ]),
          hr(),
          h2('State SPY'),
          pre(JSON.stringify({username$, email$}, null, 2))
      ])
    }
  )
  
  
  const sinks = {
    DOM: vtree$
  }
  
  return sinks
}
