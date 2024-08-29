import { Text } from "../../components/Text";
import { Link } from "react-router-dom";
import { FormUserRegister } from "../../components/FormRegister";
import { Divide } from "../../components/Divide";

export const RegisterPage = () => {
    const onSuccess = ({ exit: created }: {
        exit: boolean;
        value?: object | undefined;
    }) => {
        if (created) {
            console.log('CREATED...');
        }
    }

    return (
        <article className="w-max h-max min-w-[550px] bg-slate-50 dark:bg-slate-900 p-[2rem] rounded-3xl flex flex-col gap-3 shadow-md dark:shadow-slate-700">
            <h1 className={'text-3xl font-semibold text-slate-600 dark:text-slate-300'}>Create account</h1>
            <Text className="form-container_text">Fill in the fields below to sign into.</Text>
            <FormUserRegister onSuccess={onSuccess} />
            <Divide label="or" />
            <Text variant="text-lg" className="sform-container_text">Already have an account?  <Link to={'/auth/login'}><strong>Go sign in</strong></Link></Text>
        </article >
    )
}