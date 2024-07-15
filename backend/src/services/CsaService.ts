import express from 'express';

import axios from 'axios';

import VaderSentiment from '../utils/VaderSentiment';
import Routerable from '../interfaces/Routerable';

interface CompanyData {
    companyName: string;
    negative: number;
    neutral: number;
    positive: number;
    compound: number;
}

type Transcript = {
    company: string;
    link: string;
};


export default class CsaService implements Routerable {
    private transcripts: Transcript[];
    private cache = { sentiments: [] as CompanyData[], };

    public constructor() {
        this.transcripts = require('../../data/transcripts.json');
    }

    public async getTranscriptText(company: Transcript): Promise<string> {
        try {
            const response = await axios.get(company.link);
            return response.data;
        } catch (error) {
            return '';
        }
    }

    public async getCompanySentiment(company: Transcript): Promise<CompanyData> {
        const text = await this.getTranscriptText(company);
        const sentimentData = VaderSentiment.score(text);
        return {
            companyName: company.company,
            negative: sentimentData.neg,
            neutral: sentimentData.neu,
            positive: sentimentData.pos,
            compound: sentimentData.pos - sentimentData.neg,
        };
    }

    public async getSentiments(): Promise<CompanyData[]> {
        const companies = await Promise.all(this.transcripts.map(company => this.getCompanySentiment(company)));
        return companies;
    }

    public getRouter() {
        const router = express.Router();

        router.get('/sentiments', async (req: any, res: any) => {
            if (this.cache.sentiments.length === 0) {
                this.cache.sentiments = await this.getSentiments();
            }
            res.json(this.cache.sentiments);
        });

        return router;
    }
}