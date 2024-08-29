import { Text } from './Text'

interface Props {
    label?: string
}
export const Divide = ({ label }: Props) => {
    return (
        <div className="relative my-2 divide-y divide-slate-400 flex flex-col items-center">
            <Text className="absolute -top-3 bg-slate-50 dark:bg-slate-900 px-1 rounded-sm" children={label} />
            <div className="w-full"></div>
        </div>
    )
}
