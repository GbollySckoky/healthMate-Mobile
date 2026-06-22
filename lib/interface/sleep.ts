export interface Sleep {
    sleep: SleepQuality
    recordedAt: string
}

type SleepQuality = {
  selectedMood: string;
  selectedEmoji: boolean;
};