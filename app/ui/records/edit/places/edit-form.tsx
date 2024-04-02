'use client';
import { Button } from '@/app/ui/button1';
import { useFormState } from 'react-dom';
import { updatePlace } from '@/app/lib/actions';
import { Place } from '@/app/lib/interfaces';
import StreetCityState from './street-city-state';
import CountryOnly_Or_Any from './country-only-or-any';
import CountryAndCity from './country-city';

export default function Form({ record } : { record: Place }) { 

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updatePlace, initialState);

  return (
    <form action={dispatch} className="flex flex-col rounded-md bg-gray-50 p-4 md:p-6 md:ml-2">
        <input id="id" name="id" type="hidden" defaultValue={record.id} />

        {(() => {
          switch (record.type) {
            case 'street_city_state': return <StreetCityState record={record} state={state}/>;
            case 'country': return <CountryOnly_Or_Any record={record} state={state}/>;
            case 'country_and_desc': return <CountryOnly_Or_Any record={record} state={state}/>;
            case 'any': return <CountryOnly_Or_Any record={record} state={state}/>;
            case 'country_city': return <CountryAndCity record={record} state={state}/>;
            case 'country_city_and_desc': return <CountryAndCity record={record} state={state}/>;
          }
        })()}

        <div className="flex flex-col items-center justify-between p-4">
            <Button type="submit">Save Changes</Button>
        </div>
    </form>
  );
}
