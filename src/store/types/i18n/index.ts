import React from 'react'
import * as translator from '../../../i18n/translations/index.ts'

export type TranslateProps = keyof typeof translator


type PrimitiveObj = {
    [key: string]: string | number | bigint | boolean | null | undefined | PrimitiveObj
}

export type NestedKeys<Obj extends object> = {
    [Name in keyof Obj & string]: Obj[Name] extends PrimitiveObj
    ? Name | `${Name}.${NestedKeys<Obj[Name]>}`
    : Name
}[keyof Obj & string]

export type TextKey = NestedKeys<typeof translator['ru']>

export type I118nProviderProps = {
    children: React.ReactNode
}

export type TranslateType = {
    lang?:  TranslateProps,
    t: (text: TextKey, number?: number) => string
}

