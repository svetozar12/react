import axios from 'axios';
import { BodyWeightType } from 'types';
import { ResponseType } from "./responseType";
import { WeightAdapter, WeightEntry } from "components/BodyWeight/model";
import { makeHeader, makeUrl } from "utils/url";

export const WEIGHT_PATH = 'weightentry';

/*
 * Fetch all weight entries
 */
export const getWeights = async (): Promise<WeightEntry[]> => {
    const { data: receivedWeights } = await axios.get<ResponseType<BodyWeightType>>(makeUrl(WEIGHT_PATH), {
        headers: makeHeader(),
    });
    const adapter = new WeightAdapter();
    return receivedWeights.results.map(weight => adapter.fromJson(weight));
};

/*
 * Delete a weight entry
 */
export const deleteWeight = async (id: number): Promise<number> => { //
    const response = await axios.delete<Number>(makeUrl(WEIGHT_PATH, { id: id }), { //
        headers: makeHeader(),
    });

    return response.status;
};

/*
 * Update a weight entry
 */
export const updateWeight = async (entry: WeightEntry): Promise<WeightEntry> => { //
    const adapter = new WeightAdapter();
    const response = await axios.patch(makeUrl(WEIGHT_PATH, { id: entry.id }), adapter.toJson(entry), {
        headers: makeHeader(),
    });

    return adapter.fromJson(response);
};