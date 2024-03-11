import { changeDescribedLocator, changeValue } from "../redux/testActionSlice";


export const handleChangeValue = (dispatch, e, testcaseIndex, actionIndex) => {
    const newValue = e.target.value;
    dispatch(changeValue({testcaseIndex, actionIndex, newValue}));
}

export const handleDescribedLocatorChange = (dispatch, e, testcaseIndex, actionIndex) => {
    let newLocator = e.target.value;
    dispatch(changeDescribedLocator({testcaseIndex, actionIndex, newLocator}));
}


