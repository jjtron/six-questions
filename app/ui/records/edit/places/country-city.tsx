import { Place } from '@/app/lib/interfaces';
import { PlaceState } from '@/app/lib/actions';

export default function CountryAndCity({ record, state } : { record: Place, state: PlaceState }) {
    return (<>
        <input type="hidden" name="type" value={record.type} />
        <div className="flex flex-row">
            <input
              id="placename"
              name="placename"
              type="text"
              step="0.01"
              defaultValue={record.name}
              placeholder='The name of the country'
              className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="where-error"
            />
            <div id="placename-error" aria-live="polite" aria-atomic="true">
              {state.errors?.placename &&
                state.errors.placename.map((error: string) => (
                  <p className="px-2 leading-9 text-sm text-red-500" key={error}>
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
                  <p className="px-2 leading-9 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
        </div>

        <div className="flex flex-row">
            <textarea
                id="desc" name="desc" rows={3} maxLength={200}
                placeholder='Description (optional; max number of characters: 200)'
                className="block w-full resize-none rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="desc-error"
            />
            <div id="desc-error" aria-live="polite" aria-atomic="true">
                {state.errors?.desc &&
                state.errors.desc.map((error: string) => (
                    <p className="px-2 leading-9 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
        </div>
    </>)
}