import React from 'react';
import './FunctionalMode.scss'
import 'react-switchable/dist/main.css'
import Switch, { Item } from 'react-switchable';

type functionalModePropsType = {
    name: string,
    callback: (arg: string) => void,
    items: Array<any>
}

export const FunctionalSwitchableMode = ({name, callback, items}: functionalModePropsType): JSX.Element => {

    const switchItems: Array<React.ReactElement> = items.map(i => {
       return  <Item key={i.id} value={i.value}>{i.name}</Item>
    });

    return (
        // @ts-ignore
        <Switch name={name} onItemChanged={newValue => callback(newValue)}>
            {switchItems}
        </Switch>
    )
}