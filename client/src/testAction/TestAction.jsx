import React from 'react'
import ClickAction from './ClickAction'
import InputAction from './InputAction'
import HoverAction from './Hover'
import Flow from './Flow'
import { Checkbox } from '@mui/material'
import OpenWebsiteAction from './OpenWebsiteAction'
export default function TestAction({ type, describedLocator, value, url }) {
    let ActionComponent;
    switch (type) {
        case "open":
            ActionComponent = <OpenWebsiteAction url={url}/>
            break;
        case "click":
            ActionComponent = <ClickAction describedLocator={describedLocator} />
            break;
        case "input":
            ActionComponent = <InputAction describedLocator={describedLocator} value={value} />
            break;
        case "hover":
            ActionComponent = <HoverAction describedLocator={describedLocator} />
            break;
        case "flow":
            ActionComponent = <Flow />
            break;
    }
    return (
        <div>
            {/* <Checkbox size='small'></Checkbox> */}
            {ActionComponent}
        </div>

    )
}
