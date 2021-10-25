import Switch, { Item } from 'react-switchable';
import 'react-switchable/dist/main.css'
import './FunctionalMode.scss'

export const FunctionalSwitchableMode = ({name, callback, items}) => {

    const switchItems = items.map(i => {
       return  <Item key={i.id} value={i.value}>{i.name}</Item>
    });

    return (
        <Switch name={name} onItemChanged={newValue => callback(newValue)}>
            {switchItems}
        </Switch>
    )
}