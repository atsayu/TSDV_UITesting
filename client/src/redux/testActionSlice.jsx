import { createSlice, current } from "@reduxjs/toolkit";

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
        }
    }
})

export const {addClickAction, addFlowDescribe, addTestCase, addInputAction,addHoverAction, changeDescribedLocator, changeValue, changeFlow, insertActions} = testActionSlice.actions;

export default testActionSlice.reducer;