interface OverviewBaseRecord {
  id: number;
  userId: number;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface OverviewBloodPressure extends OverviewBaseRecord {
  systolic: string;
  diastolic: string;
}

export interface OverviewMoodValue {
  selectedMood?: string;
  selectedEmoji?: boolean;
}

export interface OverviewMood extends OverviewBaseRecord {
  mood: OverviewMoodValue;
  notes: string | null;
}

export interface OverviewSleepValue {
  selectedMood?: string;
  selectedEmoji?: boolean;
}

export interface OverviewSleep extends OverviewBaseRecord {
  sleep: OverviewSleepValue;
}

export interface OverviewWeight extends OverviewBaseRecord {
  weight: string;
}

export interface OverviewMedication extends OverviewBaseRecord {
  name: string;
  dosage: string;
}

export interface OverviewData {
  bloodPressure: OverviewBloodPressure | null;
  medication: OverviewMedication | null;
  mood: OverviewMood | null;
  sleep: OverviewSleep | null;
  weight: OverviewWeight | null;
}

export interface GetOverview {
  data: OverviewData;
  message: string;
}
