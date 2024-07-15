import * as vader from 'vader-sentiment';

export default class VaderSentiment {
    static score(transcript: string): vader.SentimentAnalysisResults {
        return vader.SentimentIntensityAnalyzer.polarity_scores(transcript);
    }
}