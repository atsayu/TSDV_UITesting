import React, { useContext } from 'react'
import { Input } from '@mui/material'
import { useDispatch } from 'react-redux'
import  { TestActionContext } from '../TestCase';
import { TestCaseContext } from '../App';
import { handleDescribedLocatorChange } from './handleFunction';
export default function HoverAction({describedLocator}) {
    const actionIndex = useContext(TestActionContext);
    const testcaseIndex = useContext(TestCaseContext);
    const dispatch = useDispatch();
  return (
    <>
        <span>Move to </span>
        <Input margin='none' onChange={(e) => handleDescribedLocatorChange(dispatch, e, testcaseIndex, actionIndex)} defaultValue={describedLocator || ''}/>
    </>
  )
}
