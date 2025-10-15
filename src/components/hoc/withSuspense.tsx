import React, {FC, Suspense} from "react";
import Preloader from "../Common/Preloader/Preloader";


export const withSuspense: FC = (Component: any): any => {
    return (props: any) => {
        return <Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </Suspense>
    }
}