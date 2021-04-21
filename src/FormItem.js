import React, { useEffect, useState } from 'react';


export default function FormItem(props) {
   
    return (
        <>
        <div>
            {props.label}
        </div>
        
        <div>
        {props.children}
        </div>
        </>
    )
}