
import { Place } from '@/app/lib/interfaces';
import { PlaceState } from '@/app/lib/actions';

export default function StreetCityState({ record, state } : { record: Place, state: PlaceState }) {
    return (<>
        <input type="hidden" name="type" value={record.type} />
        <div className="flex flex-row">
            <input
              id="placename"
              name="placename"
              type="text"
              step="0.01"
              defaultValue={record.name}
              placeholder='The name of the place'
              className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="where-error"
            />
            <div id="placename-error" aria-live="polite" aria-atomic="true">
              {state.errors?.placename &&
                state.errors.placename.map((error: string) => (
                  <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
        </div>
        <div className="flex flex-row">
            <input
              id="city"
              name="city"
              type="text"
              step="0.01"
              defaultValue={record.details.city}
              placeholder='Name of city'
              className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="city-error"
            />
            <div id="city-error" aria-live="polite" aria-atomic="true">
              {state.errors?.city &&
                state.errors.city.map((error: string) => (
                  <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
        </div>
        <div className="flex flex-row">  
            <input
              id="street"
              name="street"
              type="text"
              step="0.01"
              defaultValue={record.details.street}
              placeholder='Street address'
              className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="street-error"
            />
            <div id="street-error" aria-live="polite" aria-atomic="true">
              {state.errors?.street &&
                state.errors.street.map((error: string) => (
                  <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
        </div>
        <div className="flex flex-row">
            <input
              id="state"
              name="state"
              type="text"
              step="0.01"
              defaultValue={record.details.state}
              placeholder='state'
              className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="State-error"
            />
            <div id="state-error" aria-live="polite" aria-atomic="true">
              {state.errors?.state &&
                state.errors.state.map((error: string) => (
                  <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
        </div>
        </>
    )
}
