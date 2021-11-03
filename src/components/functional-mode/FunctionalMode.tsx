import Switch, { Item } from 'react-switchable';
import 'react-switchable/dist/main.css'
import './FunctionalMode.scss'
import React, {ReactElement} from 'react';

type functionalModePropsType = {
    name: string,
    callback: () => string,
    items: Array<any>
}

export const FunctionalSwitchableMode: React.FC<functionalModePropsType> = ({name, callback, items}) => {

    const switchItems: Array<ReactElement> = items.map(i => {
       return  <Item key={i.id} value={i.value}>{i.name}</Item>
    });

    return (
        // @ts-ignore
        <Switch name={name} onItemChanged={newValue => callback(newValue)}>
            {switchItems}
        </Switch>
    )
}