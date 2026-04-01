import { IHint } from "../../entities/IHint";
import { api } from "../../network/api";

export class HintServiceApi {
  async create(text: string, guessId: string): Promise<IHint> {
    const { data } = await api.post<IHint>("/hint", { text, guessId });
    return data;
  }

  async update(id: string, text: string): Promise<IHint> {
    const { data } = await api.patch<IHint>(`/hint/${id}`, { text });
    return data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/hint/${id}`);
  }
}
