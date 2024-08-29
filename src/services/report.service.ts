import { monwebApi } from "../api/monweb.api";
import { ResponseApplicationSystem, ResponseAttention, ResponseAttentionOper, ResponseInstallerSystem, ResponseTechnicalOnSite } from "../interfaces";

export class ReportService {

    static installerSystems = async (): Promise<ResponseInstallerSystem> => {
        const { data } = await monwebApi.get<ResponseInstallerSystem>(`/report/sistemas-instalados`);
        return data;
    }

    static applicationSystem = async ({ start, end }: { start: string, end: string }): Promise<ResponseApplicationSystem> => {
        const { data } = await monwebApi.get<ResponseApplicationSystem>(`/report/solicitud-sistema`, { params: { start, end } });
        return data;
    }

    static technicalObSite = async ({ start, end }: { start: string, end: string }): Promise<ResponseTechnicalOnSite> => {
        const { data } = await monwebApi.get<ResponseTechnicalOnSite>(`/report/tecnico-en-sitio`, { params: { start, end } });
        return data;
    }

    static attention = async ({ start, end }: { start: string, end: string }): Promise<ResponseAttention> => {
        const { data } = await monwebApi.get<ResponseAttention>(`/report/atencion`, { params: { start, end } });
        return data;
    }

    static attentionOperator = async ({ start, end }: { start: string, end: string }): Promise<ResponseAttentionOper> => {
        const { data } = await monwebApi.get<ResponseAttentionOper>(`/report/at-operador`, { params: { start, end } });
        return data;
    }
}