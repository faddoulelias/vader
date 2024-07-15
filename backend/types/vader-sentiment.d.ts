declare module 'vader-sentiment' {
    interface SentimentAnalysisResults {
        neg: number;
        neu: number;
        pos: number;
        compound: number;
    }

    interface SentimentIntensityAnalyzer {
        polarity_scores(text: string): SentimentAnalysisResults;
    }

    const SentimentIntensityAnalyzer: SentimentIntensityAnalyzer;
}