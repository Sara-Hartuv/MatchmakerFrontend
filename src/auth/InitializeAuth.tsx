import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../redux/store"
import { getSession, isValidToken, setAuthorizationHeader } from "./auth.utils"
import { setInitialize, setUser } from "../redux/auth/auth.slice"

type Props = {
    children: ReactNode
}

export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token: string | null = getSession();
        if (token && isValidToken(token)) {
            // בדיקה האם הטוקן שווה לנתוני היוזר
            dispatch(setUser(token))
            setAuthorizationHeader(token)
        }
        dispatch(setInitialize())
    }, [])

    return <>{children}</>
}