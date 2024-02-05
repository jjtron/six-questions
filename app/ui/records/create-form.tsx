
import { createInvoice } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createInvoice, initialState);

    return (
        <form action={dispatch}>...
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
            </div>
        </form>
    );
}