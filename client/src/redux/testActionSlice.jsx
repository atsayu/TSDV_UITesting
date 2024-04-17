import { createSlice } from "@reduxjs/toolkit";

export const testActionSlice = createSlice({
    name: 'testAction',
    initialState: {
        testcases: []
    },
    reducers: {
        addTestCase: (state) => {
            state.testcases.push({
                actions: []
            })
        },
        
        addFlowDescribe: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'flow',
            })
        },
        addOpenWebSiteAction: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'open',
                url: action.payload.url
            })
        },
        addClickAction: (state, action) => {
            console.log(action.payload.testcaseIndex);
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'click',
                describedLocator: action.payload.locator
            })
        },
        addInputAction: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'input',
                describedLocator: action.payload.locator,
                value: action.payload.value
            })
        },
        
        addHoverAction: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'hover',
                describedLocator: action.payload.locator,
            })
        },
        changeUrl: (state, action) => {
            console.log("Changing URL")
            state.testcases[action.payload.testcaseIndex].actions[action.payload.actionIndex].url = action.payload.newUrl;
        },
        changeDescribedLocator: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions[action.payload.actionIndex].describedLocator = action.payload.newLocator;
        },
        changeValue: (state, action) => {
            console.log(action.payload.testcaseIndex);
            state.testcases[action.payload.testcaseIndex].actions[action.payload.actionIndex].value = action.payload.newValue;
        },
        changeFlow: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions[action.payload.actionIndex].flow = action.payload.newFlow;
        },
        insertActions: (state, action) => {
            const currentActionIndex = action.payload.actionIndex;
            const actions = state.testcases[action.payload.testcaseIndex].actions;
            actions.splice(currentActionIndex, currentActionIndex + 1);
            actions.splice(currentActionIndex, 0, ...action.payload.newActions);
        },
        addAssertUrlAction: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'verifyURL',
                url: action.payload.url
            })
        },
        addAssertElementAction: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'verifyElement',
                describedLocator: action.payload.locator
            })
        },
        deleteAction:(state, action) => {
            const selectedIndexes = action.payload.selectedIndexes;
            let oldActions = state.testcases[action.payload.testcaseIndex].actions;
            state.testcases[action.payload.testcaseIndex].actions = oldActions.filter((action, index) => !selectedIndexes.includes(index));
            // state.testcases[action.payload.testcaseIndex].actions = state.testcases[action.payload.testcaseIndex].actions.toSpliced(action.payload.actionIndex, 1);
            // let actions = state.testcases[action.payload.testcaseIndex].actions;
            // state.testcases[action.payload.testcaseIndex].actions = actions.filter((act, index) => index !== action.payload.actionIndex);
        },
        toogleSelectAction: (state, action) => {
            let oldSelectState = state.testcases[action.payload.testcaseIndex].actions[action.payload.actionIndex].selected;
            state.testcases[action.payload.testcaseIndex].actions[action.payload.actionIndex].selected = !oldSelectState;
            console.log("toogle")
        },
        addSelectAction: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'select',
                describedLocator: action.payload.locator,
                value: action.payload.value
            })
        },
        addCheckboxAction: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions.push({
                type: 'checkbox',
                describedLocator: action.payload.locator,
                value: action.payload.value
            })
        }
    }
})

export const {addClickAction, addFlowDescribe, addOpenWebSiteAction, addTestCase, addInputAction,addHoverAction,changeUrl, changeDescribedLocator, changeValue, changeFlow, insertActions, addAssertUrlAction, addAssertElementAction, deleteAction, toogleSelectAction, addSelectAction, addCheckboxAction} = testActionSlice.actions;

export default testActionSlice.reducer;